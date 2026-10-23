import React, { useId, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiArrowRight,
  HiBookOpen,
  HiBuildingLibrary,
  HiChevronDown,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { Container } from "@/features/home/components/ui/Section";
import { STUDY_LEVELS } from "@/features/home/data/homeContent";

/**
 * The landing page's tabbed search card, scoped to one destination.
 *
 * Two segments share one bar: "I'm looking for" (free text, with a chevron
 * that lists everything) and "I'm planning to study" (course type). The live
 * results under the bar are drawn only from the `universities` and `courses`
 * the page passes in (already filtered to this destination), so nothing from
 * another country can show up. Submitting opens the full listing with the
 * same destination pre-applied.
 */
const MODES = [
  { id: "universities", label: "Universities" },
  { id: "courses", label: "Courses" },
];

const MAX_RESULTS = 6;

// Same field styling as the landing page's CourseFinder.
const labelClass =
  "mb-2.5 ml-2.5 block text-sm font-bold text-white sm:text-[16px]";
const shellClass =
  "group relative flex h-14 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 transition-colors duration-200 hover:border-slate-300 focus-within:border-secondary";
const controlClass =
  "h-full w-full min-w-0 bg-transparent text-sm font-medium text-primary outline-none placeholder:text-slate-400";

const Field = ({ label, htmlFor, children }) => (
  <div>
    <label htmlFor={htmlFor} className={labelClass}>
      {label}
    </label>
    <div className={shellClass}>{children}</div>
  </div>
);

const includes = (value, query) =>
  (value || "").toLowerCase().includes(query);

const UNIVERSITY_FALLBACK = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "University")}&background=1F2853&color=fff&size=96`;

const DestinationSearch = ({ destination, universities, courses }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("universities");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [open, setOpen] = useState(false);
  const id = useId();
  const name = destination.name;

  const term = query.trim().toLowerCase();
  const active = open || term !== "" || level !== "";

  const results = useMemo(() => {
    if (mode === "universities") {
      // A course type keeps only universities offering that type here.
      const offering = level
        ? new Set(
            courses
              .filter((course) => course.type === level)
              .map((course) => course.university?._id || course.university),
          )
        : null;
      return universities.filter(
        (uni) =>
          (includes(uni.name, term) || includes(uni.location, term)) &&
          (!offering || offering.has(uni._id)),
      );
    }
    return courses.filter(
      (course) =>
        (includes(course.name, term) ||
          includes(course.university?.name, term)) &&
        (!level || course.type === level),
    );
  }, [mode, term, level, universities, courses]);

  const handleModeChange = (next) => {
    setMode(next);
    setQuery("");
    setLevel("");
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams({ destination: name });
    if (query.trim()) params.set("name", query.trim());
    if (mode === "courses" && level) params.set("type", level);
    navigate(`/${mode}?${params.toString()}`);
  };

  const noun = mode === "universities" ? "universities" : "courses";

  return (
    <div className="relative bg-white pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <Reveal>
          <div
            role="tablist"
            aria-label={`What would you like to search in ${name}?`}
            className="relative z-10 mx-auto flex w-fit max-w-full gap-1 rounded-full bg-[#243059] p-1.5 ring-[2px] ring-white"
          >
            {MODES.map(({ id: modeId, label }) => {
              const selected = mode === modeId;
              return (
                <button
                  key={modeId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => handleModeChange(modeId)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:px-6 ${
                    selected
                      ? "bg-secondary/10 text-secondary"
                      : "text-white hover:text-secondary"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit}
            className="-mt-7 rounded-[1.75rem] bg-[#243059] px-4 pb-6 pt-12 sm:px-10 sm:pb-8 sm:pt-14 lg:px-12"
          >
            <div className="grid items-end gap-4 sm:gap-5 lg:grid-cols-[1.2fr_1fr_auto]">
                <Field label="I'm looking for:" htmlFor={`${id}-query`}>
                  <input
                    id={`${id}-query`}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={
                      mode === "universities"
                        ? "Enter university name"
                        : "Enter subject or course:"
                    }
                    autoComplete="off"
                    className={controlClass}
                  />
                  <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={active}
                    aria-label={`Show all ${noun} in ${name}`}
                    className="shrink-0 text-slate-400 transition-colors hover:text-secondary"
                  >
                    <HiChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        active ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </Field>

                <Field label="I'm planning to study:" htmlFor={`${id}-level`}>
                  <select
                    id={`${id}-level`}
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                    className={`${controlClass} cursor-pointer appearance-none`}
                  >
                    <option value="">Select course type</option>
                    {STUDY_LEVELS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <HiChevronDown
                    className="pointer-events-none h-5 w-5 shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                </Field>

              <button
                type="submit"
                className="mt-1 h-14 cursor-pointer rounded-full bg-[#FF4E45] px-10 text-[17px] font-bold text-white transition-all sm:mt-0"
              >
                Search
              </button>
            </div>

            

            {/* Live results, drawn only from this destination's records. */}
            {active && (
              <div
                aria-live="polite"
                className="mt-6 overflow-hidden rounded-[1.25rem] bg-white"
              >
                {results.length > 0 ? (
                  <>
                    <ul className="divide-y divide-slate-100">
                      {results.slice(0, MAX_RESULTS).map((item) =>
                        mode === "universities" ? (
                          <li key={item._id}>
                            <Link
                              to={`/universities/${item._id}`}
                              className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50"
                            >
                              <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
                                <img
                                  src={item.logo || UNIVERSITY_FALLBACK(item.name)}
                                  alt=""
                                  onError={(e) => {
                                    e.target.src = UNIVERSITY_FALLBACK(item.name);
                                    e.target.onerror = null;
                                  }}
                                  className="h-full w-full object-contain"
                                />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold text-primary group-hover:text-secondary">
                                  {item.name}
                                </span>
                                <span className="mt-0.5 block truncate text-xs text-slate-500">
                                  {[item.location, item.ranking && `Rank ${item.ranking}`]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </span>
                              </span>
                              <HiArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-secondary" />
                            </Link>
                          </li>
                        ) : (
                          <li key={item._id}>
                            <Link
                              to={`/courses/${item._id}`}
                              className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50"
                            >
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                                <HiBookOpen className="h-5 w-5" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold text-primary group-hover:text-secondary">
                                  {item.name}
                                </span>
                                <span className="mt-0.5 block truncate text-xs text-slate-500">
                                  {[item.university?.name, item.type, item.duration]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </span>
                              </span>
                              <HiArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-secondary" />
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                    {results.length > MAX_RESULTS && (
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 border-t border-slate-100 px-5 py-3.5 text-sm font-semibold text-secondary transition-colors hover:bg-slate-50"
                      >
                        View all {results.length} {noun} in {name}
                        <HiArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-5 text-sm text-slate-500">
                    <HiBuildingLibrary className="h-5 w-5 shrink-0 text-slate-300" />
                    No {noun} in {name} match your search.
                  </div>
                )}
              </div>
            )}
          </form>
        </Reveal>
      </Container>
    </div>
  );
};

export default DestinationSearch;
