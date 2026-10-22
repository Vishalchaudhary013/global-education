import React from "react";
import Reveal from "@/shared/components/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { STEPS } from "../data/homeContent";

/**
 * Entrance offset per step, following the reference: the first and last steps
 * are already in place, and the ones between alternate between dropping in
 * from above and rising from below, so the row assembles like a zip.
 */
const stepOffset = (index, total) => {
  if (index === 0 || index === total - 1) return 0;
  return index % 2 ? -100 : 100;
};

/**
 * The five-step process, laid out as a horizontal timeline.
 *
 * A single rule runs behind the row of markers on large screens, with each
 * step's dot sitting on it. Below `lg` the rule rotates to the left-hand side
 * and the steps stack into a vertical timeline, which is the only arrangement
 * that stays readable at phone width.
 */
const HowItWorks = () => (
  <Section tone="white" id="how-it-works">
    <SectionHeading eyebrow="Working Process" title="How it Works" />

    <div className="relative mt-14 lg:mt-20">
      {/* Timeline rule: horizontal on desktop, vertical on mobile. On mobile
          the rule and every dot are centred on the same `left-3` axis via
          `-translate-x-1/2`, so the dots sit exactly on the line. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-3 top-6 w-px -translate-x-1/2 bg-slate-200 lg:bottom-auto lg:left-0 lg:top-0 lg:h-px lg:w-full lg:translate-x-0"
      />

      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5">
        {STEPS.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            y={stepOffset(index, STEPS.length)}
            className="relative pl-9 lg:pl-0 lg:pt-2"
          >
            {/* Marker: a dot on the rule, a short stem, then the numbered disc.
                On mobile the dot lines up with the "Step" label beside it. */}
            <span
              aria-hidden="true"
              className="absolute left-3 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-white lg:left-1/2 lg:top-[-0.3rem] lg:h-2 lg:w-2 lg:ring-0"
            />
            <span
              aria-hidden="true"
              className="absolute left-[0.6rem] top-4 hidden h-7 w-px bg-slate-200 lg:left-1/2 lg:block lg:h-7 lg:-translate-x-1/2"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-11 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-extrabold text-secondary lg:left-1/2 lg:flex lg:-translate-x-1/2"
            >
              {step.number}
            </span>

            <div className="h-full rounded-2xl bg-white p-5 text-left  lg:mt-20 lg:p-6 lg:text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary lg:hidden">
                Step {step.number}
              </p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-primary sm:text-xl lg:mt-0">
                {step.title}
              </h3>
              <p className="mt-2 text-md leading-5 text-slate-600">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </Section>
);

export default HowItWorks;
