import { orderRepository } from './order.repository';
import { AppError } from 'core/errors/app-error';

export const orderService = {

  createOrder: async (userId: number, productIds: number[]) => {
    if (!userId || !productIds.length) {
      throw new AppError('userId and products required', 400);
    }
    return orderRepository.create(userId, productIds);
  },

  getOrders: async () => {
    return orderRepository.findAll();
  },

  getOrderById: async (orderId: number, userId: number, role: string) => {
    const order = await orderRepository.findById(orderId);

    if (!order) throw new AppError('Order not found', 404);

    if (role !== 'admin' && order.userId !== userId) {
      throw new AppError('Forbidden', 403);
    }

    return order;
  },

  deleteOrder: async (id: number) => {
    const order = await orderRepository.findById(id);
    if (!order) throw new AppError('Order not found', 404);

    return orderRepository.delete(id);
  },

  getMyOrders: async (userId: number) => {
    return orderRepository.findUserId(userId);
  },
};