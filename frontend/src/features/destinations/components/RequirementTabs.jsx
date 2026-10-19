import React, { useState } from "react";
import {
  HiIdentification,
  HiAcademicCap,
  HiBriefcase,
  HiDocumentText,
  HiUser,
  HiBanknotes,
  HiPaperAirplane,
  HiDocumentCheck,
} from "react-icons/hi2";

const TABS = [
  { key: "university", label: "University" },
  { key: "tests", label: "Tests" },
  { key: "visa", label: "Visa" },
];

/** Rotating icon set so each requirement row gets a distinct glyph. */
const ICONS = [
  HiPaperAirplane,
  HiAcademicCap,
  HiBriefcase,
  HiDocumentText,
  HiUser,
  HiIdentification,
  HiDocumentCheck,
  HiBanknotes,
];

const RequirementTabs = ({ requirements }) => {
  const [active, setActive] = useState("university");
  const available = TABS.filter((tab) => requirements?.[tab.key]?.length);

  if (!available.length) return null;

  const current = available.some((tab) => tab.key === active) ? active : available[0].key;
  const items = requirements[current] || [];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {available.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`px-4 py-1.5 rounded-sm text-sm font-medium border transition-colors ${
              current === tab.key
                ? "bg-[#FF4E45] border-[#FF4E45] text-white"
                : "bg-white border-slate-200 text-[#1F2853] hover:border-[#FF4E45] hover:text-[#FF4E45]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div
              key={item}
              className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-sm px-4 py-3.5"
            >
              <span className="text-sm font-medium text-[#1F2853]">{item}</span>
              <Icon className="h-4 w-4 text-slate-400 shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequirementTabs;
