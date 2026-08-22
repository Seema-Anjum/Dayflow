import express from "express";
import {
  login,
  getMe,
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

export default router;