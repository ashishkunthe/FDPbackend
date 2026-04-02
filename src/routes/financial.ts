import { Request, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { financialInputs } from "../types/financial";
import { Finance } from "../models/Financial";

const route = Router();

interface RequestExtended extends Request {
  userId: string;
  role: string;
}

route.post("/records", authMiddleware as any, async (req, res) => {
  const request = req as RequestExtended;

  const userId = request.userId;
  const role = request.role;

  if (role !== "ADMIN") {
    res.json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }

  try {
    const inputs = financialInputs.safeParse(req.body);

    if (!inputs.success) {
      res.json({
        message: "Invalid inputs",
      });
      return;
    }

    const { amount, category, date, notes, type } = inputs.data;

    const record = await Finance.create({
      amount,
      category,
      date,
      notes,
      type,
      createdBy: userId,
    });

    if (!record) {
      res.json({
        message: "Record not created try again",
      });
      return;
    }

    res.json({
      message: "Record created successfully",
      id: record._id,
    });
  } catch (error) {
    console.log("Error in creating records", error);
    res.json({
      message: "Something went wrong",
    });
  }
});

route.get("/records", authMiddleware as any, async (req, res) => {
  const request = req as RequestExtended;
  const role = request.role;

  try {
    const records = await Finance.find();

    if (records.length === 0) {
      res.json({
        message: "No records created by Admin",
      });
      return;
    }

    res.json({
      message: "The records are here",
      role: role,
      records: records,
    });
  } catch (error) {
    console.log("Error in getting records", error);
    res.json({
      message: "Something went wrong",
    });
  }
});

route.patch("/records/:id", authMiddleware as any, async (req, res) => {
  // @ts-ignore
  const request = req as RequestExtended;

  const inputs = financialInputs.safeParse(req.body);
  const userId = request.userId;
  const role = request.role;

  const { id } = req.params;

  if (role !== "ADMIN") {
    res.json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }

  if (!inputs.success) {
    res.json({
      message: "Invalid inputs",
    });
    return;
  }

  try {
    const { amount, category, date, notes, type } = inputs.data;
    const record = await Finance.findByIdAndUpdate(
      id,
      {
        amount,
        category,
        date,
        notes,
        type,
      },
      { new: true }
    );

    if (!record) {
      res.json({
        message: "record not found",
      });
      return;
    }

    res.json({
      message: "Updated suceefully",
      record: record,
    });
  } catch (error) {
    console.log("Error in updating record");
    res.json({
      message: "something went wrong",
    });
  }
});

route.delete("/records/:id", authMiddleware as any, async (req, res) => {
  const { id } = req.params;
  //   @ts-ignore
  const request = req as RequestExtended;

  const role = request.role;

  if (role !== "ADMIN") {
    res.json({
      message: "Access denied only admin can performe this action",
    });
    return;
  }

  try {
    const record = await Finance.findByIdAndDelete(id);

    if (!record) {
      res.json({
        message: "Rcord with the id not found",
      });
      return;
    }

    res.json({
      message: "Record deleted",
    });
  } catch (error) {
    console.log("Error in deleting the record");
    res.json({
      message: "Something went wrong",
    });
  }
});
export default route;
