import React from "react";
import {
  HiOutlineBuildingLibrary,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { useCountUp } from "@/shared/hooks/useCountUp";
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

/**
 * Each figure counts up the first time the section is seen, then holds.
 *
 * `useInView` fires once, so scrolling back past the row does not restart the
 * numbers, and `useCountUp` returns the final value immediately under
 * `prefers-reduced-motion`. The finished figure is exposed via `aria-label`
 * so assistive technology announces the real number, not a mid-count frame.
 */
const Stat = ({ stat, active, index }) => {
  const value = useCountUp(stat.value, { active, duration: 1800 });
  const Icon = ICONS[stat.icon] || HiOutlineAcademicCap;
  const finished = `${stat.value.toLocaleString()}${stat.suffix}`;
  const accent = index % 2 === 0 ? "bg-secondary" : "bg-primary";

  // An ellipse taller than it is wide, as in the reference. `rounded-[50%]`
  // rather than `rounded-full`: a 9999px radius on a non-square box renders a
  // pill with straight sides, while 50% curves both axes.
  return (
    <li className="mx-auto flex  w-full max-w-[19rem] flex-col items-center justify-center r px-7 text-center">
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
          {value.toLocaleString()}
          <span className="text-secondary">{stat.suffix}</span>
        </span>
      </p>

      <p className="mt-2 text-md font-medium text-slate-600">{stat.label}</p>
    </li>
  );
};

const Stats = () => {
  const [ref, inView] = useInView({ threshold: 0.25 });

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
