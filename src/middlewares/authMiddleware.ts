import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestExtended extends Request {
  userId: string;
  role: string;
}

export function authMiddleware(
  req: RequestExtended,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  try {
    if (!token) {
      res.json({
        message: "no token found",
      });
      return;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      role: string;
    };

    if (!decode) {
      res.json({
        message: "Invalid credentials",
      });
    }

    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (error) {
    console.log("error in middleware", error);
    res.json({
      message: "Somthing went wrong",
    });
  }
}
