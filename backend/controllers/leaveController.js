import Leave from "../models/Leave.js";
import { calculateLeaveDays } from "../utils/calculateLeaveDays.js";


// Apply for leave
export const applyLeave = async (req, res) => {
  try {
    const {
      leaveType,
      startDate,
      endDate,
      remarks,
      attachment,
    } = req.body;

    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Leave type, start date and end date are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be before start date",
      });
    }

    const totalDays = calculateLeaveDays(startDate, endDate);

    // Prevent overlapping pending/approved leave
    const overlappingLeave = await Leave.findOne({
      userId: req.user._id,
      status: {
        $in: ["PENDING", "APPROVED"],
      },
      startDate: {
        $lte: end,
      },
      endDate: {
        $gte: start,
      },
    });

    if (overlappingLeave) {
      return res.status(409).json({
        success: false,
        message: "You already have a leave request for these dates",
      });
    }

    const leave = await Leave.create({
      userId: req.user._id,
      leaveType,
      startDate: start,
      endDate: end,
      totalDays,
      remarks,
      attachment,
      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Leave request submitted successfully",
      leave,
    });
  } catch (error) {
    console.error("Apply leave error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit leave request",
    });
  }
};

// get all leaves for the logged-in user
export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get my leaves error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leave requests",
    });
  }
};

// get all leaves for admin
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate(
        "userId",
        "name employeeCode loginId department jobPosition"
      )
      .populate(
        "reviewedBy",
        "name role"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get all leaves error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leave requests",
    });
  }
};

// approve leave request
export const approveLeave = async (req, res) => {
  try {
    const { adminComment } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "This leave request has already been processed",
      });
    }

    leave.status = "APPROVED";
    leave.adminComment = adminComment || "";
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();

    await leave.save();

    res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      leave,
    });
  } catch (error) {
    console.error("Approve leave error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to approve leave",
    });
  }
};

// reject leave request
export const rejectLeave = async (req, res) => {
  try {
    const { adminComment } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "This leave request has already been processed",
      });
    }

    leave.status = "REJECTED";
    leave.adminComment = adminComment || "";
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();

    await leave.save();

    res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      leave,
    });
  } catch (error) {
    console.error("Reject leave error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reject leave",
    });
  }
};