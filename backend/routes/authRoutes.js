import express from "express";
import {
  login,
  getMe,
  changePassword,
  resetEmployeePassword,
} from "../controllers/authController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.get("/me", protect, getMe);

router.get("/admin-test", protect, authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
    });
  }
);

// Change password route
router.post("/change-password", protect, changePassword);

// Reset employee password route
router.put(
  "/reset-password/:id",
  protect,
  authorizeRoles("ADMIN"),
  resetEmployeePassword
);

export default router;