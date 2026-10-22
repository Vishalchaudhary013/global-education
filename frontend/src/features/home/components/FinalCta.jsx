import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { CTA_FACES } from "../data/homeContent";

/**
 * Closing call to action.
 *
 * A field of circular student portraits scattered across the top of an inset
 * brand panel, with the headline and button sitting in the clear lower half.
 *
 * Positions are percentages so the scatter keeps its shape as the panel grows,
 * and the sizes are deliberately uneven: a grid of equal circles reads as a
 * pattern rather than a crowd. Every entry differs, since two with the same
 * offsets would stack exactly and look like nothing had been added.
 *
 * There are more positions than photographs, so the face list is cycled.
 */
const FACES = [
  { pos: "left-[5%] top-[16%]", size: "h-20 w-20 lg:h-28 lg:w-28" },
  { pos: "left-[17%] top-[4%]", size: "h-28 w-28 lg:h-36 lg:w-36" },
  { pos: "left-[33%] top-[9%]", size: "h-24 w-24 lg:h-28 lg:w-28" },
  { pos: "left-[57%] top-[6%]", size: "h-24 w-24 lg:h-32 lg:w-32" },
  { pos: "left-[73%] top-[13%]", size: "h-24 w-24 lg:h-28 lg:w-28" },
  { pos: "left-[89%] top-[11%]", size: "h-24 w-24 lg:h-28 lg:w-28" },
  { pos: "left-[4%] top-[46%]", size: "h-28 w-28 lg:h-36 lg:w-36" },
  { pos: "left-[20%] top-[42%]", size: "h-20 w-20 lg:h-24 lg:w-24" },
  { pos: "left-[37%] top-[34%]", size: "h-24 w-24 lg:h-28 lg:w-28" },
  { pos: "left-[51%] top-[38%]", size: "h-28 w-28 lg:h-36 lg:w-36" },
  { pos: "left-[66%] top-[44%]", size: "h-20 w-20 lg:h-24 lg:w-24" },
  { pos: "left-[79%] top-[40%]", size: "h-28 w-28 lg:h-32 lg:w-32" },
];

const FinalCta = ({ openModal }) => (
  <section className="bg-white px-5 pb-10 sm:px-8 sm:pb-18 lg:px-12">
    {/* Inset panel: it stops short of the viewport edges so the section sits
        on the same side gutters as the rest of the page. */}
    <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[2rem] bg-primary">
      {/* The portrait field, scattered across the top of the panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[34rem] sm:block lg:h-[40rem]"
      >
        {FACES.map((face, index) => (
          <span
            key={face.pos}
            className={`absolute overflow-hidden rounded-full ${face.pos} ${face.size}`}
          >
            <img
              src={CTA_FACES[index % CTA_FACES.length]}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </span>
        ))}
      </div>

      {/* The panel supplies its own inner gutter, so no Container here: nesting
        one would double the side padding. */}
      <div className="relative px-6 sm:px-12">
        <Reveal
          y={28}
          className="pb-20 pt-24 text-center sm:pb-24 sm:pt-[26rem] lg:pt-[32rem]"
        >
          <h2 className="text-balance text-xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
            Are You Prepared to Soar and Chase Your Dreams?
          </h2>

          <button
            type="button"
            onClick={openModal}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book a Consultation
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </Reveal>
      </div>
    </div>
  </section>
);

export default FinalCta;
