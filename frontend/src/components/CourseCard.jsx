import React from 'react';
import { HiMapPin, HiClock, HiAcademicCap, HiArrowRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full mb-3">
            {course.type}
          </span>
          <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-primary transition-colors">
            {course.name}
          </h3>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <HiAcademicCap className="h-4 w-4" />
            {course.university?.name || 'Top University'}
          </p>
        </div>
        <div className="h-12 w-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-2 flex-shrink-0">
          <img 
            src={course.university?.logo || "https://ui-avatars.com/api/?name=Univ&background=random"} 
            alt="University Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <HiMapPin className="h-4 w-4 text-slate-400" />
          <span>{course.destination}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <HiClock className="h-4 w-4 text-slate-400" />
          <span>{course.duration}</span>
        </div>
      </div>
      
      <Link to={`/courses/${course._id}`} className="flex items-center justify-center w-full gap-2 bg-slate-50 hover:bg-primary hover:text-white text-slate-700 font-medium py-3 rounded-xl transition-colors duration-300">
        View Details
        <HiArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default CourseCard;
