import React, { useMemo } from "react";

const isGeneralUser = (account) => account.role === "student" || !account.role;

const countByRole = (accounts, role) =>
  accounts.filter((account) => account.role === role).length;

/**
 * A superadmin opens on the account picture; an admin opens on the catalogue
 * they actually maintain.
 */
const DashboardOverview = ({
  user,
  allUsers,
  universities,
  courses,
  scholarships,
  destinations,
  events,
  requests,
}) => {
  const statCards = useMemo(() => {
    if (user?.role === "superadmin") {
      return [
        { label: "Total Users", value: allUsers.filter(isGeneralUser).length },
        { label: "Total Admins", value: countByRole(allUsers, "admin") },
        { label: "Super Admins", value: countByRole(allUsers, "superadmin") },
        { label: "Total Accounts", value: allUsers.length },
      ];
    }

    const now = new Date();
    return [
      { label: "Universities", value: universities.length },
      { label: "Courses", value: courses.length },
      { label: "Scholarships", value: scholarships.length },
      { label: "Destinations", value: destinations.length },
      {
        label: "Upcoming Events",
        value: events.filter((event) => new Date(event.date) >= now).length,
      },
      {
        label: "Pending Requests",
        value: requests.filter((request) => request.status === "pending")
          .length,
      },
    ];
  }, [
    user?.role,
    allUsers,
    universities,
    courses,
    scholarships,
    destinations,
    events,
    requests,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-[#1F2853]">
          {user?.role === "superadmin"
            ? "Super Admin Control"
            : "Admin Dashboard"}
        </h2>
        <div className="flex items-center gap-3 bg-[#EEF2FF] py-2.5 px-4 rounded-full">
          <div className="w-9 h-9 rounded-full bg-[#FF4E45] text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1F2853] leading-tight">
              {user?.name}
            </p>
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
  );
};

export default DashboardOverview;
