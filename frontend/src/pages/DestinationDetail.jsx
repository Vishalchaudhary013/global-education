import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HiMagnifyingGlass,
  HiMapPin,
  HiChevronRight,
  HiCheckCircle,
  HiCurrencyDollar,
  HiBriefcase,
  HiAcademicCap,
} from "react-icons/hi2";
import { useCounselling } from "../context/CounsellingContext";
import UniversityCard from "../components/UniversityCard";
import CourseCard from "../components/CourseCard";
import api from "../api";

const normalizeDestination = (value) =>
  (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const DestinationDetail = () => {
  const { id } = useParams();
  const { openModal } = useCounselling();

  const destId = id?.toLowerCase();
  
  const [destination, setDestination] = React.useState(null);
  const [allCoursesData, setAllCoursesData] = React.useState([]);
  const [universities, setUniversities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDestData = async () => {
      try {
        const [destRes, coursesRes] = await Promise.all([
          api.get(`/destinations/${destId}`),
          api.get('/courses')
        ]);
        setDestination(destRes.data);
        setAllCoursesData(coursesRes.data);
        
        // Fetch real-time university data for this destination
        if (destRes.data?.name) {
          const uniRes = await api.get(`/universities?destination=${destRes.data.name}`);
          setUniversities(uniRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch destination data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestData();
  }, [id, destId]);


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If destination not found in our data, show a fallback or redirect
  if (!destination) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Destination Not Found
        </h2>
        <Link to="/courses" className="text-primary hover:underline font-bold">
          Return to Courses
        </Link>
      </div>
    );
  }

  const popularCourses = allCoursesData
    .filter((course) => normalizeDestination(course.destination) === destId)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* 1. Hero Section */}
      <div className="relative pt-15 pb-24 bg-slate-900 border-b-8 border-primary">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-bold mb-4 tracking-wide uppercase">
            Destination Guide
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Study in {destination.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-16">
          {/* Popular Courses */}
          {popularCourses.length > 0 && (
            <section>
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-bold text-slate-800 border-l-4 border-primary pl-4">
                  Popular Courses
                </h2>
                <Link
                  to="/courses"
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  View All <HiChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </section>
          )}

          {/* 3. Top Universities Section */}
          <section>
            <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-3xl font-bold text-slate-800 border-l-4 border-primary pl-4">
                Top Universities in {destination?.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {universities.map((uni) => (
                <UniversityCard
                  key={uni._id}
                  university={uni}
                />
              ))}
            </div>

          </section>

          {/* 4. Scholarships Section */}
          <section>
            <h2 className="text-3xl font-bold text-slate-800 mb-8 border-l-4 border-primary pl-4">
              Scholarships & Grants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {destination?.scholarships?.map((schol, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4">
                      <HiAcademicCap className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">
                      {schol.name}
                    </h4>
                    <p className="text-primary font-bold text-sm mb-3">
                      {schol.amount}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {schol.criteria}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* 5. Costs Section */}
          <section>
            <h2 className="text-3xl font-bold text-slate-800 mb-8 border-l-4 border-primary pl-4">
              Cost of Studying & Living
            </h2>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center bg-emerald-50/30">
              <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
                <HiCurrencyDollar className="h-10 w-10" />
              </div>
              <div className="w-full">
                <ul className="space-y-4 text-slate-600 font-medium w-full">
                  <li className="flex flex-col sm:flex-row justify-between border-b border-slate-200 pb-3">
                    <span className="flex items-center gap-2">
                      <HiAcademicCap className="h-5 w-5 text-slate-400" />{" "}
                      Tuition Fees (Undergraduate):
                    </span>
                    <span className="text-slate-900 font-bold text-lg">
                      {destination.costs.ug}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row justify-between border-b border-slate-200 pb-3">
                    <span className="flex items-center gap-2">
                      <HiAcademicCap className="h-5 w-5 text-slate-400" />{" "}
                      Tuition Fees (Postgraduate):
                    </span>
                    <span className="text-slate-900 font-bold text-lg">
                      {destination.costs.pg}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row justify-between">
                    <span className="flex items-center gap-2">
                      <HiMapPin className="h-5 w-5 text-slate-400" /> Estimated
                      Living Expenses:
                    </span>
                    <span className="text-emerald-600 font-bold text-lg">
                      {destination.costs.living}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* 6. Job Prospects Sidebar */}
          <div className="bg-slate-900 rounded-3xl p-8 shadow-lg text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <HiBriefcase className="text-cyan-400 h-7 w-7" /> Post-Study Careers
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Top roles and average annual salaries for graduates in{" "}
              {destination.name}.
            </p>
            <ul className="space-y-4">
              {destination?.jobs?.map((job, index) => (
                <li
                  key={index}
                  className="bg-white/10 p-4 rounded-xl border border-white/5 hover:bg-white/20 transition-colors"
                >
                  <span className="block font-bold text-lg mb-1">
                    {job.title}
                  </span>
                  <span className="inline-block bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded text-sm font-bold">
                    Avg: {job.salary}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Visa Process Sidebar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              Student Visa Guide
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {destination?.visa?.processSummary || "Visa information currently being updated."}
            </p>
            <ul className="space-y-4 text-sm font-medium text-slate-700">
              {destination?.visa?.points?.map((point, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <HiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky CTA */}
          <div className="sticky top-24 bg-gradient-to-br from-primary to-indigo-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-indigo-500/20">
            <h3 className="text-2xl font-bold mb-3">Ready to Apply?</h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Get free end-to-end counselling for admission in{" "}
              {destination.name}.
            </p>
            <button
              onClick={openModal}
              className="w-full bg-white text-primary hover:bg-slate-50 py-4 rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              Book Free Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
