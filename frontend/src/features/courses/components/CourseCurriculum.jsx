import React from "react";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";
import { curriculumFor } from "../data/curriculum";

/** Static class map: Tailwind cannot see column counts built at runtime. */
const STAGE_COLUMNS = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * "What You'll Study" band: the course's stages side by side, each a card
 * with a numbered heading, its timing and its modules, then the popular
 * specialisations as chips. Uses the course's own curriculum when entered,
 * else a typical structure for its subject and level (see `curriculumFor`).
 */
const CourseCurriculum = ({ course }) => {
  const { stages, specialisations, typical } = curriculumFor(course);
  if (stages.length === 0) return null;

  const columns = STAGE_COLUMNS[Math.min(stages.length, 4)];

  return (
    <Section id="curriculum">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Curriculum
        </p>
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
          What You'll Study
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {typical
            ? "How this course is typically structured, from your first modules to your final project. Exact modules vary by university."
            : "How this course is structured, stage by stage, from your first modules to your final project."}
        </p>
      </Reveal>

      <ol className={`mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 ${columns}`}>
        {stages.map((stage, index) => (
          <Reveal
            as="li"
            key={`${stage.label}-${index}`}
            y={40}
            delay={index * 100}
          >
            <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-slate-300">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="text-3xl font-extrabold leading-none tabular-nums text-secondary"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  {stage.meta && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {stage.meta}
                    </p>
                  )}
                  <h3 className="mt-0.5 text-lg font-bold leading-snug text-primary">
                    {stage.label}
                  </h3>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-slate-200 pt-5">
                {stage.modules.map((module) => (
                  <li
                    key={module}
                    className="flex items-start gap-3 text-[15px] leading-6 text-slate-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-secondary"
                    />
                    {module}
                  </li>
                ))}
              </ul>

              {/* Coral bar wipes along the bottom edge on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out-cubic group-hover:scale-x-100"
              />
            </article>
          </Reveal>
        ))}
      </ol>

      {specialisations.length > 0 && (
        <Reveal y={30} delay={200} className="mt-10 lg:mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="shrink-0 text-sm font-bold uppercase tracking-wide text-primary">
              Popular specialisations
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {specialisations.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </Section>
  );
};

export default CourseCurriculum;
