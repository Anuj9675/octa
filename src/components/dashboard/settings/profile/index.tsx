"use client";

import React, { useState } from "react";

export function Profile() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "moonlit_gamer",
    name: "Anuj Updhyay",
    email: "anuj@example.com",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated!");
    // Add real update logic here
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Profile Settings</h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-500"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload profile picture"
            />
          )}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-white text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly={!isEditing}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-white text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-white text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditing}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 mt-1"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={toggleEdit}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={toggleEdit}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
