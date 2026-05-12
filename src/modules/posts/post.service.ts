import { postRepository } from './post.repository';
import { AppError } from 'core/errors/app-error';

export const postService = {
  getAll: async () => {
    return postRepository.findAll();
  },

  getById: async (id: number) => {
    const post = await postRepository.findById(id);
    if (!post) throw new AppError('Post not found', 404);
    return post;
  },

  create: async (data: { title: string; excerpt: string; content: string; category: string; readTime: string }) => {
    return postRepository.create(data);
  },

  update: async (id: number, data: any) => {
    const post = await postRepository.findById(id);
    if (!post) throw new AppError('Post not found', 404);
    return postRepository.update(id, data);
  },

  delete: async (id: number) => {
    const post = await postRepository.findById(id);
    if (!post) throw new AppError('Post not found', 404);
    return postRepository.delete(id);
  },
};