import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { Container } from "./ui/Section";
import { ABOUT_POINTS, ABOUT_STRIP } from "../data/homeContent";

/**
 * Full-bleed brand band introducing the company.
 *
 * Centred heading and call to action, a row of short proof points, then three
 * photographs that break out of the band's bottom edge so the section hands
 * over to the next one instead of stopping dead.
 *
 * Only the first four proof points are shown; the list is kept short so the
 * row stays on one line at desktop width.
 */
const About = ({ openModal }) => (
  <section id="about" className="relative overflow-hidden bg-[#F4FAFF] pt-20 sm:pt-28">
    <Container className="relative">
      <Reveal y={24} className="mx-auto max-w-3xl text-center">
        <p className="mb-5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-secondary" />
          About Us
        </p>

        <h2 className=" text-xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-2xl lg:text-[33.5px]">
          Behind Every Student's Journey Is a Team Dedicated to Making Study
          Abroad Simple and Rewarding.
        </h2>

        <button
          type="button"
          onClick={openModal}
          className="group mt-9 inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          More About Us
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </Reveal>

      <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {ABOUT_POINTS.slice(0, 3).map((point, index) => (
          <Reveal
            as="li"
            key={point}
            delay={120 + index * 90}
            y={16}
            className="flex items-center gap-2.5 text-sm font-bold text-primary sm:text-base"
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-secondary"
            />
            {point}
          </Reveal>
        ))}
      </ul>
    </Container>

    {/*
      Photo row closing the band. The tiles are rounded on all four corners and
      the section carries its own bottom padding, so they read as finished
      cards rather than photographs cut off by the edge of the section.
    */}
    <Container className="relative mt-14 pb-20 sm:mt-16 sm:pb-28">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {ABOUT_STRIP.map((photo, index) => (
          <Reveal
            as="li"
            key={photo.src}
            delay={index * 100}
            y={32}
            className="overflow-hidden rounded-[1.5rem]"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:scale-[1.04] sm:h-56 lg:h-64"
            />
          </Reveal>
        ))}
      </ul>
    </Container>
  </section>
);

export default About;
