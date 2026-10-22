import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineMapPin } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import RevealImage from "@/shared/components/RevealImage";
import Section from "./ui/Section";
import ViewAllLink from "./ui/ViewAllLink";
import { EVENT_IMAGES, EVENT_MODE_LABELS } from "../data/homeContent";

/**
 * Upcoming events from `/api/events`, via `useHomeData`.
 *
 * Two columns: the heading sticks to the viewport on the left while the cards
 * scroll past on the right. Below `lg` the heading simply sits above the list.
 *
 * Renders nothing when the API returns no events, so a fresh database leaves a
 * clean page rather than an empty titled band. Every field is treated as
 * optional, since the Event schema only requires name, mode and date.
 */
const formatWindow = (event) => {
  if (!event.date) return "";
  const date = new Date(event.date);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return event.time ? `${day}, ${event.time}` : day;
};

const EventCard = ({ event, index }) => {
  const when = formatWindow(event);
  // Prefer a real photograph from the record; fall back to the curated set,
  // since the Event schema only carries a logo today.
  const photo = event.image || EVENT_IMAGES[index % EVENT_IMAGES.length];
  const place =
    event.mode === "online"
      ? "Virtual / Online"
      : [event.venue, event.location].filter(Boolean).join(", ");

  return (
    <Reveal className="h-full">
      <Link
        to={`/events/${event._id}`}
        className="group block h-full rounded-[1.5rem] border border-slate-200 bg-white p-4 transition-colors duration-500 ease-out-cubic sm:p-5"
      >
        <RevealImage className="relative overflow-hidden rounded-xl bg-primary/5">
          <img
            src={photo}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-52 w-full object-cover sm:h-64"
          />

          {when && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary">
              {when}
            </span>
          )}
        </RevealImage>

        <div className="pt-4 ">
          {event.mode && (
            <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary mb-2">
              {EVENT_MODE_LABELS[event.mode] || event.mode}
            </span>
          )}

          <h3 className="mt-3 text-pretty text-lg font-bold leading-3 tracking-tight text-primary transition-colors duration-300 ">
            {event.name}
          </h3>

          {place && (
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
              <HiOutlineMapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <span>{place}</span>
            </p>
          )}

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-transform duration-300 ease-out-cubic group-hover:translate-x-2">
            View Details
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
};

const UpcomingEvents = ({ events = [] }) => {
  const upcoming = events.slice(0, 4);
  if (!upcoming.length) return null;

  return (
    // `overflow-x-clip` hides the side-entering columns before they arrive
    // without creating a scroll container, which would break the sticky heading.
    <Section tone="light" id="events" className="overflow-x-clip">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal x={-100} y={0} className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            Events
          </p>

          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Upcoming Events & Your Path to Global Education
          </h2>

          <p className="mt-5 max-w-md text-md leading-relaxed text-slate-600">
            Education fairs, webinars and assessment days where you can meet
            admissions teams and get a decision on the spot.
          </p>

          {/* On phones the link moves below the swipe row instead. */}
          <div className="mt-8 hidden sm:block">
            <ViewAllLink to="/events">View All Events</ViewAllLink>
          </div>
        </Reveal>

        {/* A swipe row on phones, a stacked list from `sm` up. `min-w-0` stops
            the row's full scroll width from stretching the grid column. */}
        <div className="min-w-0">
          <Reveal x={100} y={0} className="mobile-track sm:space-y-6">
            {upcoming.map((event, index) => (
              <EventCard key={event._id} event={event} index={index} />
            ))}
          </Reveal>

          <div className="mt-8 flex justify-center sm:hidden">
            <ViewAllLink to="/events">View All Events</ViewAllLink>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default UpcomingEvents;
