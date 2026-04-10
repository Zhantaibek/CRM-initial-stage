import { Request, Response } from 'express'
import { orderService } from './order.service'

export const orderController = {
  createOrder: async (req: Request, res: Response) => {
    try {
      const { userId, productIds } = req.body
      const order = await orderService.createOrder(userId, productIds)
      res.status(201).json(order)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  },

  getOrders: async (_req: Request, res: Response) => {
    try {
      const orders = await orderService.getOrders()
      res.status(200).json(orders)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  },

  getOrderById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) return res.status(400).json({ message: 'Invalid order id' })
      const order = await orderService.getOrderById(id)
      res.status(200).json(order)
    } catch (err: any) {
      res.status(404).json({ message: err.message })
    }
  },

  deleteOrder: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) return res.status(400).json({ message: 'Invalid order id' })
      await orderService.deleteOrder(id)
      res.status(204).send()
    } catch (err: any) {
      res.status(404).json({ message: err.message })
    }
  }
}