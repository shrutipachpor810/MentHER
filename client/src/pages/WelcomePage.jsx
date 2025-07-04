// src/pages/WelcomePage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role"); // no fallback here, handle undefined

  // Get screen size for confetti
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (role === "mentor") {
        navigate("/mentor-dashboard");
      } else if (role === "mentee") {
        navigate("/mentee-dashboard");
      } else {
        navigate("/login");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, role]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #ffe4e1, #ffdada)",
        animation: "fadeIn 2s ease-in-out",
      }}
    >
      {/* 🎉 Confetti */}
      <Confetti width={windowSize.width} height={windowSize.height} />

      <div className="text-center p-10 bg-white/70 backdrop-blur-md rounded-xl shadow-xl z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-4 animate-bounce">
          Welcome {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}, {name}!
        </h1>
        <p className="text-lg text-[#6B3E49]">Redirecting to your dashboard...</p>
      </div>

      {/* Inline fade animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
