import React, { useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiChevronDown,
  HiChevronRight,
} from "react-icons/hi2";
import { navItemsFor } from "../utils/adminNav";

const itemClass = (isHighlighted) =>
  `w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-3 transition-colors ${
    isHighlighted
      ? "bg-[#EEF2FF] text-[#1F2853]"
      : "text-slate-600 hover:bg-slate-50"
  }`;

const AdminSidebar = ({ role, activeTab, onSelectTab, onLogout }) => {
  const [openGroups, setOpenGroups] = useState({ stakeholders: true });

  const toggleGroup = (groupId) =>
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 overflow-y-auto flex flex-col">
      <div className="px-6 py-5">
        <h2 className="text-lg font-bold text-[#1F2853]">
          {role === "superadmin" ? "Admin Control" : "Admin Panel"}
        </h2>
      </div>

      <nav className="px-3 pb-3 space-y-1">
        {navItemsFor(role).map((group) => {
          if (!group.children) {
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => onSelectTab(group.id)}
                className={itemClass(activeTab === group.id)}
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
                type="button"
                onClick={() => toggleGroup(group.id)}
                className={itemClass(hasActiveChild && !isOpen)}
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
                      type="button"
                      onClick={() => onSelectTab(child.id)}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg text-left text-sm font-medium flex items-center gap-2.5 transition-colors ${
                        activeTab === child.id
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
          type="button"
          onClick={onLogout}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-600 flex items-center justify-center gap-2 transition-colors"
        >
          <HiArrowRightOnRectangle className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
