/** Lower-cased letters and digits only, for spotting the same FAQ question twice. */
export const questionKey = (value) =>
  (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
