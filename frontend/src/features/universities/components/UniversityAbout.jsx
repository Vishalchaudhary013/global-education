import React from "react";
import {
  HiArrowRight,
  HiAcademicCap,
  HiBriefcase,
  HiBuildingLibrary,
  HiGlobeAlt,
  HiLightBulb,
  HiTrophy,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon, RollText } from "@/shared/components/Roll";
import Section from "@/features/home/components/ui/Section";

const defaultIntro = (name, place) =>
  `${name}${place ? ` in ${place}` : ""} is a leading global institution known for academic excellence, pioneering research and a welcoming, diverse student community. Here is what makes it a top choice for international students.`;

/**
 * TEMPORARY highlights until the catalogue stores its own per university.
 * Built from the record's name and location so each page reads as its own.
 */
const defaultHighlights = (name, place) => [
  {
    icon: HiTrophy,
    title: "Globally recognised reputation",
    text: `${name} is consistently ranked among the world's leading universities, and its degrees are respected by employers everywhere.`,
  },
  {
    icon: HiAcademicCap,
    title: "Academic excellence",
    text: "Rigorous programmes taught by award-winning faculty, with small-group teaching and hands-on learning built into every course.",
  },
  {
    icon: HiLightBulb,
    title: "World-leading research",
    text: "Students work alongside researchers tackling real global challenges, from health and climate to technology and society.",
  },
  {
    icon: HiBriefcase,
    title: "Strong career outcomes",
    text: "Close industry partnerships open doors to internships, placements and graduate roles, backed by a dedicated careers service.",
  },
  {
    icon: HiGlobeAlt,
    title: "International community",
    text: `Join students from over 100 countries${place ? ` and enjoy life in ${place}` : ""}, with dedicated support from arrival to graduation.`,
  },
  {
    icon: HiBuildingLibrary,
    title: "Modern campus facilities",
    text: "State-of-the-art libraries, labs, study spaces and sports facilities, all designed around how students learn and live today.",
  },
];

/**
 * "About {university}" band, in the layout of the destination page's "Why"
 * section: heading, overview and call to action on the left, held in view on
 * desktop, beside a ruled list of highlights on the right.
 */
const UniversityAbout = ({ university, onTalk }) => {
  const { name, location, destination, overview } = university;
  const place =
    location && location.toLowerCase() !== destination?.toLowerCase()
      ? `${location}, ${destination}`
      : destination;

  const intro = overview || defaultIntro(name, place);
  const highlights = defaultHighlights(name, place);

  return (
    <Section id="about" spacing="normal" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            About the university
          </p>
          <h2 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            About {name}
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
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {highlight.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};

export default UniversityAbout;
