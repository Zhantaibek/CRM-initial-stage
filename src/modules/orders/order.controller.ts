import { Request, Response } from "express";
import { orderService } from "./order.service";
import { AuthRequest } from '@common/types/auth-request';


export const orderController = {
  createOrder: async (req: AuthRequest, res: Response) => {
  try {
    const order = await orderService.createOrder(
      req.userId!,
      req.body.productIds
    );

    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
},

  getOrders: async (_req: Request, res: Response) => {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json(orders);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  getOrderById: async (req: AuthRequest, res: Response) => {
  try {
    const orderId = Number(req.params.id);

    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    console.log("userId:", req.userId);
    console.log("role:", req.role);

    const order = await orderService.getOrderById(
      orderId,
      req.userId!,
      req.role!
    );

    res.status(200).json(order);

  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
},

  deleteOrder: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id))
        return res.status(400).json({ message: "Invalid order id" });
      await orderService.deleteOrder(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  getMyOrders: async (req: AuthRequest, res: Response) => {
  try {
    const userId = (req as any).userId;

    const orders = await orderService.getMyOrders(userId);

    res.json(orders);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
};
