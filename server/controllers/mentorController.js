import User from "../models/User.js";

// ✅ Get mentor by ID
export const getMentorById = async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id).select("-password");
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json(mentor);
  } catch (err) {
    console.error("Error in getMentorById:", err);
    res.status(500).json({ message: "Failed to get mentor" });
  }
};

// ✅ Get all mentors
export const getMentors = async (req, res) => {
  try {
    const { skills, search } = req.query;
    let query = { role: "mentor" };

    if (skills) {
      query.skills = { $in: skills.split(",") };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
        { skills: { $elemMatch: { $regex: search, $options: "i" } } },
      ];
    }

    const mentors = await User.find(query).select("-password");
    res.status(200).json({ success: true, mentors });
  } catch (err) {
    console.error("Error in getMentors:", err);
    res.status(500).json({ success: false, message: "Failed to fetch mentors" });
  }
};

// ✅ Update mentor profile
export const updateMentorProfile = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const { name, qualification, bio, skills } = req.body;

    const mentor = await User.findOneAndUpdate(
      { _id: mentorId, role: "mentor" },
      { name, qualification, bio, skills },
      { new: true }
    ).select("-password");

    if (!mentor) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    res.status(200).json({ success: true, mentor });
  } catch (err) {
    console.error("Error in updateMentorProfile:", err);
    res.status(500).json({ success: false, message: "Failed to update mentor profile" });
  }
};

// ✅ Add availability slot(s)
export const addAvailability = async (req, res) => {
  try {
    const mentorId = req.user.id;
    let { slot, slots } = req.body;

    if (!slot && !slots) {
      return res.status(400).json({ success: false, message: "Slot is required" });
    }

    // Normalize slots into an array
    let newSlots = [];
    if (slot) newSlots.push(slot);
    if (Array.isArray(slots)) newSlots = [...newSlots, ...slots];

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    // Avoid duplicates
    newSlots.forEach((s) => {
      if (!mentor.availability.includes(s)) {
        mentor.availability.push(s);
      }
    });

    await mentor.save();

    res.status(200).json({ success: true, availability: mentor.availability });
  } catch (err) {
    console.error("Error in addAvailability:", err);
    res.status(500).json({ success: false, message: "Failed to add availability" });
  }
};

// ✅ Remove availability slot
export const removeAvailability = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const { slot } = req.body;

    if (!slot) {
      return res.status(400).json({ success: false, message: "Slot is required" });
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    mentor.availability = mentor.availability.filter((s) => s !== slot);
    await mentor.save();

    res.status(200).json({ success: true, availability: mentor.availability });
  } catch (err) {
    console.error("Error in removeAvailability:", err);
    res.status(500).json({ success: false, message: "Failed to remove availability" });
  }
};

// ✅ Get mentor slots
export const getMentorSlots = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const mentor = await User.findById(mentorId).select("availability name");

    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    res.status(200).json({ success: true, slots: mentor.availability });
  } catch (err) {
    console.error("Error in getMentorSlots:", err);
    res.status(500).json({ success: false, message: "Failed to fetch slots" });
  }
};
