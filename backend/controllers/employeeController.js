import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateEmployeeId } from "../utils/generateEmployeeId.js";
import { generateLoginId } from "../utils/generateLoginId.js";
import { generateTemporaryPassword } from "../utils/generatePassword.js";

// create employee
export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      jobPosition,
      dateOfJoining,
      dateOfBirth,
      gender,
      address,
      location,
      manager,
    } = req.body;

    if (!name || !email || !dateOfJoining) {
      return res.status(400).json({
        success: false,
        message: "Name, email and date of joining are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const employeeCode = await generateEmployeeId();

    const loginId = await generateLoginId(name);

    const temporaryPassword = generateTemporaryPassword();

    const hashedPassword = await bcrypt.hash(
      temporaryPassword,
      12
    );

    const employee = await User.create({
      employeeCode,
      loginId,
      employeeId: employeeCode,

      name,
      email: email.toLowerCase(),
      password: hashedPassword,

      role: "EMPLOYEE",

      phone,
      department,
      jobPosition,
      dateOfJoining,
      dateOfBirth,
      gender,
      address,
      location,
      manager,

      passwordChangeRequired: true,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",

      employee: {
        id: employee._id,
        employeeCode: employee.employeeCode,
        loginId: employee.loginId,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },

      temporaryPassword,
    });
  } catch (error) {
    console.error("Create employee error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};

// get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      role: "EMPLOYEE",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.error("Get employees error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

//get single employee
export const getEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id)
      .select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (
      req.user.role === "EMPLOYEE" &&
      req.user._id.toString() !== employee._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only access your own profile",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee",
    });
  }
};

// update employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const isAdminOrHR =
      req.user.role === "ADMIN" ||
      req.user.role === "HR";

    const isOwnProfile =
      req.user._id.toString() === employee._id.toString();

    if (!isAdminOrHR && !isOwnProfile) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    /*
     * Employee can only change limited fields.
     */
    if (!isAdminOrHR) {
      const allowedFields = [
        "phone",
        "address",
        "profilePicture",
      ];

      const requestedFields = Object.keys(req.body);

      const invalidFields = requestedFields.filter(
        (field) => !allowedFields.includes(field)
      );

      if (invalidFields.length > 0) {
        return res.status(403).json({
          success: false,
          message: `You cannot update: ${invalidFields.join(", ")}`,
        });
      }
    }

    /*
     * Admin / HR can update broader employee information.
     */
    const allowedAdminFields = [
      "name",
      "phone",
      "address",
      "profilePicture",
      "department",
      "jobPosition",
      "dateOfJoining",
      "dateOfBirth",
      "gender",
      "location",
      "manager",
    ];

    for (const field of allowedAdminFields) {
      if (req.body[field] !== undefined) {
        employee[field] = req.body[field];
      }
    }

    await employee.save();

    const updatedEmployee = await User.findById(employee._id)
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Update employee error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update employee",
    });
  }
};

// update employee status (activate/deactivate)
export const updateEmployeeStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.isActive = isActive;

    await employee.save();

    res.status(200).json({
      success: true,
      message: isActive
        ? "Employee activated successfully"
        : "Employee deactivated successfully",
      isActive: employee.isActive,
    });
  } catch (error) {
    console.error("Update employee status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update employee status",
    });
  }
};