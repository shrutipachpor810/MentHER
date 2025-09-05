import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import WelcomePage from "./pages/WelcomePage";
import MenteeDashboard from "./mentee_dashboard/MenteeDashboard";
import MentorDashboard from "./mentor_dashboard/MentorDashboard";

// Components
import ChatBot from "./components/ChatBot";
import Feedback from "./components/Feedback";
import TimeSlots from "./components/TimeSlots";
import AppointmentPage from "./components/AppointmentPage";
import BookAppointmentPage from "./components/BookAppointmentPage";

// Fallback
const NotFound = () => (
  <h2 style={{ textAlign: "center", marginTop: "2rem" }}>404 - Page Not Found</h2>
);

function App() {
  return (
    <Router>
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentee-dashboard" element={<MenteeDashboard />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />

        {/* Features */}
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/timeslots" element={<TimeSlots />} />

        {/* Appointment Booking */}
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/book-appointment/:mentorId" element={<BookAppointmentPage />} />

        {/* If you want mentee to confirm/book after slot selection */}
        <Route path="/appointment/:mentorId" element={<AppointmentPage />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
