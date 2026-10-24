import React from "react";
import { Link } from "react-router-dom";
import {
  HiArrowUpRight,
  HiCalendarDays,
  HiChevronRight,
  HiGlobeAlt,
  HiMapPin,
  HiPercentBadge,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { RollIcon } from "@/shared/components/Roll";
import { useCountUp } from "@/shared/hooks/useCountUp";
import { useInView } from "@/shared/hooks/useInView";
import { Container } from "@/features/home/components/ui/Section";

const logoFallback = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "University")}&background=1F2853&color=fff&size=256`;

/**
 * TEMPORARY stand-ins so every hero slot shows while the catalogue is being
 * filled in. Any value saved in the admin form wins over these; delete this
 * once real data is entered for every university.
 */
const PLACEHOLDERS = {
  ranking: "25",
  established: "1850",
  famousFor: "Business, Engineering, Computer Science",
  intakes: "Autumn, Spring, Summer",
  acceptanceRate: "70%-75%",
  studentTeacherRatio: "14:1",
  genderRatio: "48 : 52",
};

const withPlaceholders = (university) => ({
  ...university,
  ...Object.fromEntries(
    Object.entries(PLACEHOLDERS).map(([key, fallback]) => [
      key,
      university[key] || fallback,
    ]),
  ),
  // No dummy URL: without a real site, the link searches for the official one.
  website:
    university.website ||
    `https://www.google.com/search?q=${encodeURIComponent(
      `${university.name} official website`,
    )}`,
});

/** Admin entries may omit the scheme ("utoronto.ca"); a bare host would resolve as a relative path. */
const toExternalUrl = (url) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

/**
 * Splits "#3 Global" into ["#", 3, " Global"] so only the number counts up and
 * any label around it stays put. Returns null for values with no number in
 * them ("N/A", "Top 1%" still counts, "Unranked" does not).
 */
const parseNumeric = (value) => {
  const match = String(value).match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: Number(match[2].replace(/,/g, "")),
    grouped: match[2].includes(","),
    suffix: match[3],
  };
};

/**
 * Counts a fact's number up once the row is on screen. Years start a couple of
 * centuries back rather than at zero, so "1827" rolls through plausible dates
 * instead of spinning up from 0.
 */
const CountUpValue = ({ value, active, from = 0 }) => {
  const parsed = parseNumeric(value);
  const start =
    parsed && Number.isFinite(from)
      ? Math.max(0, Math.min(from, parsed.number))
      : 0;
  const counted = useCountUp(parsed ? parsed.number - start : 0, {
    duration: 1800,
    active: active && Boolean(parsed),
  });

  if (!parsed) return value;
  const current = start + counted;

  return (
    <>
      {parsed.prefix}
      <span className="tabular-nums">
        {parsed.grouped ? current.toLocaleString() : current}
      </span>
      {parsed.suffix}
    </>
  );
};

/**
 * White hero band for a university page, after the GoStudyIn institute layout:
 * logo card on the left, the name as the headline, a row of
 * key facts (ranking, founding year, strengths) and links to the campus map
 * and the official website.
 *
 * Optional facts collapse out of the row when the record does not have them,
 * so a sparse entry still reads as a complete hero.
 *
 * Motion: the logo card settles in, the headline blurs in word by word, facts
 * rise in and count up, and the links animate on hover. Everything is static
 * under reduced motion.
 */
const UniversityHero = ({ university }) => {
  const {
    name,
    logo,
    location,
    destination,
    ranking,
    established,
    famousFor,
    website,
    intakes,
    acceptanceRate,
    studentTeacherRatio,
    genderRatio,
  } = withPlaceholders(university);

  const [factsRef, factsInView] = useInView({ threshold: 0.4 });

  const place =
    location && location.toLowerCase() !== destination?.toLowerCase()
      ? location
      : destination;

  const facts = [
    // Number only: "#1 Global" shows as "1", the label already says Ranking.
    ranking && {
      label: "Ranking",
      value: String(ranking).match(/\d[\d,]*/)?.[0] || ranking,
      count: true,
    },
    established && {
      label: "Established in",
      value: established,
      count: true,
      from: (parseNumeric(established)?.number ?? 0) - 200,
    },
    famousFor && { label: "Famous For", value: famousFor, wide: true },
  ].filter(Boolean);

  const stats = [
    intakes && { icon: HiCalendarDays, label: "Intakes", value: intakes },
    acceptanceRate && {
      icon: HiPercentBadge,
      label: "Acceptance Rate",
      value: acceptanceRate,
    },
    studentTeacherRatio && {
      icon: HiUserGroup,
      label: "Student : Teacher Ratio",
      value: studentTeacherRatio,
    },
    genderRatio && {
      icon: HiUsers,
      label: "Male : Female",
      value: genderRatio,
    },
  ].filter(Boolean);

  const words = name.split(/\s+/);

  return (
    <section className="relative overflow-hidden bg-white text-primary">
      <Container className="relative pb-14 pt-8 sm:pb-20 sm:pt-10 lg:pb-24">
        {/* Breadcrumb */}
        {/* <Reveal as="nav" y={-20} aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-primary sm:text-base">
            <li>
              <Link
                to="/universities"
                className="text-primary transition-colors duration-300 hover:text-secondary"
              >
                Universities
              </Link>
            </li>
            {destination && (
              <>
                <li aria-hidden="true">
                  <HiChevronRight className="h-4 w-4 text-primary/40" />
                </li>
                <li>{destination}</li>
              </>
            )}
          </ol>
        </Reveal> */}

        <div className="mt-8 grid items-start gap-8 sm:mt-10 lg:grid-cols-[19.5rem_1fr] lg:gap-12">
          {/* Logo card */}
          <Reveal y={0} scale={0.9} delay={150}>
            <div className="group relative flex h-32 w-auto items-center justify-center overflow-hidden rounded-sm  bg-white  sm:h-36 mt-3">
              <img
                src={logo || logoFallback(name)}
                alt={`${name} logo`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = logoFallback(name);
                }}
                className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out-cubic group-hover:scale-[1.04] rounded-sm"
              />
              {/* Light sweep across the card on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] -skew-x-12 bg-linear-to-r from-transparent via-white/80 to-transparent transition-transform duration-1000 ease-out-cubic group-hover:translate-x-[400%] motion-reduce:hidden"
              />
            </div>
          </Reveal>

          <div>
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[68px]">
              {words.map((word, index) => (
                <React.Fragment key={`${word}-${index}`}>
                  <Reveal
                    as="span"
                    y={40}
                    blur
                    delay={250 + index * 90}
                    className="inline-block"
                  >
                    {word}
                  </Reveal>
                  {index < words.length - 1 && " "}
                </React.Fragment>
              ))}
            </h1>

            {facts.length > 0 && (
              <dl
                ref={factsRef}
                className="mt-7 flex flex-wrap gap-x-10 gap-y-5 sm:mt-8"
              >
                {facts.map((fact, index) => (
                  <Reveal
                    key={fact.label}
                    y={30}
                    delay={500 + index * 120}
                    className={`relative min-w-0 ${fact.wide ? "basis-full sm:basis-auto" : ""} ${
                      index > 0 ? "sm:border-l sm:border-slate-200 sm:pl-10" : ""
                    }`}
                  >
                    <dt className="text-sm text-primary sm:text-base">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-lg font-bold text-primary">
                      {fact.count ? (
                        <CountUpValue
                          value={fact.value}
                          active={factsInView}
                          from={fact.from}
                        />
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            )}

            <Reveal
              y={30}
              delay={750}
              className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              {place && (
                <HeroLink
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${name} ${location || ""}`.trim(),
                  )}`}
                  icon={HiMapPin}
                  label={place}
                  hint="Open campus location in Google Maps"
                />
              )}
              {website && (
                <HeroLink
                  href={toExternalUrl(website)}
                  icon={HiGlobeAlt}
                  label="Visit website"
                  hint={`Visit the ${name} website`}
                  arrow
                />
              )}
            </Reveal>
          </div>
        </div>

        {/* Key numbers, one tile each. Tiles without data drop out. */}
        {stats.length > 0 && (
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal as="li" key={stat.label} y={40} delay={850 + index * 100}>
                <StatTile {...stat} />
              </Reveal>
            ))}
          </ul>
        )}
      </Container>

      {/* Hairline that separates the band from the page below. */}
      
    </section>
  );
};

/**
 * Flat stat tile: icon, value, uppercase label. On hover the icon lifts and a
 * coral bar wipes along the bottom edge.
 */
const StatTile = ({ icon, label, value }) => {
  const Icon = icon;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-sm bg-[#F4FAFF] p-5 transition-colors duration-300sm:p-6">
      <Icon
        aria-hidden="true"
        className="h-7 w-7 text-secondary  "
      />
      <p className="mt-4 text-xl font-bold leading-snug text-primary sm:text-2xl">
        {value}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-primary/70 sm:text-sm">
        {label}
      </p>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out-cubic group-hover:scale-x-100"
      />
    </div>
  );
};

/**
 * Outbound link in the hero's footer row: an outlined icon box that fills
 * coral on hover, and an underline that retracts to the left on hover.
 */
const HeroLink = ({ href, icon, label, hint, arrow = false }) => {
  const Icon = icon;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hint}
      className="group inline-flex items-center gap-3 text-base font-bold text-primary "
    >
      <span className="inline-flex  items-center justify-center  text-secondary transition-colors duration-300 ">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className=" bg-[length:100%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-cubic group-hover:bg-[length:0%_1.5px]">
        {label}
      </span>
      {arrow && (
        <span className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden text-secondary">
          <RollIcon icon={HiArrowUpRight} />
        </span>
      )}
    </a>
  );
};

export default UniversityHero;
