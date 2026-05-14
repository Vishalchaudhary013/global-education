import React, { useState } from "react";
import ScholarshipCard from "../components/ScholarshipCard";
import { HiMagnifyingGlass, HiMapPin, HiAcademicCap } from "react-icons/hi2";
import api from '../api';

const Scholarships = () => {
  const [scholarshipsData, setScholarshipsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await api.get('/scholarships');
        setScholarshipsData(response.data);
      } catch (err) {
        console.error("Failed to fetch scholarships from API", err);
        setScholarshipsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  const filtered = scholarshipsData.filter((s) => {
    const matchesDest =
      filter === "" || s.destination.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDest && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50  pb-24">
      {/* Header */}
      <div className="bg-indigo-600 py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <HiAcademicCap className="h-16 w-16 text-amber-400 mx-auto mb-6 drop-shadow-lg" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            International Scholarships
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Discover funding opportunities to support your dream of studying
            abroad. Filter by destination to find specific scholarships.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {["All", "UK", "USA", "Canada", "Australia", "Germany","India"].map(
              (dest) => (
                <button
                  key={dest}
                  onClick={() => setFilter(dest === "All" ? "" : dest)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                    (filter === "" && dest === "All") || filter === dest
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {dest}
                </button>
              ),
            )}
          </div>

          <div className="relative w-full md:w-72">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
