import { prisma } from '@config/db'

export const orderService = {
  
  createOrder: async (userId: number, productIds: number[]) => {
    if (!userId || !productIds?.length) {
      throw new Error('userId and at least one productId are required')
    }

    return prisma.order.create({
      data: {
        userId,
        products: {
          create: productIds.map(id => ({ productId: id }))
        }
      },
      include: { products: true }
    })
  },

  
  getOrders: async () => {
    return prisma.order.findMany({
      include: { products: true, user: true }
    })
  },

  
  getOrderById: async (id: number) => {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { products: true, user: true }
    })
    if (!order) throw new Error('Order not found')
    return order
  },

    
  deleteOrder: async (id: number) => {
    const order = await prisma.order.findUnique({ where: { id } })
    if (!order) throw new Error('Order not found')
    return prisma.order.delete({ where: { id } })
  }
}