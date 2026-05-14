import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiSquares2X2,
  HiUsers,
  HiBookOpen,
  HiBuildingOffice2,
  HiAcademicCap,
  HiCalendarDays,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiCheck,
  HiTrash,
  HiPencilSquare,
  HiShieldExclamation,
  HiShieldCheck,
  HiEye,
  HiArrowTopRightOnSquare,
  HiKey,
  HiPlus,
  HiXMark,
} from "react-icons/hi2";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const emptyUniversity = {
  name: "",
  location: "",
  destination: "",
  ranking: "",
  ieltsRequirement: "",
  logo: "",
  studyCost: "",
  livingCost: "",
  overview: "",
  tuition: "",
  intakes: "",
};

const emptyCourse = {
  name: "",
  type: "UG",
  destination: "",
  university: "",
  duration: "",
};

const emptyScholarship = {
  name: "",
  destination: "",
  university: "",
  amount: "",
  eligibility: "",
  deadline: "",
  level: "",
  provider: "",
  noOfAwards: "",
  description: "",
  fields: "",
  benefits: "",
  requirements: "",
  howToApply: "",
  officialLink: "",
  tags: "",
};

const emptyEvent = {
  name: "",
  mode: "online",
  type: "",
  date: "",
  time: "",
  location: "",
  university: "",
  logo: "",
  countries: "",
  highlights: "",
  universities: "",
  description: "",
  venue: "",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || "Action failed. Please try again.";

const formatDateForInput = (dateValue) => {
  if (!dateValue) return "";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().split("T")[0];
};

const csvToArray = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const arrayToCsv = (value) => (Array.isArray(value) ? value.join(", ") : "");

const universitiesTextToArray = (value) =>
  (value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", country = "", role = ""] = line
        .split("|")
        .map((part) => part.trim());
      return { name, country, role };
    })
    .filter((item) => item.name);

const universitiesArrayToText = (value) =>
  Array.isArray(value)
    ? value
      .map(
        (item) =>
          `${item?.name || ""} | ${item?.country || ""} | ${item?.role || ""}`,
      )
      .join("\n")
    : "";

const PAGE_SIZE = 10;

