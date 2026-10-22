import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import RevealImage from "@/shared/components/RevealImage";
import { RollIcon, RollText } from "@/shared/components/Roll";
import { Container } from "./ui/Section";
import { HERO_COLLAGE } from "../data/homeContent";

/**
 * Centred hero: headline, supporting line, one call to action, then a collage
 * of student photos sitting at staggered vertical offsets beneath it.
 *
 * The copy block rises in as one unit, and each photo zooms out inside its
 * frame as it enters the viewport — the same reveals the rest of the page
 * uses, so both are inert under `prefers-reduced-motion`.
 */
const Hero = ({ openModal }) => (
  <section className="relative overflow-hidden bg-[#F4FAFF] pb-14 pt-14 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-24">
    {/* Faint diagonal wash, the quiet texture the band needs to not read flat. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-white/50 blur-3xl"
    />

    <Container className="relative">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-[4rem]">
          Unlock Your Global Future Through World-Class Education.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-6 text-slate-600 sm:text-lg">
          Global Education helps you explore top study destinations, offering
          diverse programmes, scholarships and unforgettable student
          experiences.
        </p>

        <div className="mt-9">
          <button
            type="button"
            onClick={openModal}
            className="group inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RollText>Book Free Counselling</RollText>
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
              <RollIcon icon={HiArrowRight} />
            </span>
          </button>
        </div>
      </Reveal>

      {/* Photo collage: every tile is the same size, staggered across two rows
          so the band reads as a mosaic rather than an even filmstrip. Hidden on
          phones, where it only pushes the search card further down. */}
      <ul className="mt-14 hidden grid-cols-2 sm:grid gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[11rem_11rem] lg:gap-x-5 lg:gap-y-6">
        {HERO_COLLAGE.map((photo, index) => (
          <li
            key={photo.src}
            className={`h-40 sm:h-44 lg:col-span-3 lg:h-44 ${photo.cell}`}
          >
            <RevealImage className="h-full overflow-hidden rounded-[1.25rem]">
              <img
                src={photo.src}
                alt={photo.alt}
                width="600"
                height="700"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:scale-[1.05]"
              />
            </RevealImage>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);

export default Hero;
