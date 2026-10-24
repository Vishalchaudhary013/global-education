import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft, HiArrowLongRight, HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import { useCarousel } from "@/shared/hooks/useCarousel";
import Section from "@/features/home/components/ui/Section";
import {
  CAMPUS_PHOTOS,
  handlePhotoError,
} from "@/features/destinations/data/campusPhotos";

const LEVEL_LABELS = {
  UG: "Bachelor's",
  PG: "Master's",
  Diploma: "Diploma",
};

const levelLabel = (type) => LEVEL_LABELS[type] || type;

const arrowClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-primary";

const cardWidth = "w-[16.5rem] shrink-0 snap-start sm:w-[18.5rem] lg:w-[19.5rem]";

const cardClass =
  "group flex h-full w-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

/**
 * Photo on top, then the university, the course name, "duration | level" and
 * a View Details row. Real courses link to their page; samples open the
 * counselling form through `onPlaceholderClick`.
 */
const CourseCard = ({ course, universityName, image, onPlaceholderClick }) => {
  const meta = [course.duration, levelLabel(course.type)]
    .filter(Boolean)
    .join(" | ");

  const body = (
    <>
      <div className="h-40 overflow-hidden bg-slate-100">
        <img
          src={image}
          onError={handlePhotoError}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-1 flex-col bg-slate-50 p-5">
        <p className="line-clamp-1 text-xs font-medium text-slate-600">
          {course.university?.name || universityName}
        </p>

        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary">
          {course.name}
        </h3>

        {meta && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {meta}
          </p>
        )}

        <span className="mt-auto flex items-center justify-between pt-4 text-sm font-bold uppercase tracking-wide text-primary">
          View Details
          <HiArrowLongRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-secondary" />
        </span>
      </div>
    </>
  );

  return (
    <li className={cardWidth}>
      {course.placeholder ? (
        <button type="button" onClick={onPlaceholderClick} className={cardClass}>
          {body}
        </button>
      ) : (
        <Link to={`/courses/${course._id}`} className={cardClass}>
          {body}
        </Link>
      )}
    </li>
  );
};

const SkeletonCard = () => (
  <li className={`${cardWidth} animate-pulse`} aria-hidden="true">
    <div className="h-40 rounded-t-sm bg-slate-200" />
    <div className="space-y-3 rounded-b-sm bg-slate-50 p-5">
      <div className="h-4 w-4/5 rounded-sm bg-slate-200" />
      <div className="h-4 w-3/5 rounded-sm bg-slate-200" />
      <div className="h-3 w-1/3 rounded-sm bg-slate-200" />
    </div>
  </li>
);

/**
 * "Courses at {university}" carousel, in the style of the destination page's
 * top-courses strip. `courses` arrives already narrowed to this university
 * (see `useUniversityCourses`).
 */
const UniversityCourses = ({ university, courses: visible, loading, onFindFit }) => {
  const { name } = university;
  const { trackRef, atStart, atEnd, canScroll, scrollByCard } = useCarousel();

  // Cards arrive after the carousel first measured an empty strip: let it
  // re-check which arrows are live once they are in.
  useEffect(() => {
    trackRef.current?.dispatchEvent(new Event("scroll"));
  }, [trackRef, visible.length]);

  return (
    <Section id="courses" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            Courses
          </p>
          <h2 className="text-balance text-2xl font-extrabold  tracking-tight text-primary sm:text-3xl lg:text-4xl">
            Courses at {name}
          </h2>
          
        </Reveal>

        
      </div>

      <Reveal className="mt-10 lg:mt-14">
        <ul
          ref={trackRef}
          aria-busy={loading}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <SkeletonCard key={index} />
              ))
            : visible.map((course, index) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  universityName={name}
                  image={CAMPUS_PHOTOS[index % CAMPUS_PHOTOS.length]}
                  onPlaceholderClick={onFindFit}
                />
              ))}
        </ul>

        {/* On phones only the arrows show, centred; the call to action
            joins them from `sm` up. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <FindFitButton
            onClick={onFindFit}
            label="Find Your Best Fit"
            className="hidden sm:inline-flex"
          />

          {/* Arrows only while some cards are out of view. */}
          {canScroll && (
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
          )}
        </div>
      </Reveal>
    </Section>
  );
};

const FindFitButton = ({ onClick, label, className = "inline-flex" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group ${className} shrink-0 items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
  >
    <RollText>{label}</RollText>
    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
      <RollIcon icon={HiArrowRight} />
    </span>
  </button>
);

export default UniversityCourses;
