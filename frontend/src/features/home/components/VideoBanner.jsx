import React from "react";
import { HiPlay } from "react-icons/hi2";
import RevealImage from "@/shared/components/RevealImage";
import { Container } from "./ui/Section";
import { VIDEO_BANNER } from "../data/homeContent";

/**
 * Wide banner closing the process section.
 *
 * The play control opens the counselling modal rather than an embedded video:
 * there is no video asset in the project, and sending the click somewhere real
 * is better than a button that does nothing. Swap `onClick` for a player when
 * the footage exists.
 */
const VideoBanner = ({ openModal }) => (
  <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
    <Container>
      <RevealImage className="group relative overflow-hidden rounded-[2rem] bg-primary">
          <img
            src={VIDEO_BANNER.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-64 w-full object-cover opacity-70 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04] sm:h-80 lg:h-[26rem]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-primary/10"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-white transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-20 sm:w-20"
              aria-label="Book a counselling session"
            >
              <HiPlay className="ml-0.5 h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </button>

            <p className="max-w-md text-balance text-lg font-bold tracking-tight text-white sm:text-2xl">
              {VIDEO_BANNER.caption}
            </p>
          </div>
      </RevealImage>
    </Container>
  </section>
);

export default VideoBanner;
