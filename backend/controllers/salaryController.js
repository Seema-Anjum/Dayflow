import Salary from "../models/Salary.js";
import User from "../models/User.js";
import { calculateSalary } from "../utils/calculateSalary.js";

export const createOrUpdateSalary = async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      wageType,
      basicSalary,
      allowances = [],
      deductions = [],
      effectiveFrom,
    } = req.body;

    const employee = await User.findById(userId);

    if (!employee || employee.role !== "EMPLOYEE") {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (basicSalary === undefined || basicSalary < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid basic salary is required",
      });
    }

    const salary = await Salary.findOneAndUpdate(
      { userId },
      {
        userId,
        wageType,
        basicSalary,
        allowances,
        deductions,
        effectiveFrom,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    const calculation = calculateSalary(salary);

    res.status(200).json({
      success: true,
      message: "Salary updated successfully",
      salary,
      calculation,
    });
  } catch (error) {
    console.error("Salary update error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update salary",
    });
  }
};

// get employee salary details

export const getMySalary = async (req, res) => {
  try {
    const salary = await Salary.findOne({
      userId: req.user._id,
    });

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary information not found",
      });
    }

    const calculation = calculateSalary(salary);

    res.status(200).json({
      success: true,
      salary,
      calculation,
    });
  } catch (error) {
    console.error("Get salary error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch salary",
    });
  }
};

// get employee salary details for admin
export const getEmployeeSalary = async (req, res) => {
  try {
    const salary = await Salary.findOne({
      userId: req.params.userId,
    });

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary information not found",
      });
    }

    const calculation = calculateSalary(salary);

    res.status(200).json({
      success: true,
      salary,
      calculation,
    });
  } catch (error) {
    console.error("Get employee salary error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch salary",
    });
  }
};