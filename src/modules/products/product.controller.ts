import { Request, Response } from "express";
import { asyncHandler } from "core/utils/asyncHandler";
import { productService } from "./product.service";

export const productController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.create(req.body.name, req.body.price);

    res.status(201).json({ product });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const products = await productService.getAll();
    res.status(200).json({ products });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.getById(Number(req.params.id));
    res.status(200).json({ product });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.update(
      Number(req.params.id),
      req.body
    );
    res.status(200).json({ product });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.delete(Number(req.params.id));
    res.status(200).json({ product });
  }),
};
