import { useEffect } from "react";
import { metaTagList } from "./metadata.js";

/**
 * Applies a page's metadata to the document head.
 *
 * Tags are updated in place and tracked by a `data-seo` key rather than
 * appended, so navigating between routes replaces the previous page's values
 * instead of stacking a second copy — and so the tags the edge middleware
 * already injected server-side are reused rather than duplicated.
 *
 * `metadata` is the object `buildMetadata` returns. Pass `null` while a page is
 * still loading its record, and the current head is left untouched.
 */
export const useSeo = (metadata) => {
  // The metadata object is rebuilt on every render, so the effect keys off its
  // serialised form: the head is only touched when a value actually changed.
  const fingerprint = metadata ? JSON.stringify(metadata) : "";

  useEffect(() => {
    if (!fingerprint) return;
    const meta = JSON.parse(fingerprint);

    if (meta.title) document.title = meta.title;

    const applied = new Set();
    for (const tag of metaTagList(meta)) {
      applied.add(tag.key);
      upsertTag(tag);
    }

    // Anything this page does not define is removed, so a value from the
    // previous route cannot linger and describe the wrong page.
    for (const node of document.head.querySelectorAll("[data-seo]")) {
      const key = node.getAttribute("data-seo");
      if (key !== "jsonld" && !applied.has(key)) node.remove();
    }

    applyJsonLd(meta.jsonLd || []);
  }, [fingerprint]);
};

const upsertTag = ({ key, kind, attr, value }) => {
  let node = document.head.querySelector(`[data-seo="${key}"]`);

  if (!node) {
    // Fall back to a matching tag that was rendered into index.html or injected
    // at the edge, so it is adopted instead of duplicated.
    node = document.head.querySelector(
      kind === "link" ? 'link[rel="canonical"]' : `meta[${attr}="${key}"]`,
    );
  }

  if (!node) {
    node = document.createElement(kind);
    if (kind === "link") node.setAttribute("rel", "canonical");
    else node.setAttribute(attr, key);
    document.head.appendChild(node);
  }

  node.setAttribute("data-seo", key);
  node.setAttribute(kind === "link" ? "href" : "content", value);
};

const applyJsonLd = (blocks) => {
  for (const node of document.head.querySelectorAll('[data-seo="jsonld"]')) {
    node.remove();
  }

  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "jsonld");
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
};
