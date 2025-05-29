"use client";

import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

export function Account() {
  const initialData = {
    name: "John Doe",
    email: "user@example.com",
    mobile: "+1234567890",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    transferVia: "",
    transferValue: "",
    deleteUsername: "",
    deleteContact: "",
    deletePassword: "",
  };

  const [form, setForm] = useState(initialData);

  const [editEmail, setEditEmail] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editTransfer, setEditTransfer] = useState(false);
  const [editDelete, setEditDelete] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent, action: string) => {
    e.preventDefault();
    alert(`${action} submitted!`);

    if (action === "Change Email") setEditEmail(false);
    if (action === "Change Mobile") setEditMobile(false);
    if (action === "Change Password") {
      setEditPassword(false);
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
    if (action === "Transfer Account") {
      setEditTransfer(false);
      setForm((prev) => ({
        ...prev,
        transferVia: "",
        transferValue: "",
      }));
    }
    if (action === "Delete Account") {
      setEditDelete(false);
      setForm((prev) => ({
        ...prev,
        deleteUsername: "",
        deleteContact: "",
        deletePassword: "",
      }));
    }
  };

  return (
    <div className="account-settings-page max-w-full sm:max-w-5xl mx-auto px-4 sm:px-6 py-8 text-white font-sans min-h-screen">
      {/* GENERAL SETTINGS */}
      <section className="mb-10">
        <section className="mb-8 max-w-full sm:max-w-lg ml-0 sm:ml-0">
          <h1 className="text-xl sm:text-3xl font-bold mb-2 tracking-wide leading-tight break-words">
            GENERAL
          </h1>
          <p className="text-white mb-6 text-xs sm:text-sm leading-relaxed max-w-full sm:max-w-lg break-words">
            Manage your basic account information.
          </p>
        </section>

        {/* Name */}
        <div className="mb-6 max-w-full sm:max-w-md">
          <label className="block text-base sm:text-lg font-semibold mb-1 leading-snug">
            Name
          </label>
          <p className="text-indigo-300 mb-2 text-xs sm:text-sm max-w-full sm:max-w-md leading-relaxed break-words">
            This is your full name as it will appear on your profile.
          </p>
          <p className="bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base truncate">
            {form.name}
          </p>
        </div>

        {/* Email */}
        <section className="mb-6 max-w-full sm:max-w-md">
          <div className="flex justify-between items-center mb-1">
            <label className="text-base sm:text-lg font-semibold leading-snug break-words">
              Email Address
            </label>
            {!editEmail && (
              <FiEdit2
                onClick={() => setEditEmail(true)}
                className="cursor-pointer  text-white/80 hover:text-white"
                size={18}
              />
            )}
          </div>
          <p className="text-indigo-300 mb-2 text-xs sm:text-sm max-w-full sm:max-w-md leading-relaxed break-words">
            Your primary email for login and notifications.
          </p>
          <form onSubmit={(e) => handleSubmit(e, "Change Email")}>
            <input
              type="email"
              name="email"
              className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
              value={form.email}
              onChange={handleChange}
              readOnly={!editEmail}
              required
            />
            {editEmail && (
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md font-semibold cursor-pointer text-sm"
                >
                  <FiSave size={16} /> Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditEmail(false);
                    setForm((prev) => ({ ...prev, email: initialData.email }));
                  }}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md cursor-pointer text-sm"
                >
                  <FiX size={16} /> Cancel
                </button>
              </div>
            )}
          </form>
        </section>

        {/* Mobile */}
        <section className="mb-6 max-w-full sm:max-w-md">
          <div className="flex justify-between items-center mb-1">
            <label className="text-base sm:text-lg font-semibold leading-snug break-words">
              Mobile Number
            </label>
            {!editMobile && (
              <FiEdit2
                onClick={() => setEditMobile(true)}
                className="cursor-pointer  text-white/80 hover:text-white"
                size={18}
              />
            )}
          </div>
          <p className="text-indigo-300 mb-2 text-xs sm:text-sm max-w-full sm:max-w-md leading-relaxed break-words">
            Used for two-factor authentication and account recovery.
          </p>
          <form onSubmit={(e) => handleSubmit(e, "Change Mobile")}>
            <input
              type="tel"
              name="mobile"
              className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
              value={form.mobile}
              onChange={handleChange}
              readOnly={!editMobile}
              required
            />
            {editMobile && (
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md font-semibold cursor-pointer text-sm"
                >
                  <FiSave size={16} /> Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMobile(false);
                    setForm((prev) => ({
                      ...prev,
                      mobile: initialData.mobile,
                    }));
                  }}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md cursor-pointer text-sm"
                >
                  <FiX size={16} /> Cancel
                </button>
              </div>
            )}
          </form>
        </section>
      </section>

      <hr className="border-2 border-indigo-600 max-w-none -mx-4 sm:-mx-10 rounded-full" />

      {/* ADVANCED SETTINGS */}
      <section className="mt-10">
        <section className="mb-8 max-w-full sm:max-w-lg ml-0 sm:ml-0">
          <h1 className="text-xl sm:text-3xl font-bold mb-2 tracking-wide leading-tight break-words">
            ADVANCED SETTINGS
          </h1>
          <p className="text-white mb-8 text-xs sm:text-sm leading-relaxed max-w-full sm:max-w-lg break-words">
            Control sensitive and security-related account settings.
          </p>
        </section>

        {/* Change Password */}
        <section className="mb-10 max-w-full sm:max-w-md">
          <div className="flex flex-wrap justify-between items-center mb-2">
            <h2 className="text-lg sm:text-2xl font-semibold leading-snug break-words">
              Change Password
            </h2>
            {!editPassword && (
              <FiEdit2
                onClick={() => setEditPassword(true)}
                className="cursor-pointer  text-white/80 hover:text-white"
                size={18}
              />
            )}
          </div>
          <p className="text-indigo-300 mb-4 text-xs sm:text-sm max-w-full sm:max-w-md leading-relaxed break-words">
            Make sure your new password is strong and secure.
          </p>
          {editPassword ? (
            <form
              onSubmit={(e) => handleSubmit(e, "Change Password")}
              className="space-y-4"
            >
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
                value={form.currentPassword}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md font-semibold cursor-pointer text-sm"
                >
                  <FiSave size={16} /> Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditPassword(false);
                    setForm((prev) => ({
                      ...prev,
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    }));
                  }}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md cursor-pointer text-sm"
                >
                  <FiX size={16} /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-indigo-400 text-sm italic max-w-full sm:max-w-md break-words">
              Password is hidden for security.
            </p>
          )}
        </section>

        {/* Transfer Account */}
        <section className="mb-10 max-w-full sm:max-w-md">
          <div className="flex flex-wrap justify-between items-center mb-2">
            <h2 className="text-lg sm:text-2xl font-semibold leading-snug break-words">
              Transfer Account
            </h2>
            {!editTransfer && (
              <FiEdit2
                onClick={() => setEditTransfer(true)}
                className="cursor-pointer text-white/80 hover:text-white"
                size={18}
              />
            )}
          </div>
          <p className="text-indigo-300 mb-4 text-xs sm:text-sm max-w-full sm:max-w-md leading-relaxed break-words">
            Transfer your account to another contact or username.
          </p>
          {editTransfer ? (
            <form
              onSubmit={(e) => handleSubmit(e, "Transfer Account")}
              className="space-y-4"
            >
              <select
                name="transferVia"
                value={form.transferVia}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
              >
                <option value="" disabled>
                  Transfer via
                </option>
                <option value="username">Username</option>
                <option value="contact">Contact</option>
              </select>
              <input
                type="text"
                name="transferValue"
                placeholder="Enter username or contact"
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
                value={form.transferValue}
                onChange={handleChange}
                required
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md font-semibold cursor-pointer text-sm"
                >
                  <FiSave size={16} /> Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditTransfer(false);
                    setForm((prev) => ({
                      ...prev,
                      transferVia: "",
                      transferValue: "",
                    }));
                  }}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md cursor-pointer text-sm"
                >
                  <FiX size={16} /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-indigo-400 text-sm italic max-w-full sm:max-w-md break-words">
              No pending transfer requests.
            </p>
          )}
        </section>

        {/* Delete Account */}
        <section className="max-w-full sm:max-w-md">
          <div className="flex flex-wrap justify-between items-center mb-2">
            <h2 className="text-lg sm:text-2xl font-semibold leading-snug break-words">
              Delete Account
            </h2>
            {!editDelete && (
              <FiTrash2
                onClick={() => setEditDelete(true)}
                className="cursor-pointer text-red-400 hover:text-red-500"
                size={18}
              />
            )}
          </div>
          <p className="text-indigo-300 mb-4 text-xs sm:text-sm max-w-full sm:max-w-md leading-relaxed break-words">
            This action is irreversible. Please confirm your details to delete
            your account.
          </p>
          {editDelete ? (
            <form
              onSubmit={(e) => handleSubmit(e, "Delete Account")}
              className="space-y-4"
            >
              <input
                type="text"
                name="deleteUsername"
                placeholder="Username"
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
                value={form.deleteUsername}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="deleteContact"
                placeholder="Contact"
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
                value={form.deleteContact}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="deletePassword"
                placeholder="Password"
                className="w-full bg-transparent border border-indigo-600 rounded-md px-3 py-2 text-white text-sm sm:text-base"
                value={form.deletePassword}
                onChange={handleChange}
                required
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md font-semibold cursor-pointer text-sm"
                >
                  <FiTrash2 size={16} /> Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditDelete(false);
                    setForm((prev) => ({
                      ...prev,
                      deleteUsername: "",
                      deleteContact: "",
                      deletePassword: "",
                    }));
                  }}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md cursor-pointer text-sm"
                >
                  <FiX size={16} /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-indigo-400 text-sm italic max-w-full sm:max-w-md break-words">
              Account deletion is disabled until confirmation.
            </p>
          )}
        </section>
      </section>
    </div>
  );
}
