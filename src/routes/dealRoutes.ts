import { Router } from "express";
import * as DealController from '../controllers/dealController'

const router = Router()

router.post('/', DealController.createDeal)
router.get('/', DealController.listDeals)
router.get('/:id' , DealController.getDealById)
router.put('/:id',DealController.updateDeal)
router.delete('/:id', DealController.deleteDeal)

export default router