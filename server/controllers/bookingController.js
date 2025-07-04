import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { mentorId, slot } = req.body;

    const newBooking = new Booking({
      mentor: mentorId,
      mentee: req.user.id,
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

export const getUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $gte: new Date().toISOString() }
    }).populate('mentor', '-password');

    res.json({ upcoming: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching upcoming sessions' });
  }
};

export const getPastBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $lt: new Date().toISOString() }
    }).populate('mentor', '-password');

    res.json({ past: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching past sessions' });
  }
};
