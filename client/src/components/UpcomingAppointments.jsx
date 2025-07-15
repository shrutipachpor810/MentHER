// src/mentee_dashboard/components/UpcomingAppointments.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const UpcomingAppointments = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackModal, setFeedbackModal] = useState({ open: false, bookingId: "", mentorName: "" });
  const [feedbackText, setFeedbackText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          axios.get("http://localhost:5000/api/bookings/upcoming", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/bookings/past", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUpcoming(upcomingRes.data.upcoming);
        setPast(pastRes.data.past);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleOpenFeedback = (bookingId, mentorName) => {
    setFeedbackModal({ open: true, bookingId, mentorName });
    setFeedbackText("");
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) {
      alert("Please enter feedback before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/feedback/${feedbackModal.bookingId}`,
        { feedback: feedbackText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Feedback submitted successfully!");
      setFeedbackModal({ open: false, bookingId: "", mentorName: "" });
    } catch (error) {
      console.error("Feedback submit error:", error);
      alert("Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderProfile = (mentor, size) => {
    if (mentor?.profilePic && mentor.profilePic !== "") {
      return (
        <img
          src={mentor.profilePic}
          alt={mentor.name}
          className={`w-${size} h-${size} rounded-full object-cover border`}
        />
      );
    } else {
      return (
        <div
          className={`w-${size} h-${size} rounded-full bg-[#FFABBA] flex items-center justify-center text-white font-semibold ${
            size === 14 ? "text-lg" : "text-base"
          } border`}
        >
          {mentor?.name ? mentor.name.charAt(0).toUpperCase() : "M"}
        </div>
      );
    }
  };

  return (
    <div className="bg-[#FCE1D8] p-6 shadow-md rounded-lg mt-4">
      <h3 className="text-2xl font-semibold mb-4 text-[#42383B]">
        Upcoming & Past Appointments
      </h3>

      {loading ? (
        <p className="text-[#9D8189]">Loading appointments...</p>
      ) : (
        <>
          {/* ✅ Upcoming: Horizontal Scroll Cards */}
          <h4 className="text-xl font-semibold mb-2 text-[#42383B]">
            Upcoming Appointments
          </h4>
          {upcoming.length === 0 ? (
            <p className="text-[#9D8189] mb-4">No upcoming appointments.</p>
          ) : (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {upcoming.map((appointment) => (
                <div
                  key={appointment._id}
                  className="min-w-[250px] bg-[#FFE5D9] p-4 rounded-lg shadow hover:scale-[1.02] hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-2 space-x-3">
                    {renderProfile(appointment.mentor, 14)}
                    <div>
                      <p className="font-semibold">
                        {appointment.mentor?.name || "Mentor"}
                      </p>
                      <p className="text-xs text-[#9D8189]">
                        {appointment.mentor?.email || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#42383B]">
                    <FaCalendarAlt />{" "}
                    {new Date(appointment.slot).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#42383B]">
                    <FaClock />{" "}
                    {new Date(appointment.slot).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <p className="text-xs mt-2 text-[#9D8189]">
                    Status: {appointment.status}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ✅ Past: Vertical List with Feedback */}
          <h4 className="text-xl font-semibold mt-6 mb-2 text-[#42383B]">
            Past Appointments
          </h4>
          {past.length === 0 ? (
            <p className="text-[#9D8189]">No past appointments.</p>
          ) : (
            <ul className="space-y-3">
              {past.map((appointment) => (
                <li
                  key={appointment._id}
                  className="bg-[#D8E2DC] p-3 rounded-md shadow-sm flex justify-between items-center hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-4">
                    {renderProfile(appointment.mentor, 12)}
                    <div>
                      <p className="font-semibold">
                        {appointment.mentor?.name || "Mentor"}
                      </p>
                      <p className="text-xs text-[#9D8189]">
                        {appointment.mentor?.email || ""}
                      </p>
                      <p className="text-xs text-[#42383B]">
                        {new Date(appointment.slot).toLocaleString()}
                      </p>
                      <p className="text-xs text-[#9D8189]">
                        Status: {appointment.status}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenFeedback(appointment._id, appointment.mentor?.name || "Mentor")}
                    className="bg-[#F4ACB7] text-white px-3 py-1 rounded hover:bg-[#e29ca7] text-sm"
                  >
                    Give Feedback
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Feedback Modal */}
      {feedbackModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">
              Give Feedback for {feedbackModal.mentorName}
            </h3>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback here..."
              rows={4}
              className="w-full border rounded p-2 mb-4"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setFeedbackModal({ open: false, bookingId: "", mentorName: "" })}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 rounded bg-[#F4ACB7] text-white hover:bg-[#e29ca7]"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
