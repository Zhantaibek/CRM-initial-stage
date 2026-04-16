import { prisma } from '@config/db'

export const orderService = {
  
  createOrder: async (userId: number, productIds: number[]) => {
  if (!userId || !productIds?.length) {
    throw new Error('userId and at least one productId are required');
  }

  
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds }
    }
  });

  if (products.length !== productIds.length) {
    throw new Error('Some products not found');
  }

  
  return prisma.order.create({
    data: {
      userId,
      products: {
        create: productIds.map(id => ({
          productId: id
        }))
      }
    },
    include: {
      products: {
        include: {
          product: true
        }
      }
    }
  });
},

  
  getOrders: async () => {
   return prisma.order.findMany({
    include: {
      products: {
        include: {
          product: true
        }
      },
      user: true
    }
  });
  },


  getOrderById: async (orderId: number, userId: number, role: string) => {
    const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      products: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    throw new Error('Order not found');
  }

  
  if (role !== 'admin' && order.userId !== userId) {
    throw new Error('Forbidden');
  }

  return order;
  },

    
  deleteOrder: async (id: number) => {
    const order = await prisma.order.findUnique({ where: { id } })
    if (!order) throw new Error('Order not found')
    return prisma.order.delete({ where: { id } })
  },

  getMyOrders : async (userId : number) => {
    return prisma.order.findMany({
      include : {
        products: {
          include : {
            product : true
          }
        }
      }
    })
  }
}