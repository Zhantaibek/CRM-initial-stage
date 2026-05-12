import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { env } from "@config/env";
import { authRepository } from "./auth.repository";
import { AppError } from "core/errors/app-error";
import { sendVerificationEmail } from "core/utils/mailer";

export const authService = {

  signup: async (name: string, email: string, password: string) => {
    const existing = await authRepository.findByEmail(email);
    if (existing) throw new AppError("Email already in use", 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();

    const user = await authRepository.createUser({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await sendVerificationEmail(email, verificationToken);

    return { message: "Регистрация успешна. Проверьте email для подтверждения." };
  },

  login: async (email: string, password: string) => {
    const user = await authRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new AppError("Invalid credentials", 401);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError("Invalid credentials", 401);

    if (!user.isVerified) {
      throw new AppError("Please verify your email before logging in", 403);
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    await authRepository.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  },

  logout: async (userId: number) => {
    const user = await authRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    await authRepository.logout(userId);
    return { message: "Logged out successfully" };
  },

  refresh: async (token: string) => {
    try {
      const decoded = jwt.verify(token, env.REFRESH_SECRET) as any;
      const user = await authRepository.findById(decoded.userId);

      if (!user || user.refreshToken !== token) {
        throw new AppError("Invalid refresh token", 401);
      }

      const newAccessToken = jwt.sign(
        { userId: user.id, role: user.role },
        env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new AppError("Invalid refresh token", 401);
    }
  },

  verifyEmail: async (token: string) => {
    const user = await authRepository.findByVerificationToken(token);

    if (!user) {
      throw new AppError("Invalid or expired verification token", 400);
    }

    await authRepository.verifyUser(user.id);

    return { message: "Email verified successfully. You can now log in." };
  },
};