import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft, HiArrowLongRight, HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import { useCarousel } from "@/shared/hooks/useCarousel";
import Section from "@/features/home/components/ui/Section";
import { fallbackPhoto, handlePhotoError } from "../data/campusPhotos";

const MAX_COURSES = 10;

const LEVEL_LABELS = {
  UG: "Bachelor's",
  PG: "Master's",
  Diploma: "Diploma",
};

const arrowClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-primary";

const CourseCard = ({ course, image, countryCode }) => {
  const meta = [course.duration, LEVEL_LABELS[course.type] || course.type]
    .filter(Boolean)
    .join(" | ");

  return (
    <li className="w-[16.5rem] shrink-0 snap-start sm:w-[18.5rem] lg:w-[19.5rem]">
      <Link
        to={`/courses/${course._id}`}
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        <div className="h-40 overflow-hidden bg-slate-100">
          <img
            src={image}
            onError={handlePhotoError}
            alt={course.university?.name || ""}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>

        <div className="flex flex-1 flex-col bg-slate-50 p-5">
          <p className="flex items-start justify-between gap-3 text-xs font-medium text-slate-600">
            <span className="line-clamp-1">
              {course.university?.name || "Top university"}
            </span>
            {/* {countryCode && (
              <span className="shrink-0 font-bold text-primary">
                {countryCode}
              </span>
            )} */}
          </p>

          <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary">
            {course.name}
          </h3>

          {meta && (
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {meta}
            </p>
          )}

          <span className="mt-4 flex items-center justify-between text-sm font-bold uppercase tracking-wide text-primary">
            View Details
            <HiArrowLongRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-secondary" />
          </span>
        </div>
      </Link>
    </li>
  );
};

/**
 * "Top courses" carousel: this destination's courses as photo cards on a
 * scroll-snap strip, with a counselling call to action and arrow controls
 * underneath. `courses` arrives already filtered to the destination.
 */
const DestinationCourses = ({ destination, guide, courses, onFindFit }) => {
  const { trackRef, atStart, atEnd, scrollByCard } = useCarousel();
  const name = destination.name;
  const items = courses.slice(0, MAX_COURSES);

  if (items.length === 0) return null;

  const photoFor = (course, index) =>
    course.university?.heroImage || fallbackPhoto(guide, index);
  const countryCode = guide.flagCode?.toUpperCase();

  return (
    <Section id="courses">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Top Courses
        </p>
        <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Top Courses to Study in {name}
        </h2>
      </Reveal>

      <Reveal className="mt-10 lg:mt-14">
        <ul
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {items.map((course, index) => (
            <CourseCard
              key={course._id}
              course={course}
              image={photoFor(course, index)}
              countryCode={countryCode}
            />
          ))}
        </ul>

        {/* On phones only the arrows show, centred; the call to action
            joins them from `sm` up. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <button
            type="button"
            onClick={onFindFit}
            className="group hidden items-center sm:inline-flex gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RollText>Find Your Best Fit</RollText>
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
              <RollIcon icon={HiArrowRight} />
            </span>
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous courses"
              className={arrowClass}
            >
              <HiArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Next courses"
              className={arrowClass}
            >
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
};

export default DestinationCourses;
