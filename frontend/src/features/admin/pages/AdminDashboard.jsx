import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import AdminAccessDenied from "../components/AdminAccessDenied";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import AdminsPanel from "../components/AdminsPanel";
import AlertBanner from "../components/AlertBanner";
import DashboardOverview from "../components/DashboardOverview";
import ImpersonationBanner from "../components/ImpersonationBanner";
import CounsellingRequestsTab from "../components/tabs/CounsellingRequestsTab";
import CoursesTab from "../components/tabs/CoursesTab";
import DestinationsTab from "../components/tabs/DestinationsTab";
import EventsTab from "../components/tabs/EventsTab";
import GeneralUsersTab from "../components/tabs/GeneralUsersTab";
import ScholarshipsTab from "../components/tabs/ScholarshipsTab";
import UniversitiesTab from "../components/tabs/UniversitiesTab";
import { useAdminData } from "../hooks/useAdminData";
import { SUPERADMIN_ONLY_TABS } from "../utils/adminNav";
import { noindexPageMetadata, seoConfig, useSeo } from "@/shared/seo";

const ADMIN_ROLES = ["admin", "superadmin"];
const SUCCESS_TIMEOUT_MS = 2400;

/**
 * Shell of the admin dashboard: it guards access, owns the active tab and the
 * page-level banners, and hands each tab the data it renders. Every tab manages
 * its own forms and API calls.
 */
const AdminDashboard = () => {
  // The admin area is crawlable but never indexed.
  useSeo(noindexPageMetadata("Admin Dashboard", "/admin", seoConfig));

  const navigate = useNavigate();
  const { user, token, logout, isImpersonating, stopImpersonation } = useAuth();

  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [success, setSuccess] = useState("");

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
    refresh,
  } = useAdminData();

  const isSuperadmin = user?.role === "superadmin";

  /**
   * Stakeholder tabs disappear the moment the session stops being a superadmin
   * (e.g. after opening an admin's dashboard), so fall back to the overview.
   */
  const activeTab =
    !isSuperadmin && SUPERADMIN_ONLY_TABS.includes(selectedTab)
      ? "dashboard"
      : selectedTab;

  useEffect(() => {
    if (!success) return;
    const timeout = setTimeout(() => setSuccess(""), SUCCESS_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [success]);

  const admins = useMemo(
    () => allUsers.filter((item) => item.role === "admin"),
    [allUsers],
  );

  /** A dead session cannot be recovered in place, so start a fresh login. */
  const handleUnauthorized = () => {
    logout();
    navigate("/");
  };

  if (!token || !ADMIN_ROLES.includes(user?.role)) {
    return <AdminAccessDenied role={user?.role} />;
  }

  /** Shared by every tab that creates, edits or deletes a record. */
  const tabHandlers = {
    onRefresh: refresh,
    onError: setError,
    onSuccess: setSuccess,
    onUnauthorized: handleUnauthorized,
  };

  return (
    <div className="h-screen bg-[#F4F6FD] text-gray-900 flex flex-col overflow-hidden">
      <AdminTopbar />

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar
          role={user?.role}
          activeTab={activeTab}
          onSelectTab={setSelectedTab}
          onLogout={handleUnauthorized}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {isImpersonating && (
            <ImpersonationBanner
              name={user?.name}
              onExit={() => {
                stopImpersonation();
                setSelectedTab("admins");
              }}
            />
          )}

          <AlertBanner tone="error" message={error} />
          <AlertBanner tone="success" message={success} />

          {isLoading ? (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
              Loading admin data...
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <DashboardOverview
                  user={user}
                  allUsers={allUsers}
                  universities={universities}
                  courses={courses}
                  scholarships={scholarships}
                  destinations={destinations}
                  events={events}
                  requests={requests}
                />
              )}

              {activeTab === "admins" && isSuperadmin && (
                <AdminsPanel
                  admins={admins}
                  currentUserEmail={user?.email}
                  onRefresh={refresh}
                  onError={setError}
                  onSuccess={setSuccess}
                />
              )}

              {activeTab === "users" && isSuperadmin && (
                <GeneralUsersTab
                  allUsers={allUsers}
                  currentUserEmail={user?.email}
                  {...tabHandlers}
                />
              )}

              {activeTab === "universities" && (
                <UniversitiesTab universities={universities} {...tabHandlers} />
              )}

              {activeTab === "courses" && (
                <CoursesTab
                  courses={courses}
                  universities={universities}
                  {...tabHandlers}
                />
              )}

              {activeTab === "scholarships" && (
                <ScholarshipsTab
                  scholarships={scholarships}
                  universities={universities}
                  {...tabHandlers}
                />
              )}

              {activeTab === "events" && (
                <EventsTab
                  events={events}
                  universities={universities}
                  {...tabHandlers}
                />
              )}

              {activeTab === "destinations" && (
                <DestinationsTab destinations={destinations} {...tabHandlers} />
              )}

              {activeTab === "counselling" && (
                <CounsellingRequestsTab
                  requests={requests}
                  onRefresh={refresh}
                  onError={setError}
                  onSuccess={setSuccess}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
