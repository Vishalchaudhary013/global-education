import Article from '../models/Article.js';
import Course from '../models/Course.js';
import Destination from '../models/Destination.js';
import Event from '../models/Event.js';
import Scholarship from '../models/Scholarship.js';
import University from '../models/University.js';

/**
 * Serves /sitemap.xml from live records.
 *
 * Generated here rather than at build time so a university or article an admin
 * adds is listed without a redeploy. The result is cached in memory and behind
 * a Cache-Control header, so a crawler hammering the endpoint does not mean a
 * database read per request.
 *
 * SITE_URL is the public site origin (the frontend, not this API). Without it
 * there is no way to write the absolute URLs the sitemap protocol requires, so
 * the endpoint says so instead of emitting relative or guessed ones.
 */

const CACHE_TTL_MS = 60 * 60 * 1000;
const MAX_URLS_PER_SITEMAP = 50000;

let cache = { xml: null, builtAt: 0, siteUrl: '' };

/** The public pages that are fixed in the frontend source. */
const STATIC_PATHS = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/destinations', changefreq: 'weekly', priority: '0.9' },
  { path: '/universities', changefreq: 'weekly', priority: '0.9' },
  { path: '/courses', changefreq: 'weekly', priority: '0.9' },
  { path: '/scholarships', changefreq: 'weekly', priority: '0.9' },
  { path: '/exams', changefreq: 'monthly', priority: '0.7' },
  { path: '/events', changefreq: 'daily', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.7' },
  { path: '/articles', changefreq: 'daily', priority: '0.8' },
];

/** Mirrors the exam list in the frontend's `shared/seo/routes.js`. */
const EXAM_IDS = ['ielts', 'toefl', 'pte', 'duolingo', 'oet'];

const escapeXml = (value) =>
  String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** W3C date for <lastmod>, or "" when the record has no reliable timestamp. */
const toLastmod = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

const urlEntry = ({ loc, lastmod, changefreq, priority }) => {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  // Only a date the record actually carries is emitted; inventing one would
  // teach crawlers to distrust every other lastmod on the site.
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`    <priority>${priority}</priority>`);
  return `  <url>\n${parts.join('\n')}\n  </url>`;
};

/**
 * Collects every indexable public URL.
 *
 * Deliberately excluded: /admin, /login and /signup (noindex), the duplicate
 * /destinations/university/:id route (its canonical is /universities/:id), and
 * anything without an id, which could not be linked to anyway.
 */
