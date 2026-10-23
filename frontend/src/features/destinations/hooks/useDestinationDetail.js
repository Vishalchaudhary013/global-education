import { useEffect, useMemo, useState } from "react";
import { getCourses } from "@/features/courses/services/courseService";
import { getUniversities } from "@/features/universities/services/universityService";
import { getArticles } from "@/features/articles/services/articleService";
import { getScholarships } from "@/features/scholarships/services/scholarshipService";
import { getDestinationById } from "../services/destinationService";
import { resolveGuide } from "../data/destinationGuides";

/**
 * Other spellings records use for the same country. Course, university and
 * scholarship records store `destination` as free text, so "UK", "uk" and
 * "United Kingdom" all have to land on the same page.
 */
const DESTINATION_ALIASES = {
  uk: ["unitedkingdom", "greatbritain", "britain", "england", "gb"],
  usa: ["us", "unitedstates", "unitedstatesofamerica", "america"],
  dubai: ["uae", "unitedarabemirates"],
  newzealand: ["nz"],
};

export const normalizeDestination = (value) =>
  (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

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
 * Loads a destination together with the courses, universities, scholarships
 * and articles that belong to it. Everything except articles is filtered here
 * against the destination's slug, name and known aliases, so the page and its
 * search bar never see another country's records.
 */
export function useDestinationDetail(destId) {
  const [destination, setDestination] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const [allScholarships, setAllScholarships] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchDestData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [destinationData, coursesData, universitiesData, scholarshipsData, articlesData] =
          await Promise.all([
            getDestinationById(destId),
            getCourses().catch(() => []),
            getUniversities().catch(() => []),
            getScholarships().catch(() => []),
            getArticles().catch(() => []),
          ]);
        if (!active) return;
        setDestination(destinationData);
        setAllCourses(coursesData || []);
        setAllUniversities(universitiesData || []);
        setAllScholarships(scholarshipsData || []);
        setArticles(
          (articlesData || []).filter((article) =>
            matchesDestination(article, destinationData?.name)
          )
        );
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

  const { courses, universities, scholarships } = useMemo(() => {
    const keys = new Set(
      [destId, destination?.name, ...(DESTINATION_ALIASES[destId] || [])]
        .map(normalizeDestination)
        .filter(Boolean)
    );
    const belongs = (value) => keys.has(normalizeDestination(value));

    return {
      universities: allUniversities.filter((uni) => belongs(uni.destination)),
      courses: allCourses.filter(
        (course) =>
          belongs(course.destination) || belongs(course.university?.destination)
      ),
      scholarships: allScholarships.filter(
        (schol) =>
          belongs(schol.destination) || belongs(schol.university?.destination)
      ),
    };
  }, [destId, destination, allCourses, allUniversities, allScholarships]);

  return {
    destination,
    guide,
    courses,
    universities,
    scholarships,
    articles,
    loading,
    error,
  };
}
