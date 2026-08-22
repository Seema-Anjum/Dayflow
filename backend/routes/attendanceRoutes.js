import express from "express";

import {
  checkIn,
  checkOut,
  getTodayAttendance,
  getMyAttendance,
  getAllAttendance,
} from "../controllers/attendanceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/check-in",
  protect,
  authorizeRoles("EMPLOYEE"),
  checkIn
);

router.post(
  "/check-out",
  protect,
  authorizeRoles("EMPLOYEE"),
  checkOut
);

router.get(
  "/today",
  protect,
  authorizeRoles("EMPLOYEE"),
  getTodayAttendance
);

router.get(
  "/my",
  protect,
  authorizeRoles("EMPLOYEE"),
  getMyAttendance
);

router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getAllAttendance
);

export default router;