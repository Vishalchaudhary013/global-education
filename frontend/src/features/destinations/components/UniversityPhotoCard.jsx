import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { handlePhotoError } from "../data/campusPhotos";

/** "80", "#80" and "QS #80" all read as "Ranking #80". */
const formatRanking = (ranking) => {
  const value = String(ranking || "").trim();
  if (!value) return null;
  return /^#?\d+$/.test(value) ? `Ranking #${value.replace("#", "")}` : value;
};

/** "Southampton" → "Southampton, United Kingdom"; leaves full addresses alone. */
const formatLocation = (location, country) => {
  if (!location) return country;
  if (!country) return location;
  return location.toLowerCase().includes(country.toLowerCase())
    ? location
    : `${location}, ${country}`;
};

/**
 * Photo card for a university carousel (destination page, course page).
 *
 * The whole card links to the university page through the name's stretched
 * overlay, while "Apply now" sits above that overlay as its own button and
 * opens counselling, so the two actions never nest. Renders its own `<li>`,
 * sized for a scroll-snap strip.
 *
 * With `course`, the card also names that course and links to its page (the
 * course page's "universities offering" strip); like Apply now, the link sits
 * above the overlay.
 */
const UniversityPhotoCard = ({ university, course, image, country, onApply }) => {
  const ranking = formatRanking(university.ranking);

  return (
    <li className="w-[16.5rem] shrink-0 snap-start sm:w-[18.5rem] lg:w-[19.5rem]">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-white">
        <div className="relative h-40 overflow-hidden bg-slate-100">
          <img
            src={image}
            onError={handlePhotoError}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
          />
          {ranking && (
            <span className="absolute left-3 top-3 rounded-sm bg-white px-3 py-1 text-xs font-semibold text-primary">
              {ranking}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col bg-slate-50 p-5">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary">
            <Link
              to={`/universities/${university._id}`}
              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-secondary"
            >
              {university.name}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-1 text-xs text-slate-500">
            {formatLocation(university.location, country)}
          </p>

          {course && (
            <p className="mt-3 line-clamp-2 text-sm leading-snug text-primary">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Course:{" "}
              </span>
              <Link
                to={`/courses/${course._id}`}
                className="relative z-10 font-semibold transition-colors duration-300 hover:text-secondary"
              >
                {course.name}
              </Link>
            </p>
          )}

          {university.ieltsRequirement && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Min. IELTS required{" "}
              <span className="ml-1 text-sm font-bold text-primary">
                {university.ieltsRequirement}
              </span>
            </p>
          )}

          <button
            type="button"
            onClick={onApply}
            className="relative z-10 mt-auto flex items-center justify-between pt-4 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:text-secondary"
          >
            Apply Now
            <HiArrowLongRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </article>
    </li>
  );
};

export default UniversityPhotoCard;
