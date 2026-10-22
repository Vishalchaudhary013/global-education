import React from "react";
import Reveal from "@/shared/components/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { STEPS } from "../data/homeContent";

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
      {/* Timeline rule: horizontal on desktop, vertical on mobile. */}
      <div
        aria-hidden="true"
        className="absolute left-[0.6rem] top-2 h-full w-px bg-slate-200 lg:left-0 lg:top-0 lg:h-px lg:w-full"
      />

      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5">
        {STEPS.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={index * 110}
            y={26}
            className="relative pl-9 lg:pl-0 lg:pt-2"
          >
            {/* Marker: a dot on the rule, a short stem, then the numbered disc. */}
            <span
              aria-hidden="true"
              className="absolute left-[0.2rem] top-2 h-2 w-2 rounded-full bg-primary lg:left-1/2 lg:top-[-0.3rem] lg:-translate-x-1/2"
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
