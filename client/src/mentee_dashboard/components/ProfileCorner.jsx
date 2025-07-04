// src/components/ProfileCorner.jsx

import { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProfileCorner = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Get user info from localStorage
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "user@example.com";
  const profilePic = localStorage.getItem("profilePic") || "";

  const initial = name.charAt(0).toUpperCase();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-200 text-pink-700 font-bold hover:bg-pink-300 transition"
        aria-label="Toggle Profile Menu"
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          initial
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 p-4">
          <div className="flex flex-col items-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-4xl font-bold mb-2">
                {initial}
              </div>
            )}
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600 break-all">{email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCorner;
