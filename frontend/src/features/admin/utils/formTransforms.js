/**
 * Text <-> array conversions shared by the admin forms: every list field is
 * typed as plain text, while the API stores and returns real arrays.
 */

/** `"a, b , c"` -> `["a", "b", "c"]` */
export const csvToArray = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const arrayToCsv = (value) =>
  Array.isArray(value) ? value.join(", ") : "";

/**
 * Participating universities are typed one per line as
 * `Name | Country | Role`. A line without a name is dropped.
 */
export const universitiesTextToArray = (value) =>
  (value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", country = "", role = ""] = line
        .split("|")
        .map((part) => part.trim());
      return { name, country, role };
    })
    .filter((item) => item.name);

export const universitiesArrayToText = (value) =>
  Array.isArray(value)
    ? value
        .map(
          (item) =>
            `${item?.name || ""} | ${item?.country || ""} | ${item?.role || ""}`,
        )
        .join("\n")
    : "";

/** Value for an `<input type="datetime-local">`, or "" for a missing date. */
export const toDateTimeLocalValue = (dateValue) => {
  if (!dateValue) return "";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 16);
};
