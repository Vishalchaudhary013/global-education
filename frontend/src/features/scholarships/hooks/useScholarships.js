import { useCallback, useEffect, useState } from "react";
import { getScholarships } from "../services/scholarshipService";

export function useScholarships(params) {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScholarships = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getScholarships(params);
      setScholarships(data || []);
    } catch (err) {
      console.error("Failed to fetch scholarships from API", err);
      setError(err);
      setScholarships([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params ?? null)]);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  return { scholarships, loading, error, refetch: fetchScholarships };
}
