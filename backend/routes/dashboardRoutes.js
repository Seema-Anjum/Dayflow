import express from "express";

import {
  getAdminDashboard,
  getEmployeeDashboard,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getAdminDashboard
);

router.get(
  "/employee",
  protect,
  authorizeRoles("EMPLOYEE"),
  getEmployeeDashboard
);

export default router;