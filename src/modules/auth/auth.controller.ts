import { Request, Response } from "express";
import { asyncHandler } from "core/utils/asyncHandler";
import { authService } from "./auth.service";
import { AuthRequest } from "core/middlewares/auth.middleware";

export const authController = {
  signup: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.signup(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.status(201).json(result);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const tokens = await authService.login(req.body.email, req.body.password);
    res.json(tokens);
  }),

  logout: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await authService.logout(req.userId!);
    res.json(result);
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = await authService.refresh(refreshToken);
    res.json(tokens);
  }),

  verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      throw new Error("Token is required");
    }

    const result = await authService.verifyEmail(token);
    res.json(result);
  }),
};