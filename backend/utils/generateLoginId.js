import User from "../models/User.js";

export const generateLoginId = async (name) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const year = new Date().getFullYear();

  const count = await User.countDocuments({
    role: "EMPLOYEE",
  });

  const serial = String(count + 1).padStart(4, "0");

  return `${initials}${year}${serial}`;
};