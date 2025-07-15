import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCalendarAlt, FaClock, FaRobot, FaCommentDots } from "react-icons/fa";
import AppointmentPage from "../components/AppointmentPage";
import AppointmentBooking from "../components/AppointmentBooking";
import UpcomingAppointments from "../components/UpcomingAppointments";
import TimeSlots from "../components/TimeSlots";
import ChatBot from "../components/ChatBot";
import Feedback from "../components/Feedback";
import getGreeting from "../utils/getGreeting";
import ProfileCorner from "../components/ProfileCorner";

const MenteeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const greeting = getGreeting();
  const name = localStorage.getItem("name") || "User";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/mentors?search=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-pink-50 text-[#42383B] font-sans">
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
          <h2 className="text-xl font-bold mb-6 transition-opacity duration-300">
            MentHer
          </h2>
        )}

        <nav className="space-y-4 text-sm">
          <a
            href="#appointments"
            className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors"
          >
            <FaCalendarAlt /> {sidebarOpen && "Appointments"}
          </a>
          <a
            href="#timeslots"
            className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors"
          >
            <FaClock /> {sidebarOpen && "Time Slots"}
          </a>
          <Link
            to="/chatbot"
            className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors"
          >
            <FaRobot /> {sidebarOpen && "ChatBot"}
          </Link>
          <Link
            to="/feedback"
            className="flex items-center gap-2 hover:bg-pink-100 p-2 rounded-md transition-colors"
          >
            <FaCommentDots /> {sidebarOpen && "Feedback"}
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar with search & profile */}
        <div className="flex justify-between items-center p-4 border-b bg-white shadow sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-semibold">
              {greeting}, {name}!
            </h2>
            <p className="text-sm text-gray-500">
              Empowering women in tech, one connection at a time.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-peonypink rounded-full overflow-hidden shadow"
            >
              <input
                type="text"
                placeholder="Search mentors by name or skill..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2 outline-none text-deepcocoa placeholder:text-mutedmauve w-48 md:w-64"
              />
              <button
                type="submit"
                className="bg-peonypink hover:bg-blossompink text-softwhite px-4 py-2 transition-colors"
              >
                Search
              </button>
            </form>
            <ProfileCorner />
          </div>
        </div>

        {/* Search results */}
        {searchResults.length > 0 && (
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Mentors Found:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((mentor) => (
                <div
                  key={mentor._id}
                  className="bg-white p-4 rounded shadow flex flex-col gap-2"
                >
                  <h4 className="text-md font-bold">{mentor.name}</h4>
                  <p className="text-sm text-gray-600">{mentor.bio}</p>
                  <p className="text-xs text-gray-500">
                    Skills: {mentor.skills.join(", ")}
                  </p>
                  <button
                    onClick={() => navigate(`/appointment/${mentor._id}`)}
                    className="bg-peonypink text-white px-4 py-2 rounded mt-2 hover:bg-blossompink"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <section
            id="appointments"
            className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-2">Appointments</h3>
            <AppointmentBooking />
            <UpcomingAppointments />
          </section>

          <section className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">
              Available Time Slots
            </h3>
            <TimeSlots />
          </section>

          <section className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">ChatBot</h3>
            <ChatBot />
          </section>

          <section className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Feedback</h3>
            <Feedback />
          </section>
        </div>
      </main>
    </div>
  );
};

export default MenteeDashboard;
