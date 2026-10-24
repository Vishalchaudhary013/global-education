import React, { useState } from "react";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";

/**
 * TEMPORARY general requirements, shown when a university has none entered.
 * Remove once every university has its own.
 */
const DEFAULT_APPLICATION = [
  "Register on the official application portal to receive your login details",
  "Sign in and fill in your personal details",
  "Select your preferred course and intake",
  "Add your education history with all qualifications",
  "Fill in the details of your employment history, if any",
  "Write and upload your personal statement",
  "Submit the application form and pay the application fee",
];

const DEFAULT_DOCUMENTS = [
  "Official academic transcripts and grade cards",
  "Passport-size photographs",
  "Copy of your passport",
  "Student visa",
  "Updated CV / resume",
  "English language proficiency test scores (IELTS, TOEFL or PTE)",
  "Letters of recommendation",
  "Statement of purpose",
];

/** Admin enters one item per line; blank lines are ignored. */
const toList = (text) =>
  String(text ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

/**
 * "Admission Requirements" band: two tabs, the application steps and the
 * documents to prepare, both as numbered lists. Items flow down two columns on
 * desktop and re-animate in sequence when the tab changes.
 */
const UniversityRequirements = ({ university }) => {
  const { name } = university;

  const tabs = [
    {
      key: "application",
      label: "Application",
      items: toList(university.applicationSteps),
      fallback: DEFAULT_APPLICATION,
    },
    {
      key: "documents",
      label: "Documents",
      items: toList(university.requiredDocuments),
      fallback: DEFAULT_DOCUMENTS,
    },
  ].map((tab) => ({ ...tab, items: tab.items.length ? tab.items : tab.fallback }));

  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((tab) => tab.key === active) || tabs[0];

  return (
    <Section id="requirements" >
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          How to Apply
        </p>
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
          Admission Requirements
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          The main requirements to check before applying to {name} as an
          international student.
        </p>
      </Reveal>

      <Reveal y={30} delay={150} className="mt-8">
        <div
          role="tablist"
          aria-label="Admission requirements"
          className="inline-flex gap-2"
        >
          {tabs.map((tab) => {
            const selected = tab.key === current.key;
            return (
              <button
                key={tab.key}
                id={`req-tab-${tab.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="req-panel"
                onClick={() => setActive(tab.key)}
                className={`rounded-sm border px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-white text-primary "
                }`}
              >
                {tab.label}
                
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal y={40} delay={250} className="mt-8">
        {/* Keyed by tab so the rows replay their entrance on every switch. */}
        <ol
          key={current.key}
          id="req-panel"
          role="tabpanel"
          aria-labelledby={`req-tab-${current.key}`}
          className="gap-x-12 lg:columns-2"
        >
          {current.items.map((item, index) => (
            <li
              key={item}
              className="flex break-inside-avoid items-start gap-4 border-b border-slate-200 py-4 animate-drawer-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center  text-md font-bold text-secondary"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-0.5 text-md font-[410] leading-6 text-primary">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
};

export default UniversityRequirements;
