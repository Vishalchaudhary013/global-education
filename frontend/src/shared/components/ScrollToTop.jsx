import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the scroll position whenever the route changes.
 *
 * The browser keeps the previous scroll offset on client-side navigation, so
 * without this a visitor who scrolls halfway down a list and opens a detail
 * page lands in the middle of it. Renders nothing; mount it inside the router.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

