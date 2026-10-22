import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import Section from "./ui/Section";
import { TESTIMONIALS } from "../data/homeContent";

/**
 * Student testimonials on a bento grid, with the section heading occupying the
 * first cell rather than sitting above the block.
 *
 * There is no `/api/reviews` route yet although a `Review` model exists on the
 * server; the field names here already match that model, so this becomes a
 * service call without touching the markup.
 */
const Avatar = ({ name }) => (
  <img
    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=1F2853&color=fff&bold=true`}
    alt=""
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className="h-11 w-11 shrink-0 rounded-full"
  />
);

const TestimonialCard = ({ item, index }) => (
  <Reveal delay={index * 80} y={26} className="h-full">
    <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-5 font-sans text-[6rem] leading-none text-primary/5"
      >
        &rdquo;
      </span>

      <blockquote className="relative text-base leading-relaxed text-primary sm:text-lg">
        &ldquo;{item.reviewText}&rdquo;
      </blockquote>

      <figcaption className="relative mt-7 flex items-center gap-3">
        <Avatar name={item.studentName} />
        <div className="min-w-0">
          <p className="font-bold text-primary">— {item.studentName}</p>
          <p className="truncate text-sm text-slate-500">
            {item.university}
            {item.destination ? ` · ${item.destination}` : ""}
          </p>
        </div>
      </figcaption>
    </figure>
  </Reveal>
);

const Reviews = ({ openModal }) => (
  <Section tone="light" id="testimonials">
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Heading occupies the first cell of the grid. */}
      <Reveal y={22} className="flex flex-col justify-center lg:pr-8">
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Testimonial
        </p>

        <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Students Feedback
        </h2>

        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
          Offers, scholarships and visas, in the words of the students who got
          them.
        </p>

        {/* <button
          type="button"
          onClick={openModal}
          className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Book a Consultation
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button> */}
      </Reveal>

      {TESTIMONIALS.map((item, index) => (
        <TestimonialCard key={item.studentName} item={item} index={index} />
      ))}
    </div>
  </Section>
);

export default Reviews;
