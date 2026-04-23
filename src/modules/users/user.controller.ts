import { Response } from "express";
import { userService } from "./user.service";
import { asyncHandler } from "shared/utils/asyncHandler";
import { AuthRequest } from "@common/middlewares/auth.middleware";

export const userController = {

  // 👑 ADMIN — получить всех пользователей
  getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
    const users = await userService.getAll();

    res.status(200).json({
      success: true,
      data: users,
    });
  }),

  // 👑 ADMIN — удалить пользователя
  delete: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.delete(Number(req.params.id));

    res.status(200).json({
      success: true,
      data: user,
    });
  }),

  // 👤 USER — получить себя
  getMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.getById(req.userId!);

    res.status(200).json({
      success: true,
      data: user,
    });
  }),

  // 👤 USER — обновить себя
  updateMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.updateMe(
      req.userId!,
      req.body
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  }),
};