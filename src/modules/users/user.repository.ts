import { prisma } from "@config/db";

export const userRepository = {
  findAll: () => {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  findById: (id: number) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  delete : (id : number) => {
    return prisma.user.delete({
      where : {id}
    })
  }, 

  update : (id : number , data : {name? : string , surname? : string ,  email? : string ,password? : string }) => {
    return prisma.user.update({
      where : {id},
      data
    })
  },

};