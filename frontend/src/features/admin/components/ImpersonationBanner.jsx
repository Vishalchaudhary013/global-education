import React from "react";
import { HiArrowUturnLeft } from "react-icons/hi2";

/** Shown while a superadmin is viewing another admin's dashboard. */
const ImpersonationBanner = ({ name, onExit }) => (
  <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg">
    <span className="text-sm font-semibold">
      You are viewing {name}&apos;s dashboard as Super Admin.
    </span>
    <button
      type="button"
      onClick={onExit}
      className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
    >
      <HiArrowUturnLeft className="w-4 h-4" />
      Back to Super Admin
    </button>
  </div>
);

export default ImpersonationBanner;
