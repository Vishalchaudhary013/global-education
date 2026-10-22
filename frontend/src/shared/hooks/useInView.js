import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the returned ref's element has entered the viewport.
 *
 * `once` (the default) disconnects after the first intersection, which is what
 * scroll reveals and count-ups want: they are an entrance, not a state that
 * should replay every time the user scrolls back past the section.
 *
 * Returns `true` immediately when IntersectionObserver is unavailable so
 * content can never be stranded in its hidden pre-reveal state.
 */
export function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  // Resolved during the first render, not in an effect, so a browser without
  // IntersectionObserver paints the content visible instead of flashing it in.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

export default useInView;
