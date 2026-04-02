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
    res.json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }

  try {
    const users = await User.find();
    console.log(users);

    res.json({
      message: "users fetched sucessfully",
      users: users,
    });
  } catch (error) {
    console.log("error in fetching users");
    res.json({
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
    res.json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      res.json({
        message: "User not found",
      });
      return;
    } else {
      res.json({
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
  const { changedrole } = req.body;

  const roleArr = ["ANALYST", "ADMIN"];
  // @ts-ignore
  const request = req as RequestExtend;
  const role = request.role;

  if (role !== "ADMIN") {
    res.json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }
  try {
    if (!roleArr.includes(changedrole)) {
      res.json({
        message: "Invalid role",
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(id, { role: changedrole });

    if (!updatedUser) {
      res.json({
        message: "User not found",
      });
      return;
    }

    res.json({
      message: "User role updated successfully",
    });
  } catch (error) {
    console.log("error in updating role by admin", error);
    res.json({
      message: "Something went wrong",
    });
  }
});

export default route;
