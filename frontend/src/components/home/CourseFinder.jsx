import React, { useState } from "react";
import { HiMagnifyingGlass, HiChevronRight, HiMapPin } from "react-icons/hi2";

const CourseFinder = ({ navigate }) => {
  const [searchType, setSearchType] = useState("courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === "courses") {
      const params = new URLSearchParams();
      if (searchTerm) params.append("name", searchTerm);
      if (courseLevel) params.append("type", courseLevel);
      if (destination) params.append("destination", destination);
      navigate(`/courses?${params.toString()}`);
    } else {
      if (destination) {
        navigate(`/destinations/${destination}`);
      } else {
        navigate("/destinations");
      }
    }
  };

  return (
    <div className=" py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2853] mb-3 tracking-tight">
            Find Your Perfect <span className="">{searchType === "courses" ? "Course" : "University"}</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Search from thousands of courses and universities across the
            globe.
          </p>
        </div>
        <div className="bg-[#1F2853] rounded-xl p-6 sm:p-8 border border-slate-700 ">
          <div className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
            <button
              type="button"
              onClick={() => setSearchType("courses")}
              className={`text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${searchType === "courses" ? "bg-[#FF4E45] text-white" : "text-slate-400 hover:text-white"}`}
            >
              Find Courses
            </button>
            <button
              type="button"
              onClick={() => setSearchType("universities")}
              className={`text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${searchType === "universities" ? "bg-[#FF4E45] text-white" : "text-slate-400 hover:text-white"}`}
            >
              Find Universities
            </button>
          </div>

          <form
            className={`grid grid-cols-1 ${searchType === "courses" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4`}
            onSubmit={handleSearch}
          >
            {searchType === "courses" && (
              <div className="relative col-span-1 border border-slate-700 rounded-xl overflow-hidden group focus-within:border-primary">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-[#FF4E45] transition-colors" />
                <input
                  type="text"
                  placeholder="Course Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1F2853] text-white pl-12 pr-4 py-4 outline-none placeholder-slate-500 font-medium"
                />
              </div>
            )}

            {searchType === "courses" && (
              <div className="relative col-span-1 border border-slate-700 rounded-xl overflow-hidden focus-within:border-primary">
                <select
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                  className="w-full bg-[#1F2853] text-white px-4 py-4 outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">Course Level</option>
                  <option value="UG">Undergraduate</option>
                  <option value="PG">Postgraduate</option>
                  <option value="Diploma">Diploma</option>
                </select>
                <HiChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 rotate-90 pointer-events-none" />
              </div>
            )}

            <div className={`relative ${searchType === "courses" ? "col-span-1" : "col-span-2"} border border-slate-700 rounded-xl overflow-hidden focus-within:border-primary`}>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#1F2853] text-white px-4 py-4 outline-none font-medium appearance-none cursor-pointer"
              >
                <option value="">Destination</option>
                <option value="uk">UK</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
                <option value="india">India</option>
                <option value="dubai">Dubai</option>
                <option value="newzealand">New Zealand</option>
                <option value="singapore">Singapore</option>
              </select>
              <HiMapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
            </div>

            <div className="col-span-1">
              <button
                type="submit"
                className="w-full bg-[#FF4E45] hover:bg-[#E03A30] text-white py-4 rounded-xl font-bold text-lg transition-colors h-full"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseFinder;
