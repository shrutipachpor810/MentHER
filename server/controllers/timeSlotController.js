import TimeSlot from "../models/TimeSlot.js";
import Booking from "../models/Booking.js";

// ✅ Mentor adds time slot
export const addTimeSlot = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const mentorId = req.user.id;

    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    const newSlot = new TimeSlot({
      mentor: mentorId,
      date,
      startTime,
      endTime,
      startDateTime,
      endDateTime,
    });

    await newSlot.save();
    res.status(201).json({ message: "✅ Time slot added successfully", slot: newSlot });
  } catch (error) {
    console.error("Error in addTimeSlot:", error);
    res.status(500).json({ message: "Error adding time slot" });
  }
};

// ✅ Mentee books a slot
export const bookSlot = async (req, res) => {
  try {
    const { slotId, desiredStartTime, durationMinutes } = req.body;
    const menteeId = req.user.id;

    const slot = await TimeSlot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    const desiredStart = new Date(desiredStartTime);
    const desiredEnd = new Date(desiredStart.getTime() + parseInt(durationMinutes) * 60000);

    if (
      desiredStart.getTime() < slot.startDateTime.getTime() ||
      desiredEnd.getTime() > slot.endDateTime.getTime()
    ) {
      return res.status(400).json({ message: "Requested time is outside the available slot." });
    }

    // ✅ Create booking
    const newBooking = new Booking({
      mentor: slot.mentor,
      mentee: menteeId,
      slot: desiredStart,
      status: "booked",
    });
    await newBooking.save();

    // ✅ Split slot if needed
    const splitSlots = [];
    const formatTime = (dateObj) =>
      dateObj.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });

    // Before
    if (desiredStart.getTime() > slot.startDateTime.getTime()) {
      const beforeSlot = new TimeSlot({
        mentor: slot.mentor,
        date: slot.date,
        startTime: formatTime(slot.startDateTime),
        endTime: formatTime(desiredStart),
        startDateTime: slot.startDateTime,
        endDateTime: desiredStart,
      });
      await beforeSlot.save();
      splitSlots.push(beforeSlot);
    }

    // After
    if (desiredEnd.getTime() < slot.endDateTime.getTime()) {
      const afterSlot = new TimeSlot({
        mentor: slot.mentor,
        date: slot.date,
        startTime: formatTime(desiredEnd),
        endTime: formatTime(slot.endDateTime),
        startDateTime: desiredEnd,
        endDateTime: slot.endDateTime,
      });
      await afterSlot.save();
      splitSlots.push(afterSlot);
    }

    await slot.deleteOne();

    res.json({
      message: "✅ Slot booked and updated.",
      booking: newBooking,
      newSlots: splitSlots,
    });
  } catch (error) {
    console.error("Error in bookSlot:", error);
    res.status(500).json({ message: "Error booking slot." });
  }
};

// ✅ Mentor fetches their own slots
export const getMyTimeSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find({ mentor: req.user.id }).sort({ date: 1, startDateTime: 1 });
    res.json(slots);
  } catch (error) {
    console.error("Error in getMyTimeSlots:", error);
    res.status(500).json({ message: "Error fetching your slots" });
  }
};

// ✅ Mentee fetches slots for a specific mentor
export const getMentorSlots = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const slots = await TimeSlot.find({ mentor: mentorId }).sort({ date: 1, startDateTime: 1 });
    res.json(slots);
  } catch (error) {
    console.error("Error in getMentorSlots:", error);
    res.status(500).json({ message: "Error fetching mentor slots" });
  }
};

// ✅ Mentor deletes a slot
export const deleteTimeSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await TimeSlot.findById(id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    if (slot.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this slot." });
    }

    await slot.deleteOne();
    res.status(200).json({ message: "✅ Slot deleted successfully." });
  } catch (error) {
    console.error("Error in deleteTimeSlot:", error);
    res.status(500).json({ message: "Error deleting slot." });
  }
};
