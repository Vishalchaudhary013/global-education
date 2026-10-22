import React from "react";
import { useInView } from "@/shared/hooks/useInView";

/**
 * Clipping wrapper whose photo zooms out into place the first time it enters
 * the viewport: the image fades in while scaling from 110% to 100%, after a
 * short 300ms hold, over 1000ms easeOutCubic.
 *
 * The wrapper keeps whatever classes it is given (rounding, overflow, size),
 * so it drops in for an existing `overflow-hidden` frame without changing the
 * layout. The motion lives in `index.css` under `[data-reveal-img]`.
 */
const RevealImage = ({ as = "div", className = "", children, ...rest }) => {
  const Tag = as;
  const [ref, inView] = useInView({ threshold: 0, rootMargin: "0px" });

  return (
    <Tag
      ref={ref}
      data-reveal-img={inView ? "in" : "out"}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default RevealImage;
