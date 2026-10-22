import React from "react";
import {
  HiOutlineBuildingLibrary,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { useInView } from "@/shared/hooks/useInView";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import { STATS } from "../data/homeContent";

const ICONS = {
  universities: HiOutlineBuildingLibrary,
  countries: HiOutlineGlobeAlt,
  students: HiOutlineUserGroup,
  courses: HiOutlineAcademicCap,
};

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * One odometer wheel: a 1em window over a column of the digits 0–9.
 *
 * Wheels alternate direction, as in the reference: even ones roll upward
 * through 0→9, odd ones hold the column reversed and roll downward, so
 * neighbouring digits spin against each other. Both start on 0 and land on
 * `digit` once `active` flips, over 2.5s on the reference's curve.
 */
const DigitWheel = ({ digit, active, up }) => {
  const column = up ? DIGITS : [...DIGITS].reverse();
  const from = up ? 0 : -9;
  const to = up ? -digit : -(9 - digit);

  return (
    <span className="inline-block h-[1em] overflow-hidden align-top">
      <span
        className="flex flex-col transition-transform duration-[2500ms] ease-odometer motion-reduce:transition-none"
        style={{ transform: `translateY(${active ? to : from}em)` }}
      >
        {column.map((n) => (
          <span key={n} className="block h-[1em] leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
};

/**
 * Renders the formatted figure with each digit on its own wheel; separators
 * such as the thousands comma stay static between them.
 */
const Odometer = ({ value, active }) => {
  let wheel = 0;

  return [...value.toLocaleString()].map((char, index) =>
    /\d/.test(char) ? (
      <DigitWheel
        key={index}
        digit={Number(char)}
        active={active}
        up={wheel++ % 2 === 0}
      />
    ) : (
      <span key={index}>{char}</span>
    ),
  );
};

/**
 * Each figure rolls to its value the first time the row is seen, then holds.
 *
 * `useInView` fires once, so scrolling back past the row does not restart the
 * wheels, and under `prefers-reduced-motion` they land without the roll. The
 * finished figure is exposed via `aria-label` so assistive technology
 * announces the real number, not the wheels.
 */
const Stat = ({ stat, active, index }) => {
  const Icon = ICONS[stat.icon] || HiOutlineAcademicCap;
  const finished = `${stat.value.toLocaleString()}${stat.suffix}`;
  const accent = index % 2 === 0 ? "bg-secondary" : "bg-primary";

  // An ellipse taller than it is wide, as in the reference. `rounded-[50%]`
  // rather than `rounded-full`: a 9999px radius on a non-square box renders a
  // pill with straight sides, while 50% curves both axes.
  return (
    <Reveal
      as="li"
      className="mx-auto flex  w-full max-w-[19rem] flex-col items-center justify-center r px-7 text-center"
    >
      <span
        className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full text-white sm:h-20 sm:w-20 ${accent}`}
      >
        <Icon className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" />
      </span>

      <p
        className="text-3xl font-extrabold leading-none tracking-tight text-primary sm:text-4xl"
        aria-label={finished}
      >
        <span aria-hidden="true">
          <Odometer value={stat.value} active={active} />
          <span className="text-secondary">{stat.suffix}</span>
        </span>
      </p>

      <p className="mt-2 text-md font-medium text-slate-600">{stat.label}</p>
    </Reveal>
  );
};

const Stats = () => {
  // Rolls once the row is 15% into the viewport, the reference's offset.
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "0px 0px -15% 0px",
  });

  return (
    <Section tone="white" id="why-us">
      <SectionHeading eyebrow="Why Us" title="Why Choose Us" />

      <ul
        ref={ref}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
      >
        {STATS.map((stat, index) => (
          <Stat key={stat.label} stat={stat} active={inView} index={index} />
        ))}
      </ul>
    </Section>
  );
};

export default Stats;
