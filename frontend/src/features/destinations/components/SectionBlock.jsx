import React from "react";

/**
 * Section wrapper for the destination guide: an icon + heading on the left and
 * an optional action (link / button) pinned to the right.
 */
const SectionBlock = ({ icon: Icon, title, action, children, className = "" }) => (
  <section className={className}>
    <div className="flex items-end justify-between gap-4 mb-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-[#1F2853]">
        {Icon && <Icon className="h-5 w-5 text-[#FF4E45] shrink-0" />}
        {title}
      </h2>
      {action}
    </div>
    {children}
  </section>
);

export default SectionBlock;
