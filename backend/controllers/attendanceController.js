import Attendance from "../models/Attendance.js";

// check-in function
export const checkIn = async (req, res) => {
  try {
    const userId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      userId,
      date: startOfDay,
    });

    if (existing?.checkIn) {
      return res.status(400).json({
        success: false,
        message: "You have already checked in today",
      });
    }

    const now = new Date();

    const attendance =
      existing ||
      new Attendance({
        userId,
        date: startOfDay,
      });

    attendance.checkIn = now;
    attendance.status = "PRESENT";

    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Check-in successful",
      attendance,
    });
  } catch (error) {
    console.error("Check-in error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to check in",
    });
  }
};

// check-out function

export const checkOut = async (req, res) => {
  try {
    const userId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      userId,
      date: startOfDay,
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: "You must check in first",
      });
    }

    if (!attendance.checkIn) {
      return res.status(400).json({
        success: false,
        message: "You must check in first",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: "You have already checked out today",
      });
    }

    const now = new Date();

    attendance.checkOut = now;

    const milliseconds =
      now.getTime() - attendance.checkIn.getTime();

    const hours = milliseconds / (1000 * 60 * 60);

    attendance.totalHours = Number(hours.toFixed(2));

    if (hours < 4) {
      attendance.status = "HALF_DAY";
    } else {
      attendance.status = "PRESENT";
    }

    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Check-out successful",
      attendance,
    });
  } catch (error) {
    console.error("Check-out error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to check out",
    });
  }
};

// get today's attendance for the logged-in user

export const getTodayAttendance = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      userId: req.user._id,
      date: startOfDay,
    });

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch today's attendance",
    });
  }
};

// get employee attendance history
export const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      userId: req.user._id,
    }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};

// get all attendance records for admin
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate(
        "userId",
        "name employeeCode loginId department jobPosition"
      )
      .sort({
        date: -1,
      });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Get all attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance records",
    });
  }
};