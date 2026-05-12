import { Request, Response } from 'express';
import { asyncHandler } from 'core/utils/asyncHandler';
import { postService } from './post.service';

export const postController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const posts = await postService.getAll();
    res.json(posts);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const post = await postService.getById(Number(req.params.id));
    res.json(post);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const post = await postService.create(req.body);
    res.status(201).json(post);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const post = await postService.update(Number(req.params.id), req.body);
    res.json(post);
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await postService.delete(Number(req.params.id));
    res.json({ message: 'Post deleted' });
  }),
};