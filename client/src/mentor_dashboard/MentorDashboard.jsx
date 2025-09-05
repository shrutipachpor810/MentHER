import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaStar, FaStickyNote, FaUserCircle, FaChartLine, FaUsers } from "react-icons/fa";
import { FiMenu, FiX, FiSearch, FiLogOut } from "react-icons/fi";
import MentorProfile from "../components/MentorProfile";
import AvailabilitySlots from "../components/AvailabilitySlots";
import MentorUpcomingBookings from "../components/MentorUpcomingBookings";
import MentorPastBookings from "../components/MentorPastBookings";
import MentorFeedbackAndRatings from "../components/MentorFeedbackAndRatings";
import MentorNotes from "../components/MentorNotes";
import ProfileCorner from "../components/ProfileCorner"; 
import getGreeting from "../utils/getGreeting";
import { useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const navigate = useNavigate();
  const greeting = getGreeting();
  const name = localStorage.getItem("name") || "Mentor";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stats = [
    { title: "Upcoming Sessions", value: "5", icon: <FaCalendarAlt className="text-mentherPink" /> },
    { title: "Mentees", value: "12", icon: <FaUsers className="text-mentherPink" /> },
    { title: "Average Rating", value: "4.8", icon: <FaStar className="text-mentherPink" /> },
    { title: "Hours Mentored", value: "42", icon: <FaClock className="text-mentherPink" /> },
  ];

  const sessions = [
    { id: 1, mentee: "Sarah Johnson", time: "Today, 3:00 PM", topic: "Career Guidance" },
    { id: 2, mentee: "Maya Patel", time: "Tomorrow, 10:00 AM", topic: "Technical Skills" },
  ];

  const feedback = [
    { id: 1, mentee: "Alex Chen", rating: 5, comment: "Excellent mentorship!", date: "2 days ago" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-mentherPeach via-mentherSage to-mentherWhite text-mentherSlate font-sans relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(mentherPink 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-mentherPink/10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-mentherMauve/10 blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Sidebar */}
      <aside className={`bg-white/90 backdrop-blur-sm shadow-lg z-20 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} flex flex-col`}>
        <div className="p-4 border-b border-mentherPink/30">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-mentherPink flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <h1 className="text-xl font-bold text-mentherSlate">MentHER</h1>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-mentherPeach text-mentherSlate">
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard", icon: <FaChartLine size={20} />, label: "Dashboard" },
            { id: "profile", icon: <FaUserCircle size={20} />, label: "Profile" },
            { id: "availability", icon: <FaClock size={20} />, label: "Availability" },
            { id: "upcoming", icon: <FaCalendarAlt size={20} />, label: "Upcoming" },
            { id: "past", icon: <FaCalendarAlt size={20} />, label: "Past Sessions" },
            { id: "feedback", icon: <FaStar size={20} />, label: "Feedback" },
            { id: "notes", icon: <FaStickyNote size={20} />, label: "Notes" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedPage(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left ${
                selectedPage === item.id ? "bg-mentherPink/20 text-mentherSlate" : "hover:bg-mentherPeach"
              }`}
            >
              <span className="text-mentherPink">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-mentherPink/30">
          <button onClick={handleLogout} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-mentherPeach transition-colors w-full">
            <FiLogOut size={20} className="text-mentherPink" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm z-10">
          <div className="flex justify-between items-center p-4">
            <div>
              <h1 className="text-2xl font-bold text-mentherSlate">{greeting}, {name}!</h1>
              <p className="text-mentherMauve">Empowering women in tech, one connection at a time.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-mentherPink/50 rounded-full overflow-hidden shadow-sm">
                <div className="pl-4 text-mentherMauve"><FiSearch size={18} /></div>
                <input type="text" placeholder="Search..." className="flex-1 px-4 py-2 outline-none text-mentherSlate placeholder:text-mentherMauve w-48 md:w-64" />
              </div>
              <ProfileCorner />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedPage === "dashboard" ? (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-mentherMauve">{stat.title}</p>
                        <p className="text-2xl font-bold text-mentherSlate mt-1">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-mentherPink/10 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sessions & Feedback */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-mentherSlate">Upcoming Sessions</h3>
                    <button onClick={() => setSelectedPage("upcoming")} className="text-sm bg-mentherPink hover:bg-mentherLightPink text-white px-4 py-2 rounded-lg transition-colors">View All</button>
                  </div>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 hover:bg-mentherPeach/50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-mentherPink/20 flex items-center justify-center text-mentherSlate font-bold">
                            {session.mentee.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium text-mentherSlate">{session.mentee}</h4>
                            <p className="text-sm text-mentherMauve">{session.topic}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-mentherSlate">{session.time}</p>
                          <button className="text-xs text-mentherPink hover:underline">Join</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-mentherSlate">Recent Feedback</h3>
                    <button onClick={() => setSelectedPage("feedback")} className="text-sm bg-mentherPink hover:bg-mentherLightPink text-white px-4 py-2 rounded-lg transition-colors">View All</button>
                  </div>
                  <div className="space-y-4">
                    {feedback.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-mentherPeach/50 rounded-lg transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-mentherSlate">{item.mentee}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={`text-sm ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-mentherMauve mb-2">{item.comment}</p>
                        <p className="text-xs text-mentherMauve">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
                <h3 className="text-xl font-bold text-mentherSlate mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "availability", icon: <FaClock size={20} />, label: "Update Availability" },
                    { id: "notes", icon: <FaStickyNote size={20} />, label: "Add Notes" },
                    { id: "profile", icon: <FaUserCircle size={20} />, label: "Edit Profile" }
                  ].map((action) => (
                    <button
                      key={action.id}
                      onClick={() => setSelectedPage(action.id)}
                      className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-mentherPeach transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-mentherPink/20 flex items-center justify-center text-mentherSlate mb-2">
                        {action.icon}
                      </div>
                      <span className="font-medium text-mentherSlate">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-mentherPink/20">
              <h3 className="text-xl font-bold text-mentherSlate mb-4">
                {selectedPage === "profile" && "Mentor Profile"}
                {selectedPage === "availability" && "Availability Slots"}
                {selectedPage === "upcoming" && "Upcoming Bookings"}
                {selectedPage === "past" && "Past Sessions"}
                {selectedPage === "feedback" && "Feedback & Ratings"}
                {selectedPage === "notes" && "Mentor Notes"}
              </h3>
              {selectedPage === "profile" && <MentorProfile />}
              {selectedPage === "availability" && <AvailabilitySlots />}
              {selectedPage === "upcoming" && <MentorUpcomingBookings />}
              {selectedPage === "past" && <MentorPastBookings />}
              {selectedPage === "feedback" && <MentorFeedbackAndRatings />}
              {selectedPage === "notes" && <MentorNotes />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;