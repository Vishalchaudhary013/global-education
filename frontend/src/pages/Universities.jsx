import React, { useState, useEffect } from "react";
import UniversityCard from "../components/UniversityCard";
import { HiMagnifyingGlass, HiMapPin, HiBuildingOffice2 } from "react-icons/hi2";
import api from '../api';

const Universities = () => {
  const [universitiesData, setUniversitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get('/universities');
        setUniversitiesData(response.data);
      } catch (err) {
        console.error("Failed to fetch universities", err);
        setUniversitiesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  const filtered = universitiesData.filter((u) => {
    const matchesDest =
      filter === "" || u.destination.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDest && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-2xl mb-6 backdrop-blur-sm border border-indigo-500/30">
            <HiBuildingOffice2 className="h-10 w-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Explore Top Universities
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Discover world-class institutions across the globe. Compare rankings, 
            costs, and requirements to find your perfect academic match.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 -mt-12 relative z-20">
        {/* Filters & Search */}
        <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar no-scrollbar">
            {["All", "UK", "USA", "Canada", "Australia", "Germany", "India", "Singapore", "Dubai"].map(
              (dest) => (
                <button
                  key={dest}
                  onClick={() => setFilter(dest === "All" ? "" : dest)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                    (filter === "" && dest === "All") || filter === dest
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {dest}
                </button>
              ),
            )}
          </div>

          <div className="relative w-full lg:w-96">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, city, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> {filtered.length === 1 ? 'university' : 'universities'}
          </p>
          {filter && (
            <button 
              onClick={() => setFilter("")}
              className="text-primary font-bold text-sm hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-[450px] animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((university) => (
              <UniversityCard key={university._id} university={university} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiBuildingOffice2 className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Universities Found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;
