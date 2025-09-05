import Booking from "../models/Booking.js";
import User from "../models/User.js"; // Needed to verify mentor

/**
 * Create a new booking — mentee books a session with mentor
 */
export const createBooking = async (req, res) => {
  try {
    const { mentorId, slot } = req.body;

    if (!mentorId || !slot) {
      return res.status(400).json({ message: "Mentor ID and slot are required." });
    }

    const parsedSlot = new Date(slot);
    if (isNaN(parsedSlot)) {
      return res.status(400).json({ message: "Invalid slot date format." });
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // ✅ Prevent double-booking same slot
    const existing = await Booking.findOne({ mentor: mentorId, slot: parsedSlot });
    if (existing) {
      return res.status(400).json({ message: "This slot is already booked." });
    }

    const newBooking = new Booking({
      mentor: mentorId,
      mentee: req.user.id,
      slot: parsedSlot,
      status: "booked",
    });

    await newBooking.save();
    res.status(201).json({ message: "Session booked!", booking: newBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Booking failed.", error: err.message });
  }
};

// ✅ Get upcoming bookings for a mentee
export const getUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $gte: new Date() },
    }).populate("mentor", "-password");

    res.json({ upcoming: bookings });
  } catch (err) {
    console.error("Error fetching upcoming mentee bookings:", err);
    res.status(500).json({ message: "Error fetching upcoming sessions.", error: err.message });
  }
};

// ✅ Get past bookings for a mentee
export const getPastBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $lt: new Date() },
    }).populate("mentor", "-password");

    res.json({ past: bookings });
  } catch (err) {
    console.error("Error fetching past mentee bookings:", err);
    res.status(500).json({ message: "Error fetching past sessions.", error: err.message });
  }
};

// ✅ Get upcoming bookings for a mentor
export const getMentorUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentor: req.user.id,
      slot: { $gte: new Date() },
    }).populate("mentee", "-password");

    res.json({ upcoming: bookings });
  } catch (err) {
    console.error("Error fetching mentor upcoming bookings:", err);
    res.status(500).json({ message: "Error fetching mentor upcoming sessions.", error: err.message });
  }
};

// ✅ Get past bookings for a mentor
export const getMentorPastBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentor: req.user.id,
      slot: { $lt: new Date() },
    }).populate("mentee", "-password");

    res.json({ past: bookings });
  } catch (err) {
    console.error("Error fetching mentor past bookings:", err);
    res.status(500).json({ message: "Error fetching mentor past sessions", error: err.message });
  }
};
