import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Finance } from "../models/Financial";

const route = Router();

route.get("/dashboard/summary", authMiddleware as any, async (req, res) => {
  try {
    const financialReport = await Finance.find();

    if (financialReport.length === 0) {
      res.json({
        message: "No report created yet",
      });
      return;
    }

    let totalIncome = 0;
    let totalExpense = 0;

    for (let i = 0; i < financialReport.length; i++) {
      if (financialReport[i]?.type === "EXPENSE") {
        totalExpense += Number(financialReport[i]?.amount);
      } else if (financialReport[i]?.type === "INCOME") {
        totalIncome += Number(financialReport[i]?.amount);
      }
    }

    res.json({
      message: "Here is the summary of report",
      totalExpense: totalExpense,
      totalIncome: totalIncome,
      netBalance: totalIncome - totalExpense,
    });
  } catch (error) {
    console.log("Error in getting dashboard summary ");
    res.json({
      message: "Something went wrong",
    });
  }
});

export default route;
