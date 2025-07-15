import React, { useEffect, useState } from "react";
import API from "../api";
import { Star } from "lucide-react";

const MentorFeedbackAndRatings = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        // Fetch feedbacks
        const fbRes = await API.get("/feedback/mentor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Feedbacks:", fbRes.data);
        setFeedbacks(fbRes.data);

        // Fetch ratings
        const rtRes = await API.get("/ratings/mentor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Ratings:", rtRes.data);
        setRatings(rtRes.data);
      } catch (err) {
        console.error("❌ Error:", err);
        setError("Could not load feedbacks or ratings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-peonypink">
      <h1 className="text-3xl font-extrabold text-deepcocoa mb-4">
        Your Feedback & Ratings
      </h1>

      {loading ? (
        <p className="text-mutedmauve">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-peonypink">Feedbacks</h2>
            {feedbacks.length === 0 ? (
              <p className="text-mutedmauve">No feedbacks yet.</p>
            ) : (
              feedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className="p-4 border border-peonypink rounded-xl bg-blushcream mb-3"
                >
                  <p className="font-semibold text-deepcocoa">
                    From: {fb.menteeId?.name} ({fb.menteeId?.email})
                  </p>
                  <p className="text-mutedmauve">{fb.feedback}</p>
                </div>
              ))
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2 text-peonypink">Ratings</h2>
            {ratings.length === 0 ? (
              <p className="text-mutedmauve">No ratings yet.</p>
            ) : (
              ratings.map((rt) => (
                <div
                  key={rt._id}
                  className="p-4 border border-peonypink rounded-xl bg-blushcream mb-3"
                >
                  <div className="flex items-center mb-1">
                    {[...Array(rt.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className="font-semibold text-deepcocoa">
                    From: {rt.menteeId?.name} ({rt.menteeId?.email})
                  </p>
                  <p className="text-mutedmauve">{rt.comment || "No comment"}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorFeedbackAndRatings;
