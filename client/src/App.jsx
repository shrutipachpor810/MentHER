import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import WelcomePage from './pages/WelcomePage';
import MenteeDashboard from './mentee_dashboard/pages/MenteeDashboard';  // ✅ Corrected import
import MentorDashboard from './mentee_dashboard/pages/MentorDashboard';

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
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
