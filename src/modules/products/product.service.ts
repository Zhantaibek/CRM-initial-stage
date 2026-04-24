import { productRepository } from "./product.repository";
import { AppError } from "core/errors/app-error";

export const productService = {
  create: async (name: string, price: number) => {
    return productRepository.create({ name, price });
  },

  getAll: async () => {
    return productRepository.findAll();
  },

  getById: async (id: number) => {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  },

  update: async (id: number, data: any) => {
    return productRepository.update(id, data);
  },

  delete: async (id: number) => {
    return productRepository.delete(id);
  },
};
