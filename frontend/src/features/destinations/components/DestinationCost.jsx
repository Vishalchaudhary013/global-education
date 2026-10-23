import React from "react";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";
import { costOfStudy } from "../data/costOfStudy";

/**
 * Bordered panel with a small uppercase heading over a ruled list of
 * label / value rows.
 */
const CostPanel = ({ title, rows, footnote }) => (
  <div className="flex h-full flex-col rounded-sm bg-[#F4FAFF] p-6 sm:p-7">
    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
      {title}
    </h3>
    <dl className="mt-3 divide-y divide-slate-200">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
        >
          <dt className="text-base text-slate-600">{label}</dt>
          <dd className="text-base font-bold text-primary">{value}</dd>
        </div>
      ))}
    </dl>
    {footnote && (
      <p className="mt-auto border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
        * {footnote}
      </p>
    )}
  </div>
);

/**
 * Half-circle Low → High meter with a needle at `level` (0-100). The arc is a
 * green → amber → red gradient; the needle swings from the left end (0) to
 * the right end (100) around the arc's centre.
 */
const CostGauge = ({ level, label }) => {
  const clamped = Math.min(100, Math.max(0, level));
  const angle = -90 + clamped * 1.8;
  const gradientId = `cost-gauge-${label.replace(/\W/g, "")}`;

  return (
    <figure
      className="w-56 shrink-0 self-center"
      role="img"
      aria-label={`Cost of living in ${label}: ${clamped} out of 100, where 100 is most expensive`}
    >
      <svg viewBox="0 0 240 135" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6EE7A8" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>
        <path
          d="M 20 120 A 100 100 0 0 1 220 120"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="26"
          strokeLinecap="round"
        />
        <g transform={`rotate(${angle} 120 120)`}>
          <line
            x1="120"
            y1="120"
            x2="120"
            y2="32"
            stroke="#1F2853"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
        <circle cx="120" cy="120" r="7" fill="#1F2853" />
      </svg>
      <figcaption className="mt-1 flex justify-between px-1 text-xs font-bold">
        <span className="text-emerald-500">Low</span>
        <span className="text-rose-400">High</span>
      </figcaption>
    </figure>
  );
};

/**
 * "Cost of studying in {country}": yearly tuition by program level beside
 * average monthly living costs by city. Falls back to the short `costs`
 * stored on the destination when there is no detailed breakdown.
 */
const DestinationCost = ({ destId, destination, guide }) => {
  const name = destination.name;
  const data = guide.costOfStudy || costOfStudy[destId];
  const costs = destination.costs || {};

  const tuition =
    data?.tuition ||
    [
      costs.ug && { label: "Undergraduate (Bachelor's)", value: costs.ug },
      costs.pg && { label: "Postgraduate (Master's)", value: costs.pg },
    ].filter(Boolean);
  const living =
    data?.living ||
    (costs.living ? [{ label: "Estimated living expenses", value: costs.living }] : []);

  if (tuition.length === 0 && living.length === 0) return null;

  const footnote = ["Figures are indicative yearly tuition.", data?.note]
    .filter(Boolean)
    .join(" ");

  return (
    <Section id="cost">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Cost of Studying
        </p>
        <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Cost of Studying in {name}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Tuition fees and living costs vary by institution, city and program.
          Use these figures as a planning guide.
        </p>
      </Reveal>

      {/* items-start: each panel keeps its own height rather than stretching
          to match the taller one beside it. */}
      <div className="mt-10 grid items-start gap-5 lg:mt-14 lg:grid-cols-2">
        {tuition.length > 0 && (
          <Reveal>
            <CostPanel
              title="Program level"
              rows={tuition}
              footnote={footnote}
            />
          </Reveal>
        )}
        {living.length > 0 && (
          <Reveal delay={80}>
            <CostPanel title="Average monthly living costs" rows={living} />
          </Reveal>
        )}
      </div>
{/* 
      {data?.livingSummary && (
        <Reveal className="mt-14 flex flex-col gap-8  pt-12 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Cost of Living
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {data.livingSummary}
            </p>
          </div>
          {data.livingLevel != null && (
            <CostGauge level={data.livingLevel} label={name} />
          )}
        </Reveal>
      )} */}
    </Section>
  );
};

export default DestinationCost;
