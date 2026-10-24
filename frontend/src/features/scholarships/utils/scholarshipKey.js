/**
 * Key for spotting the same scholarship listed twice under slightly different
 * names: case, punctuation and the word "scholarship(s)" are ignored, so
 * "Chevening Scholarship" and "Chevening Scholarships" match.
 */
export const scholarshipKey = (name) =>
  String(name || "")
    .toLowerCase()
    .replace(/\bscholarships?\b/g, "")
    .replace(/[^a-z0-9]/g, "");
