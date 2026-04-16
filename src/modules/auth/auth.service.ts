import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "@config/env";
import { prisma } from "@config/db";

export const authService = {
  signup: async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { name, email, password: hashedPassword, role: "user"},
    });
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      throw new Error("invalid credential");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("invalid credential");
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({ userId: user.id }, env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    await prisma.user.update({
  where: { id: user.id },
  data: {
    refreshToken
  }
});

    return { accessToken, refreshToken };
  },
};
