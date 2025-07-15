import React, { useEffect, useState } from "react";
import API from "../api"; // Make sure this has baseURL = "http://localhost:5000/api"
import { format } from "date-fns";
import { StickyNote, Calendar as CalendarIcon } from "lucide-react";

const MentorNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentorNotes = async () => {
      const token = localStorage.getItem("token");
      console.log("🔑 Using token:", token);

      if (!token) {
        setError("No token found. Please log in as mentor.");
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/notes/mentor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ API raw response:", res);
        const fetchedNotes = res.data.notes || [];
        console.log("✅ Notes fetched:", fetchedNotes);

        setNotes(fetchedNotes);
      } catch (err) {
        console.error("❌ Failed to load mentor notes:", err);
        setError("Could not load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorNotes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-peonypink">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-peonypink rounded-full flex items-center justify-center mr-4">
          <StickyNote className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-deepcocoa">Mentees' Notes</h1>
      </div>

      <p className="text-mutedmauve mb-8">
        View all notes left by your mentees for your bookings.
      </p>

      {loading ? (
        <p className="text-mutedmauve">Loading notes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-mutedmauve mb-2">No notes found yet.</p>
          <p className="text-mutedmauve">
            Once your mentees add notes for your sessions, they’ll appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group flex justify-between items-start p-6 rounded-2xl border border-peonypink bg-blushcream hover:bg-peonypink hover:text-softwhite transition-all duration-200"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-peonypink rounded-full flex items-center justify-center mr-5">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-deepcocoa group-hover:text-softwhite">
                    {note.bookingId?.slot
                      ? format(new Date(note.bookingId.slot), "MMMM d, yyyy")
                      : "No Date"}
                  </p>
                  <p className="text-sm text-mutedmauve mb-2 group-hover:text-softwhite">
                    Mentee:{" "}
                    <span className="font-semibold">
                      {note.menteeId?.name || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-deepcocoa group-hover:text-softwhite">
                    {note.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorNotes;
