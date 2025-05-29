
"use client";

import { FaSearch } from "react-icons/fa";
import React from "react";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isMobile?: boolean;
}

export const SearchBar = ({
  searchValue,
  setSearchValue,
  handleSearch,
  isMobile = false,
}: SearchBarProps) => {
  return (
    <form
      onSubmit={handleSearch}
      className={`relative ${isMobile ? "w-full px-4 py-2" : ""}`}
    >
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Dashboard Search (Ctrl + /)"
        className="w-full bg-gray-800/50 border border-gray-700/50 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </form>
  );
};