const collectUrls = async (siteUrl) => {
  const [destinations, universities, courses, scholarships, events, articles] =
    await Promise.all([
      Destination.find().select('id updatedAt').lean(),
      University.find().select('_id updatedAt').lean(),
      Course.find().select('_id updatedAt').lean(),
      Scholarship.find().select('_id updatedAt').lean(),
      Event.find().select('_id updatedAt').lean(),
      Article.find().select('_id updatedAt date').lean(),
    ]);

  const urls = [
    ...STATIC_PATHS.map((entry) => ({
      loc: `${siteUrl}${entry.path === '/' ? '/' : entry.path}`,
      changefreq: entry.changefreq,
      priority: entry.priority,
    })),

    ...EXAM_IDS.map((id) => ({
      loc: `${siteUrl}/exams/${id}`,
      changefreq: 'monthly',
      priority: '0.6',
    })),

    ...destinations
      .filter((record) => record.id)
      .map((record) => ({
        loc: `${siteUrl}/destinations/${encodeURIComponent(record.id)}`,
        lastmod: toLastmod(record.updatedAt),
        changefreq: 'weekly',
        priority: '0.8',
      })),

    ...universities.map((record) => ({
      loc: `${siteUrl}/universities/${record._id}`,
      lastmod: toLastmod(record.updatedAt),
      changefreq: 'monthly',
      priority: '0.7',
    })),

    ...courses.map((record) => ({
      loc: `${siteUrl}/courses/${record._id}`,
      lastmod: toLastmod(record.updatedAt),
      changefreq: 'monthly',
      priority: '0.7',
    })),

    ...scholarships.map((record) => ({
      loc: `${siteUrl}/scholarships/${record._id}`,
      lastmod: toLastmod(record.updatedAt),
      changefreq: 'weekly',
      priority: '0.7',
    })),

    ...events.map((record) => ({
      loc: `${siteUrl}/events/${record._id}`,
      lastmod: toLastmod(record.updatedAt),
      changefreq: 'daily',
      priority: '0.6',
    })),

    ...articles.map((record) => ({
      loc: `${siteUrl}/articles/${record._id}`,
      lastmod: toLastmod(record.updatedAt || record.date),
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  // A URL listed twice is a duplicate signal, so the first wins.
  const seen = new Set();
  return urls.filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
};

const renderSitemap = (urls) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(urlEntry)
    .join('\n')}\n</urlset>\n`;

/**
 * A sitemap index, used only once the URL count passes the protocol's 50,000
 * limit. The parts are served by `getSitemapPart`.
 */
const renderSitemapIndex = (siteUrl, partCount) => {
  const today = new Date().toISOString().split('T')[0];
  const parts = Array.from({ length: partCount }, (_, index) =>
    [
      '  <sitemap>',
      `    <loc>${escapeXml(`${siteUrl}/sitemap-${index + 1}.xml`)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '  </sitemap>',
    ].join('\n'),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${parts.join(
    '\n',
  )}\n</sitemapindex>\n`;
};

const siteUrlFromEnv = () =>
  String(process.env.SITE_URL || '').replace(/\/+$/, '');

const missingSiteUrl = (res) => {
  res.set('Content-Type', 'application/xml; charset=utf-8');
  return res.status(503).send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<!-- SITE_URL is not configured on the API, so absolute URLs cannot be generated. Set SITE_URL to the public site origin, e.g. https://example.com -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n`,
  );
};

/** Rebuilds at most once per TTL, and immediately if SITE_URL changed. */
const cachedUrls = async (siteUrl) => {
  const fresh =
    cache.urls &&
    cache.siteUrl === siteUrl &&
    Date.now() - cache.builtAt < CACHE_TTL_MS;

  if (!fresh) {
    cache = {
      urls: await collectUrls(siteUrl),
      builtAt: Date.now(),
      siteUrl,
    };
  }

  return cache.urls;
};

export const getSitemap = async (req, res) => {
  try {
    const siteUrl = siteUrlFromEnv();
    if (!siteUrl) return missingSiteUrl(res);

    const urls = await cachedUrls(siteUrl);

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=3600');

    if (urls.length > MAX_URLS_PER_SITEMAP) {
      const partCount = Math.ceil(urls.length / MAX_URLS_PER_SITEMAP);
      return res.send(renderSitemapIndex(siteUrl, partCount));
    }

    res.send(renderSitemap(urls));
  } catch (error) {
    console.error('sitemap generation failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/** One slice of a split sitemap: /sitemap-1.xml, /sitemap-2.xml, ... */
export const getSitemapPart = async (req, res) => {
  try {
    const siteUrl = siteUrlFromEnv();
    if (!siteUrl) return missingSiteUrl(res);

    // The route is a RegExp, so the captured number arrives as params[0].
    const part = Number.parseInt(req.params[0] ?? req.params.part, 10);
    if (!Number.isInteger(part) || part < 1) {
      return res.status(404).json({ message: 'Not found' });
    }

    const urls = await cachedUrls(siteUrl);
    const slice = urls.slice(
      (part - 1) * MAX_URLS_PER_SITEMAP,
      part * MAX_URLS_PER_SITEMAP,
    );

    if (slice.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(renderSitemap(slice));
  } catch (error) {
    console.error('sitemap part generation failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/** Exported for the test suite, which checks escaping and URL coverage. */
export const __testing = {
  collectUrls,
  renderSitemap,
  renderSitemapIndex,
  escapeXml,
  toLastmod,
  urlEntry,
  STATIC_PATHS,
  EXAM_IDS,
};
