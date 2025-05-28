import React from "react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 bg-opacity-30 backdrop-blur-sm">
      <div className="w-10 h-10 border-4 border-white border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
}
