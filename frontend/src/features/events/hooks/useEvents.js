import { useCallback, useEffect, useState } from "react";
import { getEvents } from "../services/eventService";

export function useEvents(params) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents(params);
      setEvents(data || []);
    } catch (err) {
      console.error("Failed to fetch events from API", err);
      setError(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params ?? null)]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}
