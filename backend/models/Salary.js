import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    wageType: {
      type: String,
      enum: ["MONTHLY", "HOURLY"],
      default: "MONTHLY",
    },

    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    allowances: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["FIXED", "PERCENTAGE"],
          required: true,
        },
        value: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    deductions: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["FIXED", "PERCENTAGE"],
          required: true,
        },
        value: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    effectiveFrom: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;