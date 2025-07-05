// src/mentee_dashboard/pages/MenteeDashboard.jsx

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCalendarAlt, FaClock, FaRobot, FaCommentDots } from "react-icons/fa";

import AppointmentBooking from "../components/AppointmentBooking";
import UpcomingAppointments from "../components/UpcomingAppointments";
import TimeSlots from "../components/TimeSlots";
import ChatBot from "../components/ChatBot";
import Feedback from "../components/Feedback";
import getGreeting from "../utils/getGreeting";
import ProfileCorner from "../components/ProfileCorner"; // ✅ Profile bar

const MenteeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const greeting = getGreeting();
  const name = localStorage.getItem("name") || "User";

  return (
    <div className="flex h-screen bg-pink-50 text-[#42383B] font-sans">

      {/* Sidebar */}
      <aside
        className={`bg-[#FFE5D9] p-4 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-52" : "w-16"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 transition-transform duration-300"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {sidebarOpen && (
          <h2 className="text-xl font-bold mb-6 transition-opacity duration-300">MentHer</h2>
        )}

        <nav className="space-y-4 text-sm">
          <a href="#appointments" className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors">
            <FaCalendarAlt /> {sidebarOpen && "Appointments"}
          </a>
          <a href="#timeslots" className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors">
            <FaClock /> {sidebarOpen && "Time Slots"}
          </a>
          <a href="#chatbot" className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors">
            <FaRobot /> {sidebarOpen && "ChatBot"}
          </a>
          <a href="#feedback" className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors">
            <FaCommentDots /> {sidebarOpen && "Feedback"}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <div className="p-4 border-b bg-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-semibold">{greeting}, {name}!</h2>
            <p className="text-sm text-gray-500">Empowering women in tech, one connection at a time.</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search mentors, topics..."
              className="border rounded-md px-3 py-1 text-sm w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <ProfileCorner /> {/* ✅ Profile bar added */}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">

          {/* Appointments */}
          <section id="appointments" className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Appointments</h3>
            <AppointmentBooking />
            <UpcomingAppointments />
          </section>

          {/* Time Slots */}
          <section id="timeslots" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
            <TimeSlots />
          </section>

          {/* ChatBot */}
          <section id="chatbot" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">ChatBot</h3>
            <ChatBot />
          </section>

          {/* Feedback */}
          <section id="feedback" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Feedback</h3>
            <Feedback />
          </section>
        </div>
      </main>
    </div>
  );
};

export default MenteeDashboard;
