import express from "express";

import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} from "../controllers/leaveController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("EMPLOYEE"),
  applyLeave
);

router.get(
  "/my",
  protect,
  authorizeRoles("EMPLOYEE"),
  getMyLeaves
);

router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getAllLeaves
);

router.put(
  "/:id/approve",
  protect,
  authorizeRoles("ADMIN", "HR"),
  approveLeave
);

router.put(
  "/:id/reject",
  protect,
  authorizeRoles("ADMIN", "HR"),
  rejectLeave
);

export default router;