import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth-request';

export const roleMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.role) {
      return res.status(401).json({ message: 'No role' });
    }

    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};