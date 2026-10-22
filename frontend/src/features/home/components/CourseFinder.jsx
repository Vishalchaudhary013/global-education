import React, { useId, useState } from "react";
import { HiChevronDown, HiMagnifyingGlass } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { Container } from "./ui/Section";
import {
  DESTINATION_OPTIONS,
  EVENT_CITIES,
  MONTHS,
  STUDY_LEVELS,
  SUBJECTS,
} from "../data/homeContent";

/**
 * The discovery entry point for the site: a tab strip sitting on the top edge
 * of a wide search card, with a different field set behind each tab.
 *
 * Every mode submits into a route that reads these exact query parameters, so
 * no control here is decorative:
 *   universities  → /universities?name=&destination=
 *   courses       → /courses?name=&type=&destination=
 *   scholarships  → /scholarships?name=&destination=
 *   events        → /events?city=&month=&destination=
 */
const MODES = [
  { id: "universities", label: "Universities" },
  { id: "courses", label: "Courses" },
  { id: "scholarships", label: "Scholarships" },
  { id: "events", label: "Events" },
];

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

const Chevron = () => (
  <HiChevronDown
    className="pointer-events-none h-5 w-5 shrink-0 text-slate-400"
    aria-hidden="true"
  />
);

const Select = ({ id, value, onChange, placeholder, options }) => (
  <>
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`${controlClass} cursor-pointer appearance-none`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <Chevron />
  </>
);

const CourseFinder = ({ navigate }) => {
  const [mode, setMode] = useState("universities");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");
  const id = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (mode === "events") {
      if (city) params.set("city", city);
      if (month) params.set("month", month);
      if (destination) params.set("destination", destination);
      navigate(`/events?${params.toString()}`);
      return;
    }

    if (destination) params.set("destination", destination);

    if (mode === "courses") {
      if (subject) params.set("name", subject);
      if (level) params.set("type", level);
      navigate(`/courses?${params.toString()}`);
      return;
    }

    if (name.trim()) params.set("name", name.trim());
    navigate(
      mode === "scholarships"
        ? `/scholarships?${params.toString()}`
        : `/universities?${params.toString()}`,
    );
  };

  const columns =
    mode === "courses" || mode === "events"
      ? "lg:grid-cols-[1fr_1fr_1fr_auto]"
      : "lg:grid-cols-[1.2fr_1fr_auto]";

  return (
    <div className="relative bg-[#F4FAFF] pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <Reveal>
          {/* Tab strip, overlapping the card's top edge. A ring in the page
              background colour cuts a notch into the card around it, so the
              strip reads as its own control rather than part of the card. On
              phones the four tabs cannot share one row, so they wrap into a
              2×2 grid. */}
          <div
            role="tablist"
            aria-label="What would you like to search?"
            className="relative z-10 mx-auto grid w-[calc(100%-1.5rem)] grid-cols-2 gap-1 rounded-[1.4rem] bg-[#243059] p-1.5 ring-[2px] ring-[#F4FAFF] sm:flex sm:w-fit sm:max-w-full sm:rounded-full"
          >
            {MODES.map(({ id: modeId, label }) => {
              const active = mode === modeId;
              return (
                <button
                  key={modeId}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(modeId)}
                  className={`whitespace-nowrap rounded-full px-3 py-2.5 text-sm sm:px-5 font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                    active
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
            <div className={`grid items-end gap-4 sm:gap-5 ${columns}`}>
              {mode === "courses" && (
                <>
                  <Field label="Select Subject*" htmlFor={`${id}-subject`}>
                    <Select
                      id={`${id}-subject`}
                      value={subject}
                      onChange={setSubject}
                      placeholder="Select Course"
                      options={SUBJECTS}
                    />
                  </Field>

                  <Field label="Study Level*" htmlFor={`${id}-level`}>
                    <Select
                      id={`${id}-level`}
                      value={level}
                      onChange={setLevel}
                      placeholder="Select Level"
                      options={STUDY_LEVELS}
                    />
                  </Field>

                  <Field label="Study Destination*" htmlFor={`${id}-dest`}>
                    <Select
                      id={`${id}-dest`}
                      value={destination}
                      onChange={setDestination}
                      placeholder="Select Destination"
                      options={DESTINATION_OPTIONS}
                    />
                  </Field>
                </>
              )}

              {mode === "events" && (
                <>
                  <Field label="Select City" htmlFor={`${id}-city`}>
                    <Select
                      id={`${id}-city`}
                      value={city}
                      onChange={setCity}
                      placeholder="Select City"
                      options={EVENT_CITIES}
                    />
                  </Field>

                  <Field label="Select Month" htmlFor={`${id}-month`}>
                    <Select
                      id={`${id}-month`}
                      value={month}
                      onChange={setMonth}
                      placeholder="Select Month"
                      options={MONTHS}
                    />
                  </Field>

                  <Field label="Select Study Destination" htmlFor={`${id}-dest`}>
                    <Select
                      id={`${id}-dest`}
                      value={destination}
                      onChange={setDestination}
                      placeholder="Select Destination"
                      options={DESTINATION_OPTIONS}
                    />
                  </Field>
                </>
              )}

              {(mode === "universities" || mode === "scholarships") && (
                <>
                  <Field
                    label={
                      mode === "scholarships"
                        ? "Search By Scholarship Name*"
                        : "Search By University Name*"
                    }
                    htmlFor={`${id}-name`}
                  >
                    <HiMagnifyingGlass
                      className="h-5 w-5 shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-secondary"
                      aria-hidden="true"
                    />
                    <input
                      id={`${id}-name`}
                      type="search"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Search Here"
                      className={controlClass}
                    />
                  </Field>

                  <Field
                    label="Select a Study Destination"
                    htmlFor={`${id}-dest`}
                  >
                    <Select
                      id={`${id}-dest`}
                      value={destination}
                      onChange={setDestination}
                      placeholder="Select Study Destination"
                      options={DESTINATION_OPTIONS}
                    />
                  </Field>
                </>
              )}

              <button
                type="submit"
                className="mt-1 h-14 cursor-pointer rounded-full bg-[#FF4E45] px-10 text-[17px] font-bold text-white transition-all sm:mt-0"
              >
                Search
              </button>
            </div>
          </form>
        </Reveal>
      </Container>
    </div>
  );
};

export default CourseFinder;
