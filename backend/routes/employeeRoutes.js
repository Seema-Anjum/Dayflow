import express from "express";

import {
  createEmployee,
  getEmployees,
  getEmployee,
} from "../controllers/employeeController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR"),
  createEmployee
);

router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getEmployees
);

router.get(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "HR", "EMPLOYEE"),
  getEmployee
);

export default router;