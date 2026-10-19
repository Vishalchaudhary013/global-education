import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HiHome,
  HiChevronRight,
  HiShare,
  HiAcademicCap,
  HiFaceSmile,
  HiBriefcase,
  HiBuildingLibrary,
  HiSquares2X2,
  HiDocumentText,
  HiFlag,
  HiUser,
  HiUsers,
  HiBanknotes,
  HiClock,
  HiCurrencyDollar,
  HiLightBulb,
  HiBookOpen,
  HiBuildingOffice2,
  HiGlobeAlt,
  HiLanguage,
  HiArrowRight,
  HiVideoCamera,
  HiCalendarDays,
  HiSun,
  HiCheckCircle,
  HiIdentification,
  HiMapPin,
} from "react-icons/hi2";
import { useCounselling } from "@/features/counselling";
import {
  destinationMetadata,
  notFoundMetadata,
  seoConfig,
  useSeo,
} from "@/shared/seo";
import { useDestinationDetail } from "../hooks/useDestinationDetail";
import SectionBlock from "../components/SectionBlock";
import RequirementTabs from "../components/RequirementTabs";
import FaqAccordion from "../components/FaqAccordion";
import CityStrip from "../components/CityStrip";

const STAT_ICONS = {
  students: HiAcademicCap,
  happiness: HiFaceSmile,
  employment: HiBriefcase,
};

const SEASON_ICONS = {
  spring: HiSun,
  summer: HiSun,
  autumn: HiGlobeAlt,
  winter: HiGlobeAlt,
  monsoon: HiGlobeAlt,
};

