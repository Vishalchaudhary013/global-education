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
import DestinationHero from "../components/DestinationHero";
import DestinationSearch from "../components/DestinationSearch";
import DestinationWhy from "../components/DestinationWhy";
import DestinationCourses from "../components/DestinationCourses";
import DestinationUniversities from "../components/DestinationUniversities";
import DestinationIntakes from "../components/DestinationIntakes";
import DestinationCost from "../components/DestinationCost";
import DestinationScholarships from "../components/DestinationScholarships";
import DestinationFaq from "../components/DestinationFaq";

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

  const {
    destination,
    guide,
    courses,
    universities,
    scholarships,
    articles,
    loading,
  } = useDestinationDetail(destId);

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
  const popularCourses = courses.slice(0, 4);
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
    <div className="min-h-screen">
      <DestinationHero
        destination={destination}
        guide={guide}
        onStart={openModal}
      />

      <DestinationSearch
        destination={destination}
        universities={universities}
        courses={courses}
      />

      <DestinationWhy
        destId={destId}
        destination={destination}
        guide={guide}
        onTalk={openModal}
      />

      <DestinationUniversities
        destination={destination}
        guide={guide}
        universities={universities}
        onApply={openModal}
      />

      <DestinationCourses
        destination={destination}
        guide={guide}
        courses={courses}
        onFindFit={openModal}
      />

      <DestinationIntakes
        destId={destId}
        destination={destination}
        guide={guide}
        onApply={openModal}
      />

      <DestinationCost
        destId={destId}
        destination={destination}
        guide={guide}
      />

      <DestinationScholarships
        destId={destId}
        destination={destination}
        scholarships={scholarships}
      />

      <DestinationFaq
        destId={destId}
        destination={destination}
        guide={guide}
      />

      {/* Breadcrumb */}
   
    </div>
  );
};

export default DestinationDetail;
