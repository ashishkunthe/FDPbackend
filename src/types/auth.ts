import { z } from "zod";

export const registerType = z.object({
  username: z.string().min(3).max(16),
  email: z.email(),
  password: z.string().min(8).max(16),
});

export const loginType = z.object({
  email: z.email(),
  password: z.string(),
});
