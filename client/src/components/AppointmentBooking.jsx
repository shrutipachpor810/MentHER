// src/mentee_dashboard/components/AppointmentBooking.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/mentors", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Mentors API Response:", res.data); // debug
        setMentors(res.data.mentors || []);
      } catch (err) {
        console.error("Error fetching mentors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleClick = (mentorId) => {
    navigate(`/book-appointment/${mentorId}`);
  };

  return (
    <div className="bg-[#FDFDFD] p-6 shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">Book Appointment</h3>
      <p className="text-sm text-gray-500 mb-4">
        Select a mentor to view their available slots.
      </p>

      {loading ? (
        <p>Loading mentors...</p>
      ) : mentors.length > 0 ? (
        <ul className="space-y-3">
          {mentors.map((mentor) => (
            <li
              key={mentor._id}
              className="p-4 border rounded-lg hover:bg-[#D8E2DC] transition-colors"
            >
              <div
                onClick={() => handleClick(mentor._id)}
                className="cursor-pointer"
              >
                <h4 className="font-semibold">{mentor.name}</h4>
                <p className="text-xs text-gray-500">
                  {mentor.skills?.join(", ") || "No skills listed"}
                </p>
              </div>

              {/* ✅ Display slots properly */}
              {mentor.slots && mentor.slots.length > 0 ? (
                <ul className="mt-2 text-sm text-gray-700">
                  {mentor.slots.map((slot, i) => (
                    <li key={i} className="ml-4 list-disc">
                      📅 {new Date(slot.date).toLocaleDateString()} ⏰{" "}
                      {slot.startTime} - {slot.endTime}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-red-500">No slots available</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No mentors available.</p>
      )}
    </div>
  );
};

export default AppointmentBooking;
