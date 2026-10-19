import React from "react";
import {
  HiAcademicCap,
  HiBookOpen,
  HiBriefcase,
  HiBuildingOffice2,
  HiCalendarDays,
  HiChartPie,
  HiGlobeAlt,
  HiRectangleGroup,
  HiShieldCheck,
  HiSquares2X2,
  HiUsers,
} from "react-icons/hi2";

/** Tabs that only exist while the session is a superadmin. */
export const SUPERADMIN_ONLY_TABS = ["admins", "users"];

/**
 * The sidebar is grouped: a `children` entry collapses, everything else is a
 * direct tab. Stakeholder management only exists for a superadmin.
 */
const navGroupsFor = (role) => [
  {
    id: "dashboard",
    label: "Overview",
    icon: <HiChartPie className="w-5 h-5" />,
  },
  ...(role === "superadmin"
    ? [
        {
          id: "stakeholders",
          label: "Stakeholders",
          icon: <HiUsers className="w-5 h-5" />,
          children: [
            {
              id: "admins",
              label: "Admins",
              icon: <HiShieldCheck className="w-4 h-4" />,
            },
            {
              id: "users",
              label: "Users",
              icon: <HiUsers className="w-4 h-4" />,
            },
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
      {
        id: "events",
        label: "Events",
        icon: <HiCalendarDays className="w-4 h-4" />,
      },
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
      {
        id: "courses",
        label: "Courses",
        icon: <HiBookOpen className="w-4 h-4" />,
      },
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
 * A group holding a single child has nothing to expand, so it is flattened into
 * a plain tab that opens that child directly.
 */
export const navItemsFor = (role) =>
  navGroupsFor(role).map((group) => {
    if (group.children?.length !== 1) return group;
    const [onlyChild] = group.children;
    return { id: onlyChild.id, label: group.label, icon: group.icon };
  });
