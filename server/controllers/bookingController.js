// backend/controllers/bookingController.js

/**
 * Create a new booking — mentee books a session with mentor
 */
export const createBooking = async (req, res) => {
  try {
    const { mentorId, slot } = req.body;

    if (!mentorId || !slot) {
      return res.status(400).json({ message: 'Mentor ID and slot are required.' });
    }

    const newBooking = new Booking({
      mentor: mentorId,
      mentee: req.user.id,
      slot: new Date(slot), // store slot as Date
      status: 'booked',
    });

    await newBooking.save();
    res.status(201).json({ message: 'Session booked!', booking: newBooking });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Booking failed.' });
  }
};

/**
 * Get upcoming bookings for a mentee
 */
export const getUpcomingBookings = async (req, res) => {
  try {
    console.log('Fetching upcoming bookings for mentee:', req.user.id);

    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $gte: new Date() }, // compare with Date, not ISO string
    }).populate('mentor', '-password');

    res.json({ upcoming: bookings });
  } catch (err) {
    console.error('Error fetching upcoming mentee bookings:', err);
    res.status(500).json({ message: 'Error fetching upcoming sessions.' });
  }
};

/**
 * Get past bookings for a mentee
 */
export const getPastBookings = async (req, res) => {
  try {
    console.log('Fetching past bookings for mentee:', req.user.id);

    const bookings = await Booking.find({
      mentee: req.user.id,
      slot: { $lt: new Date() },
    }).populate('mentor', '-password');

    res.json({ past: bookings });
  } catch (err) {
    console.error('Error fetching past mentee bookings:', err);
    res.status(500).json({ message: 'Error fetching past sessions.' });
  }
};

/**
 * Get upcoming bookings for a mentor
 */
export const getMentorUpcomingBookings = async (req, res) => {
  try {
    console.log('Fetching upcoming bookings for mentor:', req.user.id);

    const bookings = await Booking.find({
      mentor: req.user.id,
      slot: { $gte: new Date() },
    }).populate('mentee', '-password');

    res.json({ upcoming: bookings });
  } catch (err) {
    console.error('Error fetching mentor upcoming bookings:', err);
    res.status(500).json({ message: 'Error fetching mentor upcoming sessions.' });
  }
};
// Get past bookings for a mentor
export const getMentorPastBookings = async (req, res) => {
  try {
    console.log("[Past] Auth user:", req.user);  // ✅ DEBUG
    const bookings = await Booking.find({
      mentor: req.user.id,
      slot: { $lt: new Date() }
    }).populate('mentee', '-password');

    console.log("[Past] Found:", bookings.length);
    res.json({ past: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching mentor past sessions" });
  }
};

