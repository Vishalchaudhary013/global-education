import { useEffect, useRef } from "react";

/**
 * Horizontal mouse-follow drift for the returned ref's element.
 *
 * Reproduces the reference interaction: with the pointer at 10% across the
 * element it sits `range` vw to the right, at 90% it sits `range` vw to the
 * left, linearly in between. Moves are heavily smoothed (each frame closes
 * `ease` of the remaining gap) and the element drifts back to centre when the
 * pointer leaves.
 *
 * Writes the transform straight to the node from a rAF loop, so React never
 * re-renders while the mouse moves, and the loop stops once settled. Inert
 * under `prefers-reduced-motion` and on devices without a hover pointer.
 */
export function useMouseParallax({ range = 5, ease = 0.1 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") return;

    const media = window.matchMedia?.bind(window);
    if (
      media?.("(prefers-reduced-motion: reduce)").matches ||
      !media?.("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let current = 0;
    let target = 0;
    let frame = 0;

    const render = () => {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.001) current = target;
      node.style.transform = `translate3d(${current}vw, 0, 0)`;
      frame = current === target ? 0 : requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const progress = (event.clientX - rect.left) / rect.width;
      const t = Math.min(Math.max((progress - 0.1) / 0.8, 0), 1);
      target = range - t * range * 2;
      start();
    };

    const onLeave = () => {
      target = 0;
      start();
    };

    node.style.willChange = "transform";
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      node.style.transform = "";
      node.style.willChange = "";
    };
  }, [range, ease]);

  return ref;
}

export default useMouseParallax;
