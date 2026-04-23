import { orderRepository } from './order.repository';

export const orderService = {

  createOrder: async (userId: number, productIds: number[]) => {
    if (!userId || !productIds.length) {
      throw new Error('userId and products required');
    }

    return orderRepository.create(userId, productIds);
  },

  getOrders: async () => {
    return orderRepository.findAll();
  },

  getOrderById: async (orderId: number, userId: number, role: string) => {
    const order = await orderRepository.findById(orderId);

    if (!order) throw new Error('Order not found');

    if (role !== 'admin' && order.userId !== userId) {
      throw new Error('Forbidden');
    }

    return order;
  },

  deleteOrder: async (id: number) => {
    const order = await orderRepository.findById(id);
    if (!order) throw new Error('Order not found');

    return orderRepository.delete(id);
  },

  getMyOrders: async (userId: number) => {
  return orderRepository.findUserId(userId);
}
};