import React from "react";
import { LuCloudRain, LuFlower2, LuSnowflake, LuSun } from "react-icons/lu";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** What each destination calls its intakes, keyed by start month (0-11). */
const INTAKE_NAMES = {
  uk: { 0: "Winter Intake", 4: "Summer Intake", 8: "Autumn / Fall Intake" },
  canada: { 0: "Winter Intake", 4: "Summer Intake", 8: "Fall Intake" },
  usa: { 0: "Spring Intake", 4: "Summer Intake", 7: "Fall Intake" },
  dubai: { 0: "Spring Intake", 4: "Summer Intake", 8: "Fall Intake" },
  germany: { 3: "Summer Semester", 9: "Winter Semester" },
  australia: { 1: "Semester 1 Intake", 6: "Semester 2 Intake", 10: "November Intake" },
  newzealand: { 1: "Semester 1 Intake", 6: "Semester 2 Intake" },
};

const SOUTHERN = new Set(["australia", "newzealand"]);

/** Season icon for a start month, flipped for the southern hemisphere. */
const seasonIcon = (month, southern) => {
  const m = southern ? (month + 6) % 12 : month;
  if (m === 11 || m <= 1) return LuSnowflake;
  if (m <= 4) return LuFlower2;
  if (m <= 7) return LuSun;
  return LuCloudRain;
};

const toMonthIndex = (value) =>
  MONTHS.findIndex((month) =>
    month.toLowerCase().startsWith(String(value).trim().toLowerCase().slice(0, 3)),
  );

/**
 * Planning milestones, as month offsets from the intake's start month:
 * `scholarship` deadline, `application` window [from, to] and the best month
 * to `prepare` (start the process). A null `scholarship` hides that row.
 * Destinations without their own entry use DEFAULT_TIMING.
 */
const DEFAULT_TIMING = { scholarship: -3, application: [-9, -2], prepare: -12 };

const INTAKE_TIMING = {
  uk: {
    8: { scholarship: -3, application: [-9, -2], prepare: -16 },
    0: { scholarship: -1, application: [-4, -2], prepare: -4 },
    4: { scholarship: -3, application: [-7, -4], prepare: -7 },
  },
};

const formatMonth = (date, offset) => {
  const shifted = new Date(date.getFullYear(), date.getMonth() + offset, 1);
  return `${MONTHS[shifted.getMonth()]} ${shifted.getFullYear()}`;
};

const buildDetails = (date, destId) => {
  const timing = INTAKE_TIMING[destId]?.[date.getMonth()] || DEFAULT_TIMING;
  const [from, to] = timing.application;
  return [
    timing.scholarship != null && {
      label: "Scholarship deadline",
      value: formatMonth(date, timing.scholarship),
    },
    {
      label: "Application timeline",
      value: `${formatMonth(date, from)} – ${formatMonth(date, to)}`,
    },
    { label: "Best time to start", value: formatMonth(date, timing.prepare) },
  ].filter(Boolean);
};

/**
 * Lays the destination's start months out on a timeline around today and
 * returns three cards: the intake that most recently started (closed), the
 * next one (applications open) and the one after that (plan ahead).
 */
const buildIntakes = (startDates, destId, now = new Date()) => {
  const months = [...new Set(startDates.map(toMonthIndex).filter((m) => m >= 0))].sort(
    (a, b) => a - b,
  );
  if (months.length === 0) return [];

  const year = now.getFullYear();
  const timeline = [year - 1, year, year + 1, year + 2].flatMap((y) =>
    months.map((m) => new Date(y, m, 1)),
  );
  const nextIndex = timeline.findIndex((date) => date > now);
  const picked = timeline.slice(nextIndex - 1, nextIndex + 2);
  const statuses = ["closed", "open", "planned"];

  return picked.map((date, index) => {
    const month = date.getMonth();
    const endMonth = (month + 1) % 12;
    const endYear = endMonth < month ? date.getFullYear() + 1 : date.getFullYear();
    return {
      key: date.toISOString(),
      name: INTAKE_NAMES[destId]?.[month] || `${MONTHS[month]} Intake`,
      range: `${MONTHS[month]} - ${MONTHS[endMonth]} ${endYear}`,
      year: date.getFullYear(),
      Icon: seasonIcon(month, SOUTHERN.has(destId)),
      status: statuses[index],
      details: buildDetails(date, destId),
    };
  });
};

