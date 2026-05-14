import React, { useState } from "react";
import { HiMagnifyingGlass, HiMapPin, HiFunnel } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import api from "../api";

const Courses = () => {
  const [allCoursesData, setAllCoursesData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(location.search);
    return {
      name: params.get("name") || "",
      type: params.get("type") || "",
      destination: params.get("destination") || "",
    };
  });

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      name: params.get("name") || "",
      type: params.get("type") || "",
      destination: params.get("destination") || "",
    });
  }, [location.search]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setAllCoursesData(response.data);
      } catch (err) {
        console.error("Failed to fetch courses from API", err);
        setAllCoursesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  React.useEffect(() => {
    let filtered = allCoursesData;
    if (filters.name) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }
    if (filters.type) {
      filtered = filtered.filter((c) => c.type === filters.type);
    }
    if (filters.destination) {
      filtered = filtered.filter(
        (c) =>
          c.destination.toLowerCase() === filters.destination.toLowerCase(),
      );
    }
    setCourses(filtered);
  }, [allCoursesData, filters]);

  const handleFilterChange = (e) => {
    const updatedFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    setFilters(updatedFilters);

    let filtered = allCoursesData;
    if (updatedFilters.name) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(updatedFilters.name.toLowerCase()),
      );
    }
    if (updatedFilters.type) {
      filtered = filtered.filter((c) => c.type === updatedFilters.type);
    }
    if (updatedFilters.destination) {
      filtered = filtered.filter(
        (c) =>
          c.destination.toLowerCase() ===
          updatedFilters.destination.toLowerCase(),
      );
    }
    setCourses(filtered);
  };

  const clearFilters = () => {
    setFilters({ name: "", type: "", destination: "" });
    setCourses(allCoursesData);
  };

  return (
    <div className="min-h-screen bg-slate-50  pb-24">
      {/* Header */}
      <div className="bg-slate-900 py-16 text-center px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Find Your Dream Course
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Search from thousands of courses globally tailored to your academic
          background and aspirations.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-2 mb-6 text-slate-800 border-b border-slate-100 pb-4">
            <HiFunnel className="h-5 w-5" />
            <h2 className="text-xl font-bold">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Course Name
              </label>
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Course Type
              </label>
              <div className="space-y-3">
                {["UG", "PG", "Diploma"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={filters.type === type}
                      onChange={handleFilterChange}
                      className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                    />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                      {type === "UG"
                        ? "Undergraduate"
                        : type === "PG"
                          ? "Postgraduate"
                          : "Diploma/Certificate"}
                    </span>
                  </label>
                ))}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="type"
                    value=""
                    checked={filters.type === ""}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                    Any
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <HiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  name="destination"
                  value={filters.destination}
                  onChange={handleFilterChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer text-slate-600 font-medium"
                >
                  <option value="">Any Destination</option>
                  <option value="UK">United Kingdom</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                  <option value="Dubai">Dubai</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"} Found
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <CourseCard key={course._id || index} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <HiMagnifyingGlass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No courses found
              </h3>
              <p className="text-slate-500">
                Try adjusting your filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
