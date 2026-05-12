import { prisma } from '@config/db';

export const postRepository = {
  findAll: () => {
    return prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  findById: (id: number) => {
    return prisma.post.findUnique({ where: { id } });
  },

  create: (data: { title: string; excerpt: string; content: string; category: string; readTime: string }) => {
    return prisma.post.create({ data });
  },

  update: (id: number, data: { title?: string; excerpt?: string; content?: string; category?: string; readTime?: string }) => {
    return prisma.post.update({ where: { id }, data });
  },

  delete: (id: number) => {
    return prisma.post.delete({ where: { id } });
  },
};