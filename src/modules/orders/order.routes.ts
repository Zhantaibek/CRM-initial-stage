import { Router } from 'express'
import { orderController } from './order.controller'

const router = Router()

router.post('/', orderController.createOrder)
router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.delete('/:id', orderController.deleteOrder)

export default router