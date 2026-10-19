import React from "react";
import { HiPlus } from "react-icons/hi2";

const buttonTones = {
  primary:
    "rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all active:scale-95",
  brand:
    "rounded-sm bg-[#1F2853] text-white hover:bg-[#2b366b] transition-colors",
};

/**
 * Title, row count and the create button of a catalogue tab. Only rendered
 * while the list is on screen — the form carries its own heading.
 */
const ResourceHeader = ({
  title,
  subtitle,
  createLabel,
  onCreate,
  tone = "primary",
}) => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
    </div>
    <button
      type="button"
      onClick={onCreate}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold ${buttonTones[tone]}`}
    >
      <HiPlus className="w-4 h-4" />
      {createLabel}
    </button>
  </div>
);

export default ResourceHeader;
