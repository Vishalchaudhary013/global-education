import React, { useId, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";
import { requirementsFor } from "../data/courseRequirements";

/**
 * "Requirements" band: documents to prepare, grouped into tabs (academic,
 * English tests, identity, medical, professional). Each document is a card in
 * a two-column grid; its plus button opens a short explanation below the
 * title. Cards replay their entrance when the tab changes.
 */
const CourseRequirements = ({ course }) => {
  const tabs = requirementsFor(course);
  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((tab) => tab.key === active) || tabs[0];

  return (
    <Section id="requirements">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Requirements
        </p>
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
          Documents You Need
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          The requirements may vary based on your selected study options.
        </p>
      </Reveal>

      <Reveal y={30} delay={150} className="mt-8">
        <div
          role="tablist"
          aria-label="Requirements"
          className="flex flex-wrap gap-2"
        >
          {tabs.map((tab) => {
            const selected = tab.key === current.key;
            return (
              <button
                key={tab.key}
                id={`course-req-tab-${tab.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="course-req-panel"
                onClick={() => setActive(tab.key)}
                className={`rounded-sm border px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-white text-primary hover:border-primary"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal y={40} delay={250} className="mt-8">
        {/* Keyed by tab so cards replay their entrance and close on every switch. */}
        <ul
          key={current.key}
          id="course-req-panel"
          role="tabpanel"
          aria-labelledby={`course-req-tab-${current.key}`}
          className="grid items-start gap-4 md:grid-cols-2"
        >
          {current.items.map((item, index) => (
            <RequirementCard key={item.title} item={item} index={index} />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
};

/**
 * One document: title and optional minimum on the left, a plus button on the
 * right that turns into a close mark and slides the explanation open.
 */
const RequirementCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li
      className="animate-drawer-in rounded-sm border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-snug text-primary">
            {item.title}
          </h3>
          {item.detail && (
            <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
          )}
        </div>

        {item.description && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? "Hide" : "Show"} details for ${item.title}`}
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
              open
                ? "border-secondary text-secondary"
                : "border-slate-200 text-primary hover:border-secondary hover:text-secondary"
            }`}
          >
            <HiPlus
              aria-hidden="true"
              className={`h-5 w-5 transition-transform duration-300 ease-out-cubic ${
                open ? "rotate-45" : ""
              }`}
            />
          </button>
        )}
      </div>

      {item.description && (
        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-500 ease-out-cubic ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </li>
  );
};

export default CourseRequirements;
