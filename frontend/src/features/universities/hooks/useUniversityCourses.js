import { useMemo } from "react";
import { useCourses } from "@/features/courses/hooks/useCourses";

const MIN_COURSES = 10;

/**
 * TEMPORARY sample programmes that top a university's list up to
 * `MIN_COURSES` while the catalogue is thin. They have no detail page, so
 * their cards open the counselling form instead. Remove once every university
 * has real courses.
 */
const PLACEHOLDER_COURSES = [
  { name: "MSc Computer Science", type: "PG", duration: "1 Year" },
  { name: "Master of Business Administration (MBA)", type: "PG", duration: "2 Years" },
  { name: "MSc Data Science", type: "PG", duration: "1 Year" },
  { name: "BSc Computer Science", type: "UG", duration: "3 Years" },
  { name: "BBA Business Administration", type: "UG", duration: "3 Years" },
  { name: "MEng Mechanical Engineering", type: "PG", duration: "2 Years" },
  { name: "BSc Nursing", type: "UG", duration: "3 Years" },
  { name: "MA International Relations", type: "PG", duration: "1 Year" },
  { name: "BEng Civil Engineering", type: "UG", duration: "4 Years" },
  { name: "Diploma in Hospitality Management", type: "Diploma", duration: "1 Year" },
  { name: "BA Economics", type: "UG", duration: "3 Years" },
  { name: "Postgraduate Diploma in Project Management", type: "Diploma", duration: "1 Year" },
].map((course, index) => ({
  ...course,
  _id: `placeholder-${index}`,
  placeholder: true,
}));

/** Real courses first, then samples (skipping names already listed) up to `MIN_COURSES`. */
const withPlaceholderCourses = (courses) => {
  const taken = new Set(courses.map((course) => course.name?.toLowerCase()));
  const extras = PLACEHOLDER_COURSES.filter(
    (course) => !taken.has(course.name.toLowerCase()),
  ).slice(0, Math.max(0, MIN_COURSES - courses.length));
  return [...courses, ...extras];
};

/** A course's university arrives populated (an object) or as a bare id. */
const universityIdOf = (course) =>
  String(course.university?._id ?? course.university ?? "");

/**
 * One university's courses, for its detail page.
 *
 * Requested with `?university=` and also filtered here, so the list stays
 * correct against an API that ignores the parameter and returns the full
 * catalogue. Fetched once by the page and shared by the sections that need
 * it (course carousel, fees table).
 */
export function useUniversityCourses(universityId) {
  const { courses, loading } = useCourses({ university: universityId });

  const universityCourses = useMemo(
    () =>
      withPlaceholderCourses(
        courses.filter(
          (course) => universityIdOf(course) === String(universityId),
        ),
      ),
    [courses, universityId],
  );

  return { courses: universityCourses, loading };
}

export default useUniversityCourses;
