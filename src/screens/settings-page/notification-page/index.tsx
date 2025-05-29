// src/screens/settings-page/NotificationsPage.tsx
"use client";
import { Notifications } from "@/src/components";
import React from "react";


export const NotificationSettingPage = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950">
      <Notifications />     
      </div>
  );
};

