import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { RollIcon, RollText } from "@/shared/components/Roll";

/**
 * "View all" link closing a homepage listing, in the same pill-and-arrow shape
 * as the page's other calls to action so every button reads as one family.
 */
const ViewAllLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`group inline-flex items-center gap-3 rounded-full bg-secondary py-2.5 pl-6 pr-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
  >
    <RollText>{children}</RollText>
    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
      <RollIcon icon={HiArrowRight} />
    </span>
  </Link>
);

export default ViewAllLink;
