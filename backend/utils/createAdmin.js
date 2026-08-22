import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@dayflow.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      12
    );

    await User.create({
      loginId: "ADMIN001",
      employeeId: "ADMIN001",
      name: "Dayflow Admin",
      email: "admin@dayflow.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Default admin created");
  } catch (error) {
    console.error("Admin creation failed:", error);
  }
};