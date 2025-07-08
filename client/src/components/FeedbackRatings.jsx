// src/mentor_dashboard/components/FeedbackRatings.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const FeedbackRatings = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/feedback/mentor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched feedbacks:", res.data.feedbacks); // ✅ debug
        setFeedbacks(res.data.feedbacks);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="bg-[#FDFDFD] p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-[#42383B]">
        Feedback & Ratings
      </h2>

      {loading ? (
        <p className="text-[#9D8189]">Loading feedback...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-[#9D8189]">No feedback received yet.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((fb) => (
            <li
              key={fb._id}
              className="bg-[#FFE5D9] p-4 rounded shadow-sm hover:shadow-md transition"
            >
              <p className="text-[#42383B] mb-2">"{fb.feedback}"</p>
              {fb.bookingId && (
                <p className="text-sm text-[#9D8189]">
                  Session:{" "}
                  {new Date(fb.bookingId.slot).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  | Status: {fb.bookingId.status}
                </p>
              )}
              <p className="text-sm text-[#9D8189]">
                From: {fb.menteeId?.name || "Mentee"} (
                {fb.menteeId?.email || "N/A"})
              </p>
              <p className="text-xs text-[#9D8189]">
                Submitted on:{" "}
                {new Date(fb.createdAt).toLocaleDateString()} at{" "}
                {new Date(fb.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackRatings;
