import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authService } from './auth.service';
import { signupSchema, loginSchema } from './auth.validators';
import { env } from '@config/env';
import { prisma } from '@config/db';

export const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const data = signupSchema.parse(req.body);
      const user = await authService.signup(
        data.name,
        data.email,
        data.password
      );

      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data.email, data.password);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  refresh: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token' });
    }

    try {
      const decoded = jwt.verify(refreshToken, env.REFRESH_SECRET) as any;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const newAccessToken = jwt.sign(
        { userId: user.id, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      return res.json({ accessToken: newAccessToken });

    } catch {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
};