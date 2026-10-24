import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowLongRight,
  HiArrowRight,
  HiAcademicCap,
  HiCalendarDays,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import Section from "@/features/home/components/ui/Section";
import { useScholarships } from "@/features/scholarships/hooks/useScholarships";

const MIN_SCHOLARSHIPS = 4;

/** Next occurrence of a day/month, so sample deadlines never read as past. */
const nextDate = (month, day) => {
  const today = new Date();
  const date = new Date(today.getFullYear(), month - 1, day);
  if (date < today) date.setFullYear(date.getFullYear() + 1);
  return date.toISOString();
};

/**
 * TEMPORARY sample awards that top the list up to `MIN_SCHOLARSHIPS` while
 * few scholarships are linked to universities. They have no detail page, so
 * "View details" opens the counselling form. Remove once real scholarships
 * are linked to every university.
 */
const placeholderScholarships = (name) =>
  [
    {
      name: `${name} International Merit Scholarship`,
      amount: "Up to 50% tuition",
      level: "Undergraduate & Postgraduate",
      deadline: nextDate(3, 31),
      eligibility:
        "For international students with an outstanding academic record, assessed automatically with your application.",
    },
    {
      name: "Vice-Chancellor's Global Excellence Award",
      amount: "Full tuition waiver",
      level: "Undergraduate",
      deadline: nextDate(1, 15),
      eligibility:
        "Awarded to exceptional applicants who show academic excellence, leadership and community involvement.",
    },
    {
      name: "Postgraduate Research Scholarship",
      amount: "Tuition + living stipend",
      level: "Postgraduate research",
      deadline: nextDate(6, 30),
      eligibility:
        "Supports high-achieving research students; requires a strong research proposal and supervisor endorsement.",
    },
    {
      name: "Early Acceptance Tuition Discount",
      amount: "10% tuition discount",
      level: "All levels",
      deadline: nextDate(5, 1),
      eligibility:
        "For international students who accept their offer and pay the deposit before the early acceptance date.",
    },
  ].map((scholarship, index) => ({
    ...scholarship,
    _id: `placeholder-${index}`,
    placeholder: true,
  }));

/** A scholarship's university arrives populated (an object) or as a bare id. */
const universityIdOf = (scholarship) =>
  String(scholarship.university?._id ?? scholarship.university ?? "");

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

const detailsLabel = (
  <>
    View details
    <HiArrowLongRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
  </>
);

/** Pill link to the full scholarships list, filtered to the university's country. */
const ViewAllLink = ({ destination, className = "" }) => (
  <Link
    to={`/scholarships${destination ? `?destination=${encodeURIComponent(destination)}` : ""}`}
    className={`group items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
  >
    <RollText>View All Scholarships</RollText>
    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
      <RollIcon icon={HiArrowRight} />
    </span>
  </Link>
);

/**
 * Scholarships band for a university, laid out like the destination page's:
 * heading and intro on the left that stay in view on desktop, beside a ruled
 * list of awards on the right.
 *
 * Lists only scholarships linked to this university (not every scholarship in
 * its country). They are requested with `?university=` and also filtered
 * here, so the list stays correct against an API that ignores the parameter.
 */
const UniversityScholarships = ({ university, onEnquire }) => {
  const { _id: universityId, name, destination } = university;
  const { scholarships, loading } = useScholarships({ university: universityId });

  const items = useMemo(() => {
    const own = scholarships.filter(
      (scholarship) => universityIdOf(scholarship) === String(universityId),
    );
    const taken = new Set(own.map((scholarship) => scholarship.name?.toLowerCase()));
    const extras = placeholderScholarships(name)
      .filter((scholarship) => !taken.has(scholarship.name.toLowerCase()))
      .slice(0, Math.max(0, MIN_SCHOLARSHIPS - own.length));
    return [...own, ...extras];
  }, [scholarships, universityId, name]);

  if (loading) return null;

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
          <h2 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Scholarships at {name}
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Funding offered by {name} to international students, from merit
            awards to tuition discounts.
          </p>
          <ViewAllLink destination={destination} className="mt-9 hidden sm:inline-flex" />
        </Reveal>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((scholarship) => (
            <Reveal
              as="li"
              key={scholarship._id}
              y={40}
              className="group flex gap-5 py-7 sm:gap-6 sm:py-8"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <h3 className="text-xl font-bold leading-snug text-primary sm:text-2xl">
                    {scholarship.placeholder ? (
                      scholarship.name
                    ) : (
                      <Link
                        to={`/scholarships/${scholarship._id}`}
                        className="transition-colors hover:text-secondary"
                      >
                        {scholarship.name}
                      </Link>
                    )}
                  </h3>
                  {scholarship.amount && (
                    <span className="shrink-0 rounded-sm bg-secondary/10 px-2.5 py-1 text-sm font-bold text-secondary">
                      {scholarship.amount}
                    </span>
                  )}
                </div>

                <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-500">
                  {scholarship.level && (
                    <span className="inline-flex items-center gap-1.5">
                      <HiAcademicCap className="h-4 w-4 shrink-0" />
                      {scholarship.level}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <HiCalendarDays className="h-4 w-4 shrink-0" />
                    Deadline: {formatDeadline(scholarship.deadline)}
                  </span>
                </p>

                {scholarship.eligibility && (
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {scholarship.eligibility}
                  </p>
                )}

                {scholarship.placeholder ? (
                  <button type="button" onClick={onEnquire} className={detailsClass}>
                    {detailsLabel}
                  </button>
                ) : (
                  <Link to={`/scholarships/${scholarship._id}`} className={detailsClass}>
                    {detailsLabel}
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Phones: the button sits under the list instead of above it. */}
        <div className="flex justify-center sm:hidden">
          <ViewAllLink destination={destination} className="inline-flex" />
        </div>
      </div>
    </Section>
  );
};

export default UniversityScholarships;
