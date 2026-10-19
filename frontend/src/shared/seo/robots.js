/**
 * The robots.txt body.
 *
 * Written from the routes the app actually serves (see `routes.js`). Two rules
 * deserve an explanation:
 *
 * - `/admin`, `/login` and `/signup` are NOT disallowed. They carry a `noindex`
 *   instead, and a crawler has to be able to fetch a page to see that. Blocking
 *   them here would leave them eligible to appear in results as bare URLs.
 *   robots.txt is not access control either — the API enforces that.
 *
 * - `/assets/` stays crawlable. Blocking the JS and CSS would stop Google
 *   rendering the pages at all, which for a client-rendered app means it sees
 *   nothing.
 *
 * `siteUrl` is the production origin. The `Sitemap:` line is only written when
 * one is configured, because a relative or guessed sitemap URL is worse than
 * none at all.
 */
export const buildRobotsTxt = (siteUrl) => {
  const base = String(siteUrl || "").replace(/\/+$/, "");

  const lines = [
    "# robots.txt — generated at build time from src/shared/seo/robots.js",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "# Query-string variants of the listing pages duplicate the canonical page.",
    "Disallow: /*?*page=",
    "Disallow: /*?*search=",
    "",
    "# Nothing user-facing is served from these.",
    "Disallow: /api/",
    "",
  ];

  if (base) {
    lines.push(`Sitemap: ${base}/sitemap.xml`, "");
  } else {
    lines.push(
      "# No Sitemap line: set VITE_SITE_URL at build time to emit one.",
      "",
    );
  }

  return lines.join("\n");
};
