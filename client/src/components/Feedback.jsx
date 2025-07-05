import { useState } from "react";

const FeedbackForm = ({ bookingId }) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3001/api/feedback/${bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFeedback("");
      } else {
        alert(data.message || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white">
      <h3 className="text-lg font-semibold mb-2">Leave Feedback</h3>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback..."
        rows="4"
        required
        className="w-full border px-3 py-2 rounded"
      ></textarea>
      <button
        type="submit"
        disabled={loading || !feedback.trim()}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
