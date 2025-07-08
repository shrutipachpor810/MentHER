// src/mentor_dashboard/components/AvailabilitySlots.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const AvailabilitySlots = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]); // ✅ Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchSlots = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/timeslots/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlots(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch slots.");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/timeslots/add",
        { date, startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Slot added successfully!");
      setDate("");
      setStartTime("");
      setEndTime("");
      fetchSlots();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add slot.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm("Delete this slot?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/timeslots/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Slot deleted successfully!");
      fetchSlots();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete slot.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-[#42383B]">Manage Availability Slots</h2>

      <form onSubmit={handleAddSlot} className="space-y-3 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#89B0AE] text-white px-4 py-2 rounded hover:bg-[#6FA1A0] transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Slot"}
        </button>
      </form>

      {message && <p className="text-center text-[#9D8189]">{message}</p>}

      <h3 className="text-lg font-semibold mb-2">Your Slots</h3>
      {slots.length === 0 ? (
        <p className="text-gray-500">No slots added yet.</p>
      ) : (
        <ul className="space-y-2">
          {slots.map((slot) => (
            <li
              key={slot._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <span>
                {new Date(slot.date).toLocaleDateString()} | {slot.startTime} - {slot.endTime}{" "}
                {slot.isBooked ? (
                  <span className="text-red-500">(Booked)</span>
                ) : (
                  <span className="text-green-500">(Available)</span>
                )}
              </span>
              <button
                onClick={() => handleDeleteSlot(slot._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailabilitySlots;
