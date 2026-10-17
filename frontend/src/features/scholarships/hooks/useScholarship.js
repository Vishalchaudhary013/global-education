import { useEffect, useState } from "react";
import { getScholarshipById } from "../services/scholarshipService";

export function useScholarship(id) {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchScholarship = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getScholarshipById(id);
        if (active) setScholarship(data);
      } catch (err) {
        console.error("Failed to fetch scholarship", err);
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchScholarship();
    return () => {
      active = false;
    };
  }, [id]);

  return { scholarship, loading, error };
}
