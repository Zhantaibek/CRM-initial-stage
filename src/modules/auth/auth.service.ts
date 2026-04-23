import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "@config/env";
import { authRepository } from "./auth.repository";

export const authService = {

  signup: async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return authRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
  },

  login: async (email: string, password: string) => {
    const user = await authRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
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

  if (!user) {
    throw new Error("User not found");
  }

  await authRepository.logout(userId);

  return { message: "Logged out successfully" };
},

  refresh: async (token: string) => {
    const decoded = jwt.verify(token, env.REFRESH_SECRET) as any;

    const user = await authRepository.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return { accessToken: newAccessToken };
  },
};