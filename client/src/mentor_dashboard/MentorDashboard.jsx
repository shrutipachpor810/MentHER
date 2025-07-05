import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaStar, FaStickyNote, FaUserCircle } from "react-icons/fa";
import MentorProfile from "../components/MentorProfile";
import AvailabilitySlots from "../components/AvailabilitySlots";
import UpcomingBookings from "../components/UpcomingBookings";
import PastSessions from "../components/PastSessions";
import FeedbackRatings from "../components/FeedbackRatings";
import MentorNotes from "../components/MentorNotes";
import ProfileCorner from "../components/ProfileCorner"; 
import getGreeting from "../utils/getGreeting";

const greeting = getGreeting();
const name = localStorage.getItem("name") || "Mentor";


const MentorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState("profile"); // <-- default page

  return (
    <div className="flex h-screen bg-pink-50 text-[#42383B] font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-[#FFE5D9] p-4 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-52" : "w-16"
        }`}
      >
        {sidebarOpen && (
          <h2 className="text-xl font-bold mb-6 transition-opacity duration-300">
            MentHer
          </h2>
        )}
        <nav className="space-y-4 text-sm">
          <button
            onClick={() => setSelectedPage("profile")}
            className="flex items-center gap-2 hover:underline"
          >
            <FaUserCircle /> {sidebarOpen && "Profile"}
          </button>
          <button
            onClick={() => setSelectedPage("availability")}
            className="flex items-center gap-2 hover:underline"
          >
            <FaClock /> {sidebarOpen && "Availability"}
          </button>
          <button
            onClick={() => setSelectedPage("upcoming")}
            className="flex items-center gap-2 hover:underline"
          >
            <FaCalendarAlt /> {sidebarOpen && "Upcoming Bookings"}
          </button>
          <button
            onClick={() => setSelectedPage("past")}
            className="flex items-center gap-2 hover:underline"
          >
            <FaCalendarAlt /> {sidebarOpen && "Past Sessions"}
          </button>
          <button
            onClick={() => setSelectedPage("feedback")}
            className="flex items-center gap-2 hover:underline"
          >
            <FaStar /> {sidebarOpen && "Feedback"}
          </button>
          <button
            onClick={() => setSelectedPage("notes")}
            className="flex items-center gap-2 hover:underline"
          >
            <FaStickyNote /> {sidebarOpen && "Notes"}
          </button>
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
          

        {/* Page Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {selectedPage === "profile" && (
            <section className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Mentor Profile</h3>
              <MentorProfile />
            </section>
          )}

          {selectedPage === "availability" && (
            <section className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Availability Slots</h3>
              <AvailabilitySlots />
            </section>
          )}

          {selectedPage === "upcoming" && (
            <section className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Upcoming Bookings</h3>
              <UpcomingBookings />
            </section>
          )}

          {selectedPage === "past" && (
            <section className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Past Sessions</h3>
              <PastSessions />
            </section>
          )}

          {selectedPage === "feedback" && (
            <section className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Feedback & Ratings</h3>
              <FeedbackRatings />
            </section>
          )}

          {selectedPage === "notes" && (
            <section className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Mentor Notes</h3>
              <MentorNotes />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
