import { Request , Response } from 'express'
import * as DealModel from '../models/dealModel'



export const createDeal = async (req : Request , res : Response) => {
    try {
     const deal = await DealModel.createDeal(req.body)
     res.status(201).json(deal)
    }
    catch(err) {
        res.status(500).json({error : 'Failed to create deal',detail : err})
    }
}

export const getDealById = async (req : Request , res : Response) => {
    try {
      const id = Number(req.params.id)
      const deal = await DealModel.getDealById(id)
      res.json(deal)
    }
    catch (err) {
      res.status(500).json({message : 'Failed to fetch deal' , detail : err})
    }
}

export const listDeals = async (req : Request , res : Response) => {
    try {
      const deals = await DealModel.listDeals()
      res.json(deals)
    }
    catch (err) {
      res.status(500).json({message : 'failed to get deals' , detail : err})
    }
}

export const updateDeal = async (req : Request , res : Response) => {
    try {
      const id = Number(req.params.id)
      const updatedDeal = await DealModel.updateDeal(id , req.body)
      if (!updateDeal) return res.status(404).json({error : 'Deal not found'})
      res.json(updatedDeal)
    }
    catch (err) {
      res.status(500).json({message : "failed to update deal" , details : err})
    }
}

export const deleteDeal = async (req : Request , res : Response) => {
    try {
      const id = Number(req.params.id)
      const result = DealModel.deleteDeal(id)
      res.json(result)
    }
    catch (err) {
      res.status(500).json({message : 'failed to delete deal' , detail : err})
    }
}