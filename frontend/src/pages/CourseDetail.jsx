import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HiMapPin,
  HiClock,
  HiAcademicCap,
  HiChevronRight,
  HiCheckCircle,
  HiBookOpen,
  HiCalendarDays,
  HiCurrencyDollar,
  HiArrowRight,
} from "react-icons/hi2";
import { useCounselling } from "../context/CounsellingContext";
import api from "../api";

const CourseDetail = () => {
  const { id } = useParams();
  const { openModal } = useCounselling();
  const [course, setCourse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Failed to fetch course", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Course Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            The course you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/courses"
            className="bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Banner */}
      <div className="bg-slate-900 pt-15 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/40 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/30 blur-3xl rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <HiArrowRight className="h-4 w-4 rotate-180" /> Back to Courses
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-indigo-300 font-bold rounded-full text-sm mb-4 border border-primary/30">
                {course.type === "UG"
                  ? "Undergraduate Program"
                  : course.type === "PG"
                    ? "Postgraduate Program"
                    : "Diploma/Certificate"}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {course.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-300 font-medium">
                <span className="flex items-center gap-2">
                  <HiAcademicCap className="h-5 w-5 text-indigo-400" />
                  {course.university.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span className="flex items-center gap-2">
                  <HiMapPin className="h-5 w-5 text-indigo-400" />
                  {course.destination}
                </span>
              </div>
            </div>

            <button
              onClick={openModal}
              className="w-full md:w-auto bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Book Free Counselling
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HiBookOpen className="h-6 w-6 text-primary" /> Course Overview
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              The {course.name} program at {course.university.name} is designed
              to equip students with the theoretical and practical knowledge
              required to excel in the global industry. Focusing heavily on
              project-based learning and research, the curriculum is updated
              regularly in collaboration with industry partners.
            </p>
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              Key Highlights:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600">
                <HiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />{" "}
                High employability rate post-graduation globally.
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <HiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />{" "}
                Access to state-of-the-art research facilities.
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <HiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />{" "}
                Industry placements and paid internships available.
              </li>
            </ul>
          </div>

          {/* University Info */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HiAcademicCap className="h-6 w-6 text-primary" /> About{" "}
              {course.university.name}
            </h2>
            <div className="flex items-center gap-6 mb-4">
              <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${course.university.name.replace(" ", "+")}&background=random`}
                  alt="Logo"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <p className="text-slate-600 font-medium">
                  {course.university.overview ||
                    "A globally ranked university situated in a student-friendly city."}
                </p>
              </div>
            </div>
            <Link
              to="/destinations"
              className="text-primary font-bold hover:underline flex items-center gap-1 text-sm mt-4"
            >
              Explore more about studying in {course.destination}{" "}
              <HiChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              Key Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                  <HiClock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Duration</p>
                  <p className="text-slate-800 font-bold">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <HiCurrencyDollar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Estimated Tuition
                  </p>
                  <p className="text-slate-800 font-bold">
                    {course.university.tuition || "Variable"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <HiCalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Intake Months
                  </p>
                  <p className="text-slate-800 font-bold">
                    {course.university.intakes || "September, January"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-[40px]"></div>
            <div className="relative z-10 text-center text-white">
              <h3 className="text-xl font-bold mb-2">
                Check Scholarship Eligibility
              </h3>
              <p className="text-indigo-200 text-sm mb-6">
                See how much you can save on your tuition fees for this program.
              </p>
              <Link
                to="/scholarships"
                className="block w-full bg-white text-slate-900 hover:bg-slate-100 py-3 rounded-xl font-bold transition-colors"
              >
                View Scholarships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
