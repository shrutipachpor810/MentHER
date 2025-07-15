// src/pages/AppointmentPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AppointmentPage = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [slot, setSlot] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const token = localStorage.getItem('token'); // ✅ Add this!
        const res = await fetch(`http://localhost:5000/api/mentors/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        console.log('Mentor fetched:', data);
        setMentor(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchMentor();
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // ✅ Add token!
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mentorId: id, slot })
      });
      const data = await res.json();
      console.log(data);
      alert(data.message || 'Booked!');
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!mentor) return <div className="p-6">Mentor not found</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book a Session with {mentor.name}</h2>
      <p className="mb-4">{mentor.bio}</p>
      {mentor.availability.length === 0 ? (
        <p className="text-red-500">No slots available</p>
      ) : (
        <form onSubmit={handleBook} className="space-y-4">
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a slot</option>
            {mentor.availability.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-peonypink text-white px-4 py-2 rounded"
          >
            Book Session
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointmentPage;
