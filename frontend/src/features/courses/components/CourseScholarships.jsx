import React from "react";
import ScholarshipsBand from "@/features/scholarships/components/ScholarshipsBand";
import { useCourseScholarships } from "../hooks/useCourseScholarships";

const LEVEL_NOUNS = {
  UG: "an undergraduate",
  PG: "a postgraduate",
  Diploma: "a diploma",
  PhD: "a doctoral",
};

/**
 * Short course name for the heading: a bracketed abbreviation when the name
 * has one ("Master of Business Administration (MBA)" → "MBA"), else the full
 * name.
 */
const shortName = (name) =>
  name.match(/\(([A-Z][A-Za-z.]{1,9})\)/)?.[1] || name;

/**
 * Scholarships for this course, in the same band as the destination page:
 * only awards a student on this course can apply for, its university's and
 * subject's first (see `useCourseScholarships`). Hidden until loaded, and
 * when none apply.
 */
const CourseScholarships = ({ course }) => {
  const { scholarships, loading } = useCourseScholarships(course);

  if (loading) return null;

  const student = LEVEL_NOUNS[course.type] || "a";
  const destination = course.destination || course.university?.destination;

  return (
    <ScholarshipsBand
      title={`Scholarships for ${shortName(course.name)}`}
      intro={`Awards you can apply for as ${student} student on this course, from university awards to government and external grants.`}
      items={scholarships}
      viewAllHref={
        destination
          ? `/scholarships?destination=${encodeURIComponent(destination)}`
          : "/scholarships"
      }
    />
  );
};

export default CourseScholarships;
