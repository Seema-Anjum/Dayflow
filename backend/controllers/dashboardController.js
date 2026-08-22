import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import Payroll from "../models/Payroll.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      presentToday,
      leaveToday,
      pendingLeaves,
      payrollSummary,
    ] = await Promise.all([
      User.countDocuments({ role: "EMPLOYEE" }),

      User.countDocuments({
        role: "EMPLOYEE",
        isActive: true,
      }),

      User.countDocuments({
        role: "EMPLOYEE",
        isActive: false,
      }),

      Attendance.countDocuments({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
        status: "PRESENT",
      }),

      Attendance.countDocuments({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
        status: "LEAVE",
      }),

      Leave.countDocuments({
        status: "PENDING",
      }),

      Payroll.aggregate([
        {
          $match: {
            month: currentMonth,
            year: currentYear,
          },
        },
        {
          $group: {
            _id: null,
            totalGrossSalary: {
              $sum: "$grossSalary",
            },
            totalNetSalary: {
              $sum: "$netSalary",
            },
            totalEmployees: {
              $sum: 1,
            },
          },
        },
      ]),
    ]);

    const payroll = payrollSummary[0] || {
      totalGrossSalary: 0,
      totalNetSalary: 0,
      totalEmployees: 0,
    };

    res.status(200).json({
      success: true,

      employees: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: inactiveEmployees,
      },

      attendance: {
        presentToday,
        leaveToday,
      },

      leaves: {
        pending: pendingLeaves,
      },

      payroll: {
        month: currentMonth,
        year: currentYear,
        totalEmployees: payroll.totalEmployees,
        totalGrossSalary: payroll.totalGrossSalary,
        totalNetSalary: payroll.totalNetSalary,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

export const getEmployeeDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [attendance, leaves, payroll] =
      await Promise.all([
        Attendance.findOne({
          userId,
          date: {
            $gte: today,
            $lt: tomorrow,
          },
        }),

        Leave.find({
          userId,
        })
          .sort({ createdAt: -1 })
          .limit(5),

        Payroll.find({
          userId,
        })
          .sort({
            year: -1,
            month: -1,
          })
          .limit(3),
      ]);

    res.status(200).json({
      success: true,

      attendance: attendance || null,

      leaves,

      payroll,
    });
  } catch (error) {
    console.error("Employee dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