const Pagination = ({ total, page, setPage }) => {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-700">{from}–{to}</span> of <span className="font-semibold text-gray-700">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
          .reduce((acc, n, idx, arr) => {
            if (idx > 0 && n - arr[idx - 1] > 1) acc.push('...');
            acc.push(n);
            return acc;
          }, [])
          .map((n, i) => n === '...' ? (
            <span key={i} className="px-2 text-gray-400 text-sm">…</span>
          ) : (
            <button key={n} onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${page === n ? 'bg-blue-600 text-white shadow-sm' : 'border border-gray-300 bg-white hover:bg-gray-100 text-gray-700'
                }`}>{n}</button>
          ))}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          Next →
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [editingUniversityId, setEditingUniversityId] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingScholarshipId, setEditingScholarshipId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  const [universityForm, setUniversityForm] = useState(emptyUniversity);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [scholarshipForm, setScholarshipForm] = useState(emptyScholarship);
  const [eventForm, setEventForm] = useState(emptyEvent);

  const [showUniversityForm, setShowUniversityForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showScholarshipForm, setShowScholarshipForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const [uniPage, setUniPage] = useState(1);
  const [coursePage, setCoursePage] = useState(1);
  const [scholarshipPage, setScholarshipPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HiSquares2X2 className="w-5 h-5" />,
    },
    {
      id: "universities",
      label: "Universities",
      icon: <HiBuildingOffice2 className="w-5 h-5" />,
    },
    { id: "courses", label: "Courses", icon: <HiBookOpen className="w-5 h-5" /> },
    {
      id: "scholarships",
      label: "Scholarships",
      icon: <HiAcademicCap className="w-5 h-5" />,
    },
    { id: "events", label: "Events", icon: <HiCalendarDays className="w-5 h-5" /> },
    {
      id: "counselling",
      label: "Counselling Requests",
      icon: <HiUsers className="w-5 h-5" />,
    },
  ];
  if (user?.role === "superadmin") {
    navItems.push({
      id: "admins",
      label: "Admins",
      icon: <HiShieldCheck className="w-5 h-5" />,
    });

  }


  const loadAllData = async () => {
    setError("");
    setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        api.get("/universities?admin=true"),
        api.get("/courses?admin=true"),
        api.get("/scholarships?admin=true"),
        api.get("/events?admin=true"),
        api.get("/counselling"),
        user?.role === "superadmin" ? api.get("/users") : Promise.resolve({ data: [] }),
      ]);

      const [uniRes, courseRes, scholarshipRes, eventRes, requestRes, userRes] = results;

      setUniversities(
        uniRes.status === "fulfilled" ? uniRes.value.data || [] : [],
      );
      setCourses(
        courseRes.status === "fulfilled" ? courseRes.value.data || [] : [],
      );
      setScholarships(
        scholarshipRes.status === "fulfilled"
          ? scholarshipRes.value.data || []
          : [],
      );
      setEvents(
        eventRes.status === "fulfilled" ? eventRes.value.data || [] : [],
      );
      setRequests(
        requestRes.status === "fulfilled" ? requestRes.value.data || [] : [],
      );
      setAllUsers(
        userRes.status === "fulfilled" ? userRes.value.data || [] : [],
      );

      const failedCalls = results.filter(
        (result) => result.status === "rejected",
      );
      if (failedCalls.length > 0) {
        setError(
          "Some dashboard sections could not be loaded. Please refresh.",
        );
      }
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    if (user?.role === "admin" || user?.role === "superadmin") {
      loadAllData();
    } else {
      setIsLoading(false);
    }
  }, [token, user?.role]);

  useEffect(() => {
    if (!success) return;
    const timeout = setTimeout(() => setSuccess(""), 2400);
    return () => clearTimeout(timeout);
  }, [success]);

  const stats = useMemo(
    () => ({
      totalUniversities: universities.length,
      totalCourses: courses.length,
      totalScholarships: scholarships.length,
      upcomingEvents: events.filter(
        (event) => new Date(event.date) >= new Date(),
      ).length,
      pendingRequests: requests.filter(
        (request) => request.status === "pending",
      ).length,
    }),
    [universities, courses, scholarships, events, requests],
  );

  const handleUnauthorized = () => {
    logout();
    navigate("/");
  };

  const handleDelete = async (url, label) => {
    setError("");
    try {
      await api.delete(url);
      setSuccess(`${label} deleted`);
      await loadAllData();
    } catch (deleteError) {
      if (deleteError?.response?.status === 401) {
        handleUnauthorized();
        return;
      }
      setError(getErrorMessage(deleteError));
    }
  };

  const updateUserRole = async (userId, newRole) => {
    setError("");
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      setSuccess("User role updated");
      await loadAllData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const submitUniversity = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (editingUniversityId) {
        await api.put(`/universities/${editingUniversityId}`, universityForm);
        setSuccess("University updated");
      } else {
        await api.post("/universities", universityForm);
        setSuccess("University created");
      }
      setUniversityForm(emptyUniversity);
      setEditingUniversityId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  };

  const submitCourse = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = { ...courseForm };
      if (!payload.university) delete payload.university;

      if (editingCourseId) {
        await api.put(`/courses/${editingCourseId}`, payload);
        setSuccess("Course updated");
      } else {
        await api.post("/courses", payload);
        setSuccess("Course created");
      }
      setCourseForm(emptyCourse);
      setEditingCourseId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  };

  const submitScholarship = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = {
        ...scholarshipForm,
        deadline: scholarshipForm.deadline || null,
        fields: csvToArray(scholarshipForm.fields),
        benefits: csvToArray(scholarshipForm.benefits),
        requirements: csvToArray(scholarshipForm.requirements),
        tags: csvToArray(scholarshipForm.tags),
      };
      if (!payload.university) delete payload.university;

      if (editingScholarshipId) {
        await api.put(`/scholarships/${editingScholarshipId}`, payload);
        setSuccess("Scholarship updated");
      } else {
        await api.post("/scholarships", payload);
        setSuccess("Scholarship created");
      }

      setScholarshipForm(emptyScholarship);
      setEditingScholarshipId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  };

  const submitEvent = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = {
        ...eventForm,
        countries: csvToArray(eventForm.countries),
        highlights: csvToArray(eventForm.highlights),
        universities: universitiesTextToArray(eventForm.universities),
      };
      if (!payload.university) delete payload.university;

      if (editingEventId) {
        await api.put(`/events/${editingEventId}`, payload);
        setSuccess("Event updated");
      } else {
        await api.post("/events", payload);
        setSuccess("Event created");
      }
      setEventForm(emptyEvent);
      setEditingEventId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    setError("");
    try {
      await api.patch(`/counselling/${requestId}/status`, { status });
      setSuccess("Request status updated");
      await loadAllData();
    } catch (statusError) {
      setError(getErrorMessage(statusError));
    }
  };

  if (!token || !["admin", "superadmin"].includes(user?.role)) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-700 flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white/90 p-8 text-center">
          <HiShieldExclamation className="w-12 h-12 mx-auto mb-4 text-amber-400" />
          <h1 className="text-2xl font-bold mb-2">Admin Access Only</h1>
          <p className="text-gray-500 mb-2">
            Open this page only with an authenticated admin account.
          </p>
          {user?.role && !["admin", "superadmin"].includes(user.role) && (
            <p className="text-amber-300 text-sm mb-4">
              Current account role: {user.role}
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold"
            >
              Go to Admin Login
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex overflow-hidden">
      <aside className="w-64 shrink-0 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0 shadow-sm flex flex-col">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1">

            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          </div>

        </div>

        <nav className="p-3 grid grid-cols-2 md:grid-cols-1 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-3 rounded-xl text-left text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === item.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={handleUnauthorized}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <HiArrowRightOnRectangle className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-8">


        {error && (
          <div className="mb-4 bg-red-50 text-red-700 border border-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 text-green-700 border border-green-300 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            Loading admin data...
          </div>
        ) : (
          <>
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {user?.role === "superadmin" ? "Super Admin Control" : "Admin Dashboard"}
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Platform Overview
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-3 bg-slate-50 border border-slate-200 py-2.5 px-4 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{user?.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{user?.role}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Universities
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      {stats.totalUniversities}
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Courses
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      {stats.totalCourses}
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Scholarships
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      {stats.totalScholarships}
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Upcoming Events
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      {stats.upcomingEvents}
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Pending Requests
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.pendingRequests}
                    </p>
                  </div>
                </div>

                {user?.role === "superadmin" && (
                  <>
                    <h2 className="text-xl font-bold text-gray-800">Admin users</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Total Admins</p>
                        <p className="text-3xl font-bold text-slate-800">{allUsers.filter(u => u.role === 'admin').length}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Super Admins</p>
                        <p className="text-3xl font-bold text-slate-800">{allUsers.filter(u => u.role === 'superadmin').length}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Total Accounts</p>
                        <p className="text-3xl font-bold text-slate-800">{allUsers.length}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "universities" && (
              <section className="space-y-6">
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Universities</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{universities.length} Universities listed</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowUniversityForm(v => !v); setEditingUniversityId(null); setUniversityForm(emptyUniversity); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95 ${showUniversityForm
                      ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
                      }`}
                  >
                    {showUniversityForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create University</>}
                  </button>
                </div>

                {/* ── Professional University Form ── */}
                {(showUniversityForm || editingUniversityId) && (
                  <form
                    onSubmit={submitUniversity}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
                  >
                    {/* Form Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-slate-900">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <HiAcademicCap className="w-5 h-5 text-blue-600" />
                        {editingUniversityId ? "Update University" : "Add New University"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">Fill in the details below to {editingUniversityId ? "update the" : "register a new"} university.</p>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Section 1: Basic Information */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Basic Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">University Name <span className="text-red-400">*</span></label>
                            <input
                              required
                              placeholder="e.g. University of Oxford"
                              value={universityForm.name}
                              onChange={(e) => setUniversityForm({ ...universityForm, name: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Location / City <span className="text-red-400">*</span></label>
                            <input
                              required
                              placeholder="e.g. Oxford, UK"
                              value={universityForm.location}
                              onChange={(e) => setUniversityForm({ ...universityForm, location: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Destination Country <span className="text-red-400">*</span></label>
                            <select
                              required
                              value={universityForm.destination}
                              onChange={(e) => setUniversityForm({ ...universityForm, destination: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all appearance-none cursor-pointer"
                            >
                              <option value="">Select country...</option>
                              {["Australia", "Canada", "Dubai", "Germany", "India", "New Zealand", "Singapore", "UK", "USA"].map(d => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Global Ranking</label>
                            <input
                              placeholder="e.g. #3 Global"
                              value={universityForm.ranking}
                              onChange={(e) => setUniversityForm({ ...universityForm, ranking: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-200" />

                      {/* Section 2: Admission & Fees */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Admission & Fees</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">IELTS Requirement</label>
                            <input
                              placeholder="e.g. 6.5 overall"
                              value={universityForm.ieltsRequirement}
                              onChange={(e) => setUniversityForm({ ...universityForm, ieltsRequirement: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Study Cost</label>
                            <input
                              placeholder="e.g. AUD 48,000/yr"
                              value={universityForm.studyCost}
                              onChange={(e) => setUniversityForm({ ...universityForm, studyCost: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Living Cost</label>
                            <input
                              placeholder="e.g. AUD 21,000/yr"
                              value={universityForm.livingCost}
                              onChange={(e) => setUniversityForm({ ...universityForm, livingCost: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Tuition</label>
                            <input
                              placeholder="e.g. £32,000/year"
                              value={universityForm.tuition}
                              onChange={(e) => setUniversityForm({ ...universityForm, tuition: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Intake Months</label>
                            <input
                              placeholder="e.g. September, January"
                              value={universityForm.intakes}
                              onChange={(e) => setUniversityForm({ ...universityForm, intakes: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Logo URL</label>
                            <input
                              placeholder="https://..."
                              value={universityForm.logo}
                              onChange={(e) => setUniversityForm({ ...universityForm, logo: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-200" />

                      {/* Section 3: Overview */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Overview</p>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-gray-500">University Overview / Description</label>
                          <textarea
                            placeholder="Brief description of the university, its strengths, and what makes it unique for international students..."
                            value={universityForm.overview}
                            onChange={(e) => setUniversityForm({ ...universityForm, overview: e.target.value })}
                            rows={3}
                            className="bg-gray-50 border border-gray-300 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Form Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/80 flex items-center justify-between gap-3">

                      <div className="flex gap-3">
                        {editingUniversityId && (
                          <button
                            type="button"
                            onClick={() => { setEditingUniversityId(null); setUniversityForm(emptyUniversity); }}
                            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-all"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-500 active:scale-95 px-6 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
                        >
                          <HiCheck className="w-4 h-4" />
                          {editingUniversityId ? "Update University" : "Add University"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {!showUniversityForm && !editingUniversityId && (
                  <>
                    <div className="overflow-auto border border-gray-200 rounded-xl">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Destination</th>
                            <th className="p-3">Ranking</th>
                            <th className="p-3">IELTS</th>
                            <th className="p-3">Study Cost</th>
                            <th className="p-3">Living Cost</th>
                            <th className="p-3">Tuition</th>
                            <th className="p-3">Intakes</th>
                            <th className="p-3">Overview</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {universities.slice((uniPage - 1) * PAGE_SIZE, uniPage * PAGE_SIZE).map((university) => (
                            <tr
                              key={university._id}
                              className="border-t border-gray-200"
                            >
                              <td className="p-3">{university.name}</td>
                              <td className="p-3">{university.location}</td>
                              <td className="p-3">{university.destination}</td>
                              <td className="p-3">{university.ranking || "N/A"}</td>
                              <td className="p-3">
                                {university.ieltsRequirement || "N/A"}
                              </td>
                              <td className="p-3">
                                {university.studyCost || "N/A"}
                              </td>
                              <td className="p-3">
                                {university.livingCost || "N/A"}
                              </td>
                              <td className="p-3">{university.tuition || "N/A"}</td>
                              <td className="p-3">{university.intakes || "N/A"}</td>
                              <td
                                className="p-3 max-w-xs truncate"
                                title={university.overview || "N/A"}
                              >
                                {university.overview || "N/A"}
                              </td>
                              <td className="p-3 flex gap-2">
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      setEditingUniversityId(university._id);
                                      setUniversityForm({ ...emptyUniversity, ...university });
                                      setShowUniversityForm(true);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    <HiPencilSquare className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        `/universities/${university._id}`,
                                        "University",
                                      )
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Delete
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {universities.length === 0 && (
                            <tr className="border-t border-gray-200">
                              <td className="p-3 text-gray-500" colSpan={11}>
                                No universities found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <Pagination total={universities.length} page={uniPage} setPage={setUniPage} />
                  </>
                )}
              </section>
            )}

            {activeTab === "courses" && (
              <section className="space-y-6">
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Courses</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{courses.length} courses listed</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowCourseForm(v => !v); setEditingCourseId(null); setCourseForm(emptyCourse); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95 ${showCourseForm
                      ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
                      }`}
                  >
                    {showCourseForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create Course</>}
                  </button>
                </div>

                {(showCourseForm || editingCourseId) && (
                  <form
                    onSubmit={submitCourse}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
                  >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-slate-900">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <HiBookOpen className="w-5 h-5 text-blue-600" />
                        {editingCourseId ? "Update Course" : "Add New Course"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">Fill in the course details below.</p>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Section 1: Basic Info */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Course Details</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-gray-500">Course Name <span className="text-red-400">*</span></label>
                            <input required placeholder="e.g. MSc Computer Science" value={courseForm.name}
                              onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Course Level <span className="text-red-400">*</span></label>
                            <select value={courseForm.type} onChange={(e) => setCourseForm({ ...courseForm, type: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all">
                              <option value="UG">Undergraduate (UG)</option>
                              <option value="PG">Postgraduate (PG)</option>
                              <option value="Diploma">Diploma</option>
                              <option value="PhD">PhD / Doctorate</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Duration <span className="text-red-400">*</span></label>
                            <input required placeholder="e.g. 2 Years" value={courseForm.duration}
                              onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Destination Country <span className="text-red-400">*</span></label>
                            <select required value={courseForm.destination} onChange={(e) => setCourseForm({ ...courseForm, destination: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all">
                              <option value="">Select country...</option>
                              {["Australia", "Canada", "Dubai", "Germany", "India", "New Zealand", "Singapore", "UK", "USA"].map(d => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">University <span className="text-red-400">*</span></label>
                            <select required value={courseForm.university} onChange={(e) => setCourseForm({ ...courseForm, university: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all">
                              <option value="">Select University...</option>
                              {universities.map((u) => (<option key={u._id} value={u._id}>{u.name}</option>))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/80 flex items-center justify-between">

                      <div className="flex gap-3">
                        {editingCourseId && (
                          <button type="button" onClick={() => { setEditingCourseId(null); setCourseForm(emptyCourse); setShowCourseForm(false); }}
                            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-all">
                            Cancel
                          </button>
                        )}
                        <button type="submit"
                          className="bg-blue-600 hover:bg-blue-500 active:scale-95 px-6 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
                          <HiCheck className="w-4 h-4" />
                          {editingCourseId ? "Update Course" : "Add Course"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {!showCourseForm && !editingCourseId && (
                  <>
                    <div className="overflow-auto border border-gray-200 rounded-xl">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Destination</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">University</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.slice((coursePage - 1) * PAGE_SIZE, coursePage * PAGE_SIZE).map((course) => (
                            <tr
                              key={course._id}
                              className="border-t border-gray-200"
                            >
                              <td className="p-3">{course.name}</td>
                              <td className="p-3">{course.type}</td>
                              <td className="p-3">{course.destination}</td>
                              <td className="p-3">{course.duration}</td>
                              <td className="p-3">
                                {course.university?.name || "N/A"}
                              </td>
                              <td className="p-3 flex gap-2">
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      setEditingCourseId(course._id);
                                      setCourseForm({ ...emptyCourse, ...course, university: course.university?._id || '' });
                                      setShowCourseForm(true);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    <HiPencilSquare className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(`/courses/${course._id}`, "Course")
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Delete
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {courses.length === 0 && (
                            <tr className="border-t border-gray-200">
                              <td className="p-3 text-gray-500" colSpan={6}>
                                No courses found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <Pagination total={courses.length} page={coursePage} setPage={setCoursePage} />
                  </>
                )}
              </section>
            )}

            {activeTab === "scholarships" && (
              <section className="space-y-5">
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Scholarships</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{scholarships.length} scholarships listed</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowScholarshipForm(v => !v); setEditingScholarshipId(null); setScholarshipForm(emptyScholarship); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95 ${showScholarshipForm
                      ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
                      }`}
                  >
                    {showScholarshipForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create Scholarship</>}
                  </button>
                </div>

                {(showScholarshipForm || editingScholarshipId) && (
                  <form
                    onSubmit={submitScholarship}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
                  >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-slate-900">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <HiAcademicCap className="w-5 h-5 text-amber-400" />
                        {editingScholarshipId ? "Update Scholarship" : "Add New Scholarship"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">Fill in all scholarship details below.</p>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Section 1: Basic Info */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Basic Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-gray-500">Scholarship Name <span className="text-red-400">*</span></label>
                            <input required placeholder="e.g. Chevening Scholarship" value={scholarshipForm.name}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, name: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Destination <span className="text-red-400">*</span></label>
                            <select required value={scholarshipForm.destination} onChange={(e) => setScholarshipForm({ ...scholarshipForm, destination: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all">
                              <option value="">Select country...</option>
                              {["Australia", "Canada", "Dubai", "Germany", "India", "New Zealand", "Singapore", "UK", "USA"].map(d => (<option key={d} value={d}>{d}</option>))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Amount / Value <span className="text-red-400">*</span></label>
                            <input required placeholder="e.g. Fully Funded / £10,000" value={scholarshipForm.amount}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, amount: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Provider / Sponsor</label>
                            <input placeholder="e.g. UK Government (FCDO)" value={scholarshipForm.provider}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, provider: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Linked University</label>
                            <select value={scholarshipForm.university} onChange={(e) => setScholarshipForm({ ...scholarshipForm, university: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all">
                              <option value="">No Specific University</option>
                              {universities.map((u) => (<option key={u._id} value={u._id}>{u.name}</option>))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200" />

                      {/* Section 2: Criteria & Dates */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Criteria & Dates</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Study Level</label>
                            <input placeholder="e.g. Masters / PhD" value={scholarshipForm.level}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, level: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">No. of Awards</label>
                            <input placeholder="e.g. 1,500+ per year" value={scholarshipForm.noOfAwards}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, noOfAwards: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Application Deadline</label>
                            <input type="date" value={scholarshipForm.deadline}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, deadline: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5 md:col-span-3">
                            <label className="text-xs font-semibold text-gray-500">Eligibility Criteria</label>
                            <input placeholder="e.g. Emerging leaders with 2+ years work experience" value={scholarshipForm.eligibility}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, eligibility: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200" />

                      {/* Section 3: Details */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Details & Content</p>
                        <div className="space-y-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Description</label>
                            <textarea placeholder="Detailed description of the scholarship..." value={scholarshipForm.description}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, description: e.target.value })} rows={3}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-500">Benefits <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                              <textarea placeholder="Full tuition, Monthly stipend, Return airfare..." value={scholarshipForm.benefits}
                                onChange={(e) => setScholarshipForm({ ...scholarshipForm, benefits: e.target.value })} rows={2}
                                className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-500">Requirements <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                              <textarea placeholder="Bachelor's degree, 2 years work experience..." value={scholarshipForm.requirements}
                                onChange={(e) => setScholarshipForm({ ...scholarshipForm, requirements: e.target.value })} rows={2}
                                className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-500">Eligible Fields <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                              <input placeholder="All Fields, Engineering, Business..." value={scholarshipForm.fields}
                                onChange={(e) => setScholarshipForm({ ...scholarshipForm, fields: e.target.value })}
                                className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-500">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                              <input placeholder="Fully Funded, Leadership, Government..." value={scholarshipForm.tags}
                                onChange={(e) => setScholarshipForm({ ...scholarshipForm, tags: e.target.value })}
                                className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">How To Apply</label>
                            <textarea placeholder="Describe the application process..." value={scholarshipForm.howToApply}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, howToApply: e.target.value })} rows={2}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Official Link</label>
                            <input placeholder="https://www.chevening.org" value={scholarshipForm.officialLink}
                              onChange={(e) => setScholarshipForm({ ...scholarshipForm, officialLink: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/80 flex items-center justify-between">

                      <div className="flex gap-3">
                        {editingScholarshipId && (
                          <button type="button" onClick={() => { setEditingScholarshipId(null); setScholarshipForm(emptyScholarship); setShowScholarshipForm(false); }}
                            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-all">Cancel</button>
                        )}
                        <button type="submit"
                          className="bg-amber-600 hover:bg-amber-500 active:scale-95 px-6 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all">
                          <HiCheck className="w-4 h-4" />
                          {editingScholarshipId ? "Update Scholarship" : "Add Scholarship"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {!showScholarshipForm && !editingScholarshipId && (
                  <>
                    <div className="overflow-auto border border-gray-200 rounded-xl">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Destination</th>
                            <th className="p-3">University</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Level</th>
                            <th className="p-3">Provider</th>
                            <th className="p-3">Eligibility</th>
                            <th className="p-3">Deadline</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scholarships.slice((scholarshipPage - 1) * PAGE_SIZE, scholarshipPage * PAGE_SIZE).map((scholarship) => (
                            <tr
                              key={scholarship._id}
                              className="border-t border-gray-200"
                            >
                              <td className="p-3">{scholarship.name}</td>
                              <td className="p-3">{scholarship.destination}</td>
                              <td className="p-3">
                                {scholarship.university?.name || "Multiple / N/A"}
                              </td>
                              <td className="p-3">{scholarship.amount}</td>
                              <td className="p-3">{scholarship.level || "N/A"}</td>
                              <td className="p-3">
                                {scholarship.provider || "N/A"}
                              </td>
                              <td
                                className="p-3 max-w-xs truncate"
                                title={scholarship.eligibility || "N/A"}
                              >
                                {scholarship.eligibility || "N/A"}
                              </td>
                              <td className="p-3">
                                {scholarship.deadline
                                  ? new Date(scholarship.deadline).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className="p-3 flex gap-2">
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      setEditingScholarshipId(scholarship._id);
                                      setScholarshipForm({
                                        ...emptyScholarship,
                                        ...scholarship,
                                        university: scholarship.university?._id || "",
                                        fields: arrayToCsv(scholarship.fields),
                                        benefits: arrayToCsv(scholarship.benefits),
                                        requirements: arrayToCsv(
                                          scholarship.requirements,
                                        ),
                                        tags: arrayToCsv(scholarship.tags),
                                      });
                                      setShowScholarshipForm(true);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    <HiPencilSquare className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        `/scholarships/${scholarship._id}`,
                                        "Scholarship",
                                      )
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Delete
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {scholarships.length === 0 && (
                            <tr className="border-t border-gray-200">
                              <td className="p-3 text-gray-500" colSpan={9}>
                                No scholarships found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <Pagination total={scholarships.length} page={scholarshipPage} setPage={setScholarshipPage} />
                  </>
                )}
              </section>
            )}

            {activeTab === "events" && (
              <section className="space-y-6">
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Events</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{events.length} events listed</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowEventForm(v => !v); setEditingEventId(null); setEventForm(emptyEvent); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95 ${showEventForm
                      ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
                      }`}
                  >
                    {showEventForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create Event</>}
                  </button>
                </div>

                {(showEventForm || editingEventId) && (
                  <form
                    onSubmit={submitEvent}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
                  >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-slate-900">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <HiCalendarDays className="w-5 h-5 text-cyan-400" />
                        {editingEventId ? "Update Event" : "Add New Event"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">Fill in the event details below.</p>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Section 1: Basic Info */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Event Details</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-gray-500">Event Name <span className="text-red-400">*</span></label>
                            <input required placeholder="e.g. Global University Fair 2026" value={eventForm.name}
                              onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Event Mode</label>
                            <select value={eventForm.mode} onChange={(e) => setEventForm({ ...eventForm, mode: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all">
                              <option value="online">Online</option>
                              <option value="offline">Offline (In-Person)</option>
                              <option value="hybrid">Hybrid</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Event Type</label>
                            <input placeholder="e.g. webinar, education_fair, assessment" value={eventForm.type}
                              onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Date & Time <span className="text-red-400">*</span></label>
                            <input type="datetime-local" required value={eventForm.date}
                              onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Display Time</label>
                            <input placeholder="e.g. 10:00 AM - 5:00 PM (IST)" value={eventForm.time}
                              onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">City / Location</label>
                            <input placeholder="e.g. New Delhi, India" value={eventForm.location}
                              onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Venue Name</label>
                            <input placeholder="e.g. Taj Palace Hotel" value={eventForm.venue}
                              onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Logo URL</label>
                            <input placeholder="https://..." value={eventForm.logo}
                              onChange={(e) => setEventForm({ ...eventForm, logo: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Host University</label>
                            <select value={eventForm.university} onChange={(e) => setEventForm({ ...eventForm, university: e.target.value })}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all">
                              <option value="">No Specific University</option>
                              {universities.map((u) => (<option key={u._id} value={u._id}>{u.name}</option>))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200" />

                      {/* Section 2: Content */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Content & Details</p>
                        <div className="space-y-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Description</label>
                            <textarea placeholder="Detailed description of the event..." value={eventForm.description}
                              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={3}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-500">Countries <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                              <textarea placeholder="United Kingdom, USA, Canada..." value={eventForm.countries}
                                onChange={(e) => setEventForm({ ...eventForm, countries: e.target.value })} rows={2}
                                className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-500">Highlights <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                              <textarea placeholder="Meet 50+ universities, Free IELTS counselling..." value={eventForm.highlights}
                                onChange={(e) => setEventForm({ ...eventForm, highlights: e.target.value })} rows={2}
                                className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500">Participating Universities <span className="text-gray-400 font-normal">(one per line: Name | Country | Role)</span></label>
                            <textarea placeholder="University of Oxford | UK | Participant&#10;Harvard University | USA | Participant" value={eventForm.universities}
                              onChange={(e) => setEventForm({ ...eventForm, universities: e.target.value })} rows={4}
                              className="bg-gray-50 border border-gray-300 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none font-mono" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/80 flex items-center justify-between">

                      <div className="flex gap-3">
                        {editingEventId && (
                          <button type="button" onClick={() => { setEditingEventId(null); setEventForm(emptyEvent); }}
                            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-all">Cancel</button>
                        )}
                        <button type="submit"
                          className="bg-cyan-600 hover:bg-cyan-500 active:scale-95 px-6 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all">
                          <HiCheck className="w-4 h-4" />
                          {editingEventId ? "Update Event" : "Add Event"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {!showEventForm && !editingEventId && (
                  <>
                    <div className="overflow-auto border border-gray-200 rounded-xl">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Mode</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Venue</th>
                            <th className="p-3">University</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.slice((eventPage - 1) * PAGE_SIZE, eventPage * PAGE_SIZE).map((item) => (
                            <tr
                              key={item._id}
                              className="border-t border-gray-200"
                            >
                              <td className="p-3">{item.name}</td>
                              <td className="p-3">
                                {new Date(item.date).toLocaleString()}
                              </td>
                              <td className="p-3 capitalize">{item.mode}</td>
                              <td className="p-3">{item.type || "N/A"}</td>
                              <td className="p-3">{item.time || "N/A"}</td>
                              <td className="p-3">{item.location || "N/A"}</td>
                              <td className="p-3">{item.venue || "N/A"}</td>
                              <td className="p-3">
                                {item.university?.name || "N/A"}
                              </td>
                              <td
                                className="p-3 max-w-xs truncate"
                                title={item.description || "N/A"}
                              >
                                {item.description || "N/A"}
                              </td>
                              <td className="p-3 flex gap-2">
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      setEditingEventId(item._id);
                                      setEventForm({
                                        ...emptyEvent,
                                        ...item,
                                        university: item.university?._id || "",
                                        countries: arrayToCsv(item.countries),
                                        highlights: arrayToCsv(item.highlights),
                                        universities: universitiesArrayToText(
                                          item.universities,
                                        ),
                                        date: item.date
                                          ? new Date(item.date)
                                            .toISOString()
                                            .slice(0, 16)
                                          : "",
                                      });
                                      setShowEventForm(true);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    <HiPencilSquare className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(`/events/${item._id}`, "Event")
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-sm">
                                    Delete
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {events.length === 0 && (
                            <tr className="border-t border-gray-200">
                              <td className="p-3 text-gray-500" colSpan={10}>
                                No events found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <Pagination total={events.length} page={eventPage} setPage={setEventPage} />
                  </>
                )}
              </section>
            )}

            {activeTab === "counselling" && (
              <section className="overflow-auto border border-gray-200 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-white">
                    <tr className="text-left">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Destination</th>
                      <th className="p-3">Course Level</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Submitted</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr
                        key={request._id}
                        className="border-t border-gray-200"
                      >
                        <td className="p-3">{request.name}</td>
                        <td className="p-3">{request.email}</td>
                        <td className="p-3">{request.phone || "N/A"}</td>
                        <td className="p-3">{request.destination || "N/A"}</td>
                        <td className="p-3">{request.courseLevel || "N/A"}</td>
                        <td
                          className="p-3 max-w-xs truncate"
                          title={request.message || "N/A"}
                        >
                          {request.message || "N/A"}
                        </td>
                        <td className="p-3">
                          {request.createdAt
                            ? new Date(request.createdAt).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="p-3 capitalize">{request.status}</td>
                        <td className="p-3">
                          <select
                            value={request.status}
                            onChange={(e) =>
                              updateRequestStatus(request._id, e.target.value)
                            }
                            className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1"
                          >
                            <option value="pending">pending</option>
                            <option value="contacted">contacted</option>
                            <option value="resolved">resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {requests.length === 0 && (
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-gray-500" colSpan={9}>
                          No counselling requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            )}

            {(activeTab === "users" || activeTab === "admins") && user?.role === "superadmin" && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{activeTab === 'admins' ? 'Administrators' : 'General Users'}</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage {activeTab === 'admins' ? 'admin privileges and system access' : 'registered students and general users'}.</p>
                  </div>
                  <button
                    onClick={loadAllData}
                    className="mt-4 sm:mt-0 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                  >
                    Refresh
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-gray-200">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {allUsers
                        .filter(item => activeTab === 'admins' ? item.role === 'admin' : (item.role === 'student' || !item.role))
                        .map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-bold text-slate-800">{item.name}</td>
                            <td className="p-4 text-slate-500">{item.email}</td>
                            <td className="p-4 text-slate-500">{item.phone || "Not Provided"}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <div className="relative group">
                                  <button
                                    onClick={() => handleDelete(`/users/${item._id}`, "User")}
                                    disabled={item.email === user.email}
                                    className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {allUsers.length === 0 && (
                        <tr>
                          <td className="p-8 text-center text-slate-500" colSpan={4}>
                            No users found in the system.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

