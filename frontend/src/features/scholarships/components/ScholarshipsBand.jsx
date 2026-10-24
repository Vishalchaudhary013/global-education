import React from "react";
import { Link } from "react-router-dom";
import {
  HiArrowLongRight,
  HiArrowRight,
  HiBuildingLibrary,
  HiCalendarDays,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import Section from "@/features/home/components/ui/Section";

const formatDeadline = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Varies";

const detailsClass =
  "mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:text-secondary";

/**
 * "View details" for every row: a scholarship record opens its own page, a
 * bundled scholarship opens its official site in a new tab, and anything
 * else opens the filtered scholarships list (`fallbackHref`).
 */
const DetailsLink = ({ scholarship, fallbackHref }) => {
  const label = (
    <>
      View details
      <HiArrowLongRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  if (scholarship.linked) {
    return (
      <Link to={`/scholarships/${scholarship._id}`} className={detailsClass}>
        {label}
      </Link>
    );
  }

  if (scholarship.link) {
    return (
      <a
        href={scholarship.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View details for ${scholarship.name} (opens in a new tab)`}
        className={detailsClass}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={fallbackHref} className={detailsClass}>
      {label}
    </Link>
  );
};

/** Pill link to the scholarships list. */
const ViewAllLink = ({ href, className = "" }) => (
  <Link
    to={href}
    className={`group items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
  >
    <RollText>View All Scholarships</RollText>
    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
      <RollIcon icon={HiArrowRight} />
    </span>
  </Link>
);

/**
 * Scholarships band, laid out like the "Why" section: heading and intro on
 * the left that stay in view on desktop, beside a ruled list of scholarships
 * on the right that rise in one by one. Used by the destination and course
 * pages, which each build their own `items`.
 *
 * Items with `linked` are the site's scholarship records and link to their
 * pages; others are bundled entries with an official `link`.
 */
const ScholarshipsBand = ({ title, intro, items, viewAllHref }) => {
  if (items.length === 0) return null;

  return (
    <Section id="scholarships" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            Scholarships
          </p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {intro}
          </p>
          <ViewAllLink href={viewAllHref} className="mt-9 hidden sm:inline-flex" />
        </Reveal>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((schol) => (
            <Reveal
              as="li"
              key={schol._id || schol.name}
              y={40}
              className="group flex gap-5 py-7 sm:gap-6 sm:py-8"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <h3 className="text-xl font-bold leading-snug text-primary sm:text-2xl">
                    {schol.linked ? (
                      <Link
                        to={`/scholarships/${schol._id}`}
                        className="transition-colors hover:text-secondary"
                      >
                        {schol.name}
                      </Link>
                    ) : (
                      schol.name
                    )}
                  </h3>
                  {schol.amount && (
                    <span className="shrink-0 rounded-sm bg-secondary/10 px-2.5 py-1 text-sm font-bold text-secondary">
                      {schol.amount}
                    </span>
                  )}
                </div>

                <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <HiBuildingLibrary className="h-4 w-4 shrink-0" />
                    {schol.university?.name ||
                      schol.provider ||
                      "Multiple universities"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <HiCalendarDays className="h-4 w-4 shrink-0" />
                    Deadline: {formatDeadline(schol.deadline)}
                  </span>
                </p>

                {(schol.eligibility || schol.criteria) && (
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {schol.eligibility || schol.criteria}
                  </p>
                )}

                <DetailsLink scholarship={schol} fallbackHref={viewAllHref} />
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Phones: the button sits under the list instead of above it. */}
        <div className="flex justify-center sm:hidden">
          <ViewAllLink href={viewAllHref} className="inline-flex" />
        </div>
      </div>
    </Section>
  );
};

export default ScholarshipsBand;
