/**
 * Local currency per destination, with approximate conversion rates:
 * `perUsd` turns a USD amount into the local currency (used only for sample
 * fees) and `inr` is the INR value of one unit, for INR conversions. Rates are
 * indicative, not live.
 */
const CURRENCIES = {
  uk: { code: "GBP", perUsd: 0.79, inr: 108 },
  "united kingdom": { code: "GBP", perUsd: 0.79, inr: 108 },
  usa: { code: "USD", perUsd: 1, inr: 85 },
  "united states": { code: "USD", perUsd: 1, inr: 85 },
  canada: { code: "CAD", perUsd: 1.37, inr: 62 },
  australia: { code: "AUD", perUsd: 1.52, inr: 56 },
  "new zealand": { code: "NZD", perUsd: 1.66, inr: 51 },
  germany: { code: "EUR", perUsd: 0.92, inr: 92 },
  ireland: { code: "EUR", perUsd: 0.92, inr: 92 },
  singapore: { code: "SGD", perUsd: 1.34, inr: 63 },
  dubai: { code: "AED", perUsd: 3.67, inr: 23 },
  india: { code: "INR", perUsd: 85, inr: 1 },
};

export const currencyFor = (destination) =>
  CURRENCIES[destination?.trim().toLowerCase()] || CURRENCIES.usa;

/**
 * TEMPORARY sample fee (in the local currency) for courses without
 * `feePerYear`: a per-level USD base, varied a little by `index` so a list of
 * courses does not repeat one figure, rounded to a tidy amount. Remove once
 * fees are entered for every course.
 */
const SAMPLE_FEE_USD = { UG: 21000, PG: 27500, Diploma: 15000 };

export const sampleFee = (type, currency, index = 0) => {
  const base = SAMPLE_FEE_USD[type] ?? SAMPLE_FEE_USD.UG;
  const usd = base + ((index * 7) % 5) * 650;
  return Math.round((usd * currency.perUsd) / 50) * 50;
};

/** Local amount shown in INR: exact for INR itself, else rounded to the nearest thousand. */
export const toInr = (amount, currency) =>
  currency.code === "INR"
    ? amount
    : Math.round((amount * currency.inr) / 1000) * 1000;

export const formatMoney = (amount, code) =>
  new Intl.NumberFormat(code === "INR" ? "en-IN" : "en-GB", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(amount);
