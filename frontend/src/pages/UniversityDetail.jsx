import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  HiMapPin, 
  HiTrophy, 
  HiCurrencyDollar, 
  HiAcademicCap, 
  HiArrowLeft, 
  HiBriefcase, 
  HiCalendarDays,
  HiCheckBadge,
  HiInformationCircle,
  HiSparkles
} from "react-icons/hi2";
import api from "../api";
import { useCounselling } from "../context/CounsellingContext";

const UniversityDetail = () => {
  const { id } = useParams();
  const { openModal } = useCounselling();

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUniversity = async () => {
      try {
        const response = await api.get(`/universities/${id}`);
        setUniversity(response.data);
      } catch (err) {
        console.error("Failed to fetch university", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversity();
  }, [id]);

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
          <HiInformationCircle className="h-12 w-12 text-rose-500" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Institution Not Found</h2>
        <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">The university you are looking for might have been moved or is no longer available in our directory.</p>
        <Link to="/universities" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-slate-200">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <div className="relative h-[450px] lg:h-[550px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={university.heroImage || "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2670&auto=format&fit=crop"}
            alt={university.name}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop";
              e.target.onerror = null;
            }}
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-15 h-full relative z-10 flex flex-col  pb-16">
          <Link 
            to="/universities" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold mb-10 group"
          >
            <HiArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> 
            Back to Directory
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="h-32 w-32 md:h-48 md:w-48 rounded-3xl bg-white border-4 border-white/20 shadow-2xl overflow-hidden z-20 backdrop-blur-md flex items-center justify-center">
              <img
                src={university.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(university.name)}&background=4f46e5&color=fff&size=256`}
                alt={university.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(university.name)}&background=4f46e5&color=fff&size=256`;
                  e.target.onerror = null;
                }}
                className="w-full h-full object-cover"
              />
            </div>


            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/20 backdrop-blur-md text-primary-300 border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <HiCheckBadge className="h-4 w-4" /> Accredited Institution
                </span>
                <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-emerald-400">
                  <HiSparkles className="h-4 w-4" /> {university.destination}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-none drop-shadow-lg">{university.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-300 font-bold text-lg">
                <div className="flex items-center gap-2">
                  <HiMapPin className="h-5 w-5 text-rose-500" />
                  <span>
                    {university.location && university.location.toLowerCase() !== university.destination.toLowerCase() 
                      ? `${university.location}, ` 
                      : ""}{university.destination}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiTrophy className="h-5 w-5 text-amber-400" />
                  <span>World Rank {university.ranking || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <HiAcademicCap className="h-5 w-5 text-indigo-500" /> IELTS Score
              </div>
              <p className="text-slate-900 font-black text-2xl">{university.ieltsRequirement || "N/A"}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <HiCurrencyDollar className="h-5 w-5 text-emerald-500" /> Study Cost
              </div>
              <p className="text-slate-900 font-black text-2xl">{university.studyCost?.split('/')[0] || "Varies"}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <HiCalendarDays className="h-5 w-5 text-amber-500" /> Next Intake
              </div>
              <p className="text-slate-900 font-black text-2xl truncate" title={university.intakes}>{university.intakes?.split(',')[0] || "Sept 2024"}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <HiBriefcase className="h-5 w-5 text-rose-500" /> Employment
              </div>
              <p className="text-slate-900 font-black text-2xl">High Rate</p>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm">
            <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <HiInformationCircle className="h-6 w-6" />
              </div>
              Institution Overview
            </h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 text-xl leading-relaxed font-light mb-8 italic border-l-4 border-primary pl-6">
                "{university.overview || `${university.name} is a premier global institution recognized for academic excellence, innovative research, and a vibrant international community.`}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
                <p>
                  As one of the world's leading universities located in {university.location}, {university.name} offers a 
                  transformative educational experience. Our programs are designed to challenge thinking, 
                  inspire creativity, and prepare students for global leadership.
                </p>
                <p>
                  Students at {university.name} benefit from state-of-the-art facilities, world-renowned faculty, 
                  and strong industry connections that facilitate internships and career placements across 
                  major international markets.
                </p>
              </div>
            </div>
          </div>

          {/* Added Popular Departments */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm">
            <h3 className="text-3xl font-black text-slate-800 mb-8">Popular Departments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Business & Management', icon: '💼', color: 'bg-blue-50 text-blue-600' },
                { name: 'Engineering & Tech', icon: '⚙️', color: 'bg-amber-50 text-amber-600' },
                { name: 'Computer Science', icon: '💻', color: 'bg-purple-50 text-purple-600' },
                { name: 'Health & Medicine', icon: '🏥', color: 'bg-rose-50 text-rose-600' },
                { name: 'Arts & Design', icon: '🎨', color: 'bg-emerald-50 text-emerald-600' },
                { name: 'Social Sciences', icon: '🌍', color: 'bg-indigo-50 text-indigo-600' },
              ].map((dept, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-primary/20 hover:bg-slate-50/50 transition-all group cursor-default">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${dept.color} group-hover:scale-110 transition-transform`}>
                    {dept.icon}
                  </div>
                  <span className="font-bold text-slate-700">{dept.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Added Why Study Here */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-slate-800 px-2">Why Study Here?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Global Reputation', desc: 'Ranked among the top 1% of universities worldwide with a legacy of excellence.', icon: <HiTrophy /> },
                { title: 'Career Growth', desc: 'Strong industry partnerships providing unmatched internship and job opportunities.', icon: <HiBriefcase /> },
                { title: 'Modern Campus', desc: 'State-of-the-art labs, libraries, and research facilities at your disposal.', icon: <HiSparkles /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl mb-6 shadow-lg shadow-slate-200">
                    {item.icon}
                  </div>
                  <h5 className="font-black text-slate-800 mb-3">{item.title}</h5>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Apply Card */}
          <div className="sticky top-24 bg-gradient-to-br from-primary to-indigo-700 rounded-[40px] p-10 text-center text-white shadow-2xl shadow-primary/30 border border-white/10">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
              <HiSparkles className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-black mb-4">Start Your Journey</h3>
            <p className="text-indigo-100 text-lg mb-10 leading-relaxed font-medium">
              Join thousands of international students at {university.name}. Get free expert guidance on your application.
            </p>
            <button
              onClick={openModal}
              className="w-full bg-white text-primary hover:bg-slate-50 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Book Free Counselling
            </button>
            <p className="mt-6 text-xs font-bold text-white/50 uppercase tracking-widest">No Hidden Fees • Trusted by 10k+ Students</p>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <HiMapPin className="h-24 w-24 text-slate-900" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-6">Campus Location</h4>
            <p className="text-slate-600 font-bold text-lg mb-2">{university.location}</p>
            <p className="text-slate-500 font-medium mb-6 uppercase tracking-wider text-xs">{university.destination}</p>
            <div className="h-64 bg-slate-100 rounded-3xl overflow-hidden relative group shadow-inner">
               <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(university.name + " " + university.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
               ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;

