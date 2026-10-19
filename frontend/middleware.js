import {
  DUPLICATE_ROUTES,
  matchRoute,
} from "./src/shared/seo/routes.js";
import { injectMetadata } from "./src/shared/seo/metadata.js";
import {
  examMetadata,
  metadataForRecord,
  noindexPageMetadata,
  notFoundMetadata,
  staticPageMetadata,
  universityDuplicateMetadata,
} from "./src/shared/seo/pageMetadata.js";

/**
 * Vercel Edge Middleware: writes each page's real metadata into the HTML before
 * it is served.
 *
 * The app is client-rendered, so tags set by React are invisible to crawlers
 * that do not run JavaScript — every social and messaging preview, in practice.
 * This runs ahead of the static response, resolves the route, fetches the one
 * record the page is about, and rewrites `<title>` and the meta/JSON-LD tags.
 * The browser then adopts those same tags through `useSeo`, so the two never
 * disagree.
 *
 * It fails open. Any error, timeout or unexpected response and the original
 * HTML is served untouched — this must never be able to take the site down.
 */

export const config = {
  /**
   * HTML routes only. Hashed assets, the favicon, the manifest, robots.txt and
   * the sitemap proxy must not pass through here.
   */
  matcher: ["/((?!assets/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};

/** A crawler waiting on us is worse than a crawler seeing default tags. */
const FETCH_TIMEOUT_MS = 1500;

const seoConfigFromEnv = () => ({
  siteUrl: String(process.env.VITE_SITE_URL || "").replace(/\/+$/, ""),
  siteName: process.env.VITE_SITE_NAME || "GlobalEdu",
  ogImage: process.env.VITE_OG_IMAGE || "",
  twitterSite: process.env.VITE_TWITTER_SITE || "",
});

const apiBaseUrl = () =>
  String(
    process.env.VITE_API_BASE_URL ||
      "https://global-education-93mo.onrender.com/api",
  ).replace(/\/+$/, "");

/**
 * Fetches the single record a detail page renders. A failure returns
 * `undefined` (serve defaults) and a 404 returns `null` (a real missing
 * record), which the caller treats differently.
 */
const fetchRecord = async (collection, id) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${apiBaseUrl()}/${collection}/${encodeURIComponent(id)}`,
      { signal: controller.signal, headers: { Accept: "application/json" } },
    );

    if (response.status === 404) return null;
    if (!response.ok) return undefined;

    const body = await response.json();
    // Services return either the record or a wrapper around it.
    return body?.data || body?.[collection.replace(/s$/, "")] || body;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timer);
  }
};

const resolveMetadata = async (pathname, seoConfig) => {
  const matched = matchRoute(pathname);

  if (!matched) {
    return { metadata: notFoundMetadata(seoConfig, "Page"), status: 404 };
  }

  if (matched.kind === "static") {
    return { metadata: staticPageMetadata(matched.route.path, seoConfig) };
  }

  if (matched.kind === "noindex") {
    return {
      metadata: noindexPageMetadata(
        matched.route.title,
        matched.route.path,
        seoConfig,
      ),
    };
  }

  // Exams are defined in the source, so an unknown one needs no API call.
  if (matched.route.collection === "exams") {
    const metadata = examMetadata(matched.params.id, seoConfig);
    return metadata
      ? { metadata }
      : { metadata: notFoundMetadata(seoConfig, "Exam"), status: 404 };
  }

  const record = await fetchRecord(
    matched.route.collection,
    matched.params.id,
  );

  // undefined means the lookup itself failed; say nothing rather than 404 a
  // page that probably exists.
  if (record === undefined) return {};

  if (record === null || !(record._id || record.id)) {
    return {
      metadata: notFoundMetadata(seoConfig, labelFor(matched.route.collection)),
      status: 404,
    };
  }

  const isDuplicate = DUPLICATE_ROUTES.some(
    (route) => route.pattern === matched.route.pattern,
  );

  return {
    metadata: isDuplicate
      ? universityDuplicateMetadata(record, seoConfig)
      : metadataForRecord(matched.route.collection, record, seoConfig),
  };
};

const labelFor = (collection) =>
  ({
    destinations: "Destination",
    universities: "University",
    courses: "Course",
    scholarships: "Scholarship",
    events: "Event",
    articles: "Article",
  })[collection] || "Page";

export default async function middleware(request) {
  try {
    const url = new URL(request.url);

    const page = await fetch(new URL("/index.html", url.origin), {
      headers: { Accept: "text/html" },
    });
    if (!page.ok) return undefined;

    const html = await page.text();
    const { metadata, status } = await resolveMetadata(
      url.pathname,
      seoConfigFromEnv(),
    );

    // Nothing to say about this route: serve the build's HTML unchanged.
    if (!metadata) return undefined;

    return new Response(injectMetadata(html, metadata), {
      status: status || 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // The HTML shell is identical for everyone, so it can be cached at the
        // edge while still being revalidated for fresh record titles.
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
        "X-Robots-Tag": metadata.robots.includes("noindex")
          ? "noindex, follow"
          : "index, follow",
      },
    });
  } catch {
    // Fail open: the site serves exactly as it did before this existed.
    return undefined;
  }
}
