import React from "react";

/**
 * One source of truth for homepage section rhythm.
 *
 * Every band shares the same container width, responsive side gutters and
 * vertical spacing scale, which is what stops the page reading as a stack of
 * separately built blocks. `tone` picks from the two backgrounds the page
 * alternates between so sections flow instead of fighting each other.
 */
const TONES = {
  white: "bg-white",
  light: "bg-[#F4FAFF]",
};

const SPACING = {
  normal: "py-16 sm:py-20 lg:py-28",
  tight: "py-12 sm:py-16 lg:py-20",
  loose: "py-20 sm:py-28 lg:py-36",
};

export const Container = ({ className = "", children }) => (
  <div
    className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 ${className}`}
  >
    {children}
  </div>
);

const Section = ({
  id,
  tone = "white",
  spacing = "normal",
  className = "",
  containerClassName = "",
  children,
  ...rest
}) => (
  <section
    id={id}
    className={`relative ${TONES[tone] || TONES.white} ${SPACING[spacing]} ${className}`}
    {...rest}
  >
    <Container className={containerClassName}>{children}</Container>
  </section>
);

export default Section;
