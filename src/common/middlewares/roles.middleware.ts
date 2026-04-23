import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const roles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};