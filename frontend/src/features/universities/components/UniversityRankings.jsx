import React from "react";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import Section from "@/features/home/components/ui/Section";

/** Ranking bodies we know by name; any other `source` shows as entered. */
const SOURCES = {
  QS: "QS World University Rankings",
  THE: "Times Higher Education",
  USN: "U.S. News Best Global Universities",
  ARWU: "Academic Ranking of World Universities",
};

const YEARS_SHOWN = 4;

/** Small stable hash, so sample figures differ per university but never between renders. */
const hashOf = (text) =>
  [...String(text)].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);

/** "301-350" style band, as THE and ARWU publish beyond their top places. */
const band = (rank, size) => {
  const start = Math.floor((rank - 1) / size) * size + 1;
  return `${start}-${start + size - 1}`;
};

/**
 * TEMPORARY sample rankings for universities without any: the last four
 * years across the four main tables, centred on the hero's ranking so the
 * page agrees with itself, with a little year-on-year movement and the odd
 * gap. Remove once rankings are entered for every university.
 */
const sampleRankings = (university) => {
  const base = Number(String(university.ranking ?? "").match(/\d+/)?.[0]) || 25;
  const seed = hashOf(university.name);
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: YEARS_SHOWN }, (_, i) => thisYear - YEARS_SHOWN + 1 + i);

  const tables = [
    { source: "QS", factor: 1, offset: 0, format: (r) => String(r) },
    { source: "THE", factor: 1.1, offset: 4, format: (r) => (r > 200 ? band(r, 50) : String(r)) },
    { source: "USN", factor: 1.25, offset: 7, format: (r) => String(r) },
    { source: "ARWU", factor: 1.4, offset: 12, format: (r) => (r > 100 ? band(r, 50) : String(r)) },
  ];

  return tables.flatMap((table, t) =>
    years.flatMap((year, y) => {
      // Leave roughly one cell in six empty, as real tables have gaps.
      if ((seed + t * 3 + y * 5) % 6 === 0) return [];
      const drift = ((seed >> (t + y)) % 7) - 3; // -3 … +3 places
      const rank = Math.max(1, Math.round(base * table.factor + table.offset + drift * Math.max(1, base / 40)));
      return [{ source: table.source, year, rank: table.format(rank) }];
    }),
  );
};

/** First number in a rank ("301-350" → 301), for comparing years. */
const rankValue = (rank) => Number(String(rank ?? "").match(/\d+/)?.[0]) || null;

/**
 * Pivots `[{ source, year, rank }]` into one row per ranking body and one
 * column per year (the most recent `YEARS_SHOWN`), oldest on the left.
 */
const buildTable = (rankings) => {
  const years = [...new Set(rankings.map((entry) => Number(entry.year)).filter(Boolean))]
    .sort((a, b) => a - b)
    .slice(-YEARS_SHOWN);

  const sources = [...new Set(rankings.map((entry) => entry.source).filter(Boolean))];

  const rows = sources.map((source) => {
    const cells = years.map(
      (year) =>
        rankings.find(
          (entry) => entry.source === source && Number(entry.year) === year,
        )?.rank || null,
    );
    // Movement between the last two years that both have a figure.
    const known = cells.map(rankValue).filter(Boolean);
    const trend = known.length >= 2 ? known.at(-2) - known.at(-1) : 0;
    return { source, cells, trend };
  });

  return { years, rows };
};

const TrendMark = ({ trend }) => {
  if (!trend) return null;
  const improved = trend > 0;
  const Icon = improved ? HiArrowTrendingUp : HiArrowTrendingDown;
  return (
    <span
      className={`ml-2 inline-flex items-center gap-0.5 text-xs font-bold ${
        improved ? "text-secondary" : "text-slate-400"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {Math.abs(trend)}
      <span className="sr-only">
        {improved ? "places up" : "places down"} on the previous year
      </span>
    </span>
  );
};

/**
 * "University Rankings" table: one row per ranking body (QS, THE, US News,
 * ARWU…) and one column per year, with the latest year's movement flagged.
 * Uses the university's `rankings` when present, sample figures otherwise.
 */
const UniversityRankings = ({ university }) => {
  const rankings = university.rankings?.length
    ? university.rankings
    : sampleRankings(university);
  const { years, rows } = buildTable(rankings);

  if (rows.length === 0 || years.length === 0) return null;

  return (
    <Section id="rankings">
      <Reveal>
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-secondary"
          />
          Rankings
        </p>
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
          University Rankings
        </h2>
      </Reveal>

      <Reveal className="mt-10 lg:mt-12">
        {/* `overflow-x-auto` alone makes the y axis scrollable too, so any
            row still mid-animation would flash a vertical scrollbar. */}
        <div className="overflow-x-auto overflow-y-hidden rounded-sm border border-slate-200">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="bg-[#F4FAFF] text-sm font-bold uppercase tracking-wide text-primary">
                <th scope="col" className="px-5 py-6 border-b border-slate-200">
                  Ranked by
                </th>
                {years.map((year, index) => (
                  <th
                    key={year}
                    scope="col"
                    className={`w-36 px-5 py-4 border-b border-slate-200${index === years.length - 1 ? " " : ""}`}
                  >
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Reveal
                  as="tr"
                  key={row.source}
                  y={0}
                  delay={index * 60}
                  className="border-b border-slate-200 bg-white text-primary transition-colors duration-300 last:border-b-0 even:bg-[#F4FAFF]"
                >
                  <th scope="row" className="px-5 py-4 text-left font-normal">
                    <span className="block text-base font-bold">{row.source}</span>
                    {SOURCES[row.source] && (
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {SOURCES[row.source]}
                      </span>
                    )}
                  </th>
                  {row.cells.map((rank, cellIndex) => {
                    const latest = cellIndex === row.cells.length - 1;
                    return (
                      <td
                        key={years[cellIndex]}
                        className={`px-5 py-4 text-base tabular-nums ${
                          latest ? "font-bold" : "text-slate-600"
                        }`}
                      >
                        {rank ? (
                          <>
                            {rank}
                           
                          </>
                        ) : (
                          <span className="text-slate-400" aria-label="Not ranked">
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>

        
      </Reveal>
    </Section>
  );
};

export default UniversityRankings;
