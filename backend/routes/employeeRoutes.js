import express from "express";

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  updateEmployeeStatus,
} from "../controllers/employeeController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create a new employee
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR"),
  createEmployee
);

// Get all employees
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getEmployees
);

// Get a single employee
router.get(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "HR", "EMPLOYEE"),
  getEmployee
);

// Update an employee
router.put(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "HR", "EMPLOYEE"),
  updateEmployee
);

// Update employee status (active/inactive)
router.patch(
    "/:id/status",
    protect,
    authorizeRoles("ADMIN"),
    updateEmployeeStatus
);

export default router;