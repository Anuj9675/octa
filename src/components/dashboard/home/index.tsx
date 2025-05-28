"use client"

import { FaCalendarPlus, FaClock, FaHistory, FaUsers } from "react-icons/fa"

export const Home = () => {
  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-indigo-950 dark:via-gray-800 dark:to-purple-900 text-white min-h-screen">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-800 via-indigo-900 to-purple-800 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">📅</span>
            <h1 className="text-4xl font-bold">Welcome, anuj_20!</h1>
          </div>
          <p className="text-blue-200 max-w-lg">
            Manage your meetings easily — schedule new ones, see upcoming events, and review past sessions all in one place.
          </p>
        </div>

        {/* Decorative */}
        <div className="absolute top-6 right-6 text-blue-300/30">
          <div className="w-20 h-20 rounded-full border-2 border-current"></div>
        </div>
        <div className="absolute bottom-6 right-12 text-blue-300/20">
          <div className="w-10 h-10 rounded-full bg-current"></div>
        </div>
      </div>

      {/* Meeting Sections */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Upcoming Meetings */}
        <div className="bg-indigo-950 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaClock className="text-indigo-600" /> Upcoming Meetings
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800" aria-label="View all upcoming meetings">
              View All
            </button>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li>Project Sync — May 29, 2025, 10:00 AM</li>
            <li>Client Call — May 30, 2025, 2:00 PM</li>
            <li>Team Brainstorm — June 1, 2025, 9:00 AM</li>
          </ul>
        </div>

        {/* Past Meetings */}
        <div className="bg-indigo-950 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaHistory className="text-indigo-600" /> Past Meetings
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800" aria-label="View all past meetings">
              View All
            </button>
          </div>
          <ul className="space-y-3 text-white text-sm">
            <li>Design Review — May 20, 2025, 11:00 AM</li>
            <li>Budget Planning — May 22, 2025, 3:00 PM</li>
            <li>Onboarding Session — May 25, 2025, 1:00 PM</li>
          </ul>
        </div>

        {/* Schedule New Meeting */}
        <div className="bg-indigo-950 text-white rounded-lg p-6 shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FaCalendarPlus className="text-white" /> Schedule New Meeting
            </h2>
            <p className="text-indigo-200 mb-6">
              Plan your next meeting quickly and send invites to your participants.
            </p>
          </div>
          <button className="bg-white text-indigo-700 px-5 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
            Schedule Now
          </button>
        </div>
      </div>

      {/* Quick Actions / Summary */}
      <div className="bg-indigo-950 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4 text-white">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <button className="flex items-center gap-2 p-4 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition">
            <FaUsers /> Invite Participants
          </button>
          <button className="flex items-center gap-2 p-4 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition">
            <FaClock /> Set Reminders
          </button>
          <button className="flex items-center gap-2 p-4 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition">
            <FaCalendarPlus /> Create Template
          </button>
          <button className="flex items-center gap-2 p-4 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition">
            <FaHistory /> View Analytics
          </button>
        </div>
      </div>
    </div>
  )
}
