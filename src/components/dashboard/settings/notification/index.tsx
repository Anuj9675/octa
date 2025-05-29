"use client";

import React, { useState } from "react";
import styled from "styled-components";

type SectionType = "event" | "schedule" | "task";

const sections: SectionType[] = ["event", "schedule", "task"];

const Card = () => {
  const [settings, setSettings] = useState<
    Record<SectionType, { inApp: boolean; email: boolean }>
  >({
    event: { inApp: true, email: false },
    schedule: { inApp: true, email: false },
    task: { inApp: true, email: false },
  });

  const toggleCheckbox = (section: SectionType, type: "inApp" | "email") => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: !prev[section][type],
      },
    }));
  };

  return (
    <StyledWrapper>
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <div className="brutalist-card__alert">Notification Settings</div>
        </div>
        <div className="brutalist-card__message">
          Manage how you want to receive notifications. Choose between in-app alerts or email notifications for each section.
        </div>

        {sections.map((section) => (
          <div key={section} style={{ width: "100%", marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                borderBottom: "2px solid indigo",
                paddingBottom: "0.75rem",
              }}
            >
              <h2
                style={{
                  textTransform: "capitalize",
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "1.375rem",
                }}
              >
                {section}
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={settings[section].inApp}
                    onChange={() => toggleCheckbox(section, "inApp")}
                    aria-label={`${section} in app notifications`}
                    style={{ cursor: "pointer" }}
                  />
                  In-App
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={settings[section].email}
                    onChange={() => toggleCheckbox(section, "email")}
                    aria-label={`${section} email notifications`}
                    style={{ cursor: "pointer" }}
                  />
                  Email
                </label>
              </div>
            </div>
          </div>
        ))}

        <div className="brutalist-card__actions">
          <button className="brutalist-card__button brutalist-card__button--mark" type="button">
            Save Settings
          </button>
          <button className="brutalist-card__button brutalist-card__button--read" type="button">
            Reset to Defaults
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem; /* Add some padding on mobile */

  .brutalist-card {
    width: 100%;
    max-width: 420px;
    border: 4px solid #4f46e5;
    background-color: transparent;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #4f46e5;
    font-family: "Arial", sans-serif;
    color: white;
    box-sizing: border-box;
  }

  .brutalist-card__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #4f46e5;
    padding-bottom: 1rem;
  }

  .brutalist-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4f46e5;
    padding: 0.5rem;
    color: white;
  }

  .brutalist-card__icon svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  .brutalist-card__alert {
    font-weight: 900;
    color: white;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .brutalist-card__message {
    margin-top: 1rem;
    color: white;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 2px solid #4f46e5;
    padding-bottom: 1rem;
    font-weight: 600;
  }

  .brutalist-card__actions {
    margin-top: 1rem;
  }

  .brutalist-card__button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 3px solid #4f46e5;
    background-color: transparent;
    color: white;
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 5px 5px 0 #4f46e5;
    overflow: hidden;
    text-decoration: none;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .brutalist-card__button--read {
    background-color: #4f46e5;
    color: white;
  }

  .brutalist-card__button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  .brutalist-card__button:hover::before {
    left: 100%;
  }

  .brutalist-card__button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #4f46e5;
  }

  .brutalist-card__button--mark:hover {
    background-color: #3730a3;
    border-color: #3730a3;
    color: white;
    box-shadow: 7px 7px 0 #1e40af;
  }

  .brutalist-card__button--read:hover {
    background-color: #312e81;
    border-color: #312e81;
    color: white;
    box-shadow: 7px 7px 0 #1e3a8a;
  }

  .brutalist-card__button:active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }

  /* Responsive tweaks */
  @media (max-width: 480px) {
    .brutalist-card {
      max-width: 100%;
      padding: 1rem;
      box-shadow: 6px 6px 0 #4f46e5;
      border-width: 3px;
    }

    .brutalist-card__alert {
      font-size: 1.25rem;
    }

    .brutalist-card__message {
      font-size: 0.85rem;
    }

    .brutalist-card__button {
      font-size: 0.9rem;
      padding: 0.6rem;
      box-shadow: 3px 3px 0 #4f46e5;
      border-width: 2px;
    }

    .brutalist-card__button:hover {
      transform: none;
      box-shadow: 4px 4px 0 #4f46e5;
    }

    .brutalist-card__header {
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .brutalist-card__icon {
      padding: 0.3rem;
    }

    .brutalist-card__icon svg {
      height: 1.2rem;
      width: 1.2rem;
    }

    /* Make the section title smaller */
    h2 {
      font-size: 1.125rem !important;
    }

    /* Adjust section controls layout */
    div[style*="display: flex"][style*="gap: 1.5rem"] {
      gap: 1rem !important;
    }
  }
`;


export const Notifications = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        
      }}
    >
      <Card />
    </div>
  );
};
