import React from "react";
import {
  HiArrowRight,
  HiBookOpen,
  HiBriefcase,
  HiCheckBadge,
  HiGlobeAlt,
  HiLightBulb,
  HiUserGroup,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import Section from "@/features/home/components/ui/Section";

const LEVEL_NOUNS = {
  UG: "undergraduate degree",
  PG: "postgraduate degree",
  Diploma: "diploma",
  PhD: "doctorate",
};

/** Icons cycled through admin-entered highlights, which carry no icon of their own. */
const HIGHLIGHT_ICONS = [
  HiBookOpen,
  HiUserGroup,
  HiLightBulb,
  HiBriefcase,
  HiCheckBadge,
  HiGlobeAlt,
];

const defaultIntro = ({ name, duration, level, universityName, destination }) =>
  `The ${name} at ${universityName} is a${duration ? ` ${duration.toLowerCase()}` : ""} ${level} that pairs a strong academic foundation with practical, industry-focused learning. Studying in ${destination}, you graduate with the knowledge, skills and global network to build your career anywhere.`;

/**
 * TEMPORARY highlights until every course has its own in the admin form.
 * Built from the record so each course page reads as its own.
 */
const defaultHighlights = ({ level, universityName, destination }) => [
  {
    title: "Industry-aligned curriculum",
    text: "Modules are shaped with employers and updated regularly, so what you learn matches what the industry needs today.",
  },
  {
    title: "Taught by expert faculty",
    text: `Learn from ${universityName}'s academics and practitioners through lectures, seminars and small-group teaching.`,
  },
  {
    title: "Hands-on, practical learning",
    text: "Projects, lab work and case studies let you apply theory to real problems from your first term.",
  },
  {
    title: "Career-ready outcomes",
    text: `Internships, placements and a dedicated careers service help you move into graduate roles, with post-study work options in ${destination}.`,
  },
  {
    title: "Globally recognised qualification",
    text: `Earn a ${level} from ${universityName} that is respected by employers and universities around the world.`,
  },
  {
    title: "Support for international students",
    text: "Guidance from application to arrival and beyond, covering visas, accommodation and settling in.",
  },
];

/** Admin highlights: one per line, "Title: description", description optional. */
const parseHighlights = (raw) =>
  (raw || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const split = line.indexOf(":");
      return split > 0
        ? { title: line.slice(0, split).trim(), text: line.slice(split + 1).trim() }
        : { title: line, text: "" };
    });

/**
 * "About the course" band, in the layout of the university page's About
 * section: heading, overview and call to action on the left, held in view on
 * desktop, beside a ruled list of highlights on the right.
 *
 * Uses the course's own `overview` and `highlights` when entered, and
 * generated stand-ins otherwise.
 */
const CourseAbout = ({ course, onTalk }) => {
  const { name, type, duration, destination, overview } = course;
  const context = {
    name,
    duration,
    destination,
    level: LEVEL_NOUNS[type] || "programme",
    universityName: course.university?.name || "the university",
  };

  const intro = overview || defaultIntro(context);
  const entered = parseHighlights(course.highlights);
  const highlights = (entered.length ? entered : defaultHighlights(context)).map(
    (highlight, index) => ({
      ...highlight,
      icon: HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length],
    }),
  );

  return (
    <Section id="about" spacing="normal" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            About the course
          </p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Why study {name}?
          </h2>
          <p className="mt-6 max-w-md whitespace-pre-line text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {intro}
          </p>
          <button
            type="button"
            onClick={onTalk}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-7 pr-3 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RollText>Talk to an Expert</RollText>
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
              <RollIcon icon={HiArrowRight} />
            </span>
          </button>
        </Reveal>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <Reveal
                as="li"
                key={highlight.title}
                y={40}
                className="flex gap-5 py-7 sm:gap-6 sm:py-8"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-secondary">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold leading-snug text-primary sm:text-2xl">
                    {highlight.title}
                  </h3>
                  {highlight.text && (
                    <p className="mt-2 text-base leading-7 text-slate-600">
                      {highlight.text}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};

export default CourseAbout;
