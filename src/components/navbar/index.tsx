"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaBell,
  FaQuestionCircle,
  FaUserCircle,
  FaBars,
  FaSearch,
  FaEllipsisV,
} from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { SearchBar } from "../searchbar";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const getPageTitle = (path: string) => {
  const pathMap: Record<string, string> = {
    "/": "Dashboard",
    "/about": "About",
    "/projects": "Projects",
    "/skills": "Skills",
    "/profile": "Profile",
  };

  return pathMap[path] || path.split("/").filter(Boolean).map(str => str[0].toUpperCase() + str.slice(1)).join(" / ");
};

export const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setMobileSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchValue);
  };

  const baseBtnStyle = `flex items-center gap-2 p-2 rounded-md transition-colors cursor-pointer`;
  const defaultBtn = `text-gray-400 hover:text-white hover:bg-gray-800`;

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white border-b border-gray-700/50 z-50">
      <div className="flex items-center justify-between h-full px-4 relative">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <FiSidebar className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
          <div className="text-lg font-semibold text-white ml-2">{pageTitle}</div>
        </div>

        {/* Center Search - Desktop */}
        <div className="hidden sm:block flex-1 max-w-md mx-8">
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 relative">
          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center gap-2">
            <button className={`${baseBtnStyle} ${defaultBtn}`} title="Help">
              <FaQuestionCircle />
            </button>
            <button className={`${baseBtnStyle} ${defaultBtn}`} title="Notifications">
              <FaBell />
            </button>
            <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:bg-purple-700 transition-colors" title="Profile">
              <FaUserCircle className="text-lg" />
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 rounded-md hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <FaSearch />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 rounded-md hover:bg-gray-800 transition-colors"
                aria-label="More options"
              >
                <FaEllipsisV />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 flex flex-col">
                  <button className={`${baseBtnStyle} ${defaultBtn}`}>
                    <FaQuestionCircle />
                    <span className="text-sm">Help</span>
                  </button>
                  <button className={`${baseBtnStyle} ${defaultBtn}`}>
                    <FaBell />
                    <span className="text-sm">Notifications</span>
                  </button>
                  <button className={`${baseBtnStyle} ${defaultBtn}`}>
                    <FaUserCircle />
                    <span className="text-sm">Profile</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {mobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          className="sm:hidden absolute top-14 left-0 right-0 bg-gray-900 border-t border-gray-700 p-2 z-40"
        >
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
            isMobile
          />
        </div>
      )}
    </nav>
  );
};
