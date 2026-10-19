/**
 * The SEO route table: one entry per route the app serves, mirroring
 * `app/App.jsx`. Adding a route there means adding it here, which is also what
 * keeps the sitemap, the edge middleware and the 404 handling honest about
 * which URLs actually exist.
 *
 * This module is imported by the browser bundle AND by the Vercel edge
 * middleware, so it must stay free of `import.meta.env`, `process.env`, the DOM
 * and any Node API.
 */

/** Pages whose content is fixed in the source, not loaded from the API. */
export const STATIC_ROUTES = [
  {
    path: "/",
    // Kept short enough that the brand suffix still fits without truncation.
    title: "Study Abroad Universities, Courses & Scholarships",
    description:
      "Plan your study abroad journey with GlobalEdu: compare top universities, courses, scholarships and destinations, and get guidance at every step.",
    changefreq: "weekly",
    priority: 1,
  },
  {
    path: "/destinations",
    title: "Explore Study Destinations",
    description:
      "Choose from the world's top study destinations and unlock a global career. Compare costs, visas and universities country by country.",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/universities",
    title: "Explore Top Universities",
    description:
      "Discover world-class institutions across the globe. Compare rankings, costs and requirements to find your perfect academic match.",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/courses",
    title: "Find Your Dream Course",
    description:
      "Search courses globally, tailored to your academic background and aspirations. Compare duration, destination and university.",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/scholarships",
    title: "International Scholarships",
    description:
      "Discover funding opportunities to support your dream of studying abroad. Filter by destination to find specific scholarships.",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/exams",
    title: "Language Proficiency Exams",
    description:
      "Learn about the English language tests required to study abroad — IELTS, TOEFL, PTE, Duolingo and OET — including formats and scoring.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/events",
    title: "Upcoming Events",
    description:
      "Join our education fairs, webinars and assessment days to fast-track your study abroad journey.",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    path: "/services",
    title: "Our Services",
    description:
      "From the day you decide to study abroad to the day you graduate and find a job, we support you at every step.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/articles",
    title: "Latest Articles",
    description:
      "Expert guides on studying abroad, scholarships, visa processes and more, from the GlobalEdu counselling team.",
    changefreq: "daily",
    priority: 0.8,
  },
];

/**
 * The language exams, which are defined in the source rather than the database.
 * `/exams/:id` renders for any id, so this list is what bounds the URL space
 * for the sitemap and lets an unknown exam answer as a 404 instead of a page.
 */
export const EXAMS = [
  {
    id: "ielts",
    name: "IELTS",
    description: "International English Language Testing System.",
  },
  {
    id: "toefl",
    name: "TOEFL",
    description: "Test of English as a Foreign Language.",
  },
  { id: "pte", name: "PTE Academic", description: "Pearson Test of English." },
  {
    id: "duolingo",
    name: "Duolingo English Test",
    description: "Convenient, fast and affordable English test.",
  },
  {
    id: "oet",
    name: "OET",
    description: "Occupational English Test for healthcare professionals.",
  },
];

/**
 * API-driven routes. `collection` names the sitemap/edge data source and
 * `param` the record key used in the URL — destinations are addressed by their
 * slug, everything else by `_id`.
 */
export const DYNAMIC_ROUTES = [
  {
    pattern: "/destinations/:id",
    collection: "destinations",
    param: "id",
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    pattern: "/universities/:id",
    collection: "universities",
    param: "_id",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    pattern: "/courses/:id",
    collection: "courses",
    param: "_id",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    pattern: "/scholarships/:id",
    collection: "scholarships",
    param: "_id",
    changefreq: "weekly",
    priority: 0.7,
  },
  {
    pattern: "/events/:id",
    collection: "events",
    param: "_id",
    changefreq: "daily",
    priority: 0.6,
  },
  {
    pattern: "/articles/:id",
    collection: "articles",
    param: "_id",
    changefreq: "monthly",
    priority: 0.7,
  },
  { pattern: "/exams/:id", collection: "exams", param: "id", changefreq: "monthly", priority: 0.6 },
];

/**
 * Routes that exist but must never be indexed: the admin area and the account
 * screens behind it. They are deliberately left crawlable in robots.txt so the
 * `noindex` on them can actually be seen.
 */
export const NOINDEX_ROUTES = [
  { path: "/login", title: "Admin Login" },
  { path: "/signup", title: "Admin Signup" },
  { path: "/admin", title: "Admin Dashboard" },
];

/**
 * `/destinations/university/:id` renders the same page as `/universities/:id`.
 * It stays working, but its canonical points at the university URL and it is
 * kept out of the sitemap so the two do not compete.
 */
export const DUPLICATE_ROUTES = [
  {
    pattern: "/destinations/university/:id",
    canonicalFor: "/universities/:id",
    collection: "universities",
    param: "_id",
  },
];

const toRegExp = (pattern) =>
  new RegExp(`^${pattern.replace(/:[^/]+/g, "([^/]+)")}/?$`);

const paramNames = (pattern) =>
  (pattern.match(/:[^/]+/g) || []).map((name) => name.slice(1));

/**
 * Resolves a pathname against the table above.
 *
 * Returns `{ kind, route, params }` where kind is one of static | dynamic |
 * duplicate | noindex, or null when nothing matches — which is what makes a URL
 * a genuine 404 rather than a page that renders empty.
 */
export const matchRoute = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";

  const staticRoute = STATIC_ROUTES.find((route) => route.path === path);
  if (staticRoute) return { kind: "static", route: staticRoute, params: {} };

  const noindexRoute = NOINDEX_ROUTES.find((route) => route.path === path);
  if (noindexRoute) return { kind: "noindex", route: noindexRoute, params: {} };

  // Duplicates are checked before dynamic routes: the longer, more specific
  // pattern must win over `/destinations/:id`.
  for (const route of DUPLICATE_ROUTES) {
    const found = path.match(toRegExp(route.pattern));
    if (found) {
      return {
        kind: "duplicate",
        route,
        params: buildParams(route.pattern, found),
      };
    }
  }

  for (const route of DYNAMIC_ROUTES) {
    const found = path.match(toRegExp(route.pattern));
    if (found) {
      return {
        kind: "dynamic",
        route,
        params: buildParams(route.pattern, found),
      };
    }
  }

  return null;
};

function buildParams(pattern, match) {
  return paramNames(pattern).reduce((params, name, index) => {
    params[name] = decodeURIComponent(match[index + 1]);
    return params;
  }, {});
}
