import { Request, Response } from 'express';
import { authService } from './auth.service';
import { signupSchema, loginSchema } from './auth.validators';

export const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const data = signupSchema.parse(req.body);
      const user = await authService.signup(data.name, data.email, data.password);
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
  }
};