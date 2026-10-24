import { useMemo } from "react";
import { subjectOf } from "../data/careerSalaries";
import { useCourses } from "./useCourses";

const MAX_UNIVERSITIES = 10;

/** A course's university arrives populated (an object) or as a bare id. */
const universityIdOf = (course) =>
  String(course.university?._id ?? course.university ?? "");

/**
 * Spelled-out degree names and their abbreviations, so "Master of Business
 * Administration (MBA)", "M.B.A." and "MBA" all read as one programme.
 * Longer phrases first, so "master of business administration" is not
 * swallowed by a shorter one.
 */
const DEGREE_NAMES = [
  ["bachelor of medicine bachelor of surgery", "mbbs"],
  ["master of business administration", "mba"],
  ["bachelor of business administration", "bba"],
  ["master of computer applications", "mca"],
  ["bachelor of computer applications", "bca"],
  ["master of public health", "mph"],
  ["master of fine arts", "mfa"],
  ["master of science", "msc"],
  ["bachelor of science", "bsc"],
  ["master of engineering", "meng"],
  ["bachelor of engineering", "beng"],
  ["master of technology", "mtech"],
  ["bachelor of technology", "btech"],
  ["master of commerce", "mcom"],
  ["bachelor of commerce", "bcom"],
  ["master of laws", "llm"],
  ["bachelor of laws", "llb"],
  ["master of arts", "ma"],
  ["bachelor of arts", "ba"],
  ["doctor of philosophy", "phd"],
];

/** Words that do not change which programme a name refers to. */
const FILLER = new Set([
  "in", "of", "and", "with", "the", "for", "hons", "honours", "honors",
  "programme", "program", "degree", "course",
]);

/**
 * A course name as a set of meaningful words: dotted abbreviations closed up
 * ("M.Sc" → "msc"), degree names abbreviated, punctuation and filler dropped.
 */
const programmeWords = (name) => {
  let text = String(name || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\b([a-z])\.(?=[a-z])/g, "$1")
    .replace(/[^a-z0-9]+/g, " ");

  for (const [phrase, abbreviation] of DEGREE_NAMES) {
    text = text.replace(new RegExp(`\\b${phrase}\\b`, "g"), abbreviation);
  }

  return new Set(text.split(" ").filter((word) => word && !FILLER.has(word)));
};

const isSubset = (small, large) => [...small].every((word) => large.has(word));

/**
 * How closely another course matches this one, or null for no match:
 * 0, the same programme ("MBA" and "Master of Business Administration (MBA)");
 * 1, a specialisation of it, or it of that ("MBA" and "MBA in Finance");
 * 2, a course in the same subject area ("MBA" and "MSc Marketing").
 */
const matchRank = (words, subject) => (other) => {
  const otherWords = programmeWords(other.name);
  if (!words.size || !otherWords.size) return null;

  const same =
    words.size === otherWords.size && isSubset(words, otherWords);
  if (same) return 0;
  if (isSubset(words, otherWords) || isSubset(otherWords, words)) return 1;
  if (subject?.match.test(other.name)) return 2;
  return null;
};

/**
 * Other universities that offer this course, for the course page.
 *
 * Looks at courses of the same study level at other universities, best match
 * first (see `matchRank`). Same-subject courses only fill in when no other
 * university runs the programme itself, and `similar` says so for the
 * heading. One entry per university, with the course that matched best.
 *
 * Requested with `?type=` and also filtered here, so the list stays correct
 * against an API that ignores the parameter.
 */
export function useCourseUniversities(course) {
  const { courses, loading } = useCourses({ type: course.type });

  const result = useMemo(() => {
    const ownUniversity = universityIdOf(course);
    const rank = matchRank(programmeWords(course.name), subjectOf(course.name));

    const matches = courses
      .filter(
        (other) =>
          other.type === course.type &&
          other.university?._id &&
          universityIdOf(other) !== ownUniversity,
      )
      .map((other) => ({ other, rank: rank(other) }))
      .filter((match) => match.rank !== null)
      .sort((a, b) => a.rank - b.rank);

    // Same-subject courses are a fallback, not padding: once any university
    // runs the programme itself, only those are listed.
    const programmeMatches = matches.filter((match) => match.rank < 2);
    const listed = programmeMatches.length ? programmeMatches : matches;

    const seen = new Set();
    const offerings = [];
    for (const { other } of listed) {
      const id = universityIdOf(other);
      if (seen.has(id)) continue;
      seen.add(id);
      offerings.push({ university: other.university, course: other });
    }

    return {
      offerings: offerings.slice(0, MAX_UNIVERSITIES),
      similar: programmeMatches.length === 0,
    };
  }, [courses, course]);

  return { ...result, subject: subjectOf(course.name)?.subject, loading };
}

export default useCourseUniversities;
