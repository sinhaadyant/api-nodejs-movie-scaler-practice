import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, config.jwtSecret, (err, decoded: any) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.body.userId = decoded.id;
    next();
  });
};
