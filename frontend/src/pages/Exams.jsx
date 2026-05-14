import React from 'react';
import { Link } from 'react-router-dom';
import { HiBookOpen, HiCheckCircle, HiOutlineGlobeAlt, HiArrowRight } from "react-icons/hi2";

const exams = [
  { id: 'ielts', name: 'IELTS', desc: 'International English Language Testing System.', countries: ['UK', 'Australia', 'Canada', 'NZ'], style: 'from-blue-500 to-cyan-400' },
  { id: 'toefl', name: 'TOEFL', desc: 'Test of English as a Foreign Language.', countries: ['USA', 'Canada', 'Global'], style: 'from-rose-500 to-orange-400' },
  { id: 'pte', name: 'PTE Academic', desc: 'Pearson Test of English.', countries: ['Australia', 'UK', 'New Zealand'], style: 'from-emerald-500 to-teal-400' },
  { id: 'duolingo', name: 'Duolingo English Test', desc: 'Convenient, fast, and affordable English test.', countries: ['USA', 'Canada', 'UK (Some)'], style: 'from-lime-500 to-green-500' },
  { id: 'oet', name: 'OET', desc: 'Occupational English Test for Healthcare Professionals.', countries: ['UK', 'Australia', 'Ireland'], style: 'from-indigo-500 to-purple-500' }
];

const Exams = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 py-16 text-center px-6 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">Language Proficiency Exams</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto relative z-10">
          Prepare for your study abroad journey. Learn about required English language tests, their formats, and how to score high.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exam.style} flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-current/30`}>
              {exam.name.slice(0, 3).toUpperCase()}
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-3">{exam.name}</h2>
            <p className="text-slate-600 mb-6 flex-grow">{exam.desc}</p>
            
            <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"><HiOutlineGlobeAlt className="h-4 w-4 text-primary" /> Widely Accepted In</h3>
              <ul className="flex flex-wrap gap-2">
                {exam.countries.map(country => (
                  <li key={country} className="text-xs font-semibold bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-600 flex items-center gap-1">
                    <HiCheckCircle className="h-3 w-3 text-emerald-500" /> {country}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to={`/exams/${exam.id}`} className="mt-auto flex items-center justify-between w-full group-hover:bg-primary group-hover:text-white bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors duration-300">
              View Guide <HiArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
