import { Request, Response, NextFunction } from "express";
 
export const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {

      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (req.user.role !== requiredRole) {
        return res.status(403).json({ error: "Access denied" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Role middleware error", detail: err });
    }
  };
};