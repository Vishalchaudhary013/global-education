import { useSeo } from "./useSeo.js";
import { seoConfig } from "./seoConfig.js";
import { buildMetadata } from "./metadata.js";
import {
  noindexPageMetadata,
  notFoundMetadata,
  staticPageMetadata,
} from "./pageMetadata.js";

const resolveMetadata = ({
  metadata,
  staticPath,
  notFound,
  notFoundLabel,
  noindex,
  title,
  description,
  path,
  canonicalPath,
  image,
  type,
  jsonLd,
}) => {
  if (notFound) return notFoundMetadata(seoConfig, notFoundLabel);
  if (metadata) return metadata;
  if (staticPath) return staticPageMetadata(staticPath, seoConfig);
  if (noindex) return noindexPageMetadata(title, path || "", seoConfig);
  if (!title && !description) return null;

  return buildMetadata(
    { title, description, path, canonicalPath, image, type, jsonLd },
    seoConfig,
  );
};

/**
 * Declares a page's SEO. Renders nothing — it only writes the document head.
 *
 * Three ways to use it, from least to most specific:
 *
 *   <Seo staticPath="/courses" />           a page from the route table
 *   <Seo metadata={courseMetadata(...)} />  a record's own metadata
 *   <Seo title="…" description="…" />       ad hoc, for a one-off page
 *
 * `notFound` marks a record that could not be loaded and `noindex` an admin or
 * account screen; both keep the page out of the index.
 */
const Seo = (props) => {
  useSeo(resolveMetadata({ notFoundLabel: "Page", ...props }));
  return null;
};

export default Seo;
