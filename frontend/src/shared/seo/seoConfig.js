/**
 * The browser's view of the SEO config.
 *
 * `VITE_SITE_URL` is the production origin, e.g. `https://example.com`. It is
 * deliberately left empty by default: without it, canonical and Open Graph URLs
 * are omitted rather than pointed at a guessed domain, which search engines
 * treat far better than a confidently wrong canonical.
 *
 * The edge middleware reads the same values from `process.env` — see
 * `frontend/middleware.js`.
 */

const trimTrailingSlash = (value) => String(value || "").replace(/\/+$/, "");

export const seoConfig = {
  siteUrl: trimTrailingSlash(import.meta.env.VITE_SITE_URL),
  siteName: import.meta.env.VITE_SITE_NAME || "GlobalEdu",
  /** A site-relative path or absolute URL; omitted when unset. */
  ogImage: import.meta.env.VITE_OG_IMAGE || "",
  twitterSite: import.meta.env.VITE_TWITTER_SITE || "",
};

/** True once a production domain is configured. */
export const hasSiteUrl = () => !!seoConfig.siteUrl;
