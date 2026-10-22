import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollText } from "@/shared/components/Roll";

/**
 * The eyebrow / heading / lead-in group every section opens with.
 *
 * The eyebrow is a small accent square followed by a tracked uppercase label,
 * which is the marker that ties the sections together visually.
 *
 * Headings render as `h2` by default: the page has exactly one `h1`, in the
 * hero, so the rest of the outline stays flat and predictable.
 */
const SectionHeading = ({
  eyebrow,
  title,
  description,
  link,
  linkLabel = "View all",
  align = "center",
  inverted = false,
  as = "h2",
  className = "",
}) => {
  const Heading = as;
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered
          ? "items-center text-center"
          : "lg:flex-row lg:items-end lg:justify-between"
      } ${className}`}
    >
      <Reveal className={centered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p
            className={`mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary ${
              centered ? "justify-center" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-secondary"
            />
            {eyebrow}
          </p>
        )}

        <Heading
          className={`text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl ${
            inverted ? "text-white" : "text-primary"
          }`}
        >
          {title}
        </Heading>

        {description && (
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              inverted ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        )}
      </Reveal>

      {link && (
        <Reveal className={centered ? "" : "shrink-0"}>
          <Link
            to={link}
            className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
              inverted
                ? "border-white/25 text-white hover:border-white hover:bg-white hover:text-primary"
                : "border-slate-200 text-primary hover:border-primary hover:bg-primary hover:text-white"
            }`}
          >
            <RollText>{linkLabel}</RollText>
            <HiArrowLongRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
