import { Response } from "express";
import { userService } from "./user.service";
import { asyncHandler } from "core/utils/asyncHandler";
import { AuthRequest } from "core/middlewares/auth.middleware";

export const userController = {
  getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
    const users = await userService.getAll();

    res.status(200).json({
      success: true,
      data: users,
    });
  }),

  delete: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.delete(Number(req.params.id));

    res.status(200).json({
      success: true,
      data: user,
    });
  }),

  getById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.getById(Number(req.params.id));

    res.status(200).json({ user });
  }),

  getMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.getById(req.userId!);

    res.status(200).json({
      success: true,
      data: user,
    });
  }),

  updateMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.updateMe(req.userId!, req.body);

    res.status(200).json({
      success: true,
      data: user,
    });
  }),
};
