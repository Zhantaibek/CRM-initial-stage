import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";
import { logger } from "core/utils/logger";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    // Операционные ошибки — это ожидаемо, логируем как warn
    logger.warn(`[${statusCode}] ${message} — ${req.method} ${req.path}`);
  } else {
    // Неожиданные ошибки — логируем как error с полным стектрейсом
    logger.error(`Unexpected error: ${err.message}\n${err.stack}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};