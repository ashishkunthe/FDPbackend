import { Router } from "express";
import { loginType, registerType } from "../types/auth";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const route = Router();

route.post("/register", async (req, res) => {
  const inputs = registerType.safeParse(req.body);

  if (!inputs.success) {
    res.json({
      message: "Invalid inputs",
    });
    return;
  }
  const { username, password, email } = inputs.data;
  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      res.json({
        message: "The user already registered pls login",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "VIEWER",
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string
    );

    res.json({
      message: "user registered succesful",
      token: token,
    });
  } catch (error) {
    console.log("error in user registrations", error);
    res.json({
      message: "Something went wrong",
    });
  }
});

route.post("/login", async (req, res) => {
  const inputs = loginType.safeParse(req.body);

  if (!inputs.success) {
    res.json({
      message: "Invalid inputs",
    });
    return;
  }
  const { email, password } = inputs.data;
  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.json({
        message: "User not registered",
      });
      return;
    }

    const decode = await bcrypt.compare(password, findUser.password);

    if (!decode) {
      res.json({
        message: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign(
      { userId: findUser._id, role: findUser.role },
      process.env.JWT_SECRET as string
    );

    res.json({
      message: "Login sucessful",
      token: token,
    });
  } catch (error) {
    console.log("error in user login", error);
    res.json({
      message: "something went wrong",
    });
  }
});

export default route;
