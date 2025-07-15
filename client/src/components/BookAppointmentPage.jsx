// src/mentee_dashboard/pages/BookAppointmentPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookAppointmentPage = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const navigate = useNavigate();

  // Fetch mentors on mount
  useEffect(() => {
    const fetchMentors = async () => {
      setLoadingMentors(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/mentors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched mentors:", res.data);
        setMentors(res.data.mentors || []);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setMessage("Failed to load mentors.");
      } finally {
        setLoadingMentors(false);
      }
    };
    fetchMentors();
  }, []);

  // Fetch slots when a mentor is selected
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedMentor) {
        setSlots([]);
        return;
      }
      setLoadingSlots(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/timeslots/mentor/${selectedMentor}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Fetched slots:", res.data);
        setSlots(res.data || []); // ✅ Corrected: your backend returns an array
      } catch (err) {
        console.error("Error fetching slots:", err);
        setMessage("Failed to load slots.");
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [selectedMentor]);

  // Handle booking
  const handleBooking = async (slotId) => {
    if (!slotId) return;
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/timeslots/book",
        { slotId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Appointment booked successfully!");
      setTimeout(() => navigate("/mentee-dashboard"), 1500);
    } catch (err) {
      console.error("Booking error:", err);
      setMessage(err.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#42383B]">Book an Appointment</h2>

      {loadingMentors ? (
        <p className="text-center text-[#9D8189]">Loading mentors...</p>
      ) : mentors.length > 0 ? (
        <>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="w-full border border-[#F4ACB7] rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#F4ACB7] bg-white"
          >
            <option value="">Select a Mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name} ({mentor.email})
              </option>
            ))}
          </select>

          {loadingSlots ? (
            <p className="text-center text-[#9D8189]">Loading slots...</p>
          ) : slots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot._id}
                  disabled={slot.isBooked || loading}
                  onClick={() => handleBooking(slot._id)}
                  className={`p-3 rounded-md text-sm text-[#42383B] border ${
                    slot.isBooked
                      ? "bg-red-200 border-red-300 cursor-not-allowed"
                      : "bg-green-200 border-green-300 hover:bg-green-300"
                  } transition`}
                >
                  {new Date(slot.date).toLocaleDateString()}{" "}
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          ) : selectedMentor ? (
            <p className="text-center text-[#9D8189]">No available slots for this mentor.</p>
          ) : (
            <p className="text-center text-[#9D8189]">Select a mentor to view available slots.</p>
          )}
        </>
      ) : (
        <p className="text-center text-[#9D8189]">No mentors found. Please try again later.</p>
      )}

      {message && (
        <p className="mt-4 text-center text-[#9D8189] font-medium">{message}</p>
      )}
    </div>
  );
};

export default BookAppointmentPage;
