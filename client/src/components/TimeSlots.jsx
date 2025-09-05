import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeSlots = ({ mentorId }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlots = async () => {
      if (!mentorId) return;

      setLoading(true);
      setError("");
      setSlots([]);

      try {
        const token = localStorage.getItem("token"); // ✅ Auth token
        const res = await axios.get(
          `http://localhost:5000/api/mentors/${mentorId}/slots`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ Handle both array or {slots: []}
        const data = Array.isArray(res.data) ? res.data : res.data.slots || [];
        setSlots(data);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setError("Could not fetch slots");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [mentorId]);

  if (!mentorId) {
    return <p className="text-gray-500">Select a mentor to view available slots</p>;
  }

  if (loading) return <p className="text-gray-500">Loading slots...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-[#E2ECE9] p-6 shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">Available Time Slots</h3>
      {slots.length === 0 ? (
        <p className="text-gray-500">No slots available</p>
      ) : (
        <ul className="space-y-2">
          {slots.map((s, idx) => (
            <li
              key={idx}
              className="bg-white px-4 py-2 rounded-md shadow-sm hover:bg-mentherPeach cursor-pointer transition-colors"
            >
              {new Date(s).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSlots;
