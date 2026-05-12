import { Router } from 'express';
import { postController } from './post.controller';
import { authMiddleware } from 'core/middlewares/auth.middleware';
import { roles } from 'core/middlewares/roles.middleware';

const router = Router();

router.get('/', postController.getAll);
router.get('/:id', postController.getById);
router.post('/', authMiddleware, roles('admin'), postController.create);
router.put('/:id', authMiddleware, roles('admin'), postController.update);
router.delete('/:id', authMiddleware, roles('admin'), postController.delete);

export default router;