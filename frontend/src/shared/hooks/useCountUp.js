import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts from 0 to `target` once `active` turns true, then stops for good.
 *
 * Driven by requestAnimationFrame against a timestamp rather than a fixed
 * per-frame step, so the duration holds on any refresh rate. Callers pass
 * `active` from `useInView`, which fires once — so scrolling back past the
 * statistics does not restart them.
 *
 * Under `prefers-reduced-motion` the final value is returned straight away.
 */
export function useCountUp(target, { duration = 1600, active = true } = {}) {
  const [value, setValue] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return;
    doneRef.current = true;

    const end = Number(target) || 0;
    // A zero-length run lands on the final value on the very first frame,
    // which is how reduced motion is honoured without a second code path.
    const span = prefersReducedMotion() ? 0 : duration;

    let frame = 0;
    const started = performance.now();

    const tick = (now) => {
      const progress = span === 0 ? 1 : Math.min((now - started) / span, 1);
      // Ease-out cubic: fast off the mark, settling gently on the final value.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);

  return value;
}

export default useCountUp;
