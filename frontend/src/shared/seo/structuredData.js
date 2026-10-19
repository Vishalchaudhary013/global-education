/**
 * JSON-LD builders. Every field is taken from a record the API actually
 * returned; nothing describes a rating, review, price or availability, because
 * the site does not publish those and inventing them would be a lie to the
 * crawler as much as to the reader.
 *
 * Pure like the rest of `shared/seo` — the caller passes `config`.
 */

import { absoluteUrl, toPlainText, truncate } from "./metadata.js";

/** Drops empty keys so a record's missing fields never ship as null. */
const compact = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== "";
    }),
  );

export const organizationSchema = (config) =>
  compact({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: config?.siteName,
    url: absoluteUrl("/", config),
    logo: absoluteUrl("/favicon.svg", config),
    description:
      "Study abroad counselling: universities, courses, scholarships and destination guidance.",
  });

export const webSiteSchema = (config) => {
  const url = absoluteUrl("/", config);
  if (!url) return null;
  return compact({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config?.siteName,
    url,
  });
};

/**
 * Breadcrumbs from the trail a page already shows. Positions are 1-based and
 * the last item is the current page.
 */
export const breadcrumbSchema = (trail, config) => {
  const items = (trail || []).filter((item) => item?.name && item?.path);
  if (items.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: toPlainText(item.name),
      item: absoluteUrl(item.path, config),
    })),
  };
};

export const articleSchema = (article, config, path) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: truncate(article.title, 110),
    description: truncate(article.excerpt || "", 200),
    image: article.img || undefined,
    datePublished: article.date || article.createdAt || undefined,
    dateModified: article.updatedAt || article.date || undefined,
    author: article.author
      ? { "@type": "Person", name: toPlainText(article.author) }
      : undefined,
    publisher: config?.siteName
      ? { "@type": "Organization", name: config.siteName }
      : undefined,
    mainEntityOfPage: absoluteUrl(path, config) || undefined,
    articleSection: article.category || undefined,
    keywords: Array.isArray(article.tags) ? article.tags.join(", ") : undefined,
  });

export const courseSchema = (course, config) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Course",
    name: toPlainText(course.name),
    description: courseDescription(course),
    url: absoluteUrl(`/courses/${course._id}`, config) || undefined,
    provider: course.university?.name
      ? {
          "@type": "CollegeOrUniversity",
          name: toPlainText(course.university.name),
        }
      : config?.siteName
        ? { "@type": "Organization", name: config.siteName }
        : undefined,
    educationalCredentialAwarded: course.type || undefined,
    timeRequired: course.duration || undefined,
  });

export const universitySchema = (university, config) =>
  compact({
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: toPlainText(university.name),
    description: truncate(university.overview || "", 300) || undefined,
    url: absoluteUrl(`/universities/${university._id}`, config) || undefined,
    logo: university.logo || undefined,
    address: university.location
      ? {
          "@type": "PostalAddress",
          addressLocality: toPlainText(university.location),
          addressCountry: toPlainText(university.destination || ""),
        }
      : undefined,
  });

/**
 * An event uses schema.org/Event, with the mode mapped to the attendance values
 * the vocabulary defines. Only a date the record actually holds is emitted.
 */
export const eventSchema = (event, config) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Event",
    name: toPlainText(event.name),
    description: truncate(event.description || "", 300) || undefined,
    startDate: event.date || undefined,
    url: absoluteUrl(`/events/${event._id}`, config) || undefined,
    image: event.logo || undefined,
    eventAttendanceMode:
      event.mode === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : event.mode === "offline"
          ? "https://schema.org/OfflineEventAttendanceMode"
          : undefined,
    location: buildEventLocation(event, config),
    organizer: config?.siteName
      ? { "@type": "Organization", name: config.siteName }
      : undefined,
  });

const buildEventLocation = (event, config) => {
  if (event.mode === "online") {
    const url = absoluteUrl(`/events/${event._id}`, config);
    // Without a configured domain there is no URL to point a virtual location
    // at, and a VirtualLocation without one says nothing.
    return url ? { "@type": "VirtualLocation", url } : undefined;
  }
  const place = toPlainText(event.venue || event.location || "");
  if (!place) return undefined;
  return { "@type": "Place", name: place, address: place };
};

/**
 * Scholarships have no settled schema.org type, so this describes the funding
 * as a `Grant` — which it is — rather than forcing a richer type that would
 * imply fields the record does not have.
 */
export const scholarshipSchema = (scholarship, config) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Grant",
    name: toPlainText(scholarship.name),
    description:
      truncate(scholarship.description || scholarship.eligibility || "", 300) ||
      undefined,
    url: absoluteUrl(`/scholarships/${scholarship._id}`, config) || undefined,
    sponsor: scholarship.provider
      ? { "@type": "Organization", name: toPlainText(scholarship.provider) }
      : undefined,
  });

export const courseDescription = (course) => {
  const parts = [
    course.type ? `${course.type} programme` : "",
    course.duration ? `${course.duration} duration` : "",
    course.university?.name ? `at ${course.university.name}` : "",
    course.destination ? `in ${course.destination}` : "",
  ].filter(Boolean);
  return parts.join(", ");
};
