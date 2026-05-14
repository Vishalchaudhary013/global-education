import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiBeaker, HiArrowLeft } from "react-icons/hi2";

const ExamDetail = () => {
  const { id } = useParams();
  const examName = id ? id.toUpperCase() : 'EXAM';

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/exams" className="inline-flex items-center gap-2 text-indigo-300 hover:text-white font-medium mb-8 transition-colors">
            <HiArrowLeft className="h-4 w-4" /> Back to Exams
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 bg-white text-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl">
              {examName.slice(0,3)}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">{examName} Overview</h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-2xl">
            Everything you need to know about the {examName} test format, scoring, and preparation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-10">
          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <HiInformationCircle className="h-6 w-6 text-primary" /> Exam Format
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <h3 className="font-bold text-slate-800 text-lg mb-2">Reading (60 mins)</h3>
                <p className="text-slate-600">3 long reading passages with tasks including multiple choice, matching information, and sentence completion.</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <h3 className="font-bold text-slate-800 text-lg mb-2">Writing (60 mins)</h3>
                <p className="text-slate-600">Task 1: Describe visual information. Task 2: Essay on a given topic.</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <h3 className="font-bold text-slate-800 text-lg mb-2">Listening (30 mins)</h3>
                <p className="text-slate-600">4 sections consisting of conversations and monologues with various accents.</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <h3 className="font-bold text-slate-800 text-lg mb-2">Speaking (11-14 mins)</h3>
                <p className="text-slate-600">Face-to-face interview consisting of short questions, speaking on a topic, and a discussion.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <HiBeaker className="h-6 w-6 text-indigo-500" /> Preparation Tips
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><HiCheckCircle className="h-6 w-6 text-emerald-500 shrink-0" /><span className="text-slate-700"><strong>Understand the test format:</strong> Familiarize yourself with the types of questions in each section.</span></li>
              <li className="flex items-start gap-3"><HiCheckCircle className="h-6 w-6 text-emerald-500 shrink-0" /><span className="text-slate-700"><strong>Practice time management:</strong> The test is strictly timed. Take full-length timed practice tests.</span></li>
              <li className="flex items-start gap-3"><HiCheckCircle className="h-6 w-6 text-emerald-500 shrink-0" /><span className="text-slate-700"><strong>Immerse yourself in English:</strong> Read English newspapers, listen to podcasts, and watch movies without subtitles.</span></li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
            <h3 className="font-bold text-emerald-800 text-xl mb-4">Score Requirements</h3>
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <span className="block text-sm text-slate-500 font-medium mb-1">Undergraduate (UG)</span>
              <span className="block text-2xl font-black text-slate-800">6.0 - 6.5</span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <span className="block text-sm text-slate-500 font-medium mb-1">Postgraduate (PG)</span>
              <span className="block text-2xl font-black text-slate-800">6.5 - 7.0</span>
            </div>
            <p className="text-sm text-emerald-700 mt-4 flex items-start gap-1">
              <HiExclamationCircle className="h-4 w-4 shrink-0 mt-0.5" /> Note: Requirements vary significantly by university and program.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Need help preparing?</h3>
            <p className="text-slate-600 text-sm mb-6">Our expert counsellors can guide you to the best preparation resources and coaching centers.</p>
            <button className="w-full bg-slate-900 hover:bg-primary text-white font-bold py-3 rounded-xl transition-colors">
              Get Free Guidance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
