// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config"; // Assuming your JWT secret is in config

interface IPayload {
  id: string;
}

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as IPayload; // Decode the token
    req.user = { id: decoded.id }; // Attach user id to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
