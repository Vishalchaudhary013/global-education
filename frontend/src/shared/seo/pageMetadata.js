/**
 * Turns a route plus the record it renders into page metadata.
 *
 * This is the single definition of what each page's title, description,
 * canonical and structured data are. The React pages use it through `useSeo`
 * and the edge middleware uses it to inject the same values into the HTML, so
 * the two can never disagree.
 *
 * Pure: the caller passes `config`, and a record is whatever the API returned.
 */

import { buildMetadata, toPlainText, truncate } from "./metadata.js";
import {
  articleSchema,
  breadcrumbSchema,
  courseDescription,
  courseSchema,
  eventSchema,
  organizationSchema,
  scholarshipSchema,
  universitySchema,
  webSiteSchema,
} from "./structuredData.js";
import { EXAMS, STATIC_ROUTES } from "./routes.js";

/** Metadata for a page defined in the source rather than the database. */
export const staticPageMetadata = (path, config) => {
  const route = STATIC_ROUTES.find((entry) => entry.path === path);
  if (!route) return null;

  const jsonLd =
    path === "/"
      ? [organizationSchema(config), webSiteSchema(config)].filter(Boolean)
      : [
          breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: route.title, path: route.path },
            ],
            config,
          ),
        ].filter(Boolean);

  return buildMetadata(
    {
      title: route.title,
      description: route.description,
      path: route.path,
      jsonLd,
    },
    config,
  );
};

/** The admin and account screens: real pages, deliberately not indexed. */
export const noindexPageMetadata = (title, path, config) =>
  buildMetadata(
    {
      title,
      description: "",
      path,
      noindex: true,
    },
    config,
  );

/**
 * What a detail page shows when the record is missing or deleted.
 *
 * Marked `noindex` so a URL whose record is gone stops being a soft 404 that
 * search engines keep in the index.
 */
export const notFoundMetadata = (config, label = "Page") =>
  buildMetadata(
    {
      title: `${label} not found`,
      description: "",
      path: "",
      noindex: true,
    },
    config,
  );

const crumbs = (trail, config) =>
  [breadcrumbSchema(trail, config)].filter(Boolean);

export const destinationMetadata = (destination, config) => {
  const name = toPlainText(destination.name);
  const tagline = toPlainText(destination.guide?.tagline || "");
  const path = `/destinations/${destination.id}`;

  return buildMetadata(
    {
      title: `Study in ${name}`,
      description:
        truncate(
          destination.description ||
            tagline ||
            `Universities, costs, visa requirements and scholarships for studying in ${name}.`,
          160,
        ),
      path,
      image: destination.heroImage,
      type: "article",
      modifiedTime: destination.updatedAt,
      jsonLd: crumbs(
        [
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: name, path },
        ],
        config,
      ),
    },
    config,
  );
};

export const universityMetadata = (university, config) => {
  const name = toPlainText(university.name);
  const place = [university.location, university.destination]
    .filter(Boolean)
    .join(", ");
  const path = `/universities/${university._id}`;

  return buildMetadata(
    {
      title: place ? `${name} — ${place}` : name,
      description: truncate(
        university.overview ||
          [
            place ? `${name} in ${place}.` : `${name}.`,
            university.ranking ? `Ranking: ${university.ranking}.` : "",
            university.ieltsRequirement
              ? `IELTS requirement: ${university.ieltsRequirement}.`
              : "",
          ]
            .filter(Boolean)
            .join(" "),
        160,
      ),
      path,
      image: university.logo,
      type: "article",
      modifiedTime: university.updatedAt,
      jsonLd: [
        universitySchema(university, config),
        ...crumbs(
          [
            { name: "Home", path: "/" },
            { name: "Universities", path: "/universities" },
            { name, path },
          ],
          config,
        ),
      ],
    },
    config,
  );
};

/**
 * The same university is also reachable under `/destinations/university/:id`.
 * That URL keeps working but its canonical names the `/universities/:id` page,
 * so the duplicate does not compete with the original.
 */
export const universityDuplicateMetadata = (university, config) => ({
  ...universityMetadata(university, config),
  ...buildMetadata(
    {
      title: toPlainText(university.name),
      description: truncate(university.overview || "", 160),
      path: `/destinations/university/${university._id}`,
      canonicalPath: `/universities/${university._id}`,
      image: university.logo,
      type: "article",
    },
    config,
  ),
});

