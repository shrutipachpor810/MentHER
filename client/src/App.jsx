import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
=======
import BookAppointmentPage from "./components/BookAppointmentPage";



>>>>>>> 2f4cb43647bf04d6b7578efcf38f35595458946c
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import WelcomePage from './pages/WelcomePage';
import MenteeDashboard from './mentee_dashboard/MenteeDashboard';  // ✅ Corrected import
import MentorDashboard from './mentor_dashboard/MentorDashboard';
import ChatBot from "./components/ChatBot"; // New page for ChatBot!
import Feedback from "./components/Feedback";
import TimeSlots from './components/TimeSlots';
import AppointmentPage from './components/AppointmentPage';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/mentee-dashboard" element={<MenteeDashboard />} /> {/* ✅ Add this route */}
        <Route path="/chatbot" element={<ChatBot/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/timeslots" element={<TimeSlots/>} />
        <Route path="/appointment/:mentorId" element={<AppointmentPage/>} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
<<<<<<< HEAD

=======
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
>>>>>>> 2f4cb43647bf04d6b7578efcf38f35595458946c
      </Routes>
    </Router>
  );
}

export default App;
