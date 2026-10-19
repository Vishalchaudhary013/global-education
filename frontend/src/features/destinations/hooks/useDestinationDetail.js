import { useEffect, useMemo, useState } from "react";
import { getCourses } from "@/features/courses/services/courseService";
import { getUniversities } from "@/features/universities/services/universityService";
import { getArticles } from "@/features/articles/services/articleService";
import { getDestinationById } from "../services/destinationService";
import { resolveGuide } from "../data/destinationGuides";

const matchesDestination = (article, name) => {
  if (!name) return false;
  const needle = name.toLowerCase();
  const haystack = [article.title, article.excerpt, article.category, ...(article.tags || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
};

/**
 * Loads a destination together with the course catalogue, the universities that
 * belong to it, and articles that mention it. The universities call depends on
 * the destination name, so it runs after the first calls resolve.
 */
export function useDestinationDetail(destId) {
  const [destination, setDestination] = useState(null);
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchDestData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [destinationData, coursesData, articlesData] = await Promise.all([
          getDestinationById(destId),
          getCourses(),
          getArticles().catch(() => []),
        ]);
        if (!active) return;
        setDestination(destinationData);
        setCourses(coursesData || []);

        if (destinationData?.name) {
          setArticles(
            (articlesData || []).filter((article) =>
              matchesDestination(article, destinationData.name)
            )
          );

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

  const guide = useMemo(
    () => resolveGuide(destId, destination?.guide),
    [destId, destination]
  );

  return { destination, guide, courses, universities, articles, loading, error };
}