const UNIVERSITY_FALLBACK = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "University")}&background=1F2853&color=fff&size=96`;

const normalizeDestination = (value) =>
  (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/** Small label/value tile used across the sidebar. */
const FactTile = ({ icon: Icon, label, value }) =>
  value ? (
    <div className="bg-white border border-slate-200 rounded-sm px-4 py-3">
      <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
        {Icon && <Icon className="h-3.5 w-3.5 text-[#FF4E45] shrink-0" />}
        {label}
      </p>
      <p className="text-sm font-semibold text-[#1F2853] leading-snug">{value}</p>
    </div>
  ) : null;

/** Bordered panel with an icon heading, used throughout the Student life block. */
const InfoPanel = ({ icon: Icon, title, children }) => (
  <div className="bg-white border border-slate-200 rounded-sm px-5 py-4">
    <p className="flex items-center gap-2 text-sm font-bold text-[#1F2853] mb-3">
      {Icon && <Icon className="h-4 w-4 text-[#FF4E45] shrink-0" />}
      {title}
    </p>
    {children}
  </div>
);

const DestinationDetail = () => {
  const { id } = useParams();
  const { openModal } = useCounselling();
  const [copied, setCopied] = useState(false);

  const destId = id?.toLowerCase();

  const { destination, guide, courses, universities, articles, loading } =
    useDestinationDetail(destId);

  useSeo(
    loading
      ? null
      : destination
        ? destinationMetadata({ ...destination, guide }, seoConfig)
        : notFoundMetadata(seoConfig, "Destination"),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="h-3 w-24 bg-[#FF4E45] rounded-sm animate-pulse" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col px-6 text-center">
        <h2 className="text-3xl font-bold text-[#1F2853] mb-4">
          Destination Not Found
        </h2>
        <Link
          to="/destinations"
          className="text-[#FF4E45] hover:underline font-bold"
        >
          Back to all destinations
        </Link>
      </div>
    );
  }

  const name = destination.name;
  const popularCourses = (courses || [])
    .filter((course) => normalizeDestination(course.destination) === destId)
    .slice(0, 4);
  const universitiesLink = `/universities?destination=${encodeURIComponent(name)}`;
  const universitiesCount =
    guide.universitiesCount || universities.length || destination.universities?.length || 0;
  const studentLife = guide.studentLife || {};

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero banner */}
      <div className="relative h-[260px] md:h-[360px]">
        <img
          src={destination.heroImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1F2853]/45" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="bg-[#1F2853]/80 border border-white/15 rounded-sm px-8 py-5 text-center max-w-xl">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Study in {name}
            </h1>
            <p className="text-sm md:text-base text-slate-200 mt-1">
              {guide.tagline || destination.description}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-[#FF4E45]" aria-label="Home">
            <HiHome className="h-4 w-4" />
          </Link>
          <HiChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <Link to="/destinations" className="hover:text-[#FF4E45]">
            Study Destinations
          </Link>
          <HiChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-[#1F2853] font-medium">Study in {name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Country header + stats */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {guide.flagCode && (
                <img
                  src={`https://flagcdn.com/w80/${guide.flagCode}.png`}
                  srcSet={`https://flagcdn.com/w160/${guide.flagCode}.png 2x`}
                  alt={`${name} flag`}
                  className="h-8 w-12 object-cover rounded-sm border border-slate-200"
                />
              )}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1F2853]">
                  {name}
                </h2>
                <Link
                  to={universitiesLink}
                  className="text-sm text-[#FF4E45] font-medium underline underline-offset-2 hover:text-[#E03A30]"
                >
                  {universitiesCount} Universities
                </Link>
              </div>
            </div>

            {guide.stats?.length > 0 && (
              <div className="grid grid-cols-3 bg-slate-100 border border-slate-200 rounded-sm divide-x divide-slate-200">
                {guide.stats.map((stat) => {
                  const Icon = STAT_ICONS[stat.icon] || HiAcademicCap;
                  return (
                    <div key={stat.label} className="px-3 py-5 text-center">
                      <Icon className="h-5 w-5 mx-auto text-[#FF4E45] mb-2" />
                      <p className="text-lg font-bold text-[#1F2853]">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Why study */}
          {(guide.whyStudy || destination.description) && (
            <SectionBlock title={`Why study in ${name}`}>
              <p className="text-sm text-slate-600 leading-relaxed">
                {guide.whyStudy || destination.description}{" "}
                <button
                  type="button"
                  onClick={openModal}
                  className="text-[#FF4E45] font-medium underline underline-offset-2 hover:text-[#E03A30]"
                >
                  Talk to a counsellor
                </button>
              </p>
            </SectionBlock>
          )}

          {/* Best universities */}
          {universities.length > 0 && (
            <SectionBlock
              icon={HiBuildingLibrary}
              title={`Best universities in ${name}`}
              action={
                <Link
                  to={universitiesLink}
                  className="flex items-center gap-1 text-sm font-medium text-[#FF4E45] hover:text-[#E03A30]"
                >
                  Show all <HiArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                In {name}, you'll find globally-ranked universities, with
                excellent infrastructure, research facilities and a welcoming
                environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {universities.slice(0, 4).map((uni) => (
                  <Link
                    key={uni._id}
                    to={`/universities/${uni._id}`}
                    className="bg-white border border-slate-200 rounded-sm p-4 hover:border-[#FF4E45] transition-colors group"
                  >
                    <div className="h-8 w-8 rounded-sm overflow-hidden border border-slate-200 bg-white mb-3">
                      <img
                        src={uni.logo || UNIVERSITY_FALLBACK(uni.name)}
                        alt=""
                        onError={(e) => {
                          e.target.src = UNIVERSITY_FALLBACK(uni.name);
                          e.target.onerror = null;
                        }}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#1F2853] group-hover:text-[#FF4E45] transition-colors leading-snug">
                      {uni.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {uni.destination || name}
                    </p>
                  </Link>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* Popular programs */}
          {guide.popularPrograms?.length > 0 && (
            <SectionBlock icon={HiSquares2X2} title="Popular programs">
              {guide.programsIntro && (
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {guide.programsIntro}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {guide.popularPrograms.map((program) => (
                  <span
                    key={program}
                    className="px-4 py-1.5 bg-white border border-slate-200 rounded-sm text-sm text-[#1F2853]"
                  >
                    {program}
                  </span>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* Popular courses from the catalogue */}
          {popularCourses.length > 0 && (
            <SectionBlock
              icon={HiBookOpen}
              title="Popular courses"
              action={
                <Link
                  to="/courses"
                  className="flex items-center gap-1 text-sm font-medium text-[#FF4E45] hover:text-[#E03A30]"
                >
                  Show all <HiArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popularCourses.map((course) => (
                  <Link
                    key={course._id}
                    to={`/courses/${course._id}`}
                    className="bg-white border border-slate-200 rounded-sm p-4 hover:border-[#FF4E45] transition-colors group"
                  >
                    <p className="text-sm font-semibold text-[#1F2853] group-hover:text-[#FF4E45] transition-colors leading-snug">
                      {course.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                      <HiBuildingOffice2 className="h-3.5 w-3.5" />
                      {course.university?.name || "Top university"}
                    </p>
                    {course.duration && (
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <HiClock className="h-3.5 w-3.5" />
                        {course.duration}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* Basic requirements */}
          <SectionBlock icon={HiDocumentText} title="Basic requirements">
            <RequirementTabs requirements={guide.requirements} />
          </SectionBlock>

          {/* What sets the country apart */}
          {guide.setsApart && (
            <SectionBlock icon={HiFlag} title={`What sets ${name} apart`}>
              <div className="bg-white border border-slate-200 rounded-sm px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {guide.setsApart}
                </p>
              </div>
            </SectionBlock>
          )}

          {/* Student life */}
          <SectionBlock icon={HiUser} title="Student life">
            {guide.studentLifeIntro && (
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {guide.studentLifeIntro}
              </p>
            )}

            <div className="space-y-3">
              {studentLife.minWage && (
                <InfoPanel
                  icon={HiBanknotes}
                  title="Min. wage per hour for part-time jobs"
                >
                  <p className="text-sm text-slate-600">{studentLife.minWage}</p>
                </InfoPanel>
              )}

              {studentLife.maxWorkHours && (
                <InfoPanel icon={HiClock} title="Max. allowed part-time work hours">
                  <p className="text-sm text-slate-600">
                    {studentLife.maxWorkHours}
                  </p>
                </InfoPanel>
              )}

              {destination.costs && (
                <InfoPanel icon={HiAcademicCap} title="Tuition fees">
                  <ul className="space-y-2 text-sm">
                    {destination.costs.ug && (
                      <li className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                        <span className="text-slate-600">Undergraduate</span>
                        <span className="font-semibold text-[#1F2853]">
                          {destination.costs.ug}
                        </span>
                      </li>
                    )}
                    {destination.costs.pg && (
                      <li className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                        <span className="text-slate-600">Postgraduate</span>
                        <span className="font-semibold text-[#1F2853]">
                          {destination.costs.pg}
                        </span>
                      </li>
                    )}
                    {destination.costs.living && (
                      <li className="flex justify-between gap-4">
                        <span className="text-slate-600">
                          Estimated living expenses
                        </span>
                        <span className="font-semibold text-[#1F2853]">
                          {destination.costs.living}
                        </span>
                      </li>
                    )}
                  </ul>
                </InfoPanel>
              )}

              {studentLife.costOfLiving?.length > 0 && (
                <InfoPanel icon={HiCurrencyDollar} title="Cost of living">
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    {studentLife.costOfLiving.map((item) => (
                      <li key={item.label} className="flex gap-2">
                        <span className="text-slate-300">•</span>
                        <span>
                          <span className="font-semibold text-[#1F2853]">
                            {item.label}:
                          </span>{" "}
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {studentLife.costSource && (
                    <p className="text-xs text-slate-400 italic mt-3">
                      (Source:{" "}
                      <a
                        href={studentLife.costSource}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-[#FF4E45]"
                      >
                        {studentLife.costSource}
                      </a>
                      )
                    </p>
                  )}
                </InfoPanel>
              )}

              {(studentLife.studentVisa?.length > 0 ||
                studentLife.postStudyVisa?.length > 0 ||
                destination.visa?.points?.length > 0) && (
                <InfoPanel icon={HiIdentification} title="Visa and work permit">
                  {studentLife.studentVisa?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-[#1F2853] mb-1.5">
                        Student visa
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        {studentLife.studentVisa.map((item) => (
                          <li key={item.label} className="flex gap-2">
                            <span className="text-slate-300">•</span>
                            <span>
                              <span className="font-semibold text-[#1F2853]">
                                {item.label}:
                              </span>{" "}
                              {item.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {studentLife.postStudyVisa?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-[#1F2853] mb-1.5">
                        Post-study work visa
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        {studentLife.postStudyVisa.map((item) => (
                          <li key={item.label} className="flex gap-2">
                            <span className="text-slate-300">•</span>
                            <span>
                              <span className="font-semibold text-[#1F2853]">
                                {item.label}:
                              </span>{" "}
                              {item.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {destination.visa?.points?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-[#1F2853] mb-1.5">
                        What you'll need
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        {destination.visa.points.map((point) => (
                          <li key={point} className="flex gap-2 items-start">
                            <HiCheckCircle className="h-4 w-4 text-[#FF4E45] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {studentLife.visaSource && (
                    <p className="text-xs text-slate-400 italic mt-3">
                      (Source:{" "}
                      <a
                        href={studentLife.visaSource}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-[#FF4E45]"
                      >
                        {studentLife.visaSource}
                      </a>
                      )
                    </p>
                  )}
                </InfoPanel>
              )}

              {studentLife.employment?.length > 0 && (
                <InfoPanel icon={HiBriefcase} title="Employment opportunities">
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    {studentLife.employment.map((item) => (
                      <li key={item.sector} className="flex gap-2">
                        <span className="text-slate-300">•</span>
                        <span>
                          <span className="font-semibold text-[#1F2853]">
                            {item.sector}:
                          </span>{" "}
                          {item.demand}
                        </span>
                      </li>
                    ))}
                  </ul>
                </InfoPanel>
              )}

              {destination.jobs?.length > 0 && (
                <InfoPanel icon={HiCurrencyDollar} title="Popular roles and salaries">
                  <ul className="space-y-2 text-sm">
                    {destination.jobs.map((job) => (
                      <li
                        key={job.title}
                        className="flex justify-between gap-4 border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-slate-600">{job.title}</span>
                        <span className="font-semibold text-[#1F2853]">
                          {job.salary}
                        </span>
                      </li>
                    ))}
                  </ul>
                </InfoPanel>
              )}
            </div>
          </SectionBlock>

          {/* Scholarships */}
          {destination.scholarships?.length > 0 && (
            <SectionBlock icon={HiAcademicCap} title="Scholarships and grants">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.scholarships.map((schol) => (
                  <div
                    key={schol.name}
                    className="bg-white border border-slate-200 rounded-sm p-4"
                  >
                    <p className="text-sm font-semibold text-[#1F2853]">
                      {schol.name}
                    </p>
                    <p className="text-sm font-semibold text-[#FF4E45] mt-1">
                      {schol.amount}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {schol.criteria}
                    </p>
                  </div>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* Counselling CTA */}
          <div className="bg-white border border-slate-200 rounded-sm px-5 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#1F2853] mb-1">Need help?</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hop onto a video counselling session with your dedicated
                counsellor to get all your queries answered.
              </p>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="shrink-0 flex items-center justify-center gap-2 border border-[#1F2853] text-[#1F2853] hover:bg-[#1F2853] hover:text-white px-5 py-2.5 rounded-sm text-sm font-medium transition-colors"
            >
              <HiVideoCamera className="h-4 w-4" /> Book a session
            </button>
          </div>

          {/* Fun facts */}
          {guide.funFacts?.length > 0 && (
            <SectionBlock icon={HiFaceSmile} title="Fun facts">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guide.funFacts.map((fact) => (
                  <div
                    key={fact}
                    className="bg-white border border-slate-200 rounded-sm px-4 py-3.5 text-sm text-slate-600 leading-relaxed"
                  >
                    {fact}
                  </div>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* Cities */}
          {guide.cities?.length > 0 && (
            <SectionBlock icon={HiBuildingOffice2} title="Cities to study">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Explore these {name} cities where you can study and shape your
                bright future.
              </p>
              <CityStrip cities={guide.cities} />
            </SectionBlock>
          )}

          {/* FAQ */}
          {guide.faqs?.length > 0 && (
            <SectionBlock icon={HiLightBulb} title="Frequently asked questions">
              <FaqAccordion faqs={guide.faqs} />
            </SectionBlock>
          )}

          {/* Related articles */}
          {articles.length > 0 && (
            <SectionBlock
              icon={HiBookOpen}
              title="Related articles"
              action={
                <Link
                  to="/articles"
                  className="flex items-center gap-1 text-sm font-medium text-[#FF4E45] hover:text-[#E03A30]"
                >
                  Show all <HiArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {articles.slice(0, 4).map((article) => (
                  <Link
                    key={article._id}
                    to={`/articles/${article._id}`}
                    className="bg-white border border-slate-200 rounded-sm p-3 flex gap-3 hover:border-[#FF4E45] transition-colors group"
                  >
                    {article.img && (
                      <div className="h-16 w-20 shrink-0 rounded-sm overflow-hidden bg-slate-100">
                        <img
                          src={article.img}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1F2853] group-hover:text-[#FF4E45] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </p>
                      {article.author && (
                        <p className="text-xs text-slate-500 mt-1.5">
                          {article.author}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </SectionBlock>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Copy page link"
              className="h-10 w-10 shrink-0 rounded-sm border border-slate-200 bg-white text-[#1F2853] hover:border-[#FF4E45] hover:text-[#FF4E45] flex items-center justify-center transition-colors"
            >
              <HiShare className="h-4 w-4" />
            </button>
            <Link
              to={universitiesLink}
              className="flex-1 bg-[#FF4E45] hover:bg-[#E03A30] text-white text-center text-sm font-semibold py-2.5 rounded-sm transition-colors"
            >
              Explore universities
            </Link>
          </div>
          {copied && (
            <p className="-mt-4 text-xs text-slate-500">Link copied to clipboard</p>
          )}

          {/* Match CTA */}
          <div className="bg-white border border-slate-200 rounded-sm p-5">
            <p className="text-sm font-bold text-[#1F2853] mb-1">
              Not sure what you qualify for?
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Get your best-fit options in 30 seconds.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="bg-[#1F2853] hover:bg-[#161c3c] text-white text-sm font-medium px-4 py-2 rounded-sm transition-colors"
            >
              Show my matches
            </button>
          </div>

          {/* Start dates */}
          {guide.startDates?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-sm p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-[#1F2853] mb-3">
                <HiCalendarDays className="h-4 w-4 text-[#FF4E45]" /> Start date
              </p>
              <div className="flex flex-wrap gap-2">
                {guide.startDates.map((month) => (
                  <span
                    key={month}
                    className="px-4 py-1.5 border border-slate-200 rounded-sm text-sm text-[#1F2853]"
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Temperature */}
          {guide.temperature && (
            <div>
              <p className="flex items-center gap-2 text-base font-bold text-[#1F2853] mb-2">
                <HiSun className="h-4 w-4 text-[#FF4E45]" /> Temperature
              </p>
              {guide.temperature.summary && (
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {guide.temperature.summary}
                </p>
              )}
              <div className="bg-white border border-slate-200 rounded-sm divide-y divide-slate-200">
                {guide.temperature.cities?.length > 0 && (
                  <div className="p-4">
                    <p className="text-xs text-slate-500 mb-3">Temperature</p>
                    <div className="grid grid-cols-2 gap-3">
                      {guide.temperature.cities.map((item) => (
                        <div key={item.city}>
                          <p className="text-xs font-semibold text-[#1F2853]">
                            {item.city}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.range}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {guide.temperature.seasons?.length > 0 && (
                  <div className="p-4">
                    <p className="text-xs text-slate-500 mb-3">Seasons</p>
                    <div className="grid grid-cols-2 gap-3">
                      {guide.temperature.seasons.map((season) => {
                        const Icon =
                          SEASON_ICONS[season.name.toLowerCase()] || HiSun;
                        return (
                          <div key={season.name}>
                            <Icon className="h-4 w-4 text-[#FF4E45] mb-1" />
                            <p className="text-xs font-semibold text-[#1F2853]">
                              {season.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {season.months}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick facts */}
          {guide.quickFacts && (
            <div className="grid grid-cols-2 gap-3">
              <FactTile
                icon={HiMapPin}
                label="Capital"
                value={guide.quickFacts.capital}
              />
              <FactTile
                icon={HiLanguage}
                label="Language"
                value={guide.quickFacts.language}
              />
              <FactTile
                icon={HiClock}
                label="Time"
                value={guide.quickFacts.time}
              />
              <FactTile
                icon={HiBanknotes}
                label="Currency"
                value={guide.quickFacts.currency}
              />
              <FactTile
                icon={HiUsers}
                label="Population"
                value={guide.quickFacts.population}
              />
              <FactTile
                icon={HiGlobeAlt}
                label="Immigrants"
                value={guide.quickFacts.immigrants}
              />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default DestinationDetail;
