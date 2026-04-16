import { Router } from 'express'
import { orderController } from './order.controller'
import { authMiddleware } from '@common/middlewares/auth.middleware'

const router = Router()

router.post('/',authMiddleware, orderController.createOrder)
router.get('/', authMiddleware ,orderController.getOrders)
router.get('/my', authMiddleware, orderController.getMyOrders);
router.get('/:id',authMiddleware, orderController.getOrderById)
router.delete('/:id', authMiddleware ,orderController.deleteOrder)

export default router