import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, Plus, X } from "lucide-react";
import API from "../api"; // ✅ Axios instance pointing to http://localhost:5000/api

const AvailabilitySlots = () => {
  const [slots, setSlots] = useState([]); 
  const [newSlot, setNewSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // ✅ Get userId from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserId(parsed?._id);
    }
  }, []);

  // ✅ Fetch my slots from backend
  useEffect(() => {
    const fetchSlots = async () => {
      const token = localStorage.getItem("token");
      if (!token || !userId) return;

      try {
        const res = await API.get(`/mentors/${userId}/slots`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // backend: { success: true, slots: [...] }
        setSlots(res.data.slots || []);
      } catch (err) {
        console.log("Silent fail: could not fetch slots.", err.message);
      }
    };

    fetchSlots();
  }, [userId]);

  // ✅ Add new slot
const handleAddSlot = async () => {
  // ✅ Validate newSlot
  if (!newSlot || isNaN(newSlot.getTime())) {
    alert("Please pick a valid date & time.");
    return;
  }

  const iso = newSlot.toISOString();

  // ✅ Compare with startDateTime of existing slots
  if (slots.some((s) => {
    const slotDate = s.startDateTime ? new Date(s.startDateTime) : null;
    return slotDate && slotDate.toISOString() === iso;
  })) {
    alert("This slot already exists!");
    return;
  }

  setLoading(true);
  try {
    const res = await API.patch(
      "/mentors/me/availability",
      { slots: [iso] },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    setSlots(res.data.availability || []);
    setNewSlot(null);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Could not add slot");
  } finally {
    setLoading(false);
  }
};


  // ✅ Remove slot
  const handleRemoveSlot = async (slot) => {
    setLoading(true);
    try {
      const res = await API.patch(
        "/mentors/me/availability/remove",
        { slot }, // ✅ backend expects { slot }
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSlots(res.data.availability || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Could not remove slot");
    } finally {
      setLoading(false);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return slots.some((slot) => isSameDay(new Date(slot), date))
        ? "availability-highlight"
        : null;
    }
  };

  return (
    <>
      <style>{`
        .availability-highlight {
          background: #EABFCB !important;
          color: #4E342E !important;
          border-radius: 50% !important;
          font-weight: 600 !important;
        }
      `}</style>

      <div className="min-h-screen bg-softwhite p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-peonypink rounded-full mb-4">
              <CalendarIcon className="w-8 h-8 text-deepcocoa" />
            </div>
            <h1 className="text-4xl font-bold text-deepcocoa mb-2">
              Manage Your Availability
            </h1>
            <p className="text-mutedmauve text-lg">Set your slots with style ✨</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Date Picker */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-peonypink">
              <h2 className="text-2xl font-bold mb-4 text-deepcocoa flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Add New Slot
              </h2>
              <DatePicker
                selected={newSlot}
                onChange={(date) => setNewSlot(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Pick date & time"
                className="w-full border-2 border-peonypink rounded-xl px-4 py-3 mb-4 text-deepcocoa"
              />

              <button
                onClick={handleAddSlot}
                disabled={loading || !newSlot}
                className="w-full bg-peonypink text-deepcocoa px-6 py-3 rounded-xl font-semibold hover:bg-blossompink hover:text-softwhite disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Adding..." : "Add Slot"}
              </button>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-peonypink">
              <h2 className="text-2xl font-bold mb-4 text-deepcocoa flex items-center">
                <CalendarIcon className="w-6 h-6 mr-2" /> Your Calendar
              </h2>

              <Calendar tileClassName={tileClassName} className="custom-calendar" />

              <p className="mt-4 text-sm text-mutedmauve flex items-center">
                <span className="w-4 h-4 bg-peonypink rounded-full mr-2 inline-block"></span>
                Highlighted days = your available slots
              </p>
            </div>
          </div>

          {/* Slots list */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-peonypink">
            <h2 className="text-2xl font-bold mb-4 text-deepcocoa flex items-center">
              <Clock className="w-6 h-6 mr-2" /> Your Slots
            </h2>

            {slots.length === 0 ? (
              <p className="text-mutedmauve">No slots yet. Add one above!</p>
            ) : (
              
<div className="grid gap-4">
  {slots.map((slot) => {
    const start = slot.startDateTime;
    const end = slot.endDateTime;

    if (!start || !end) return null; // safety check

    const startDate = new Date(start);
    const endDate = new Date(end);

    return (
      <div
        key={slot._id}
        className="flex items-center justify-between p-4 bg-blushcream rounded-xl border border-peonypink"
      >
        <div>
          <p className="font-semibold text-deepcocoa">
            {format(startDate, "MMMM d, yyyy")}
          </p>
          <p className="text-sm text-mutedmauve flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {format(startDate, "h:mm aa")} - {format(endDate, "h:mm aa")}
          </p>
        </div>
        <button
          onClick={() => handleRemoveSlot(slot)}
          disabled={loading}
          className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  })}
</div>


            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailabilitySlots;
