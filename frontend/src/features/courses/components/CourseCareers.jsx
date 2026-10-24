import React from "react";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";
import { SALARY_COUNTRIES, careersFor } from "../data/careerSalaries";

/**
 * "Careers & Salaries" table: common roles for the course's subject with an
 * indicative salary range per country, styled like the university page's
 * fees table. The course's own destination, when it is one of the listed
 * countries, moves to the first salary column and is marked.
 */
const CourseCareers = ({ course }) => {
  const { subject, careers } = careersFor(course.name);
  const destination = course.destination?.trim().toLowerCase();

  const home = SALARY_COUNTRIES.find(
    (country) => country.key.toLowerCase() === destination,
  );
  const countries = home
    ? [home, ...SALARY_COUNTRIES.filter((country) => country !== home)]
    : SALARY_COUNTRIES;

  return (
    <Section id="careers">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Careers & Salaries
        </p>
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
          {subject
            ? `Top careers after a ${subject} degree`
            : `Top careers after ${course.name}`}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Indicative annual salary ranges for the most common career paths, by
          country. All figures are in the local currency.
        </p>
      </Reveal>

      <Reveal className="mt-10 lg:mt-12">
        {/* `overflow-x-auto` alone makes the y axis scrollable too, so any
            row still mid-animation would flash a vertical scrollbar. */}
        <div className="overflow-x-auto overflow-y-hidden rounded-sm border border-slate-200">
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <thead>
              <tr className="bg-[#F4FAFF] text-sm font-bold uppercase tracking-wide text-primary">
                <th scope="col" className="border-b border-slate-200 px-5 py-4">
                  Role
                </th>
                {countries.map((country) => (
                  <th
                    key={country.key}
                    scope="col"
                    className={`w-36 border-b border-slate-200 px-5 py-4 `}
                  >
                    {country.label}{" "}
                    {/* <span className="font-semibold text-slate-500">
                      ({country.code})
                    </span> */}
                   
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {careers.map((career, index) => (
                <Reveal
                  as="tr"
                  key={career.role}
                  y={0}
                  delay={index * 40}
                  className="border-b border-slate-200 bg-white text-primary last:border-b-0 even:bg-[#F4FAFF]"
                >
                  <th scope="row" className="px-5 py-4 text-base font-bold">
                    {career.role}
                  </th>
                  {countries.map((country) => (
                    <td
                      key={country.key}
                      className={`px-5 py-4 text-base tabular-nums `}
                    >
                      {career[country.key]}
                    </td>
                  ))}
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-sm italic text-slate-500">
          Salary ranges are indicative and vary by employer, city and
          experience. Always confirm current market rates before making career
          decisions.
        </p>
      </Reveal>
    </Section>
  );
};

export default CourseCareers;
