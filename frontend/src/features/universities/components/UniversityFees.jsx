import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";
import CurrencyToggle from "@/shared/components/CurrencyToggle";
import {
  currencyFor,
  formatMoney,
  sampleFee,
  toInr,
} from "@/shared/utils/currency";

const INITIAL_ROWS = 10;

const SkeletonRow = () => (
  <tr aria-hidden="true" className="animate-pulse border-b border-slate-200">
    {["w-3/4", "w-1/2", "w-1/2"].map((width, index) => (
      <td key={index} className="px-5 py-4">
        <div className={`h-4 ${width} rounded-sm bg-slate-200`} />
      </td>
    ))}
  </tr>
);

/**
 * "Fees Estimate" table: each of the university's courses with its duration
 * and yearly fee, switchable between the local currency and INR. Shows the
 * first ten rows, with a button to expand the rest (or to browse all courses
 * when there are no more).
 *
 * `courses` is the same list the course carousel shows.
 */
const UniversityFees = ({ university, courses, loading }) => {
  const currency = currencyFor(university.destination);
  const options = currency.code === "INR" ? ["INR"] : [currency.code, "INR"];
  const [display, setDisplay] = useState(options[0]);
  const [expanded, setExpanded] = useState(false);

  const rows = courses.map((course, index) => {
    const local =
      Number(course.feePerYear) || sampleFee(course.type, currency, index);
    const shown = display === "INR" ? toInr(local, currency) : local;
    return { course, fee: formatMoney(shown, display) };
  });

  const visibleRows = expanded ? rows : rows.slice(0, INITIAL_ROWS);
  const canExpand = rows.length > INITIAL_ROWS;

  return (
    <Section id="fees" >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            Tuition Fees
          </p>
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
            Fees Estimate
          </h2>
        </Reveal>

        {options.length > 1 && (
          <Reveal y={30} delay={150}>
            <CurrencyToggle
              options={options}
              value={display}
              onChange={setDisplay}
            />
          </Reveal>
        )}
      </div>

      <Reveal className="mt-10 lg:mt-12">
        {/* `overflow-x-auto` alone makes the y axis scrollable too, so any
            row still mid-animation would flash a vertical scrollbar. */}
        <div className="overflow-x-auto overflow-y-hidden rounded-sm border border-slate-200">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="bg-[#F4FAFF] text-sm font-bold uppercase tracking-wide text-primary">
                <th scope="col" className="px-5 py-5.5 border-b border-slate-200">
                  Course
                </th>
                <th scope="col" className="w-40 px-5 py-4 border-b border-slate-200">
                  Duration
                </th>
                <th scope="col" className="w-44 px-5 py-4 border-b border-slate-200">
                  Fee / Year
                </th>
              </tr>
            </thead>
            <tbody aria-busy={loading}>
              {loading
                ? Array.from({ length: 5 }, (_, index) => (
                    <SkeletonRow key={index} />
                  ))
                : visibleRows.map(({ course, fee }, index) => (
                    <Reveal
                      as="tr"
                      key={course._id}
                      y={0}
                      delay={Math.min(index, INITIAL_ROWS) * 40}
                      className="group border-b border-slate-200 bg-white text-primary transition-colors duration-300 last:border-b-0 even:bg-[#F4FAFF]"
                    >
                      <td className="px-5 py-4 text-base">
                        {course.placeholder ? (
                          course.name
                        ) : (
                          <Link
                            to={`/courses/${course._id}`}
                            className="transition-colors duration-300 hover:text-secondary"
                          >
                            {course.name}
                          </Link>
                        )}
                      </td>
                      <td className="px-5 py-4 text-base text-slate-600">
                        {course.duration || "—"}
                      </td>
                      <td className="px-5 py-4 text-base font-bold tabular-nums">
                        {/* Keyed by currency so the figure re-animates on switch. */}
                        <span key={display} className="inline-block animate-drawer-in">
                          {fee}
                        </span>
                      </td>
                    </Reveal>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          {canExpand ? (
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              className={viewAllClass}
            >
              {expanded ? "Show Fewer Courses" : "View All Courses"}
            </button>
          ) : (
            <Link to="/courses" className={viewAllClass}>
              View All Courses
            </Link>
          )}
         
        </div>
      </Reveal>
    </Section>
  );
};

const viewAllClass =
  "inline-flex items-center justify-center rounded-sm border border-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors duration-300 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export default UniversityFees;
