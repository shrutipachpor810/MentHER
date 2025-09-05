// src/components/ProfileCorner.jsx
import { useState, useRef, useEffect } from "react";
import { FiLogOut, FiUser, FiSettings, FiChevronDown } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileCorner = () => {
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "user@example.com";
  const role = localStorage.getItem("role") || "user";
  const initial = name.charAt(0).toUpperCase();

  // Sync profilePic from localStorage on mount and on route change
  useEffect(() => {
    const storedPic = localStorage.getItem("profilePic");
    setProfilePic(storedPic && storedPic !== "null" && storedPic !== "undefined" ? storedPic : "");
  }, [location]);

  // Close dropdown on outside click or ESC
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
        className="flex items-center space-x-2 bg-white border border-[#F4ACB7]/30 rounded-full px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
        aria-label="Toggle Profile Menu"
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#F4ACB7] flex items-center justify-center text-white font-bold">
            {initial}
          </div>
        )}
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-[#4B2E38] truncate max-w-[100px]">{name}</p>
          <p className="text-xs text-[#85586F]">{role}</p>
        </div>
        <FiChevronDown className={`text-[#85586F] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl z-50 border border-[#F4ACB7]/20 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#F4ACB7] to-[#FFB5C5] p-6 text-white">
            <div className="flex items-center space-x-4">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-2xl font-bold border-2 border-white">
                  {initial}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm opacity-90">{email}</p>
                <span className="inline-block mt-1 bg-white/20 text-xs px-2 py-1 rounded-full">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-[#FFE5D9] transition-colors text-[#4B2E38]">
              <div className="w-8 h-8 rounded-full bg-[#F4ACB7]/20 flex items-center justify-center">
                <FiUser className="text-[#4B2E38]" />
              </div>
              <span className="font-medium">View Profile</span>
            </button>
            
            <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-[#FFE5D9] transition-colors text-[#4B2E38]">
              <div className="w-8 h-8 rounded-full bg-[#F4ACB7]/20 flex items-center justify-center">
                <FiSettings className="text-[#4B2E38]" />
              </div>
              <span className="font-medium">Settings</span>
            </button>
            
            <div className="border-t border-[#F4ACB7]/20 my-2"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-[#FFE5D9] transition-colors text-[#4B2E38]"
            >
              <div className="w-8 h-8 rounded-full bg-[#F4ACB7]/20 flex items-center justify-center">
                <FiLogOut className="text-[#4B2E38]" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCorner;