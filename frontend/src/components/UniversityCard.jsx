import React from 'react';
import { HiMapPin, HiTrophy, HiCurrencyDollar, HiAcademicCap, HiChevronRight, HiStar } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const UniversityCard = ({ university }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all group duration-500 flex flex-col h-full">
      {/* Hero Image / Banner */}
      <div className="h-40 bg-slate-700 relative  shrink-0">
        <img 
          src={university.heroImage || "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2670&auto=format&fit=crop"} 
          alt="" 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop";
            e.target.onerror = null;
          }}
          className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
        
        {/* Logo Overlay */}
        <div className="absolute -bottom-10 left-6 h-24 w-24 rounded-2xl bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center z-50 transition-transform duration-500 group-hover:scale-105">
          <img 
            src={university.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(university.name)}&background=4f46e5&color=fff&size=128`} 
            alt={university.name} 
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(university.name)}&background=4f46e5&color=fff&size=128`;
              e.target.onerror = null;
            }}
            className="w-full h-full z-50 object-cover"
          />
        </div>



        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1">
            <HiStar className="h-3 w-3 text-amber-400 fill-amber-400" />
            Top Ranked
          </span>
        </div>
      </div>
      
      <div className="p-6 pt-16 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {university.name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2 font-medium">
            <HiMapPin className="h-4 w-4 text-rose-500" />
            <span>
              {university.location && university.location.toLowerCase() !== university.destination.toLowerCase() 
                ? `${university.location}, ` 
                : ""}{university.destination}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-8 mt-auto">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <HiTrophy className="h-4 w-4 text-amber-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Rank</span>
            </div>
            <span className="text-sm font-bold text-slate-700">{university.ranking || 'N/A'}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <HiAcademicCap className="h-4 w-4 text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IELTS Req.</span>
            </div>
            <span className="text-sm font-bold text-slate-700">{university.ieltsRequirement || 'N/A'}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <HiCurrencyDollar className="h-4 w-4 text-blue-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Cost</span>
            </div>
            <span className="text-sm font-bold text-slate-700 truncate block" title={university.studyCost}>{university.studyCost || 'Varies'}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-purple-50 group-hover:border-purple-100 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <HiStar className="h-4 w-4 text-purple-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intakes</span>
            </div>
            <span className="text-sm font-bold text-slate-700 truncate block" title={university.intakes}>{university.intakes || 'Multiple'}</span>
          </div>
        </div>

        <Link 
          to={`/universities/${university._id}`} 
          className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-primary text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 group-hover:shadow-primary/30"
        >
          View Details <HiChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;

