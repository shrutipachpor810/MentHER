import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <nav style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>

      </nav>

      <Routes>
        <Route path="/" element={<h1>Women in Tech Mentorship</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
