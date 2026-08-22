import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "HALF_DAY", "LEAVE"],
      default: "PRESENT",
    },

    totalHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  { userId: 1, date: 1 },
  { unique: true }
);

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;