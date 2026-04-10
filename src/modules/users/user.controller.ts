import { Request ,Response } from "express";
import { userService } from "./user.service";

export const userController = {
    createUser: async (req : Request , res : Response) => {

        try {
          const { name , email} = req.body
          const user = await userService.createUser(name,email)
          res.status(201).json(user)
        }
        catch (err : any) {
          res.status(400).json({message : err.message})
        }
    },

    getUser : async (req : Request , res : Response) => {
        const users = await userService.getUsers()
        res.json(users)
    },

    getUserById : async (req : Request , res :Response) => {
        const id = Number(req.params.id)
        const user = await userService.getUserById(id)

        if (!user) return res.status(404).json ({message : 'User not found'})
        res.json(user)
    },

    updateUser : async (req : Request , res : Response) => {
        const id = Number(req.params.id)
        try {
          const user = await userService.updateUser(id, req.body)
          res.json (user)
        } 
        catch (err:any) {
          res.status(400).json({message : err.message})
        }
    },
    
    deleteUser : async (req : Request , res : Response) => {
        const id = Number(req.params.id)
        try {
          const user = await userService.deleteUser(id)
          res.json(user)
        }
        catch (err : any) {
          res.status(400).json({message : err.message})
        }
    }

}