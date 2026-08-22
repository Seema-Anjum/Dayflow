import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    loginId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    employeeId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "HR", "EMPLOYEE"],
      default: "EMPLOYEE",
    },

    phone: {
      type: String,
      trim: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    passwordChangeRequired: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    employeeCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    }, 

    companyName: {
      type: String,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    jobPosition: {
      type: String,
      trim: true,
    },

    dateOfJoining: {
      type: Date,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },

    address: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    manager: {
      type: String,
      trim: true,
    },
},  
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;