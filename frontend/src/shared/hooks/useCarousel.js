import { useEffect, useRef, useState } from "react";

/**
 * Arrow controls for a native scroll-snap card strip.
 *
 * Attach `trackRef` to the scrolling list. The arrows scroll by one card's
 * width plus `gap`, and `atStart` / `atEnd` let them disable themselves at
 * each end so they never look live when they are not.
 */
export const useCarousel = ({ gap = 20 } = {}) => {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + gap : 320;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return { trackRef, atStart, atEnd, scrollByCard };
};
