import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { useCarousel } from "@/shared/hooks/useCarousel";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { DESTINATIONS } from "../data/homeContent";

/**
 * Destination carousel.
 *
 * Built on native scroll snapping rather than a transformed track: the strip
 * stays swipeable on touch, keyboard-scrollable, and correct at any card width
 * without measuring anything. The arrows scroll by one card's width, and they
 * disable themselves at each end so they never look live when they are not.
 *
 * Taglines and university counts come from `destinationGuides`, the same data
 * the destination detail pages render, so the figures cannot drift from the
 * pages these cards link to.
 */

const DestinationCard = ({ destination, index }) => (
  <li className="w-[17rem] shrink-0 snap-start sm:w-[20rem] lg:w-[23rem]">
    <Link
      to={`/destinations/${destination.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 inline-flex w-fit items-center rounded-full border border-slate-200 px-3.5 py-1 text-xs font-bold tracking-wider text-slate-400">
          {String(index + 1).padStart(3, "0")}
        </span>

        <h3 className="text-2xl font-extrabold tracking-tight text-primary transition-colors duration-300 group-hover:text-secondary">
          {destination.name}
        </h3>

        {destination.tagline && (
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
            {destination.tagline}
          </p>
        )}

        <span className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-secondary transition-transform duration-300 ease-out-cubic group-hover:translate-x-2">
          Read More
          <HiArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      {/* The photo sits at a slight angle and is clipped by the card, which
          is what gives the row its editorial feel rather than a plain thumb. */}
      <div className="relative h-36 overflow-hidden sm:h-40">
        <img
          src={destination.image}
          alt={`Studying in ${destination.name}`}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          className="absolute -right-6 bottom-[-1.5rem] h-44 w-[85%] rotate-[-7deg] rounded-[1.1rem] object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:rotate-[-4deg] group-hover:scale-[1.04] sm:h-48"
        />
      </div>
    </Link>
  </li>
);

const arrowClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-primary";

const Destinations = () => {
  const { trackRef, atStart, atEnd, canScroll, scrollByCard } = useCarousel();

  return (
    <Section tone="light" id="destinations">
      <SectionHeading
        eyebrow="Top Destinations"
        title="Discover Your Ideal Study Destination"
      />

      <Reveal className="mt-12 lg:mt-16">
        <ul
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {DESTINATIONS.map((destination, index) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
              index={index}
            />
          ))}
        </ul>

        {/* Arrows only while some cards are out of view. */}
        {canScroll && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous destinations"
              className={arrowClass}
            >
              <HiArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Next destinations"
              className={arrowClass}
            >
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </Reveal>
    </Section>
  );
};

export default Destinations;
