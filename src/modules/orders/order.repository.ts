import {prisma} from '@config/db'


export const orderRepository = {
  
  create : (userId : number , productId : number[]) => {
    return prisma.order.create({
      data : {
        userId,
        products : {
          create : productId.map(id => ({
            productId : id 
          }))
        }
      },
      include : {
        products : {
          include : {product : true}
        }
      }
    })
  },

  findAll : () => {
    return prisma.order.findMany({
      include : {
        products : {
          include : {
            product : true
          }
        },
        user : true
      }
    })
  },

  findById : (id : number) => {
    return prisma.order.findUnique({
      where : {id},

      include : {
        products : {
          include: {product : true}
        }
      }
    })
  },

  findUserId : (userId : number) => {
    return prisma.order.findMany ({
      where : {userId},

      include : {
        products : {
          include : {product : true}
        }
      }

    })
  },

  delete : (id : number) => {
    return prisma.order.delete ({
      where : {id}
    })
  }
}