export const courseMetadata = (course, config) => {
  const name = toPlainText(course.name);
  const path = `/courses/${course._id}`;

  return buildMetadata(
    {
      title: course.destination ? `${name} in ${course.destination}` : name,
      description: truncate(
        courseDescription(course) || `${name} programme details and entry requirements.`,
        160,
      ),
      path,
      type: "article",
      modifiedTime: course.updatedAt,
      jsonLd: [
        courseSchema(course, config),
        ...crumbs(
          [
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name, path },
          ],
          config,
        ),
      ],
    },
    config,
  );
};

export const scholarshipMetadata = (scholarship, config) => {
  const name = toPlainText(scholarship.name);
  const path = `/scholarships/${scholarship._id}`;

  return buildMetadata(
    {
      title: scholarship.destination ? `${name} — ${scholarship.destination}` : name,
      description: truncate(
        scholarship.description ||
          scholarship.eligibility ||
          [
            scholarship.amount ? `Award: ${scholarship.amount}.` : "",
            scholarship.provider ? `Offered by ${scholarship.provider}.` : "",
            scholarship.level ? `Level: ${scholarship.level}.` : "",
          ]
            .filter(Boolean)
            .join(" "),
        160,
      ),
      path,
      type: "article",
      modifiedTime: scholarship.updatedAt,
      jsonLd: [
        scholarshipSchema(scholarship, config),
        ...crumbs(
          [
            { name: "Home", path: "/" },
            { name: "Scholarships", path: "/scholarships" },
            { name, path },
          ],
          config,
        ),
      ],
    },
    config,
  );
};

export const eventMetadata = (event, config) => {
  const name = toPlainText(event.name);
  const path = `/events/${event._id}`;
  const when = event.date ? new Date(event.date) : null;
  const dateLabel =
    when && !Number.isNaN(when.getTime())
      ? when.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return buildMetadata(
    {
      title: dateLabel ? `${name} — ${dateLabel}` : name,
      description: truncate(
        event.description ||
          [
            event.type || "",
            event.mode ? `${event.mode} event` : "",
            event.venue || event.location || "",
          ]
            .filter(Boolean)
            .join(" · "),
        160,
      ),
      path,
      image: event.logo,
      type: "article",
      modifiedTime: event.updatedAt,
      jsonLd: [
        eventSchema(event, config),
        ...crumbs(
          [
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name, path },
          ],
          config,
        ),
      ],
    },
    config,
  );
};

export const articleMetadata = (article, config) => {
  const title = toPlainText(article.title);
  const path = `/articles/${article._id}`;
  const firstBody = article.content?.[0]?.body || "";

  return buildMetadata(
    {
      title,
      description: truncate(article.excerpt || firstBody, 160),
      path,
      image: article.img,
      type: "article",
      publishedTime: article.date || article.createdAt,
      modifiedTime: article.updatedAt,
      jsonLd: [
        articleSchema(article, config, path),
        ...crumbs(
          [
            { name: "Home", path: "/" },
            { name: "Articles", path: "/articles" },
            { name: title, path },
          ],
          config,
        ),
      ],
    },
    config,
  );
};

/** Exams come from the source list, so an unknown id has no metadata at all. */
export const examMetadata = (examId, config) => {
  const exam = EXAMS.find((entry) => entry.id === String(examId).toLowerCase());
  if (!exam) return null;

  const path = `/exams/${exam.id}`;
  return buildMetadata(
    {
      title: `${exam.name} — Test Format, Scoring & Preparation`,
      description: `${exam.description} Learn the ${exam.name} test format, scoring and how to prepare for studying abroad.`,
      path,
      jsonLd: crumbs(
        [
          { name: "Home", path: "/" },
          { name: "Exams", path: "/exams" },
          { name: exam.name, path },
        ],
        config,
      ),
    },
    config,
  );
};

/**
 * Dispatches by collection for the edge middleware, which knows the route it
 * matched but not which builder belongs to it.
 */
export const metadataForRecord = (collection, record, config) => {
  switch (collection) {
    case "destinations":
      return destinationMetadata(record, config);
    case "universities":
      return universityMetadata(record, config);
    case "courses":
      return courseMetadata(record, config);
    case "scholarships":
      return scholarshipMetadata(record, config);
    case "events":
      return eventMetadata(record, config);
    case "articles":
      return articleMetadata(record, config);
    default:
      return null;
  }
};
