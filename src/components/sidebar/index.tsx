"use client";

import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaBell,
  FaFileAlt,
  FaCog,
  FaClock,
  FaTasks,
  FaChartLine,
  FaUserCircle,
  FaQuestionCircle,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: string;
  submenu?: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onItemClick?: (item: SidebarItem) => void;
}

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: FaChartLine, href: "/" },
  { id: "events", label: "Events", icon: FaCalendarAlt, href: "/events" },
  { id: "schedule", label: "Schedule", icon: FaClock, href: "/schedules" },
  { id: "tasks", label: "Tasks", icon: FaTasks, href: "/tasks" },
  {
    id: "contacts",
    label: "Contacts",
    icon: FaUsers,
    href: "/contacts",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: FaBell,
    href: "/notifications",
    badge: "NEW",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FaFileAlt,
    submenu: [
      { id: "daily", label: "Daily Report", icon: FaFileAlt, href: "/reports/daily" },
      { id: "monthly", label: "Monthly Report", icon: FaFileAlt, href: "/reports/monthly" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: FaCog,
    submenu: [
      { id: "profileSettings", label: "Profile", icon: FaUserCircle, href: "/settings/profile" },
      { id: "notificationSettings", label: "Notifications", icon: FaBell, href: "/settings/notifications" },
      { id: "accountSettings", label: "Account", icon: FaCog, href: "/settings/account" },
      { id: "helpSupport", label: "Help & Support", icon: FaQuestionCircle, href: "/settings/help" },
    ],
  },
  {
    id: "support",
    label: "Help & Support",
    icon: FaQuestionCircle,
    href: "/support",
  },
  {
    id: "profile",
    label: "Profile",
    icon: FaUserCircle,
    href: "/profile",
  },
];

export const Sidebar = ({ isOpen, onItemClick }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const handleItemClick = (item: SidebarItem) => {
    onItemClick?.(item);

    if (item.submenu) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    }

    if (item.href) {
      router.push(item.href);
    }
  };

  const renderMenuItem = (item: SidebarItem, level = 0) => {
    const Icon = item.icon;
    const isActive = item.href === pathname;
    const isSubmenuOpen = openSubmenus[item.id] ?? false;
    const paddingLeft = 16 + level * 16;

    return (
      <li key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group relative ${
            isActive
              ? "bg-indigo-600/20 text-indigo-300 border-r-2 border-indigo-500"
              : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
          }`}
          style={{ paddingLeft }}
          aria-expanded={item.submenu ? isSubmenuOpen : undefined}
        >
          <Icon
            className={`text-base ${
              isActive ? "text-indigo-400" : "text-gray-400 group-hover:text-gray-300"
            }`}
          />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <span className="px-1.5 py-0.5 text-xs font-semibold bg-indigo-600 text-white rounded">
              {item.badge}
            </span>
          )}
          {item.submenu && (
            <span className="ml-auto">
              {isSubmenuOpen ? (
                <FaChevronDown className="text-indigo-400" />
              ) : (
                <FaChevronRight className="text-gray-400 group-hover:text-gray-300" />
              )}
            </span>
          )}
        </button>

        {item.submenu && isSubmenuOpen && (
          <ul className="mt-1 space-y-1">
            {item.submenu.map((subitem) => renderMenuItem(subitem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800`}
    >
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <FaCalendarAlt className="text-white text-sm" />
          </div>

          <span className="text-md md:text-xl font-medium text-gray-300 uppercase tracking-wider">
            Scheduler
          </span>
        </div>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">{sidebarItems.map((item) => renderMenuItem(item))}</ul>
      </nav>
    </aside>
  );
};
