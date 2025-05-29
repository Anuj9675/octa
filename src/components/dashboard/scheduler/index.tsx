"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "../../calendar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Meeting } from "@/src/types/meeting";


export const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [scheduledMeetings, setScheduledMeetings] = useState<Meeting[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<Omit<Meeting, "selectedDate">>({
    meetingType: "",
    meetingLink: "",
    time: "",
    ampm: "AM",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Meeting = {
      ...formData,
      selectedDate,
    };

    if (editIndex !== null) {
      const updated = [...scheduledMeetings];
      updated[editIndex] = payload;
      setScheduledMeetings(updated);
      setEditIndex(null);
    } else {
      setScheduledMeetings([...scheduledMeetings, payload]);
    }

    setFormData({
      meetingType: "",
      meetingLink: "",
      time: "",
      ampm: "AM",
    });
  };

  const handleEdit = (index: number) => {
    const item = scheduledMeetings[index];
    setFormData({
      meetingType: item.meetingType,
      meetingLink: item.meetingLink,
      time: item.time,
      ampm: item.ampm,
    });
    setSelectedDate(item.selectedDate);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const filtered = scheduledMeetings.filter((_, i) => i !== index);
    setScheduledMeetings(filtered);
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      {/* Scheduled Meetings List */}
      <div className="w-full md:w-1/2 h-full rounded-lg p-4 overflow-y-auto custom-scroll">
        <h2 className="text-xl font-semibold text-white mb-4">
          Scheduled Meetings
        </h2>
        <hr className="border border-indigo-600 mb-5" />
        {scheduledMeetings.length === 0 ? (
          <p className="text-sm text-white/70">No meetings scheduled yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scheduledMeetings.map((meeting, index) => (
              <div
                key={index}
                className="relative border border-indigo-800 rounded-lg p-4 bg-gradient-to-r from-indigo-800 via-indigo-900 to-purple-800 shadow-md text-white flex flex-col justify-between h-full"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-md font-semibold">
                    {meeting.meetingType}
                  </h3>
                  <div className="flex flex-row gap-6">
                    <p className="text-sm">Date: {meeting.selectedDate}</p>
                    <p className="text-sm">
                      Time: {meeting.time} {meeting.ampm}
                    </p>
                  </div>
                  <p className="text-sm">
                    Link:{" "}
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-indigo-300 hover:text-indigo-400 transition-colors"
                    >
                      {meeting.meetingLink}
                    </a>
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 rounded hover:scale-105 transition-transform cursor-pointer"
                  >
                    <FiEdit className="text-indigo-300 w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 rounded hover:scale-105 transition-transform cursor-pointer"
                  >
                    <FiTrash2 className="text-red-400 w-5 h-5" />
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 text-blue-300/30">
                  <div className="w-20 h-20 rounded-full border-2 border-current"></div>
                </div>
                <div className="absolute bottom-6 right-12 text-blue-300/20">
                  <div className="w-10 h-10 rounded-full bg-current"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendar and Form */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Calendar */}
        <div className="border border-indigo-600 rounded-lg p-4 shadow-sm">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="border border-indigo-600 p-4 rounded-lg shadow-sm text-white space-y-4"
        >
          <h1 className="text-xl font-semibold mb-4">Schedule a Meeting</h1>

          <div>
            <label className="block text-sm font-medium">Meeting Type</label>
            <input
              type="text"
              name="meetingType"
              value={formData.meetingType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-indigo-600 rounded text-white bg-transparent"
              placeholder="e.g., Team Standup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Meeting Link</label>
            <input
              type="url"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-indigo-600 rounded text-white bg-transparent"
              placeholder="Paste Zoom, Meet, etc. link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Time</label>
            <div className="flex gap-2 mt-1">
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="border border-indigo-600 rounded px-3 py-2 w-full text-white bg-transparent"
              />
              <select
                name="ampm"
                value={formData.ampm}
                onChange={handleChange}
                className="border border-indigo-600 rounded px-3 py-2 text-white bg-transparent"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {selectedDate && (
            <p className="text-sm">
              Selected Date: <strong>{selectedDate}</strong>
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded bg-white text-indigo-700 transition-colors cursor-pointer"
          >
            {editIndex !== null ? "Update Meeting" : "Schedule Meeting"}
          </button>
        </form>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
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
    </div>
  );
};
