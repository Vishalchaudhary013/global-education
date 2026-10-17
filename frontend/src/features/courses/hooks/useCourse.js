import { useEffect, useState } from "react";
import { getCourseById } from "../services/courseService";

export function useCourse(id) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCourseById(id);
        if (active) setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course", err);
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCourse();
    return () => {
      active = false;
    };
  }, [id]);

  return { course, loading, error };
}
