import { Request, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { User } from "../models/User";

const route = Router();

interface RequestExtend extends Request {
  userId: string;
  role: string;
}

route.get("/users", authMiddleware as any, async (req, res) => {
  const request = req as RequestExtend;
  const role = request.role;

  if (role !== "ADMIN") {
    res.status(403).json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }

  try {
    const users = await User.find();

    if (!users) {
      res.json({
        message: "no users are presents",
      });
      return;
    }

    res.status(200).json({
      message: "users fetched sucessfully",
      users: users,
    });
  } catch (error) {
    console.log("error in fetching users");
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

route.get("/users/:id", authMiddleware as any, async (req, res) => {
  const { id } = req.params;

  //   @ts-ignore
  const request = req as RequestExtend;
  const role = request.role;

  if (role !== "ADMIN") {
    res.status(403).json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    } else {
      res.status(200).json({
        message: "User details found",
        user: user,
      });
    }
  } catch (error) {
    console.log("error in getting user details");
    res.json({
      message: "something went wrong",
    });
  }
});

route.patch("/users/:id/role", authMiddleware as any, async (req, res) => {
  const { id } = req.params;
  const { changedrole, status } = req.body;

  const roleArr = ["ANALYST", "ADMIN", "VIEWER"];
  // @ts-ignore
  const request = req as RequestExtend;
  const role = request.role;

  if (role !== "ADMIN") {
    res.status(403).json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }
  try {
    if (!roleArr.includes(changedrole)) {
      res.status(400).json({
        message: "Invalid role",
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      role: changedrole,
      status: status ? status : "ACTIVE",
    });

    if (!updatedUser) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User role updated successfully",
    });
  } catch (error) {
    console.log("error in updating role by admin", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default route;
