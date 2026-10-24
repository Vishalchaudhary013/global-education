import React from "react";
import {
  HiAcademicCap,
  HiArrowRight,
  HiBanknotes,
  HiCalendarDays,
  HiClock,
  HiDocumentText,
  HiSparkles,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { Container } from "@/features/home/components/ui/Section";
import {
  currencyFor,
  formatMoney,
  sampleFee,
  toInr,
} from "@/shared/utils/currency";
import {
  CAMPUS_PHOTOS,
  handlePhotoError,
} from "@/features/destinations/data/campusPhotos";
import { careersFor, subjectOf } from "../data/careerSalaries";

/** A stable photo per course, so different courses do not all share one. */
const photoFor = (course) => {
  const seed = String(course._id || course.name || "");
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return CAMPUS_PHOTOS[hash % CAMPUS_PHOTOS.length];
};

const PROGRAM_LABELS = {
  UG: "Undergraduate Degree Program",
  PG: "Postgraduate Degree Program",
  Diploma: "Diploma Program",
  PhD: "Doctoral Program",
};

const LEVEL_CHIPS = {
  UG: "UG Degree",
  PG: "PG Degree",
  Diploma: "Diploma",
  PhD: "Doctorate",
};

const COURSE_TYPES = {
  UG: "Degree",
  PG: "Degree",
  Diploma: "Diploma",
  PhD: "Doctorate",
};

const LEVEL_NOUNS = {
  UG: "undergraduate",
  PG: "postgraduate",
  Diploma: "diploma",
  PhD: "doctoral",
};

/** Static class map: Tailwind cannot see column counts built at runtime. */
const TILE_COLUMNS = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/**
 * Splits the course name into a plain lead and a highlighted tail: the part
 * after the last " in " ("BBA in |Accounting & Finance|"), else after the last
 * " of ", else the last two words of a longer name ("MSc |Computer Science|").
 */
const splitTitle = (name) => {
  for (const joiner of [" in ", " of "]) {
    const at = name.toLowerCase().lastIndexOf(joiner);
    if (at > 0) {
      return {
        lead: name.slice(0, at + joiner.length).trim(),
        accent: name.slice(at + joiner.length).trim(),
      };
    }
  }
  const words = name.split(/\s+/);
  return words.length >= 3
    ? { lead: words.slice(0, -2).join(" "), accent: words.slice(-2).join(" ") }
    : { lead: name, accent: "" };
};

/**
 * One-line summary built from the record. The admin overview is not used here:
 * the About section below already shows it in full.
 */
const summaryFor = ({ duration, type }, topic) => {
  const level = LEVEL_NOUNS[type] || "";
  const length = duration ? `${duration.toLowerCase()} ` : "";
  return `A ${length}${level} program combining a strong academic foundation in ${topic} with practical, industry-focused learning.`;
};

/**
 * White hero band for a course page: a subject and program tag, the course
 * name with its specialism highlighted, a short summary, chips for the key
 * facts and likely careers, and a strip of fact tiles between two hairlines.
 *
 * Intakes drop out when the university has none; the fee falls back to a
 * marked estimate, so a sparse record still reads as a complete hero.
 */
const CourseHero = ({ course, onEnquire }) => {
  const { name, type, duration, destination } = course;
  const intakes = course.university?.intakes;
  const subject = subjectOf(name)?.subject;
  const careers = careersFor(name).careers.slice(0, 4).map((career) => career.role);

  // Same figure as the fees table: the entered fee, else the level's estimate.
  const currency = currencyFor(destination);
  const enteredFee = Number(course.feePerYear);
  const fee = enteredFee || sampleFee(type, currency);

  const { lead, accent } = splitTitle(name);
  const leadWords = lead.split(/\s+/).filter(Boolean);
  const accentWords = accent.split(/\s+/).filter(Boolean);
  const words = [
    ...leadWords.map((word) => ({ word, accent: false })),
    ...accentWords.map((word) => ({ word, accent: true })),
  ];

  const tag = [subject, PROGRAM_LABELS[type] || type].filter(Boolean).join(" • ");

  const chips = [
    type && { icon: HiAcademicCap, label: LEVEL_CHIPS[type] || type },
    duration && { icon: HiClock, label: duration },
    intakes && { icon: HiCalendarDays, label: intakes },
  ].filter(Boolean);

  const stats = [
    type && { icon: HiDocumentText, label: "Course Type", value: COURSE_TYPES[type] || type },
    type && { icon: HiAcademicCap, label: "Level", value: type },
    duration && { icon: HiClock, label: "Duration", value: duration },
    {
      icon: HiBanknotes,
      label: "Fees / Year",
      value: formatMoney(fee, currency.code),
      note:
        [
          !enteredFee && "Estimated",
          currency.code !== "INR" &&
            `≈ ${formatMoney(toInr(fee, currency), "INR")}`,
        ]
          .filter(Boolean)
          .join(" · ") || null,
    },
    intakes && { icon: HiCalendarDays, label: "Intakes", value: intakes },
  ].filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-white text-primary">
      <Container className="relative pb-14 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <div className="max-w-3xl">
            {tag && (
              <Reveal y={20} delay={100}>
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-primary sm:text-sm">
                  <HiSparkles aria-hidden="true" className="h-4 w-4 text-secondary" />
                  {tag}
                </p>
              </Reveal>
            )}

            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[45px]">
              {words.map(({ word, accent: highlighted }, index) => (
                <React.Fragment key={`${word}-${index}`}>
                  <Reveal
                    as="span"
                    y={40}
                    blur
                    delay={200 + index * 70}
                    className={`inline-block ${highlighted ? "text-secondary" : ""}`}
                  >
                    {word}
                  </Reveal>
                  {index < words.length - 1 && " "}
                </React.Fragment>
              ))}
            </h1>

            <Reveal y={30} delay={450}>
              <p className="mt-6 line-clamp-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {summaryFor(course, accent || subject || name)}
              </p>
            </Reveal>

            {chips.length > 0 && (
              <Reveal y={30} delay={550}>
                <ul className="mt-7 flex flex-wrap gap-2.5">
                  {chips.map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <li
                        key={chip.label}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-primary"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4 text-secondary" />
                        {chip.label}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            )}

            {careers.length > 0 && (
              <Reveal y={30} delay={650}>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <span className="text-sm font-semibold text-slate-500">Careers:</span>
                  <ul className="contents">
                    {careers.map((role) => (
                      <li
                        key={role}
                        className="rounded-full border border-secondary/30 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <HeroVisual
            image={photoFor(course)}
            onEnquire={onEnquire}
          />
        </div>

        {/* Fact tiles between two hairlines. Tiles without data drop out. */}
        {stats.length > 0 && (
          <div className="mt-8 ">
            <ul
              className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${TILE_COLUMNS[stats.length]}`}
            >
              {stats.map((stat, index) => (
                <Reveal as="li" key={stat.label} y={30} delay={750 + index * 80}>
                  <StatTile {...stat} />
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
};

/**
 * Right-hand visual: a campus photo with a counselling card overlapping its
 * lower edge. The photo zooms slowly on hover; everything is static under
 * reduced motion.
 */
const HeroVisual = ({ image, onEnquire }) => (
  <Reveal y={0} scale={0.95} delay={300} className="relative">
    <div className="group relative h-72 overflow-hidden rounded-sm bg-slate-100 sm:h-96 lg:h-[23rem]">
      <img
        src={image}
        onError={handlePhotoError}
        alt=""
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out-cubic group-hover:scale-[1.04] motion-reduce:transition-none"
      />

      <div className="absolute inset-x-4 bottom-4 rounded-sm bg-white p-5 sm:inset-x-5 sm:bottom-5">
        <p className="text-base font-bold leading-snug text-primary">
          Not sure this course is right for you?
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Talk to an expert about eligibility, fees and scholarships.
        </p>
        {onEnquire && (
          <button
            type="button"
            onClick={onEnquire}
            className="group/cta mt-4 inline-flex w-full items-center justify-between gap-3 rounded-full bg-secondary py-2.5 pl-6 pr-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Book Free Counselling
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <HiArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </span>
          </button>
        )}
      </div>
    </div>
  </Reveal>
);

/**
 * Outlined fact tile: icon on the left, small uppercase label over a bold
 * value, optional note below. On hover a coral bar wipes along the bottom.
 */
const StatTile = ({ icon, label, value, note }) => {
  const Icon = icon;

  return (
    <div className="group relative flex h-full items-center gap-3.5 overflow-hidden rounded-sm border border-slate-200 bg-white px-4 py-4 transition-colors duration-300 hover:border-slate-300">
      <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-secondary" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 truncate text-base font-bold text-primary">
          {value}
        </p>
        {note && (
          <p className="text-xs font-medium tabular-nums text-slate-500">
            {note}
          </p>
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out-cubic group-hover:scale-x-100"
      />
    </div>
  );
};

export default CourseHero;
