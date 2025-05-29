"use client";

import React, { useState, useMemo, useEffect } from "react";

type SectionType = "event" | "schedule" | "task";

const sections: SectionType[] = ["event", "schedule", "task"];

type NotificationItem = {
  message: string;
  timestamp: string; // ISO string or formatted
};

const initialNotifications: Record<SectionType, NotificationItem[]> = {
  event: [
    { message: "Team event at 5PM", timestamp: "2025-05-28T17:00:00Z" },
    { message: "Project kickoff meeting tomorrow", timestamp: "2025-05-29T09:00:00Z" },
  ],
  schedule: [
    { message: "Meeting with client at 3PM", timestamp: "2025-05-27T15:00:00Z" },
    { message: "Follow up on design review", timestamp: "2025-05-28T11:30:00Z" },
  ],
  task: [
    { message: "Buy groceries", timestamp: "2025-05-26T18:00:00Z" },
    { message: "Finish frontend design", timestamp: "2025-05-27T20:00:00Z" },
    { message: "Submit expense report", timestamp: "2025-05-28T12:00:00Z" },
  ],
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const NotificationsView = () => {
  const [filterSection, setFilterSection] = useState<SectionType | "all">("all");
  // Removed unused setNotifications to fix ESLint error
  const [notifications] = useState(initialNotifications);
  const [readSections, setReadSections] = useState<Record<SectionType, boolean>>({
    event: false,
    schedule: false,
    task: false,
  });

  // Track if we're on client side
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredSections = filterSection === "all" ? sections : [filterSection];

  const filteredNotifications = useMemo(() => {
    const newNotifications: Record<SectionType, NotificationItem[]> = {
      event: [],
      schedule: [],
      task: [],
    };
    filteredSections.forEach((section) => {
      newNotifications[section] = notifications[section];
    });
    return newNotifications;
  }, [filteredSections, notifications]); // Added filteredSections here to fix warning

  const markAllAsRead = () => {
    const newRead = { ...readSections };
    filteredSections.forEach((sec) => (newRead[sec] = true));
    setReadSections(newRead);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        padding: "1rem 2rem",
        fontFamily: "Arial, sans-serif",
        color: "white",
        backgroundColor: "transparent",
        boxSizing: "border-box",
      }}
    >
      {/* Sticky Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "transparent",
          paddingBottom: 10,
          marginBottom: 20,
          borderBottom: "2px solid indigo",
          zIndex: 100,
          userSelect: "none",
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            margin: 0,
            color: "white",
            lineHeight: 1.2,
          }}
        >
          Notifications
        </h1>
        <p style={{ marginTop: 4, fontSize: "1.125rem", color: "#ddd" }}>
          Customize and browse your notifications
        </p>
      </header>

      {/* Filter + Mark all read */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <select
          aria-label="Filter notifications by section"
          value={filterSection}
          onChange={(e) =>
            setFilterSection(e.target.value as SectionType | "all")
          }
          style={{
            padding: "6px 10px",
            fontSize: "1rem",
            backgroundColor: "#210043",
            border: "1px solid indigo",
            color: "white",
            borderRadius: 4,
            cursor: "pointer",
            minWidth: 140,
            appearance: "none",
          }}
        >
          <option value="all">All Sections</option>
          {sections.map((section) => (
            <option key={section} value={section}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={markAllAsRead}
          style={{
            padding: "4px 8px",
            backgroundColor: "indigo",
            border: "none",
            borderRadius: 4,
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 12,
            whiteSpace: "nowrap",
          }}
        >
          Mark All As Read
        </button>
      </div>

      {/* Notifications Sections */}
      {filteredSections.map((section) => (
        <div key={section} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              userSelect: "none",
              marginBottom: 10,
              paddingBottom: 5,
              borderBottom: "2px solid indigo",
              color: readSections[section] ? "#888" : "white",
            }}
          >
            <h2
              style={{
                textTransform: "capitalize",
                margin: 0,
                fontWeight: "bold",
                fontSize: "1.375rem",
                flexGrow: 1,
              }}
            >
              {section}
            </h2>
            {readSections[section] && (
              <span
                style={{
                  fontSize: 12,
                  color: "#888",
                  fontStyle: "italic",
                  marginLeft: 10,
                  userSelect: "none",
                }}
              >
                All read
              </span>
            )}
          </div>

          {filteredNotifications[section].length === 0 ? (
            <p style={{ fontStyle: "italic", color: "#bbb" }}>No notifications.</p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                marginTop: 0,
                color: "white",
              }}
            >
              {filteredNotifications[section].map((notif, i) => (
                <li
                  key={i}
                  style={{
                    padding: "8px 0",
                    borderBottom:
                      i !== filteredNotifications[section].length - 1
                        ? "1px solid indigo"
                        : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 15,
                  }}
                >
                  <span>{notif.message}</span>
                  <small
                    style={{
                      fontSize: 12,
                      color: "#bbb",
                      marginLeft: 10,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isClient ? formatDate(notif.timestamp) : "Loading..."}
                  </small>
                </li>
              ))}
            </ul>
          )}

          <hr style={{ borderColor: "indigo", marginTop: 30 }} />
        </div>
      ))}

      {/* Empty state if no notifications at all */}
      {sections.every(
        (section) => filteredNotifications[section].length === 0
      ) && (
        <p
          style={{
            fontStyle: "italic",
            color: "#bbb",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          No notifications found.
        </p>
      )}
    </div>
  );
};
