// src/mentee_dashboard/components/AppointmentBooking.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentBooking = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/book-appointment");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#FDFDFD] p-6 shadow-md rounded-lg cursor-pointer hover:bg-[#D8E2DC] transition-colors"
    >
      <h3 className="text-2xl font-semibold mb-2">Book Appointment</h3>
      <p className="text-sm text-gray-500">Click here to schedule a session with your mentor.</p>
    </div>
  );
};

export default AppointmentBooking;
