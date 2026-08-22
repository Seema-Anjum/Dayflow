import Payroll from "../models/Payroll.js";
import Salary from "../models/Salary.js";
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";

import { calculatePayroll } from "../utils/calculatePayroll.js";

export const generatePayroll = async (req, res) => {
  try {
    const { userId } = req.params;
    const { month, year } = req.body;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required",
      });
    }

    const employee = await User.findById(userId);

    if (!employee || employee.role !== "EMPLOYEE") {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const salary = await Salary.findOne({ userId });

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary structure not found",
      });
    }

    const existingPayroll = await Payroll.findOne({ userId, month, year });

    if (existingPayroll) {
      return res.status(409).json({
        success: false,
        message: "Payroll already exists for this month",
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await Attendance.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const workingDays = endDate.getDate();

    const presentDays = attendance.filter((r) => r.status === "PRESENT").length;
    const leaveDays = attendance.filter((r) => r.status === "LEAVE").length;
    const halfDays = attendance.filter((r) => r.status === "HALF_DAY").length;

    const absentDays = Math.max(
      workingDays - presentDays - leaveDays - halfDays,
      0
    );

    const salaryCalculation = {
      basicSalary: salary.basicSalary,
      allowances: 0,
      deductions: 0,
    };

    for (const allowance of salary.allowances) {
      salaryCalculation.allowances +=
        allowance.type === "FIXED"
          ? allowance.value
          : (salary.basicSalary * allowance.value) / 100;
    }

    for (const deduction of salary.deductions) {
      salaryCalculation.deductions +=
        deduction.type === "FIXED"
          ? deduction.value
          : (salary.basicSalary * deduction.value) / 100;
    }

    const calculation = calculatePayroll({
      ...salaryCalculation,
      workingDays,
      presentDays,
      leaveDays,
      absentDays,
    });

    const payroll = await Payroll.create({
      userId,
      month,
      year,
      workingDays,
      presentDays,
      leaveDays,
      absentDays,
      basicSalary: salary.basicSalary,
      allowances: salaryCalculation.allowances,
      deductions: salaryCalculation.deductions,
      grossSalary: calculation.grossSalary,
      netSalary: calculation.netSalary,
      status: "DRAFT",
    });

    res.status(201).json({
      success: true,
      message: "Payroll generated successfully",
      payroll,
    });
  } catch (error) {
    console.error("Generate payroll error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate payroll",
    });
  }
};

export const getMyPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find({ userId: req.user._id }).sort({
      year: -1,
      month: -1,
    });

    res.status(200).json({
      success: true,
      count: payroll.length,
      payroll,
    });
  } catch (error) {
    console.error("Get my payroll error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payroll",
    });
  }
};

export const getAllPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find()
      .populate("userId", "name employeeCode department jobPosition")
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      count: payroll.length,
      payroll,
    });
  } catch (error) {
    console.error("Get all payroll error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payroll",
    });
  }
};

export const processPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    if (payroll.status !== "DRAFT") {
      return res.status(400).json({
        success: false,
        message: "Payroll has already been processed",
      });
    }

    payroll.status = "PROCESSED";
    payroll.processedAt = new Date();

    await payroll.save();

    res.status(200).json({
      success: true,
      message: "Payroll processed successfully",
      payroll,
    });
  } catch (error) {
    console.error("Process payroll error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process payroll",
    });
  }
};