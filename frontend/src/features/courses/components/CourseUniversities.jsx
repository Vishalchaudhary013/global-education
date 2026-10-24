import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import { useCarousel } from "@/shared/hooks/useCarousel";
import Section from "@/features/home/components/ui/Section";
import UniversityPhotoCard from "@/features/destinations/components/UniversityPhotoCard";
import { CAMPUS_PHOTOS } from "@/features/destinations/data/campusPhotos";
import { useCourseUniversities } from "../hooks/useCourseUniversities";

const arrowClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-primary";

/**
 * Short name for the heading: a bracketed abbreviation when the name has one
 * ("Master of Business Administration (MBA)" → "MBA"), else the full name.
 */
const shortName = (name) =>
  name.match(/\(([A-Z][A-Za-z.]{1,9})\)/)?.[1] || name;

/**
 * "Universities offering {course}" carousel, built like the destination
 * page's top-universities strip and using the same photo card, each card
 * naming the course that university runs. When no other university runs the
 * programme itself, it lists same-subject courses and says "similar".
 * Hidden until loaded, and when nothing matches.
 */
const CourseUniversities = ({ course, onApply }) => {
  const { offerings, similar, subject, loading } = useCourseUniversities(course);

  if (loading || offerings.length === 0) return null;

  const title = similar
    ? `Universities offering similar ${subject ? `${subject} ` : ""}courses`
    : `Universities offering ${shortName(course.name)}`;

  // Mounted only once there are cards: `useCarousel` binds its scroll
  // listener on mount, so the strip must already be in the DOM.
  return (
    <UniversitiesCarousel
      title={title}
      offerings={offerings}
      onApply={onApply}
    />
  );
};

const UniversitiesCarousel = ({ title, offerings, onApply }) => {
  const { trackRef, atStart, atEnd, canScroll, scrollByCard } = useCarousel();

  return (
    <Section id="universities" tone="light">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Universities
        </p>
        <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>

      <Reveal className="mt-10 lg:mt-14">
        <ul
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {offerings.map(({ university, course }, index) => (
            <UniversityPhotoCard
              key={university._id}
              university={university}
              course={course}
              image={
                university.heroImage ||
                CAMPUS_PHOTOS[index % CAMPUS_PHOTOS.length]
              }
              country={university.destination}
              onApply={onApply}
            />
          ))}
        </ul>

        {/* On phones only the arrows show, centred; the call to action
            joins them from `sm` up. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <Link
            to="/universities"
            className="group hidden items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex"
          >
            <RollText>Explore All Universities</RollText>
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
              <RollIcon icon={HiArrowRight} />
            </span>
          </Link>

          {/* Arrows only while some cards are out of view. */}
          {canScroll && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label="Previous universities"
                className={arrowClass}
              >
                <HiArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label="Next universities"
                className={arrowClass}
              >
                <HiArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
};

export default CourseUniversities;
