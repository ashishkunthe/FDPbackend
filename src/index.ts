import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("server is running ports 5000");
});
