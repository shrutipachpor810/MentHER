import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaStar, FaStickyNote, FaUserCircle } from "react-icons/fa";
import MentorProfile from "../components/MentorProfile";
import AvailabilitySlots from "../components/AvailabilitySlots";
import UpcomingBookings from "../components/UpcomingBookings";
import PastSessions from "../components/PastSessions";
import FeedbackRatings from "../components/FeedbackRatings";
import MentorNotes from "../components/MentorNotes";



const MentorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-pink-50 text-[#42383B] font-sans">

      {/* Sidebar */}
      <aside className={`bg-[#FFE5D9] p-4 transition-all duration-300 ease-in-out ${sidebarOpen ? "w-52" : "w-16"}`}>
        
        {sidebarOpen && (
          <h2 className="text-xl font-bold mb-6 transition-opacity duration-300">MentHer</h2>
        )}
        <nav className="space-y-4 text-sm">
          <a href="#profile" className="flex items-center gap-2 hover:underline">
            <FaUserCircle /> {sidebarOpen && "Profile"}
          </a>
          <a href="#availability" className="flex items-center gap-2 hover:underline">
            <FaClock /> {sidebarOpen && "Availability"}
          </a>
          <a href="#upcoming" className="flex items-center gap-2 hover:underline">
            <FaCalendarAlt /> {sidebarOpen && "Upcoming Bookings"}
          </a>
          <a href="#past" className="flex items-center gap-2 hover:underline">
            <FaCalendarAlt /> {sidebarOpen && "Past Sessions"}
          </a>
          <a href="#feedback" className="flex items-center gap-2 hover:underline">
            <FaStar /> {sidebarOpen && "Feedback"}
          </a>
          <a href="#notes" className="flex items-center gap-2 hover:underline">
            <FaStickyNote /> {sidebarOpen && "Notes"}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Good morning, Priya</h2>
            <p className="text-sm text-gray-500">Thank you for mentoring and empowering women in tech.</p>
          </div>
          <input
            type="text"
            placeholder="Search mentees, sessions..."
            className="border rounded-md px-3 py-1 text-sm w-64"
          />
        </div>

        {/* Dashboard Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">

          <section id="profile" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Mentor Profile</h3>
            <MentorProfile />
          </section>

          <section id="availability" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Availability Slots</h3>
            <AvailabilitySlots />
          </section>

          <section id="upcoming" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Upcoming Bookings</h3>
            <UpcomingBookings />
          </section>

          <section id="past" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Past Sessions</h3>
            <PastSessions />
          </section>

          <section id="feedback" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Feedback & Ratings</h3>
            <FeedbackRatings />
          </section>

          <section id="notes" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Mentor Notes</h3>
            <MentorNotes />
          </section>

        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
