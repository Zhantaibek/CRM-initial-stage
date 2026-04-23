import { Request, Response } from "express";
import { asyncHandler } from "shared/utils/asyncHandler";
import { authService } from "./auth.service";
import { AuthRequest } from "@common/middlewares/auth.middleware";

export const authController = {

  signup: asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.signup(
      req.body.name,
      req.body.email,
      req.body.password
    );

    res.status(201).json(user);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const tokens = await authService.login(
      req.body.email,
      req.body.password
    );

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
};