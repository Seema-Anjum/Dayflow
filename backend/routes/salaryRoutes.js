import express from "express";

import {
  createOrUpdateSalary,
  getMySalary,
  getEmployeeSalary,
} from "../controllers/salaryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/my",
  protect,
  authorizeRoles("EMPLOYEE"),
  getMySalary
);

router.get(
  "/employee/:userId",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getEmployeeSalary
);

router.put(
  "/employee/:userId",
  protect,
  authorizeRoles("ADMIN"),
  createOrUpdateSalary
);

export default router;