import { z } from "zod";

export const financialInputs = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(3).max(50),
  date: z.string(),
  notes: z.string().min(3).max(50),
});
