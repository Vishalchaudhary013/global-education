/**
 * Indicative costs besides tuition, per destination, in the local currency,
 * for the course page's fees table:
 *
 * - `living`: a year's living costs, based on the funds the student visa
 *   usually asks applicants to show.
 * - `insurance`: a year of student health cover (the UK's Immigration Health
 *   Surcharge, Australia's OSHC, a typical university plan elsewhere).
 * - `visa`: the student visa application fee, paid once.
 *
 * Approximate and not live; check the official figures before applying.
 */
const COSTS = {
  uk: { living: 12000, insurance: 776, visa: 524 },
  usa: { living: 15000, insurance: 2000, visa: 535 },
  canada: { living: 20635, insurance: 900, visa: 235 },
  australia: { living: 29710, insurance: 700, visa: 2000 },
  "new zealand": { living: 20000, insurance: 700, visa: 750 },
  germany: { living: 11904, insurance: 1500, visa: 75 },
  ireland: { living: 10000, insurance: 500, visa: 60 },
  singapore: { living: 18000, insurance: 300, visa: 120 },
  dubai: { living: 50000, insurance: 1500, visa: 3000 },
  india: { living: 150000, insurance: 10000, visa: 0 },
};

COSTS["united kingdom"] = COSTS.uk;
COSTS["united states"] = COSTS.usa;

export const costsFor = (destination) =>
  COSTS[destination?.trim().toLowerCase()] || COSTS.usa;

/**
 * Course length in years from free text: "2 Years" → 2, "18 Months" → 1.5,
 * "4 Semesters" → 2. Falls back to 1 when the text has no usable figure.
 */
export const yearsFrom = (duration) => {
  const match = String(duration || "").match(
    /(\d+(?:\.\d+)?)\s*(year|yr|month|mo|semester|week|wk)/i,
  );
  if (!match) return 1;

  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  const years = unit.startsWith("mo")
    ? value / 12
    : unit.startsWith("sem")
      ? value / 2
      : unit.startsWith("w")
        ? value / 52
        : value;

  return years > 0 ? years : 1;
};
