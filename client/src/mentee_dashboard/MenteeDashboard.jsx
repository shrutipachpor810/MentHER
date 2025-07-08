// src/mentee_dashboard/pages/MenteeDashboard.jsx

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCalendarAlt, FaClock, FaRobot, FaCommentDots, FaUser } from "react-icons/fa";

import UpcomingAppointments from "../components/UpcomingAppointments";
import TimeSlots from "../components/TimeSlots";
import ChatBot from "../components/ChatBot";
import Feedback from "../components/Feedback";
import getGreeting from "../utils/getGreeting";
import ProfileCorner from "../components/ProfileCorner";
import MenteeProfile from "../components/MenteeProfile";
import BookAppointmentPage from "../components/BookAppointmentPage";

const MenteeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("appointments");

  const greeting = getGreeting();
  const name = localStorage.getItem("name") || "User";

  const tabs = [
    { tab: "appointments", label: "Appointments", icon: <FaCalendarAlt /> },
    { tab: "timeslots", label: "Time Slots", icon: <FaClock /> },
    { tab: "chatbot", label: "ChatBot", icon: <FaRobot /> },
    { tab: "feedback", label: "Feedback", icon: <FaCommentDots /> },
    { tab: "profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#FFF5F5] to-[#FFF0F3] text-[#42383B] font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-[#89B0AE] text-white p-4 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-56" : "w-16"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 focus:outline-none"
        >
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        {sidebarOpen && (
          <h2 className="text-xl font-bold mb-6">MentHer</h2>
        )}

        <nav className="flex flex-col justify-between h-[80vh]">
          <div className="space-y-2">
            {tabs.map(({ tab, label, icon }) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex items-center gap-2 p-2 rounded-md transition-colors w-full text-left ${
                  selectedTab === tab
                    ? "bg-[#6FA1A0] font-semibold shadow"
                    : "hover:bg-[#7FAFAE]"
                }`}
              >
                {icon} {sidebarOpen && <span>{label}</span>}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <div className="p-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-semibold">
              {greeting}, {name}!
            </h2>
            <p className="text-sm text-gray-500">Ready to grow your skills today?</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search mentors, topics..."
              className="border rounded-full px-4 py-1.5 text-sm w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-[#FFADAD]"
            />
            <ProfileCorner />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {selectedTab === "appointments" && (
            <>
              <section className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-3 text-[#42383B]">Book a Session</h3>
                <BookAppointmentPage />
              </section>

              <section className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-3 text-[#42383B]">Your Appointments</h3>
                <UpcomingAppointments />
              </section>
            </>
          )}

          {selectedTab === "timeslots" && (
            <section className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-3 text-[#42383B]">Available Time Slots</h3>
              <TimeSlots />
            </section>
          )}

          {selectedTab === "chatbot" && (
            <section className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-3 text-[#42383B]">ChatBot</h3>
              <ChatBot />
            </section>
          )}

          {selectedTab === "feedback" && (
            <section className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-3 text-[#42383B]">Feedback</h3>
              <Feedback />
            </section>
          )}

          {selectedTab === "profile" && (
            <section className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-3 text-[#42383B]">Your Profile</h3>
              <MenteeProfile />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenteeDashboard;
