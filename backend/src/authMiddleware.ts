import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any; // Attach user data to the request
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return; // Ensure function exits after sending response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach user data
    next(); // Call next() to proceed
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
    return;
  }
};