import { userRepository } from "./user.repository";
import { AppError } from "core/errors/app-error";

export const userService = {
  getAll: async () => {
    return userRepository.findAll();
  },

  getById: async (id: number) => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  
  updateMe: async (userId: number, data: any) => {
    const allowedData = {
      name: data.name,
      email: data.email,
    };

    return userRepository.update(userId, allowedData);
  },

  // 👑 admin
  delete: async (id: number) => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return userRepository.delete(id);
  },
};
