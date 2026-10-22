import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Take scroll position over from the browser, so a reload or a back/forward
// navigation also opens at the top instead of at the remembered offset.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

/**
 * Starts every navigation at the top of the page.
 *
 * Keyed on `location.key`, which is new for every navigation, so it also fires
 * when only the query string changes (`/courses?level=ug` → `?level=pg`) or a
 * link to the current page is clicked — cases a `pathname` check misses.
 *
 * Runs in a layout effect, before the browser paints, so the new page never
 * flashes at the previous scroll offset. A URL with a `#hash` scrolls to that
 * element instead. Renders nothing; mount it inside the router.
 */
const ScrollToTop = () => {
  const { key, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    // "instant" overrides any CSS smooth scrolling, so the jump is not animated.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [key, hash]);

  return null;
};

export default ScrollToTop;
