// src/components/Sidebar.jsx

import { useState } from "react";
import SidebarToggle from "./SidebarToggle";
import {
  FaUser,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaComments,
  FaStickyNote,
  FaCog,
} from "react-icons/fa";

export default function Sidebar({ onSelect }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Profile");

  const links = [
    { name: "Profile", icon: <FaUser /> },
    { name: "Appointments", icon: <FaCalendarAlt /> },
    { name: "Mentors", icon: <FaChalkboardTeacher /> },
    { name: "Forum", icon: <FaComments /> },
    { name: "Notes", icon: <FaStickyNote /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  const handleSelect = (name) => {
    setSelectedTab(name);
    if (onSelect) {
      onSelect(name); // allow parent to handle routing/page updates
    }
  };

  return (
    <div
      className={`h-screen bg-pink-50 p-4 transition-all duration-300 flex flex-col fixed top-0 left-0 z-20 ${
        isOpen ? "w-48" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <SidebarToggle isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      </div>

      {/* Navigation Links */}
      <div className="space-y-2 mt-4">
        {links.map((link, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(link.name)}
            className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-all duration-200
              ${selectedTab === link.name ? "bg-pink-200 text-pink-900 font-semibold" : "hover:bg-pink-100"}
            `}
          >
            {link.icon}
            {isOpen && <span className="text-sm">{link.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
