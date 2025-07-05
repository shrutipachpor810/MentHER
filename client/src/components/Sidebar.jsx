import { useState } from "react";
import SidebarToggle from "./SidebarToggle";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaComments,
  FaStickyNote,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { name: "Dashboard", icon: <FaUserCircle /> },
    { name: "Bookings", icon: <FaCalendarAlt /> },
    { name: "Mentors", icon: <FaChalkboardTeacher /> },
    { name: "Forum", icon: <FaComments /> },
    { name: "Notes", icon: <FaStickyNote /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div
      className={`h-screen bg-pink-50 p-4 transition-all duration-300 flex flex-col fixed top-0 left-0 ${
        isOpen ? "w-48" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <SidebarToggle isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      </div>

      {/* Navigation Links */}
      <div className="space-y-4 mt-4">
        {links.map((link, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 cursor-pointer hover:bg-pink-100 p-2 rounded-md transition-all duration-200"
          >
            {link.icon}
            {isOpen && <span className="text-sm">{link.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
