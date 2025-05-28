"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  FaBars,
  FaSearch,
  FaQuestionCircle,
  FaBolt,
  FaComments,
  FaCalendarAlt,
  FaEllipsisV,
  FaUserCircle,
} from "react-icons/fa"
import { FiSidebar } from "react-icons/fi"

interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const IconButton = ({
  icon,
  title,
  onClick,
  active,
  showText,
  className,
}: {
  icon: React.ReactNode
  title: string
  onClick?: () => void
  active?: boolean
  showText?: boolean
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        flex items-center gap-2 p-2 rounded-md transition-colors cursor-pointer
        ${active ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}
        ${className ?? ""}
      `}
      aria-pressed={active ? "true" : "false"}
    >
      {icon}
      {showText && <span className="text-sm">{title}</span>}
    </button>
  )
}

// Minimal Calendar component showing current month and highlighting today
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const Calendar = () => {
  const today = new Date()
  const [currentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  return (
    <div className="p-4 text-sm text-white select-none w-64 bg-gray-800 rounded shadow-lg">
      <div className="mb-3 flex items-center justify-center font-semibold">
        {monthNames[month]} {year}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1 text-gray-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) =>
          day ? (
            <div
              key={i}
              className={`text-center py-1 rounded cursor-default hover:bg-indigo-700 ${
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
                  ? "bg-indigo-600 font-semibold"
                  : ""
              }`}
            >
              {day}
            </div>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  )
}

export const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const [searchValue, setSearchValue] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const calendarRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false)
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search:", searchValue)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white border-b border-gray-700/50 z-50">
      <div className="flex items-center justify-between h-full px-4 relative">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <FiSidebar className="text-lg" /> : <FaBars className="text-lg" />}
          </button>

          {/* Page Title */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Logo</span>
          </div>
        </div>

        {/* Center Search */}
        <div className="flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Dashboard Search (Ctrl + /)"
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 relative">
          {/* Desktop Icons - hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2">
            <IconButton icon={<FaQuestionCircle />} title="Help" />
            <IconButton icon={<FaBolt />} title="Quick Actions" />
            <IconButton icon={<FaComments />} title="Messages" />
            <div className="relative" ref={calendarRef}>
              <IconButton
                icon={<FaCalendarAlt />}
                title="Calendar"
                onClick={() => setCalendarOpen(!calendarOpen)}
                active={calendarOpen}
              />
              {calendarOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded shadow-lg z-50"
                  style={{ top: "2.5rem" }}
                >
                  <Calendar />
                </div>
              )}
            </div>
            <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:bg-purple-700 transition-colors">
              AU
            </button>
          </div>

          {/* Mobile 3-dot menu - visible only on mobile */}
          <div className="sm:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <FaEllipsisV className="text-gray-400 hover:text-white" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 flex flex-col">
                <IconButton icon={<FaQuestionCircle />} title="Help" showText onClick={() => setDropdownOpen(false)} />
                <IconButton icon={<FaBolt />} title="Quick Actions" showText onClick={() => setDropdownOpen(false)} />
                <IconButton icon={<FaComments />} title="Messages" showText onClick={() => setDropdownOpen(false)} />
                <IconButton
                  icon={<FaCalendarAlt />}
                  title="Calendar"
                  active={calendarOpen}
                  showText
                  onClick={() => {
                    setCalendarOpen(!calendarOpen)
                    setDropdownOpen(false)
                  }}
                />
                <button
                  className="flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaUserCircle />
                  <span className="text-sm">Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
