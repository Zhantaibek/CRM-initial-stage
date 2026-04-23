import { Response } from "express";
import { orderService } from "./order.service";
import { asyncHandler } from "shared/utils/asyncHandler";
import { AuthRequest } from "@common/middlewares/auth.middleware";

export const orderController = {

  createOrder: asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productIds } = req.body;

  const order = await orderService.createOrder(
    req.userId!,
    productIds
  );

  res.status(201).json(order);
}),

getOrders: asyncHandler(async (req: AuthRequest, res: Response) => {
  const orders = await orderService.getOrders();
  res.status(200).json(orders);
}),

getOrderById: asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await orderService.getOrderById(
    Number(req.params.id),
    req.userId!,
    req.role!
  );

  res.status(200).json(order);
}),

delete: asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await orderService.deleteOrder(
    Number(req.params.id)
  );

  res.status(200).json(order);
}),

getMyOrder: asyncHandler(async (req: AuthRequest, res: Response) => {
  const orders = await orderService.getMyOrders(req.userId!);
  res.status(200).json(orders);
})

}