const BADGES = {
  closed: "Closed",
  open: "Applications Open — Apply Now",
  planned: "Plan Ahead",
};

/**
 * "Intakes in {country}" band: heading and intro side by side, then three
 * intake cards. The open intake is highlighted and opens counselling.
 */
const DestinationIntakes = ({ destId, destination, guide, onApply }) => {
  const name = destination.name;
  const intakes = buildIntakes(guide.startDates || [], destId);

  if (intakes.length === 0) return null;

  const firstYear = intakes[0].year;
  const lastYear = intakes[intakes.length - 1].year;
  const span =
    firstYear === lastYear ? firstYear : `${firstYear}-${String(lastYear).slice(-2)}`;
  const intro =
    guide.intakesIntro ||
    `Universities in ${name} welcome international students in ${
      guide.startDates.length
    } intakes a year. Popular courses fill up fast, so start your application 6 to 9 months ahead.`;

  return (
    <Section id="intakes" tone="light">
      <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            Intakes
          </p>
          <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Intakes in {name} {span}
          </h2>
        </div>
        <p className="max-w-sm text-base leading-7 text-slate-600">{intro}</p>
      </Reveal>

      <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14">
        {intakes.map((intake, index) => {
          const { key, name: intakeName, range, Icon, status, details } = intake;
          const open = status === "open";
          const body = (
            <>
              <Icon
                className={`h-7 w-7 ${open ? "text-white" : "text-primary"}`}
                aria-hidden="true"
              />
              <h3
                className={`mt-5 text-xl font-bold sm:text-2xl ${
                  open ? "text-white" : "text-primary"
                }`}
              >
                {intakeName}
              </h3>
              <p
                className={`mt-3 text-sm ${open ? "text-slate-200" : "text-slate-500"}`}
              >
                {range}
              </p>
              <span
                className={`mt-3 inline-block rounded-sm px-2.5 py-1 text-xs font-semibold ${
                  open
                    ? "bg-secondary text-white"
                    : status === "closed"
                      ? "bg-slate-200 text-slate-500"
                      : "bg-primary/10 text-primary"
                }`}
              >
                {BADGES[status]}
              </span>

              <dl
                className={`mt-6 divide-y border-t ${
                  open
                    ? "divide-white/15 border-white/15"
                    : "divide-slate-200 border-slate-200"
                }`}
              >
                {details.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt
                      className={`text-xs ${open ? "text-slate-300" : "text-slate-500"}`}
                    >
                      {label}
                    </dt>
                    <dd
                      className={`text-right text-sm font-semibold ${
                        open ? "text-white" : "text-primary"
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          );

          return (
            <Reveal as="li" key={key} delay={index * 80}>
              {open ? (
                <button
                  type="button"
                  onClick={onApply}
                  className="h-full w-full rounded-sm bg-primary p-7 text-left transition-colors duration-300 hover:bg-primary/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  {body}
                </button>
              ) : (
                <div
                  className={`h-full rounded-sm border border-slate-200 bg-white p-7 ${
                    status === "closed" ? "opacity-75" : ""
                  }`}
                >
                  {body}
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>

      <p className="mt-6 text-sm text-center text-slate-500">
        <span className="font-semibold text-primary">Please note:</span> The
        specific intake dates and application periods may vary slightly
        between different universities and programs in {name}.
      </p>
    </Section>
  );
};

export default DestinationIntakes;
