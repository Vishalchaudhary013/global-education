import { useParams, useLocation, Link } from "react-router-dom";
import {
  HiMapPin,
  HiTrophy,
  HiCurrencyDollar,
  HiAcademicCap,
  HiBriefcase,
  HiCalendarDays,
  HiInformationCircle,
  HiSparkles
} from "react-icons/hi2";
import { useCounselling } from "@/features/counselling";
import {
  notFoundMetadata,
  seoConfig,
  universityDuplicateMetadata,
  universityMetadata,
  useSeo,
} from "@/shared/seo";
import { useUniversity } from "../hooks/useUniversity";
import { useUniversityCourses } from "../hooks/useUniversityCourses";
import UniversityHero from "../components/UniversityHero";
import UniversityAbout from "../components/UniversityAbout";
import UniversityCourses from "../components/UniversityCourses";
import UniversityFees from "../components/UniversityFees";
import UniversityRankings from "../components/UniversityRankings";
import UniversityScholarships from "../components/UniversityScholarships";
import UniversityRequirements from "../components/UniversityRequirements";
import UniversityStories from "../components/UniversityStories";
import UniversityFaq from "../components/UniversityFaq";

const UniversityDetail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { openModal } = useCounselling();

  const { university, loading } = useUniversity(id);
  // Fetched alongside the university (not after it) and shared by the
  // course carousel and the fees table.
  const { courses, loading: coursesLoading } = useUniversityCourses(id);

  /**
   * This page also answers at `/destinations/university/:id`. There it keeps
   * working but canonicalises to the `/universities/:id` URL, so the two do not
   * compete as duplicates.
   */
  const isDuplicateUrl = pathname.startsWith("/destinations/university/");

  useSeo(
    loading
      ? null
      : university
        ? isDuplicateUrl
          ? universityDuplicateMetadata(university, seoConfig)
          : universityMetadata(university, seoConfig)
        : notFoundMetadata(seoConfig, "University"),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="text-slate-500 font-bold animate-pulse text-lg tracking-widest uppercase">Loading Excellence...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col p-6 text-center">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-8">
          <HiInformationCircle className="h-12 w-12 text-[#FF4E45]" />
        </div>
        <h2 className="text-4xl font-extrabold text-[#1F2853] mb-4 tracking-tight">Institution Not Found</h2>
        <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">The university you are looking for might have been moved or is no longer available in our directory.</p>
        <Link to="/universities" className="bg-[#1F2853] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#FF4E45] transition-all">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <UniversityHero university={university} />

      <UniversityAbout university={university} onTalk={openModal} />

      <UniversityRankings university={university} />

      <UniversityCourses
        university={university}
        courses={courses}
        loading={coursesLoading}
        onFindFit={openModal}
      />

      <UniversityFees
        university={university}
        courses={courses}
        loading={coursesLoading}
      />

      <UniversityScholarships university={university} onEnquire={openModal} />

      <UniversityRequirements university={university} />

      <UniversityStories university={university} />

      <UniversityFaq university={university} />
    </div>
  );
};

export default UniversityDetail;

