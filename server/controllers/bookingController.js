// backend/controllers/bookingController.js

import Booking from '../models/Booking.js';
import User from '../models/User.js';

// ✅ Create Booking with mentor data
export const createBooking = async (req, res) => {
  try {
    const { mentorId, slot } = req.body;

    const mentor = await User.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const newBooking = new Booking({
      mentor: mentorId,
      mentee: req.user.id,
      mentorName: mentor.name,
      mentorProfilePic: mentor.profilePic || "",
      mentorEmail: mentor.email,
      slot,
      status: 'booked',
    });

    await newBooking.save();
    res.status(201).json({ message: 'Session booked!', booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
};

// ✅ Get Upcoming Bookings (Mentee)
export const getUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $gte: new Date().toISOString() }
    }).populate('mentor', 'name email profilePic');


    res.json({ upcoming: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching upcoming sessions' });
  }
};

// ✅ Get Past Bookings (Mentee)
export const getPastBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $lt: new Date().toISOString() }
    }).populate('mentor', 'name email profilePic');

    res.json({ past: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching past sessions' });
  }
};

// ✅ Get Upcoming Bookings for Mentor
export const getUpcomingBookingsForMentor = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentor: req.user.id,
      slot: { $gte: new Date().toISOString() }
    }).populate('mentor', 'name email profilePic');

    res.json({ upcoming: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching upcoming mentor sessions' });
  }
};

// ✅ Get Past Bookings for Mentor
export const getPastBookingsForMentor = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentor: req.user.id,
      slot: { $lt: new Date().toISOString() }
    }).populate('mentor', 'name email profilePic');

    res.json({ past: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching past mentor sessions' });
  }
};
