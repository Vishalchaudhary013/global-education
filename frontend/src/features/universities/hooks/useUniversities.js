import { useCallback, useEffect, useState } from "react";
import { getUniversities } from "../services/universityService";

export function useUniversities(params) {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUniversities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUniversities(params);
      setUniversities(data || []);
    } catch (err) {
      console.error("Failed to fetch universities", err);
      setError(err);
      setUniversities([]);
    } finally {
      setLoading(false);
    }
    // params is an object literal at most call sites; compare by value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params ?? null)]);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  return { universities, loading, error, refetch: fetchUniversities };
}
