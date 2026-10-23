import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft, HiArrowLongRight, HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import { useCarousel } from "@/shared/hooks/useCarousel";
import Section from "@/features/home/components/ui/Section";
import { fallbackPhoto, handlePhotoError } from "../data/campusPhotos";

const MAX_UNIVERSITIES = 10;

const arrowClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-primary";

/** "80", "#80" and "QS #80" all read as "Ranking #80". */
const formatRanking = (ranking) => {
  const value = String(ranking || "").trim();
  if (!value) return null;
  return /^#?\d+$/.test(value) ? `Ranking #${value.replace("#", "")}` : value;
};

/** "Southampton" → "Southampton, United Kingdom"; leaves full addresses alone. */
const formatLocation = (location, country) => {
  if (!location) return country;
  return location.toLowerCase().includes(country.toLowerCase())
    ? location
    : `${location}, ${country}`;
};

/**
 * The whole card links to the university page through the name's stretched
 * overlay, while "Apply now" sits above that overlay as its own button and
 * opens counselling, so the two actions never nest.
 */
const UniversityCard = ({ university, image, country, onApply }) => {
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

/**
 * "Top universities" carousel: this destination's universities as photo cards
 * on a scroll-snap strip, with a link to the full filtered list and arrow
 * controls underneath. `universities` arrives already filtered.
 */
const DestinationUniversities = ({ destination, guide, universities, onApply }) => {
  const { trackRef, atStart, atEnd, scrollByCard } = useCarousel();
  const name = destination.name;
  const items = universities.slice(0, MAX_UNIVERSITIES);

  if (items.length === 0) return null;

  return (
    <Section id="universities" tone="light">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Top Universities
        </p>
        <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Top Universities in {name}
        </h2>
      </Reveal>

      <Reveal className="mt-10 lg:mt-14">
        <ul
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {items.map((university, index) => (
            <UniversityCard
              key={university._id}
              university={university}
              image={university.heroImage || fallbackPhoto(guide, index)}
              country={name}
              onApply={onApply}
            />
          ))}
        </ul>

        {/* On phones only the arrows show, centred; the call to action
            joins them from `sm` up. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <Link
            to={`/universities?destination=${encodeURIComponent(name)}`}
            className="group hidden items-center sm:inline-flex gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RollText>Find Your Dream University</RollText>
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
              <RollIcon icon={HiArrowRight} />
            </span>
          </Link>

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
        </div>
      </Reveal>
    </Section>
  );
};

export default DestinationUniversities;
