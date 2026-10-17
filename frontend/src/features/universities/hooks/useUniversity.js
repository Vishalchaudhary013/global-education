import { useEffect, useState } from "react";
import { getUniversityById } from "../services/universityService";

export function useUniversity(id) {
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchUniversity = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUniversityById(id);
        if (active) setUniversity(data);
      } catch (err) {
        console.error("Failed to fetch university", err);
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchUniversity();
    return () => {
      active = false;
    };
  }, [id]);

  return { university, loading, error };
}
