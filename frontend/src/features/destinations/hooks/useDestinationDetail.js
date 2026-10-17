import { useEffect, useState } from "react";
import { getCourses } from "@/features/courses/services/courseService";
import { getUniversities } from "@/features/universities/services/universityService";
import { getDestinationById } from "../services/destinationService";

/**
 * Loads a destination together with the course catalogue and the universities
 * that belong to it. The universities call depends on the destination name, so
 * it runs after the first two resolve.
 */
export function useDestinationDetail(destId) {
  const [destination, setDestination] = useState(null);
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchDestData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [destinationData, coursesData] = await Promise.all([
          getDestinationById(destId),
          getCourses(),
        ]);
        if (!active) return;
        setDestination(destinationData);
        setCourses(coursesData || []);

        if (destinationData?.name) {
          const universitiesData = await getUniversities({
            destination: destinationData.name,
          });
          if (active) setUniversities(universitiesData || []);
        }
      } catch (err) {
        console.error("Failed to fetch destination data", err);
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchDestData();
    return () => {
      active = false;
    };
  }, [destId]);

  return { destination, courses, universities, loading, error };
}
