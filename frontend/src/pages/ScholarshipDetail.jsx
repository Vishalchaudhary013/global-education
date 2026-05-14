import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HiMapPin,
  HiClock,
  HiCheckCircle,
  HiChevronRight,
  HiArrowRight,
  HiBookOpen,
  HiUsers,
  HiArrowTopRightOnSquare,
  HiTag,
  HiAcademicCap,
  HiCalendarDays,
} from "react-icons/hi2";
import { useCounselling } from "../context/CounsellingContext";
import api from "../api";

const ScholarshipDetail = () => {
  const { id } = useParams();
  const { openModal } = useCounselling();
  const [scholarship, setScholarship] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchScholarship = async () => {
      try {
        const response = await api.get(`/scholarships/${id}`);
        setScholarship(response.data);
      } catch (err) {
        console.error("Failed to fetch scholarship", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <HiAcademicCap className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Scholarship Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            The scholarship you are looking for does not exist or has been
            removed.
          </p>
          <Link
            to="/scholarships"
            className="bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Browse All Scholarships
          </Link>
        </div>
      </div>
    );
  }

  const deadlineDate = scholarship.deadline
    ? new Date(scholarship.deadline)
    : null;
  const daysLeft = deadlineDate
    ? Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Banner */}
      <div className="bg-slate-900 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/30 blur-3xl rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <HiArrowRight className="h-4 w-4 rotate-180" /> Back to Scholarships
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-4 py-1.5 bg-amber-400/20 text-amber-300 font-bold rounded-full text-sm border border-amber-400/30">
                  {scholarship.amount}
                </span>
                <span className="inline-block px-4 py-1.5 bg-primary/20 text-indigo-300 font-bold rounded-full text-sm border border-primary/30">
                  {scholarship.level}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {scholarship.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-slate-300 font-medium">
                <span className="flex items-center gap-2">
                  <HiMapPin className="h-5 w-5 text-indigo-400" />{" "}
                  {scholarship.destination}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span className="flex items-center gap-2">
                  <HiUsers className="h-5 w-5 text-indigo-400" />{" "}
                  {scholarship.noOfAwards}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span className="flex items-center gap-2">
                  <HiAcademicCap className="h-5 w-5 text-amber-400" />{" "}
                  {scholarship.provider}
                </span>
              </div>
            </div>

            <button
              onClick={openModal}
              className="w-full md:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
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
              <HiBookOpen className="h-6 w-6 text-primary" /> Overview
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {scholarship.description}
            </p>

            {scholarship.tags && scholarship.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {scholarship.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full"
                  >
                    <HiTag className="h-3 w-3" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Eligible Fields */}
          {scholarship.fields && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <HiAcademicCap className="h-6 w-6 text-primary" /> Eligible
                Fields of Study
              </h2>
              <div className="flex flex-wrap gap-2">
                {scholarship.fields.map((field) => (
                  <span
                    key={field}
                    className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-full"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {scholarship.benefits && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HiAcademicCap className="h-6 w-6 text-amber-500" /> What You Get
              </h2>
              <ul className="space-y-3">
                {scholarship.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <HiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {scholarship.requirements && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HiCheckCircle className="h-6 w-6 text-primary" /> Eligibility
                Requirements
              </h2>
              <ul className="space-y-3">
                {scholarship.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Apply */}
          {scholarship.howToApply && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <HiChevronRight className="h-6 w-6 text-primary" /> How to Apply
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {scholarship.howToApply}
              </p>
              {scholarship.officialLink && (
                <a
                  href={scholarship.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  Visit Official Website <HiArrowTopRightOnSquare className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Info Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              Key Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <HiAcademicCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Award Value
                  </p>
                  <p className="text-slate-800 font-bold">
                    {scholarship.amount}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                  <HiAcademicCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Study Level
                  </p>
                  <p className="text-slate-800 font-bold">
                    {scholarship.level}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <HiMapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Destination
                  </p>
                  <p className="text-slate-800 font-bold">
                    {scholarship.destination}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <HiCalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Application Deadline
                  </p>
                  <p className="text-slate-800 font-bold">
                    {deadlineDate
                      ? deadlineDate.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Varies"}
                  </p>
                  {daysLeft !== null && daysLeft > 0 && (
                    <p
                      className={`text-xs font-semibold mt-1 ${daysLeft <= 30 ? "text-rose-500" : "text-emerald-600"}`}
                    >
                      {daysLeft} days remaining
                    </p>
                  )}
                  {daysLeft !== null && daysLeft <= 0 && (
                    <p className="text-xs font-semibold mt-1 text-slate-400">
                      Deadline passed
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
                  <HiUsers className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Awards Given
                  </p>
                  <p className="text-slate-800 font-bold">
                    {scholarship.noOfAwards}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-[40px] pointer-events-none"></div>
            <div className="relative z-10 text-center text-white">
              <HiAcademicCap className="h-10 w-10 text-amber-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">
                Not Sure If You Qualify?
              </h3>
              <p className="text-indigo-200 text-sm mb-6">
                Our expert counsellors will assess your eligibility and guide
                you through the application process for free.
              </p>
              <button
                onClick={openModal}
                className="block w-full bg-white text-slate-900 hover:bg-slate-100 py-3 rounded-xl font-bold transition-colors"
              >
                Book Free Counselling
              </button>
            </div>
          </div>

          {/* Browse More */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
            <h3 className="font-bold text-slate-800 mb-2">
              Explore More Scholarships
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Find funding opportunities matching your destination and field.
            </p>
            <Link
              to="/scholarships"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-indigo-700 transition-colors"
            >
              Browse All Scholarships <HiChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
