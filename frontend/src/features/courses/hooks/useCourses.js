import { useCallback, useEffect, useState } from "react";
import { getCourses } from "../services/courseService";

export function useCourses(params) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCourses(params);
      setCourses(data || []);
    } catch (err) {
      console.error("Failed to fetch courses from API", err);
      setError(err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params ?? null)]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
}
