import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const user = req.query.user;
  res.json({
    message: "server is runing",
  });
});

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("server is running ports 5000");
});
