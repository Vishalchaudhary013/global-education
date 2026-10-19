export { default as Seo } from "./Seo";
export { useSeo } from "./useSeo.js";
export { seoConfig, hasSiteUrl } from "./seoConfig.js";
export { buildMetadata, absoluteUrl, truncate, toPlainText } from "./metadata.js";
export {
  articleMetadata,
  courseMetadata,
  destinationMetadata,
  eventMetadata,
  examMetadata,
  metadataForRecord,
  noindexPageMetadata,
  notFoundMetadata,
  scholarshipMetadata,
  staticPageMetadata,
  universityDuplicateMetadata,
  universityMetadata,
} from "./pageMetadata.js";
export {
  DYNAMIC_ROUTES,
  DUPLICATE_ROUTES,
  EXAMS,
  NOINDEX_ROUTES,
  STATIC_ROUTES,
  matchRoute,
} from "./routes.js";
