/**
 * Builds the metadata for a page and renders it as head tags.
 *
 * Shared by the browser bundle (through `useSeo`) and by the Vercel edge
 * middleware, which injects the same tags into the served HTML so crawlers that
 * do not run JavaScript still see them. Keep it free of `import.meta.env`,
 * `process.env`, the DOM and Node APIs — the caller passes a `config`.
 *
 * `config` is `{ siteUrl, siteName, ogImage, twitterSite }`. An empty `siteUrl`
 * means the production domain has not been configured, and every absolute URL
 * is then omitted rather than guessed.
 */

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

/** Collapses whitespace and strips markup so API copy is safe in a meta tag. */
export const toPlainText = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Trims at a word boundary so a description never ends mid-word. */
export const truncate = (value, limit) => {
  const text = toPlainText(value);
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};

export const escapeHtml = (value) =>
  String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Absolute URL for a site path, or "" when no production domain is set. */
export const absoluteUrl = (path, config) => {
  const base = (config?.siteUrl || "").replace(/\/+$/, "");
  if (!base) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

/** Titles carry the brand once; a page that is already branded is left alone. */
export const formatTitle = (title, config) => {
  const siteName = config?.siteName || "";
  const pageTitle = toPlainText(title);
  if (!pageTitle) return siteName;
  if (!siteName || pageTitle.toLowerCase().includes(siteName.toLowerCase())) {
    return truncate(pageTitle, TITLE_LIMIT + siteName.length);
  }
  return `${truncate(pageTitle, TITLE_LIMIT)} | ${siteName}`;
};

const INDEXABLE = "index, follow, max-image-preview:large";
const NOT_INDEXABLE = "noindex, follow";

/**
 * Normalises one page's SEO inputs into the object `useSeo` and the edge
 * middleware both render. Anything missing falls back to the site defaults.
 */
export const buildMetadata = (input, config) => {
  const {
    title,
    description,
    path,
    canonicalPath,
    image,
    type = "website",
    noindex = false,
    jsonLd = [],
    publishedTime,
    modifiedTime,
  } = input || {};

  // A page with no path of its own — a missing record, say — gets no canonical
  // at all. Defaulting to "/" would canonicalise every dead URL to the
  // homepage, which is worse than leaving the tag off.
  const target = canonicalPath || path || "";
  const canonical = target ? absoluteUrl(target, config) : "";
  const resolvedImage = image
    ? absoluteUrl(image, config) || (/^https?:\/\//i.test(image) ? image : "")
    : absoluteUrl(config?.ogImage || "", config);

  return {
    title: formatTitle(title, config),
    description: truncate(description || "", DESCRIPTION_LIMIT),
    canonical,
    robots: noindex ? NOT_INDEXABLE : INDEXABLE,
    image: resolvedImage,
    type,
    siteName: config?.siteName || "",
    twitterSite: config?.twitterSite || "",
    publishedTime: publishedTime || "",
    modifiedTime: modifiedTime || "",
    jsonLd: (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean),
  };
};

/**
 * The flat tag list both renderers walk. `key` identifies a tag so the browser
 * can update it in place instead of appending a second copy next to the one the
 * edge middleware already injected.
 */
export const metaTagList = (meta) => {
  const tags = [
    { key: "description", kind: "meta", attr: "name", value: meta.description },
    { key: "robots", kind: "meta", attr: "name", value: meta.robots },
    { key: "og:title", kind: "meta", attr: "property", value: meta.title },
    {
      key: "og:description",
      kind: "meta",
      attr: "property",
      value: meta.description,
    },
    { key: "og:type", kind: "meta", attr: "property", value: meta.type },
    { key: "og:url", kind: "meta", attr: "property", value: meta.canonical },
    { key: "og:image", kind: "meta", attr: "property", value: meta.image },
    {
      key: "og:site_name",
      kind: "meta",
      attr: "property",
      value: meta.siteName,
    },
    {
      key: "twitter:card",
      kind: "meta",
      attr: "name",
      value: meta.image ? "summary_large_image" : "summary",
    },
    { key: "twitter:title", kind: "meta", attr: "name", value: meta.title },
    {
      key: "twitter:description",
      kind: "meta",
      attr: "name",
      value: meta.description,
    },
    { key: "twitter:image", kind: "meta", attr: "name", value: meta.image },
    { key: "twitter:site", kind: "meta", attr: "name", value: meta.twitterSite },
    {
      key: "article:published_time",
      kind: "meta",
      attr: "property",
      value: meta.publishedTime,
    },
    {
      key: "article:modified_time",
      kind: "meta",
      attr: "property",
      value: meta.modifiedTime,
    },
    { key: "canonical", kind: "link", attr: "rel", value: meta.canonical },
  ];

  // An empty value means "not known for this page" — emitting it would state
  // something false, so the tag is dropped instead.
  return tags.filter((tag) => tag.value);
};

/** The head markup for the edge middleware to inject. */
export const renderHeadTags = (meta) => {
  const tags = metaTagList(meta).map((tag) =>
    tag.kind === "link"
      ? `<link rel="canonical" href="${escapeHtml(tag.value)}" data-seo="canonical" />`
      : `<meta ${tag.attr}="${tag.key}" content="${escapeHtml(tag.value)}" data-seo="${tag.key}" />`,
  );

  for (const block of meta.jsonLd) {
    // `<` is escaped so a record's text can never close the script element.
    tags.push(
      `<script type="application/ld+json" data-seo="jsonld">${JSON.stringify(
        block,
      ).replace(/</g, "\\u003c")}</script>`,
    );
  }

  return tags.join("\n    ");
};

/**
 * Rewrites the built index.html with a page's real metadata.
 *
 * The existing `<title>` is replaced rather than duplicated, because a browser
 * takes the first title in the document and a second one would be ignored.
 */
export const injectMetadata = (html, meta) => {
  const title = `<title>${escapeHtml(meta.title)}</title>`;
  const withTitle = /<title>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/i, title)
    : html.replace(/<head([^>]*)>/i, `<head$1>\n    ${title}`);

  const tags = renderHeadTags(meta);
  return tags
    ? withTitle.replace("</head>", `  ${tags}\n  </head>`)
    : withTitle;
};
