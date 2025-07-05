import { useState, useEffect } from "react";

const MentorNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setNotes(data.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, [token]);

  const handleAddNote = async () => {
    if (!selectedBookingId || !newContent) {
      alert("Please select a booking ID and write content");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/notes/${selectedBookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newContent }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        // Re-fetch notes
        const refreshed = await fetch("http://localhost:5000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const refreshedData = await refreshed.json();
        setNotes(refreshedData.notes || []);
        setNewContent("");
        setSelectedBookingId("");
      } else {
        alert(data.message || "Failed to add note");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding note");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Your Mentor Notes</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Booking ID</label>
        <input
          type="text"
          placeholder="Enter booking ID"
          value={selectedBookingId}
          onChange={(e) => setSelectedBookingId(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />

        <label className="block text-sm font-medium mb-1">Note Content</label>
        <textarea
          placeholder="Write your note..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        ></textarea>

        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.length === 0 && <p className="text-sm text-gray-500">No notes yet.</p>}
        {notes.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-600 mb-1">
              <strong>Booking ID:</strong> {note.bookingId?._id || note.bookingId}
            </p>
            <p>{note.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              Created: {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorNotes;
