import { useParams, Link } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi2";
import { useCounselling } from "@/features/counselling";
import {
  courseMetadata,
  notFoundMetadata,
  seoConfig,
  useSeo,
} from "@/shared/seo";
import { useCourse } from "../hooks/useCourse";
import CourseHero from "../components/CourseHero";
import CourseAbout from "../components/CourseAbout";
import CourseCurriculum from "../components/CourseCurriculum";
import CourseCareers from "../components/CourseCareers";
import CourseUniversities from "../components/CourseUniversities";
import CourseRequirements from "../components/CourseRequirements";
import CourseFees from "../components/CourseFees";
import CourseScholarships from "../components/CourseScholarships";
import CourseFaq from "../components/CourseFaq";

const CourseDetail = () => {
  const { id } = useParams();
  const { openModal } = useCounselling();
  const { course, loading } = useCourse(id);

  useSeo(
    loading
      ? null
      : course
        ? courseMetadata(course, seoConfig)
        : notFoundMetadata(seoConfig, "Course"),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center flex-col p-6 text-center">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-8">
          <HiInformationCircle className="h-12 w-12 text-[#FF4E45]" />
        </div>
        <h2 className="text-4xl font-extrabold text-[#1F2853] mb-4 tracking-tight">Course Not Found</h2>
        <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">The course you are looking for does not exist or has been removed.</p>
        <Link to="/courses" className="bg-[#1F2853] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#FF4E45] transition-all">
          Browse All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CourseHero course={course} onEnquire={openModal} />

      <CourseAbout course={course} onTalk={openModal} />

      <CourseCurriculum course={course} />

      <CourseFees course={course} />
      

      <CourseUniversities course={course} onApply={openModal} />

      <CourseRequirements course={course} />
      <CourseScholarships course={course} />
      <CourseCareers course={course} />

      

      <CourseFaq course={course} />
    </div>
  );
};

export default CourseDetail;
