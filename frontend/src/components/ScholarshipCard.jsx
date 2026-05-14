import React from "react";
import { HiAcademicCap, HiClock, HiMapPin, HiCheckCircle, HiChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-full -z-0"></div>
      <div className="absolute top-4 right-4 z-10">
        <HiAcademicCap className="h-8 w-8 text-amber-500 opacity-80" />
      </div>

      <div className="relative z-10 flex-grow">
        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full mb-3">
          {scholarship.amount}
        </span>

        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-primary transition-colors">
          {scholarship.name}
        </h3>

        <div className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2 line-clamp-1">
          {scholarship.university?.name || "Multiple Universities"}
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <HiMapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">{scholarship.destination}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <HiCheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
            <span className="line-clamp-2">
              {scholarship.eligibility || "Check specific requirements"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <HiClock className="h-4 w-4 text-rose-400 shrink-0" />
            <span>
              Deadline:{" "}
              {scholarship.deadline
                ? new Date(scholarship.deadline).toLocaleDateString()
                : "Varies"}
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/scholarships/${scholarship._id}`}
        className="mt-auto flex items-center justify-center gap-2 w-full text-primary border border-primary/20 hover:bg-primary hover:text-white font-medium py-2.5 rounded-xl transition-all duration-300"
      >
        View Details <HiChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default ScholarshipCard;
