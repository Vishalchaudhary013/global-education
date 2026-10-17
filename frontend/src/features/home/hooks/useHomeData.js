import { useEffect, useState } from "react";
import { getArticles } from "@/features/articles/services/articleService";
import { getEvents } from "@/features/events/services/eventService";

/**
 * Home shows events and articles side by side. Articles are optional: a failure
 * there must not blank out the events section.
 */
export function useHomeData() {
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [eventsData, articlesData] = await Promise.all([
          getEvents(),
          getArticles().catch(() => []),
        ]);
        if (!active) return;
        setEvents(eventsData || []);
        setArticles(articlesData || []);
      } catch (err) {
        console.error("Failed to fetch home data", err);
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  return { events, articles, loading, error };
}
