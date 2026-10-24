import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/shared/components/Reveal";
import CurrencyToggle from "@/shared/components/CurrencyToggle";
import Section from "@/features/home/components/ui/Section";
import {
  currencyFor,
  formatMoney,
  sampleFee,
  toInr,
} from "@/shared/utils/currency";
import { costsFor, yearsFrom } from "../data/studyCosts";

/** Multi-year totals read better as tidy figures. */
const roundTo50 = (amount) => Math.round(amount / 50) * 50;

/**
 * "Fees & Cost of Study" table for one course: tuition, living costs, health
 * cover and the visa fee, per year and for the full course, with a total row.
 * Switchable between the local currency and INR, styled like the university
 * page's fees table.
 *
 * Tuition is the course's `feePerYear`, or a marked estimate by study level
 * when none is entered.
 */
const CourseFees = ({ course }) => {
  const currency = currencyFor(course.destination);
  const options = currency.code === "INR" ? ["INR"] : [currency.code, "INR"];
  const [display, setDisplay] = useState(options[0]);

  const costs = costsFor(course.destination);
  const years = yearsFrom(course.duration);
  const enteredFee = Number(course.feePerYear);
  const tuition = enteredFee || sampleFee(course.type, currency);

  const rows = [
    {
      label: "Tuition Fee",
      note: enteredFee ? null : "Estimate",
      perYear: tuition,
      full: roundTo50(tuition * years),
    },
    {
      label: "Living Costs",
      perYear: costs.living,
      full: roundTo50(costs.living * years),
    },
    {
      label: "Health Insurance",
      perYear: costs.insurance,
      full: roundTo50(costs.insurance * years),
    },
    costs.visa > 0 && {
      label: "Student Visa Fee",
      oneTime: true,
      perYear: null,
      full: costs.visa,
    },
  ].filter(Boolean);

  const total = {
    perYear: rows.reduce((sum, row) => sum + (row.perYear || 0), 0),
    full: rows.reduce((sum, row) => sum + row.full, 0),
  };

  const show = (amount) =>
    formatMoney(display === "INR" ? toInr(amount, currency) : amount, display);

  return (
    <Section id="fees">
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
            Fees & Cost of Study
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            What studying this course in {course.destination} costs, per year
            and for the full {course.duration ? course.duration.toLowerCase() : "course"}.
          </p>
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
                <th scope="col" className="border-b border-slate-200 px-5 py-4">
                  Expense
                </th>
                <th scope="col" className="w-48 border-b border-slate-200 px-5 py-4">
                  Per Year
                </th>
                <th scope="col" className="w-56 border-b border-slate-200 px-5 py-4">
                  Full Course
                  {course.duration && (
                    <span className="font-semibold normal-case tracking-normal text-slate-500">
                      {" "}
                      ({course.duration})
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Reveal
                  as="tr"
                  key={row.label}
                  y={0}
                  delay={index * 40}
                  className="border-b border-slate-200 bg-white text-primary even:bg-[#F4FAFF]"
                >
                  <th scope="row" className="px-5 py-4 text-base font-medium">
                    {row.label}
                    {row.note && (
                      <span className="ml-2 rounded-sm border border-slate-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {row.note}
                      </span>
                    )}
                  </th>
                  <td className="px-5 py-4 text-base tabular-nums text-slate-600">
                    {row.oneTime ? (
                      <span className="text-sm">One-time</span>
                    ) : (
                      // Keyed by currency so the figure re-animates on switch.
                      <span key={display} className="inline-block animate-drawer-in">
                        {show(row.perYear)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-base font-bold tabular-nums">
                    <span key={display} className="inline-block animate-drawer-in">
                      {show(row.full)}
                    </span>
                  </td>
                </Reveal>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-primary bg-white text-primary">
                <th scope="row" className="px-5 py-5 text-base font-extrabold uppercase tracking-wide">
                  Estimated Total
                </th>
                <td className="px-5 py-5 text-lg font-extrabold tabular-nums">
                  <span key={display} className="inline-block animate-drawer-in">
                    {show(total.perYear)}
                  </span>
                </td>
                <td className="px-5 py-5 text-lg font-extrabold tabular-nums text-secondary">
                  <span key={display} className="inline-block animate-drawer-in">
                    {show(total.full)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm italic text-slate-500">
            Living costs are based on the funds a student visa usually asks you
            to show; your actual spend depends on city and lifestyle.
            {enteredFee ? "" : " Tuition is an estimate for this study level."}
            {" "}INR figures use indicative exchange rates.
          </p>
          <Link
            to="/scholarships"
            className="inline-flex shrink-0 items-center justify-center rounded-sm border border-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors duration-300 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Explore Scholarships
          </Link>
        </div>
      </Reveal>
    </Section>
  );
};

export default CourseFees;
