import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      enum: ["VIEWER", "ANALYST", "ADMIN"],
      default: "VIEWER",
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userModel);
