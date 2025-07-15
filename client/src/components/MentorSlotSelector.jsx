// src/mentee_dashboard/components/MentorSlotSelector.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const MentorSlotSelector = ({ mentorId }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/timeslots/mentor/${mentorId}`);
        setSlots(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (mentorId) fetchSlots();
  }, [mentorId]);

  const handleBook = async (slotId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/timeslots/book",
        { slotId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Slot booked successfully!");
      setSlots(slots.map(slot => slot._id === slotId ? { ...slot, isBooked: true } : slot));
    } catch (err) {
      console.error(err);
      alert("Error booking slot.");
    }
  };

  if (!mentorId) return <p>Select a mentor to view slots.</p>;
  if (loading) return <p>Loading slots...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {slots.map(slot => (
        <div
          key={slot._id}
          className={`p-3 rounded shadow cursor-pointer transition transform hover:scale-[1.02]
            ${slot.isBooked ? "bg-red-300 cursor-not-allowed" : "bg-green-300"}`}
          onClick={() => !slot.isBooked && handleBook(slot._id)}
        >
          <p className="font-semibold">{new Date(slot.date).toLocaleDateString()}</p>
          <p className="text-sm">{slot.startTime} - {slot.endTime}</p>
          <p className="text-xs">{slot.isBooked ? "Booked" : "Available"}</p>
        </div>
      ))}
    </div>
  );
};

export default MentorSlotSelector;
