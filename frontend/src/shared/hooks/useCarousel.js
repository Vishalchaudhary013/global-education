import { useEffect, useRef, useState } from "react";

/**
 * Arrow controls for a native scroll-snap card strip.
 *
 * Attach `trackRef` to the scrolling list. The arrows scroll by one card's
 * width plus `gap`, and `atStart` / `atEnd` let them disable themselves at
 * each end so they never look live when they are not. `canScroll` is false
 * while every card already fits, so the arrows can be left out entirely.
 *
 * The strip is re-measured on scroll, on window resize and whenever its cards
 * change. Listeners attach whenever the strip element appears or changes, not
 * only on mount, so a section that renders its list after data loads is
 * measured too.
 */
export const useCarousel = ({ gap = 20 } = {}) => {
  const trackRef = useRef(null);
  const bound = useRef({ track: null, detach: null });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const sync = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanScroll(max > 4);
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
  };

  const attach = (track) => {
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    const cards = new MutationObserver(sync);
    cards.observe(track, { childList: true });
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      cards.disconnect();
    };
  };

  // Runs after every render but only (re)binds when the strip element itself
  // changes: mounted late, swapped, or removed.
  useEffect(() => {
    const track = trackRef.current;
    if (track === bound.current.track) return;
    bound.current.detach?.();
    bound.current = { track, detach: track ? attach(track) : null };
  });

  useEffect(() => () => bound.current.detach?.(), []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + gap : 320;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return { trackRef, atStart, atEnd, canScroll, scrollByCard };
};
