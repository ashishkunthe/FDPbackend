import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth";
import financeRoutes from "./routes/financial";
import adminRoutes from "./routes/admin";
import dashboardRoutes from "./routes/dashboard";
import mongoose from "mongoose";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", financeRoutes);
app.use("/", adminRoutes);
app.use("/", dashboardRoutes);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((e) => {
    console.log("Error in connecting mongodb", e);
  });
