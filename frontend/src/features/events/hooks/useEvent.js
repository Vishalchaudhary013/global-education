import { useEffect, useState } from "react";
import { getEventById } from "../services/eventService";

export function useEvent(id) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEventById(id);
        if (active) setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event", err);
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchEvent();
    return () => {
      active = false;
    };
  }, [id]);

  return { event, loading, error };
}
