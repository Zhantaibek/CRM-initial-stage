import { prisma } from "@config/db";

export const authRepository = {
  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  findById: (id: number) => {
    return prisma.user.findUnique({ where: { id } });
  },

  createUser: (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    return prisma.user.create({
      data: {
        ...data,
        role: "user",
      },
    });
  },

  saveRefreshToken: (userId: number, token: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    });
  },

  logout: (userId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
},
};