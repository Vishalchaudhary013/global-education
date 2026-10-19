import React, { useEffect, useMemo, useState } from "react";
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
  HiChevronDown,
  HiChevronRight,
  HiChartPie,
  HiBriefcase,
  HiRectangleGroup,
  HiArrowUturnLeft,
  HiGlobeAlt,
} from "react-icons/hi2";
import AdminsPanel from "../components/AdminsPanel";
import CourseForm from "../components/CourseForm";
import DestinationForm from "../components/DestinationForm";
import {
  destinationToForm,
  emptyDestination,
  formToDestination,
} from "../utils/destinationFormModel";
import EventForm from "../components/EventForm";
import ScholarshipForm from "../components/ScholarshipForm";
import UniversityForm from "../components/UniversityForm";
import { getApiErrorMessage, isUnauthorized } from "@/shared/utils/apiError";
import { useAuth } from "@/features/auth";
import { updateCounsellingRequestStatus } from "@/features/counselling/services/counsellingService";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/features/courses/services/courseService";
import {
  createDestination,
  deleteDestination,
  updateDestination,
} from "@/features/destinations/services/destinationService";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/features/events/services/eventService";
import {
  createScholarship,
  deleteScholarship,
  updateScholarship,
} from "@/features/scholarships/services/scholarshipService";
import {
  createUniversity,
  deleteUniversity,
  updateUniversity,
} from "@/features/universities/services/universityService";
import {
  deleteUser,
  updateUserRole as updateUserRoleRequest,
} from "@/features/users/services/userService";
import { useAdminData } from "../hooks/useAdminData";

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
              className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${page === n ? 'bg-blue-600 text-white' : 'border border-gray-300 bg-white hover:bg-gray-100 text-gray-700'
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
  const { user, token, logout, isImpersonating, stopImpersonation } = useAuth();

  const [selectedTab, setActiveTab] = useState("dashboard");
  const [success, setSuccess] = useState("");
  const [openGroups, setOpenGroups] = useState({ stakeholders: true });

  /**
   * Stakeholder tabs disappear the moment the session stops being a superadmin
   * (e.g. after opening an admin's dashboard), so fall back to the overview.
   */
  const activeTab =
    user?.role !== "superadmin" && ["admins", "users"].includes(selectedTab)
      ? "dashboard"
      : selectedTab;

  const {
    universities,
    courses,
    scholarships,
    events,
    destinations,
    requests,
    allUsers,
    isLoading,
    error,
    setError,
    refresh: loadAllData,
  } = useAdminData();

  const [editingUniversityId, setEditingUniversityId] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingScholarshipId, setEditingScholarshipId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  /** Holds the destination slug being edited, since that is its API key. */
  const [editingDestinationId, setEditingDestinationId] = useState(null);

  const [universityForm, setUniversityForm] = useState(emptyUniversity);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [scholarshipForm, setScholarshipForm] = useState(emptyScholarship);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [destinationForm, setDestinationForm] = useState(emptyDestination);

  const [showUniversityForm, setShowUniversityForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showScholarshipForm, setShowScholarshipForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDestinationForm, setShowDestinationForm] = useState(false);

  const [uniPage, setUniPage] = useState(1);
  const [coursePage, setCoursePage] = useState(1);
  const [scholarshipPage, setScholarshipPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [destinationPage, setDestinationPage] = useState(1);

  /**
   * The sidebar is grouped: a `children` entry collapses, everything else is a
   * direct tab. Stakeholder management only exists for a superadmin.
   */
  const navGroups = [
    {
      id: "dashboard",
      label: "Overview",
      icon: <HiChartPie className="w-5 h-5" />,
    },
    ...(user?.role === "superadmin"
      ? [
        {
          id: "stakeholders",
          label: "Stakeholders",
          icon: <HiUsers className="w-5 h-5" />,
          children: [
            { id: "admins", label: "Admins", icon: <HiShieldCheck className="w-4 h-4" /> },
            { id: "users", label: "Users", icon: <HiUsers className="w-4 h-4" /> },
          ],
        },
      ]
      : []),
    {
      id: "career",
      label: "Career Drive",
      icon: <HiBriefcase className="w-5 h-5" />,
      children: [
        {
          id: "counselling",
          label: "Counselling Requests",
          icon: <HiUsers className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "content",
      label: "Content",
      icon: <HiRectangleGroup className="w-5 h-5" />,
      children: [
        { id: "events", label: "Events", icon: <HiCalendarDays className="w-4 h-4" /> },
        {
          id: "scholarships",
          label: "Scholarships",
          icon: <HiAcademicCap className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "program",
      label: "Program",
      icon: <HiSquares2X2 className="w-5 h-5" />,
      children: [
        { id: "courses", label: "Courses", icon: <HiBookOpen className="w-4 h-4" /> },
      ],
    },
    {
      id: "university",
      label: "University",
      icon: <HiAcademicCap className="w-5 h-5" />,
      children: [
        {
          id: "universities",
          label: "Universities",
          icon: <HiBuildingOffice2 className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "destinations",
      label: "Destinations",
      icon: <HiGlobeAlt className="w-5 h-5" />,
    },
  ];

  /**
   * A group holding a single child has nothing to expand, so it is flattened
   * into a plain tab that opens that child directly.
   */
  const navItems = navGroups.map((group) => {
    if (group.children?.length !== 1) return group;
    const [onlyChild] = group.children;
    return { id: onlyChild.id, label: group.label, icon: group.icon };
  });

  const toggleGroup = (groupId) =>
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));

  const admins = useMemo(
    () => allUsers.filter((item) => item.role === "admin"),
    [allUsers],
  );


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
      totalDestinations: destinations.length,
      upcomingEvents: events.filter(
        (event) => new Date(event.date) >= new Date(),
      ).length,
      pendingRequests: requests.filter(
        (request) => request.status === "pending",
      ).length,
    }),
    [universities, courses, scholarships, destinations, events, requests],
  );

  /**
   * A superadmin opens on the account picture; an admin opens on the catalogue
   * they actually maintain.
   */
  const statCards = useMemo(() => {
    if (user?.role === "superadmin") {
      return [
        {
          label: "Total Users",
          value: allUsers.filter((item) => item.role === "student" || !item.role).length,
        },
        { label: "Total Admins", value: allUsers.filter((item) => item.role === "admin").length },
        {
          label: "Super Admins",
          value: allUsers.filter((item) => item.role === "superadmin").length,
        },
        { label: "Total Accounts", value: allUsers.length },
      ];
    }
    return [
      { label: "Universities", value: stats.totalUniversities },
      { label: "Courses", value: stats.totalCourses },
      { label: "Scholarships", value: stats.totalScholarships },
      { label: "Destinations", value: stats.totalDestinations },
      { label: "Upcoming Events", value: stats.upcomingEvents },
      { label: "Pending Requests", value: stats.pendingRequests },
    ];
  }, [user?.role, allUsers, stats]);

  const handleUnauthorized = () => {
    logout();
    navigate("/");
  };

  /**
   * `removeResource` is the feature service call for the row being deleted,
   * so this page never needs to know the endpoint.
   */
  const handleDelete = async (removeResource, id, label) => {
    setError("");
    try {
      await removeResource(id);
      setSuccess(`${label} deleted`);
      await loadAllData();
    } catch (deleteError) {
      if (isUnauthorized(deleteError)) {
        handleUnauthorized();
        return;
      }
      setError(getApiErrorMessage(deleteError));
    }
  };

  const updateUserRole = async (userId, newRole) => {
    setError("");
    try {
      await updateUserRoleRequest(userId, newRole);
      setSuccess("User role updated");
      await loadAllData();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const submitUniversity = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (editingUniversityId) {
        await updateUniversity(editingUniversityId, universityForm);
        setSuccess("University updated");
      } else {
        await createUniversity(universityForm);
        setSuccess("University created");
      }
      setUniversityForm(emptyUniversity);
      setEditingUniversityId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getApiErrorMessage(submitError));
    }
  };

  const submitCourse = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = { ...courseForm };
      if (!payload.university) delete payload.university;

      if (editingCourseId) {
        await updateCourse(editingCourseId, payload);
        setSuccess("Course updated");
      } else {
        await createCourse(payload);
        setSuccess("Course created");
      }
      setCourseForm(emptyCourse);
      setEditingCourseId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getApiErrorMessage(submitError));
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
        await updateScholarship(editingScholarshipId, payload);
        setSuccess("Scholarship updated");
      } else {
        await createScholarship(payload);
        setSuccess("Scholarship created");
      }

      setScholarshipForm(emptyScholarship);
      setEditingScholarshipId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getApiErrorMessage(submitError));
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
        await updateEvent(editingEventId, payload);
        setSuccess("Event updated");
      } else {
        await createEvent(payload);
        setSuccess("Event created");
      }
      setEventForm(emptyEvent);
      setEditingEventId(null);
      await loadAllData();
    } catch (submitError) {
      setError(getApiErrorMessage(submitError));
    }
  };

  /**
   * The form covers every guide field the destination page renders, so the whole
   * document is written in one call. `goToStep` comes from the stepper, which
   * lets a failed check reveal the step holding the offending field.
   */
  const submitDestination = async (event, goToStep) => {
    event.preventDefault();
    setError("");

    const payload = formToDestination(destinationForm);
    if (!payload.name || !payload.id) {
      goToStep?.(0);
      setError("Destination needs a name.");
      return;
    }

    try {
      if (editingDestinationId) {
        await updateDestination(editingDestinationId, payload);
        setSuccess("Destination updated");
      } else {
        await createDestination(payload);
        setSuccess("Destination created");
      }
      setDestinationForm(emptyDestination);
      setEditingDestinationId(null);
      setShowDestinationForm(false);
      await loadAllData();
    } catch (submitError) {
      setError(getApiErrorMessage(submitError));
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    setError("");
    try {
      await updateCounsellingRequestStatus(requestId, status);
      setSuccess("Request status updated");
      await loadAllData();
    } catch (statusError) {
      setError(getApiErrorMessage(statusError));
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
    <div className="h-screen bg-[#F4F6FD] text-gray-900 flex flex-col overflow-hidden">
      <header className="h-[72px] shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <span className="text-2xl font-bold tracking-tight text-[#1F2853]">
          edeco<sup className="text-xs font-semibold align-super">®</sup>
        </span>
        <div className="w-10 h-10 rounded-full bg-[#1F2853] text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 bg-white border-r border-slate-200 overflow-y-auto flex flex-col">
          <div className="px-6 py-5">
            <h2 className="text-lg font-bold text-[#1F2853]">
              {user?.role === "superadmin" ? "Admin Control" : "Admin Panel"}
            </h2>
          </div>

          <nav className="px-3 pb-3 space-y-1">
            {navItems.map((group) => {
              if (!group.children) {
                return (
                  <button
                    key={group.id}
                    onClick={() => setActiveTab(group.id)}
                    className={`w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-3 transition-colors ${activeTab === group.id
                      ? "bg-[#EEF2FF] text-[#1F2853]"
                      : "text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    {group.icon}
                    <span>{group.label}</span>
                  </button>
                );
              }

              const isOpen = !!openGroups[group.id];
              const hasActiveChild = group.children.some(
                (child) => child.id === activeTab,
              );

              return (
                <div key={group.id}>
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-3 transition-colors ${hasActiveChild && !isOpen
                      ? "bg-[#EEF2FF] text-[#1F2853]"
                      : "text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    {group.icon}
                    <span className="flex-1">{group.label}</span>
                    {isOpen ? (
                      <HiChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <HiChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-1 space-y-1">
                      {group.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => setActiveTab(child.id)}
                          className={`w-full pl-10 pr-3 py-2 rounded-lg text-left text-sm font-medium flex items-center gap-2.5 transition-colors ${activeTab === child.id
                            ? "bg-[#EEF2FF] text-[#1F2853] font-semibold"
                            : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            <button
              onClick={handleUnauthorized}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-600 flex items-center justify-center gap-2 transition-colors"
            >
              <HiArrowRightOnRectangle className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {isImpersonating && (
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg">
              <span className="text-sm font-semibold">
                You are viewing {user?.name}&apos;s dashboard as Super Admin.
              </span>
              <button
                onClick={() => {
                  stopImpersonation();
                  setActiveTab("admins");
                }}
                className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
              >
                <HiArrowUturnLeft className="w-4 h-4" />
                Back to Super Admin
              </button>
            </div>
          )}


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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold text-[#1F2853]">
                    {user?.role === "superadmin" ? "Super Admin Control" : "Admin Dashboard"}
                  </h2>
                  <div className="flex items-center gap-3 bg-[#EEF2FF] py-2.5 px-4 rounded-full">
                    <div className="w-9 h-9 rounded-full bg-[#FF4E45] text-white flex items-center justify-center font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1F2853] leading-tight">{user?.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {user?.role === "superadmin" ? "Super Admin" : user?.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {statCards.map((card) => (
                    <div
                      key={card.label}
                      className="bg-white rounded-xl p-5 border border-slate-200"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                        {card.label}
                      </p>
                      <p className="text-3xl font-bold text-[#1F2853]">{card.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "admins" && user?.role === "superadmin" && (
              <AdminsPanel
                admins={admins}
                currentUserEmail={user?.email}
                onRefresh={loadAllData}
                onError={setError}
                onSuccess={setSuccess}
              />
            )}

            {activeTab === "universities" && (
              <section className="space-y-6">
                {/* Section header — hidden while the form owns the screen */}
                {!showUniversityForm && !editingUniversityId && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Universities</h2>
                      <p className="text-sm text-gray-500 mt-0.5">{universities.length} Universities listed</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setShowUniversityForm(v => !v); setEditingUniversityId(null); setUniversityForm(emptyUniversity); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${showUniversityForm
                        ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-500'
                        }`}
                    >
                      {showUniversityForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create University</>}
                    </button>
                  </div>
                )}

                {/* ── Professional University Form ── */}
                {(showUniversityForm || editingUniversityId) && (
                  <UniversityForm
                    form={universityForm}
                    setForm={setUniversityForm}
                    isEditing={!!editingUniversityId}
                    onSubmit={submitUniversity}
                    onCancel={() => { setEditingUniversityId(null); setUniversityForm(emptyUniversity); setShowUniversityForm(false); }}
                  />
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
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        deleteUniversity,
                                        university._id,
                                        "University",
                                      )
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
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
                {/* Section header — hidden while the form owns the screen */}
                {!showCourseForm && !editingCourseId && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Courses</h2>
                      <p className="text-sm text-gray-500 mt-0.5">{courses.length} courses listed</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setShowCourseForm(v => !v); setEditingCourseId(null); setCourseForm(emptyCourse); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${showCourseForm
                        ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-500'
                        }`}
                    >
                      {showCourseForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create Course</>}
                    </button>
                  </div>
                )}

                {(showCourseForm || editingCourseId) && (
                  <CourseForm
                    form={courseForm}
                    setForm={setCourseForm}
                    universities={universities}
                    isEditing={!!editingCourseId}
                    onSubmit={submitCourse}
                    onCancel={() => { setEditingCourseId(null); setCourseForm(emptyCourse); setShowCourseForm(false); }}
                  />
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
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(deleteCourse, course._id, "Course")
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
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
                {/* Section header — hidden while the form owns the screen */}
                {!showScholarshipForm && !editingScholarshipId && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Scholarships</h2>
                      <p className="text-sm text-gray-500 mt-0.5">{scholarships.length} scholarships listed</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setShowScholarshipForm(v => !v); setEditingScholarshipId(null); setScholarshipForm(emptyScholarship); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${showScholarshipForm
                        ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-500'
                        }`}
                    >
                      {showScholarshipForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create Scholarship</>}
                    </button>
                  </div>
                )}

                {(showScholarshipForm || editingScholarshipId) && (
                  <ScholarshipForm
                    form={scholarshipForm}
                    setForm={setScholarshipForm}
                    universities={universities}
                    isEditing={!!editingScholarshipId}
                    onSubmit={submitScholarship}
                    onCancel={() => { setEditingScholarshipId(null); setScholarshipForm(emptyScholarship); setShowScholarshipForm(false); }}
                  />
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
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        deleteScholarship,
                                        scholarship._id,
                                        "Scholarship",
                                      )
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
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
                {/* Section header — hidden while the form owns the screen */}
                {!showEventForm && !editingEventId && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Events</h2>
                      <p className="text-sm text-gray-500 mt-0.5">{events.length} events listed</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setShowEventForm(v => !v); setEditingEventId(null); setEventForm(emptyEvent); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${showEventForm
                        ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-500'
                        }`}
                    >
                      {showEventForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create Event</>}
                    </button>
                  </div>
                )}

                {(showEventForm || editingEventId) && (
                  <EventForm
                    form={eventForm}
                    setForm={setEventForm}
                    universities={universities}
                    isEditing={!!editingEventId}
                    onSubmit={submitEvent}
                    onCancel={() => { setEditingEventId(null); setEventForm(emptyEvent); setShowEventForm(false); }}
                  />
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
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(deleteEvent, item._id, "Event")
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
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

            {activeTab === "destinations" && (
              <section className="space-y-6">
                {/* Section header — hidden while the form owns the screen */}
                {!showDestinationForm && !editingDestinationId && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Destinations</h2>
                      <p className="text-sm text-gray-500 mt-0.5">{destinations.length} destinations listed</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setShowDestinationForm(v => !v); setEditingDestinationId(null); setDestinationForm(emptyDestination); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-semibold transition-colors ${showDestinationForm
                        ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        : 'bg-[#1F2853] text-white hover:bg-[#2b366b]'
                        }`}
                    >
                      {showDestinationForm ? <><HiXMark className="w-4 h-4" /> Close</> : <><HiPlus className="w-4 h-4" /> Create Destination</>}
                    </button>
                  </div>
                )}

                {(showDestinationForm || editingDestinationId) && (
                  <DestinationForm
                    form={destinationForm}
                    setForm={setDestinationForm}
                    isEditing={!!editingDestinationId}
                    onSubmit={submitDestination}
                    onCancel={() => { setEditingDestinationId(null); setDestinationForm(emptyDestination); setShowDestinationForm(false); }}
                  />
                )}

                {!showDestinationForm && !editingDestinationId && (
                  <>
                    <div className="overflow-auto border border-gray-200 rounded-sm">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Slug</th>
                            <th className="p-3">Tagline</th>
                            <th className="p-3">Universities</th>
                            <th className="p-3">UG Cost</th>
                            <th className="p-3">PG Cost</th>
                            <th className="p-3">Living</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {destinations.slice((destinationPage - 1) * PAGE_SIZE, destinationPage * PAGE_SIZE).map((destination) => (
                            <tr key={destination._id || destination.id} className="border-t border-gray-200">
                              <td className="p-3">{destination.name}</td>
                              <td className="p-3">{destination.id}</td>
                              <td className="p-3">{destination.guide?.tagline || "N/A"}</td>
                              <td className="p-3">{destination.guide?.universitiesCount ?? "N/A"}</td>
                              <td className="p-3">{destination.costs?.ug || "N/A"}</td>
                              <td className="p-3">{destination.costs?.pg || "N/A"}</td>
                              <td className="p-3">{destination.costs?.living || "N/A"}</td>
                              <td className="p-3 max-w-xs truncate" title={destination.description || "N/A"}>
                                {destination.description || "N/A"}
                              </td>
                              <td className="p-3 flex gap-2">
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      setEditingDestinationId(destination.id);
                                      setDestinationForm(destinationToForm(destination));
                                      setShowDestinationForm(true);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    <HiPencilSquare className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                                    Edit
                                  </span>
                                </div>
                                <div className="relative group flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        deleteDestination,
                                        destination.id,
                                        "Destination",
                                      )
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <HiTrash className="w-4 h-4" />
                                  </button>
                                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                                    Delete
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {destinations.length === 0 && (
                            <tr className="border-t border-gray-200">
                              <td className="p-3 text-gray-500" colSpan={9}>
                                No destinations found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <Pagination total={destinations.length} page={destinationPage} setPage={setDestinationPage} />
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

            {activeTab === "users" && user?.role === "superadmin" && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2853]">General Users</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage registered students and general users.</p>
                  </div>
                  <button
                    onClick={loadAllData}
                    className="mt-4 sm:mt-0 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Refresh
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allUsers
                        .filter(item => item.role === 'student' || !item.role)
                        .map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-bold text-[#1F2853]">{item.name}</td>
                            <td className="p-4 text-slate-500">{item.email}</td>
                            <td className="p-4 text-slate-500">{item.phone || "Not Provided"}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <div className="relative group">
                                  <button
                                    onClick={() => handleDelete(deleteUser, item._id, "User")}
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
    </div>
  );
};

export default AdminDashboard;

