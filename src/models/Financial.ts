import mongoose, { Schema } from "mongoose";

const FinancialSchema = new Schema(
  {
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ["INCOME", "EXPENSE"] },
    category: { type: String, required: true },
    date: { type: String, required: true },
    notes: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Finance = mongoose.model("Finance", FinancialSchema);
