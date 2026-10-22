import React from "react";

/**
 * Hover "roll" used on buttons, driven by the nearest `group` ancestor.
 *
 * `RollText` stacks a copy of the label below itself: on hover the label
 * slides up and out while the copy slides up into its place, and both run
 * back on mouse-out. `RollIcon` does the same sideways for an arrow — it exits
 * to the right while a copy enters from the left. Drop `RollIcon` into an
 * existing icon circle; that circle needs `relative overflow-hidden`.
 *
 * The copies are `aria-hidden`, so the label is announced once.
 */
const ROLL = "transition-transform duration-500 ease-out-cubic motion-reduce:transition-none";

export const RollText = ({ children }) => (
  <span className="relative inline-flex overflow-hidden whitespace-nowrap">
    <span className={`block ${ROLL} group-hover:-translate-y-[250%]`}>
      {children}
    </span>
    <span
      aria-hidden="true"
      className={`absolute inset-0 block translate-y-[250%] ${ROLL} group-hover:translate-y-0`}
    >
      {children}
    </span>
  </span>
);

export const RollIcon = ({ icon, className = "h-4 w-4" }) => {
  // Assigned rather than destructured as `icon: Icon`, so the capitalised name
  // is a variable the lint config's ignore pattern covers.
  const Icon = icon;

  return (
    <>
      <Icon
        aria-hidden="true"
        className={`${className} ${ROLL} group-hover:translate-x-6`}
      />
      <Icon
        aria-hidden="true"
        className={`absolute ${className} -translate-x-6 ${ROLL} group-hover:translate-x-0`}
      />
    </>
  );
};
