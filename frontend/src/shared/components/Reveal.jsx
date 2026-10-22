import React from "react";
import { useInView } from "@/shared/hooks/useInView";

/**
 * Reveals its children once they scroll into view.
 *
 * The motion itself lives in `index.css` under `[data-reveal]`; this component
 * only decides when to flip the attribute and passes the offsets through as
 * custom properties. That keeps every reveal on the same easing and duration,
 * and makes a stagger a matter of handing each child a larger `delay`.
 *
 *   <Reveal y={32}>…</Reveal>                     rise
 *   <Reveal x={-40} y={0}>…</Reveal>              slide in from the left
 *   <Reveal scale={0.96} y={0}>…</Reveal>         settle
 *   {items.map((item, i) => <Reveal delay={i * 80} …>)}   stagger
 */
const Reveal = ({
  as = "div",
  y = 24,
  x = 0,
  scale = 1,
  delay = 0,
  blur = false,
  threshold = 0.15,
  className = "",
  style,
  children,
  ...rest
}) => {
  // Assigned here rather than destructured as `as: Tag`, so the capitalised
  // component name is a variable the lint config's ignore pattern covers.
  const Tag = as;
  const [ref, inView] = useInView({ threshold });

  return (
    <Tag
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      data-reveal-blur={blur ? "" : undefined}
      className={className}
      style={{
        "--reveal-y": `${y}px`,
        "--reveal-x": `${x}px`,
        "--reveal-scale": scale,
        "--reveal-delay": `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
