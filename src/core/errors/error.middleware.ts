import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";

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
  }

  console.error("ERROR:", err);

  res.status(statusCode).json({
    success: false,
    message,
  });
};