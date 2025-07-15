import React, { useEffect, useState } from "react";
import API from "../api";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

const MentorPastBookings = () => {
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPast = async () => {
      const token = localStorage.getItem("token");
      console.log("🔑 [Past] Token:", token);

      if (!token) {
        alert("No token found. Please log in as mentor.");
        return;
      }

      try {
        const res = await API.get("/bookings/mentor/past", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ [Past] Response:", res.data);
        setPast(res.data.past || []);
      } catch (err) {
        console.error("❌ Error fetching mentor past bookings:", err);
        setError("Could not load past bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPast();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-peonypink">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-peonypink rounded-full flex items-center justify-center mr-4">
          <CalendarIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-deepcocoa">
          Your Past Sessions
        </h1>
      </div>

      <p className="text-mutedmauve mb-8">
        Review your completed mentorship bookings.
      </p>

      {loading ? (
        <p className="text-mutedmauve">Loading past bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : past.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-mutedmauve mb-2">
            You have no past bookings yet.
          </p>
          <p className="text-mutedmauve">
            Completed sessions will appear here after they finish.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {past.map((booking) => (
            <div
              key={booking._id}
              className="group flex justify-between items-center p-6 rounded-2xl border border-peonypink bg-blushcream hover:bg-peonypink hover:text-softwhite transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-peonypink rounded-full flex items-center justify-center mr-5">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-deepcocoa group-hover:text-softwhite">
                    {format(new Date(booking.slot), "MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-mutedmauve flex items-center group-hover:text-softwhite">
                    <Clock className="w-4 h-4 mr-1" />
                    {format(new Date(booking.slot), "h:mm aa")}
                  </p>
                  <p className="text-sm text-mutedmauve group-hover:text-softwhite">
                    Mentee:{" "}
                    <span className="font-semibold">
                      {booking.mentee?.name || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="px-5 py-2 rounded-full bg-peonypink text-deepcocoa font-semibold group-hover:bg-blossompink group-hover:text-softwhite capitalize">
                {booking.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorPastBookings;
