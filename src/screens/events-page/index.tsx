"use client";

import { Calendar } from "@/src/components";
import { CalendarEvent } from "@/src/types/calendar";
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck } from "react-icons/fi";

export function EventsPage() {
  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const mm = m < 10 ? `0${m}` : m;
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    return `${today.getFullYear()}-${mm}-${dd}`;
  });

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [showTick, setShowTick] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("calendarEvents");
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const groupedEvents: Record<string, CalendarEvent[]> = events.reduce(
    (acc, event) => {
      if (!acc[event.date]) acc[event.date] = [];
      acc[event.date].push(event);
      return acc;
    },
    {} as Record<string, CalendarEvent[]>
  );

  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  const saveEvent = () => {
    if (!title.trim()) return alert("Title is required");

    if (editingId) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                title,
                description,
                updatedAt: new Date().toISOString(),
                date: e.date,
              }
            : e
        )
      );
    } else {
      const newEvent: CalendarEvent = {
        id: generateId(),
        title,
        description,
        date: selectedDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setEvents((prev) => [...prev, newEvent]);

      setShowTick(true);
      setTimeout(() => setShowTick(false), 2000);
    }
    resetForm();
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setShowDeleteNotification(true);
    setTimeout(() => setShowDeleteNotification(false), 3000);
  };

  const editEvent = (id: string) => {
    const ev = events.find((e) => e.id === id);
    if (ev) {
      setTitle(ev.title);
      setDescription(ev.description || "");
      setEditingId(ev.id);
      setSelectedDate(ev.date);
    }
  };

  return (
    <main className="flex flex-col md:flex-row gap-6 p-6 mx-auto min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 text-white">
      {/* Left Panel */}
      <section className="md:w-1/2 w-full rounded-xl p-6 flex flex-col overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 border-b border-indigo-600 pb-2 text-gray-900 dark:text-white">
          All Events by Date
        </h2>

        <div className="overflow-y-auto pr-2 max-h-[calc(100vh-160px)] custom-scroll">
          {sortedDates.length === 0 ? (
            <p className="text-indigo-400 italic">No events available.</p>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="mb-8 last:mb-0  ">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 ">
                  {date}
                </h3>
                <hr className="border border-indigo-600"/>
                <table className="w-full table-auto text-sm text-gray-900 dark:text-white divide-y divide-indigo-700 rounded-2xl ">
                  <thead>
                    <tr className="bg-indigo-50 dark:bg-indigo-950/30 text-white">
                      <th className="p-2 text-left rounded-lg">Title</th>
                      <th className="p-2 text-left rounded-lg">Description</th>
                      <th className="p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedEvents[date].map(({ id, title, description }) => (
                      <tr
                        key={id}
                        className="bg-indigo-50 dark:bg-indigo-950/30 transition-colors"
                      >
                        <td className="p-2">{title}</td>
                        <td className="p-2">
                          {description || (
                            <span className="text-indigo-400 italic">
                              No description
                            </span>
                          )}
                        </td>
                        <td className="p-2 text-center space-x-3">
                          <button
                            onClick={() => editEvent(id)}
                            className="text-indigo-400 hover:text-indigo-300 cursor-pointer hover:transform hover:scale-105 transition-transform"
                            aria-label="Edit Event"
                          >
                            <FiEdit className="inline text-lg" />
                          </button>
                          <button
                            onClick={() => deleteEvent(id)}
                            className="text-red-500 hover:text-red-400 cursor-pointer "
                            aria-label="Delete Event"
                          >
                            <FiTrash2 className="inline text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Right Panel */}
      <section className="md:w-1/2 w-full flex flex-col">
        <div className="flex justify-center mb-6">
          <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveEvent();
          }}
          className="bg-indigo-950 rounded-lg p-6 space-y-2 text-base md:text-lg"
        >
          <h2 className="text-base md:text-lg font-semibold mb-4 border-b border-indigo-600 pb-2">
            {editingId ? "Edit Event" : "Create Event"} on{" "}
            <span className="font-mono">{selectedDate}</span>
          </h2>

          <div>
            <label htmlFor="title" className="block font-medium mb-1 text-base">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-indigo-600 bg-indigo-950 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              placeholder="Event title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1 text-base">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded border border-indigo-600 bg-indigo-950 px-3 py-2 resize-none text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Event description (optional)"
            />
          </div>

          <div className="flex justify-end space-x-4">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 h-8 text-sm text-white bg-indigo-500 rounded shadow hover:bg-indigo-600 transition transform duration-150"
            >
              {editingId ? "Update" : "Add"} Event
            </button>
          </div>
        </form>
      </section>

      {/* Notifications */}
      {showTick && (
        <div
          aria-live="polite"
          role="alert"
          className="fixed bottom-6 right-6 z-50 bg-gray-800 bg-opacity-90 rounded-full p-2 shadow-lg text-green-600 flex items-center justify-center w-8 h-8 animate-fadeInOut"
        >
          <FiCheck className="w-5 h-5" />
        </div>
      )}
      {showDeleteNotification && (
        <div
          aria-live="polite"
          role="alert"
          className="fixed bottom-6 right-6 z-50 bg-gray-800 bg-opacity-90 rounded-lg px-4 py-2 shadow-lg text-red-700 font-semibold text-sm animate-fadeInOut"
        >
          Event deleted
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }

        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }

        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 transparent;
        }

        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #6366f1;
          border-radius: 8px;
        }
      `}</style>
    </main>
  );
}
