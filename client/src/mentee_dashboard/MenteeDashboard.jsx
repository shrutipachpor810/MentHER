import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSearch, FiCalendar, FiClock, FiLogOut } from "react-icons/fi";
import { FaRobot, FaCommentDots } from "react-icons/fa";
import AppointmentBooking from "../components/AppointmentBooking";
import UpcomingAppointments from "../components/UpcomingAppointments";
import TimeSlots from "../components/TimeSlots";
import getGreeting from "../utils/getGreeting";
import ProfileCorner from "../components/ProfileCorner";

const MenteeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");
  const [selectedMentor, setSelectedMentor] = useState(null); // NEW ✅
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-mentherPeach via-mentherSage to-mentherWhite text-mentherSlate font-sans relative overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white/90 backdrop-blur-sm shadow-lg z-20 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-16"
        } flex flex-col`}
      >
        <div className="p-4 border-b border-mentherPink/30 flex justify-between items-center">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-mentherPink flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <h1 className="text-xl font-bold text-mentherSlate">MentHER</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-mentherPeach text-mentherSlate"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/mentee-dashboard"
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeTab === "appointments"
                ? "bg-mentherPink/20 text-mentherSlate"
                : "hover:bg-mentherPeach"
            }`}
          >
            <FiCalendar size={20} className="text-mentherPink" />
            {sidebarOpen && <span>Appointments</span>}
          </Link>

          <Link
            to="/mentee-dashboard"
            onClick={() => setActiveTab("timeslots")}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeTab === "timeslots"
                ? "bg-mentherPink/20 text-mentherSlate"
                : "hover:bg-mentherPeach"
            }`}
          >
            <FiClock size={20} className="text-mentherPink" />
            {sidebarOpen && <span>Time Slots</span>}
          </Link>

          <Link
            to="/chatbot"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-mentherPeach transition-colors"
          >
            <FaRobot size={20} className="text-mentherPink" />
            {sidebarOpen && <span>ChatBot</span>}
          </Link>

          <Link
            to="/feedback"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-mentherPeach transition-colors"
          >
            <FaCommentDots size={20} className="text-mentherPink" />
            {sidebarOpen && <span>Feedback</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-mentherPink/30">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-mentherPeach transition-colors w-full"
          >
            <FiLogOut size={20} className="text-mentherPink" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm z-10">
          <div className="flex justify-between items-center p-4">
            <div>
              <h1 className="text-2xl font-bold text-mentherSlate">
                {greeting}, {name}!
              </h1>
              <p className="text-mentherMauve">
                Empowering women in tech, one connection at a time.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center border border-mentherPink/50 rounded-full overflow-hidden shadow-sm">
                  <div className="pl-4 text-mentherMauve">
                    <FiSearch size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search mentors..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 outline-none text-mentherSlate placeholder:text-mentherMauve w-48 md:w-64"
                  />
                  <button
                    type="submit"
                    className="bg-mentherPink hover:bg-mentherLightPink text-white px-4 py-2 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              <ProfileCorner />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-mentherSlate mb-4">
                Mentors Found:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-mentherPink/20 hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-mentherPink/20 flex items-center justify-center text-mentherSlate font-bold mr-3">
                          {mentor.name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-bold text-mentherSlate">
                          {mentor.name}
                        </h3>
                      </div>
                      <p className="text-mentherMauve mb-3">{mentor.bio}</p>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-mentherSlate">
                          Skills:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {mentor.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="text-xs bg-mentherPink/20 text-mentherSlate px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMentor(mentor._id)} // ✅ Select mentor
                        className="w-full bg-mentherPink hover:bg-mentherLightPink text-white font-medium py-2 rounded-lg transition-colors"
                      >
                        View Time Slots
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Appointments Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-mentherSlate">
                    Appointments
                  </h2>
                  <button className="text-sm bg-mentherPink hover:bg-mentherLightPink text-white px-4 py-2 rounded-lg transition-colors">
                    New Appointment
                  </button>
                </div>
                <div className="space-y-6">
                  <AppointmentBooking />
                  <UpcomingAppointments />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Time Slots */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
                <h2 className="text-xl font-bold text-mentherSlate mb-4">
                  Available Time Slots
                </h2>
                {selectedMentor ? (
                  <TimeSlots mentorId={selectedMentor} /> // ✅ Dynamic mentorId
                ) : (
                  <p className="text-mentherMauve">Select a mentor to see time slots.</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
                <h2 className="text-xl font-bold text-mentherSlate mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link
                    to="/chatbot"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-mentherPeach transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-mentherPink/20 flex items-center justify-center text-mentherSlate">
                      <FaRobot size={18} />
                    </div>
                    <span>Chat with Assistant</span>
                  </Link>

                  <Link
                    to="/feedback"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-mentherPeach transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-mentherPink/20 flex items-center justify-center text-mentherSlate">
                      <FaCommentDots size={18} />
                    </div>
                    <span>Give Feedback</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenteeDashboard;
