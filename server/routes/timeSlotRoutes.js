// backend/routes/timeSlotRoutes.js

import express from "express";
import {
  addTimeSlot,
  getMentorSlots,
  bookSlot,
  deleteTimeSlot,
  getMyTimeSlots
} from "../controllers/timeSlotController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Mentor adds slot
router.post("/add", authMiddleware, addTimeSlot);

// Mentor fetches their own slots
router.get("/my", authMiddleware, getMyTimeSlots);

// Get slots for a specific mentor (mentee view)
router.get("/mentor/:mentorId", authMiddleware, getMentorSlots);

// Mentee books slot
router.post("/book", authMiddleware, bookSlot);

// Mentor deletes a slot
router.delete("/:id", authMiddleware, deleteTimeSlot);

export default router;
