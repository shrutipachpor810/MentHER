// src/pages/WelcomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role");

  // Get screen size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
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

  // Animate progress bar
  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);
    return () => clearTimeout(progressTimer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FFE5D9] to-white">
      {/* Confetti */}
      {windowSize.width > 0 && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={false} 
          numberOfPieces={200}
          gravity={0.1}
        />
      )}
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#F4ACB7]/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[#85586F]/20 blur-3xl"></div>
      </div>
      
      {/* Welcome Content */}
      <div className="relative z-10 text-center px-6 py-12 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-[#F4ACB7]/30">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#F4ACB7] flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#4B2E38] mb-4">
            Welcome, {name}!
          </h1>
          
          <div className="inline-block bg-[#F4ACB7]/20 text-[#4B2E38] px-4 py-2 rounded-full font-medium mb-6">
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
          </div>
          
          <p className="text-lg text-[#85586F] mb-8">
            You're successfully logged in. Redirecting to your dashboard...
          </p>
          
          {/* Progress indicator */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="bg-[#F4ACB7] h-2.5 rounded-full transition-all duration-3000 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#F4ACB7] animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-[#F4ACB7] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-[#F4ACB7] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;