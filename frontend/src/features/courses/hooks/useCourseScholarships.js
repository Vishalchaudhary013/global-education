import { useMemo } from "react";
import { useScholarships } from "@/features/scholarships/hooks/useScholarships";
import { destinationIdFor } from "@/features/destinations/hooks/useDestinationDetail";
import { popularScholarships } from "@/features/destinations/data/popularScholarships";
import { scholarshipKey } from "@/features/scholarships/utils/scholarshipKey";
import { subjectOf } from "../data/careerSalaries";

const MAX_SCHOLARSHIPS = 10;

const nameKey = (value) => (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/** A record's university arrives populated (an object) or as a bare id. */
const universityIdOf = (record) =>
  String(record.university?._id ?? record.university ?? "");

/**
 * Study levels named in a scholarship's free-text `level` ("Masters / PhD",
 * "UG & PG", "Postgraduate"). Null when it names none or says "all", meaning
 * the award is open to every level.
 */
const levelsFromText = (text) => {
  const value = String(text || "").toLowerCase();
  if (!value.trim() || /\ball\b|\bany\b/.test(value)) return null;

  const levels = [];
  if (/\bug\b|under\s*-?\s*grad|bachelor/.test(value)) levels.push("UG");
  // "graduate" on its own means postgraduate; drop "undergraduate" first.
  const rest = value.replace(/under\s*-?\s*graduate/g, "");
  if (/\bpg\b|post\s*-?\s*grad|master|\bmba\b|\bmsc?\b|graduate/.test(rest)) {
    levels.push("PG");
  }
  if (/ph\.?\s*d|doctor/.test(value)) levels.push("PhD");
  if (/diploma/.test(value)) levels.push("Diploma");
  return levels.length ? levels : null;
};

/** Whether an award for `levels` (null: any) funds a course of `type`. */
const fitsLevel = (levels, type) => {
  if (!levels || !type) return true;
  if (levels.includes(type)) return true;
  // A diploma sits at either level, so undergraduate and postgraduate awards
  // may both apply.
  return type === "Diploma" && (levels.includes("UG") || levels.includes("PG"));
};

/**
 * Tests whether a scholarship's own text is about this course: it names the
 * course, its bracketed abbreviation ("MBA"), or its subject area (by the
 * subject's strict `textMatch`, not the loose course-name pattern).
 */
const aboutCourse = (course) => {
  const subject = subjectOf(course.name);
  // Very short names ("BA") would turn up inside unrelated words.
  const courseName = course.name.length >= 6 ? nameKey(course.name) : "";
  const abbreviation = course.name.match(/\(([A-Z][A-Za-z.]{1,9})\)/)?.[1];
  const abbreviationPattern = abbreviation
    ? new RegExp(`\\b${abbreviation.replace(/\./g, "\\.?")}\\b`, "i")
    : null;

  return (schol) => {
    const text = [schol.name, schol.eligibility, schol.criteria, schol.description]
      .filter(Boolean)
      .join(" ");
    if (!text) return false;
    return (
      (courseName && nameKey(text).includes(courseName)) ||
      Boolean(abbreviationPattern?.test(text)) ||
      Boolean(subject?.textMatch.test(text))
    );
  };
};

/**
 * Whether two university names refer to the same place, allowing for an
 * abbreviation in brackets: "University of British Columbia (UBC)" and
 * "University of British Columbia" match.
 */
const sameUniversity = (a, b) => {
  const strip = (name) => nameKey(String(name || "").replace(/\([^)]*\)/g, ""));
  const left = strip(a);
  const right = strip(b);
  return Boolean(left && right) && left === right;
};

/**
 * Scholarships a student on one course can apply for, most specific first:
 *
 * 1. awards at the course's own university: the site's records, then bundled
 *    awards limited to that university (e.g. Clarendon for Oxford);
 * 2. awards about this course or its subject (an "MBA" award on an MBA);
 * 3. other awards open to this course: same country, same study level, not
 *    limited to one university (e.g. Chevening on a UK master's).
 *
 * Every source is filtered to the course's study level, and awards for
 * another country or limited to another university are always left out.
 */
export function useCourseScholarships(course) {
  const { scholarships, loading } = useScholarships();

  const items = useMemo(() => {
    const destId = destinationIdFor(
      course.destination || course.university?.destination,
    );
    const ownUniversity = universityIdOf(course);
    const isAboutCourse = aboutCourse(course);

    const atUniversity = [];
    const inCountry = [];
    for (const schol of scholarships) {
      if (!fitsLevel(levelsFromText(schol.level), course.type)) continue;
      const scholUniversity = universityIdOf(schol);
      if (scholUniversity) {
        if (scholUniversity === ownUniversity) atUniversity.push(schol);
      } else if (destinationIdFor(schol.destination) === destId) {
        inCountry.push(schol);
      }
    }

    const bundled = (popularScholarships[destId] || []).filter((schol) =>
      fitsLevel(schol.levels, course.type),
    );
    const bundledAtUniversity = bundled.filter(
      (schol) =>
        schol.university && sameUniversity(schol.university, course.university?.name),
    );
    const bundledOpen = bundled.filter((schol) => !schol.university);

    const linked = (list) => list.map((schol) => ({ ...schol, linked: true }));
    const onSubject = (list) => list.filter(isAboutCourse);
    const offSubject = (list) => list.filter((schol) => !isAboutCourse(schol));

    const seen = new Set();
    return [
      ...linked(atUniversity),
      ...bundledAtUniversity,
      ...linked(onSubject(inCountry)),
      ...onSubject(bundledOpen),
      ...linked(offSubject(inCountry)),
      ...offSubject(bundledOpen),
    ]
      .filter((schol) => {
        const key = scholarshipKey(schol.name);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, MAX_SCHOLARSHIPS);
  }, [scholarships, course]);

  return { scholarships: items, loading };
}

export default useCourseScholarships;
