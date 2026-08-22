import User from "../models/User.js";

export const generateEmployeeId = async () => {
  const count = await User.countDocuments({
    role: "EMPLOYEE",
  });

  const number = String(count + 1).padStart(4, "0");

  return `EMP${number}`;
};