// src/mentor_dashboard/components/UpcomingBookings.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/mentor/upcoming", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data.upcoming);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="bg-[#FCE1D8] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-[#42383B] mb-4">Upcoming Bookings</h3>
      {loading ? (
        <p className="text-[#9D8189]">Loading upcoming bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-[#9D8189]">You have no upcoming bookings.</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F4ACB7] scrollbar-track-[#FFE5D9] pr-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-[#F4ACB7] p-4 rounded-md shadow-sm hover:shadow transition"
            >
              <h4 className="font-semibold text-[#42383B]">
                With: {booking.mentee?.name || "Mentee"}
              </h4>
              <p className="text-sm text-[#6D6A75]">
                Date: {new Date(booking.slot).toLocaleDateString()} &nbsp; | &nbsp;
                Time: {new Date(booking.slot).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-xs text-[#9D8189]">Status: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingBookings;
