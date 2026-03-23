import { Request , Response } from "express";
import * as TaskModel from '../models/taskModel'
 

export const createTask = async (req : Request , res : Response) => {
    try {
     const task = await TaskModel.createTask(req.body)
     res.status(201).json(task)
    }
    catch(err) {
        res.status(500).json({error : 'failed to create task' , details : err})
    }
}

export const getTaskById = async (req : Request , res : Response) => {
    try {
      const id = Number(req.params.id)
      const task = await TaskModel.getTaskById(id)
      res.json(task)
    }
    catch(err) {
      res.status(500).json({error : "failed to fetch task" , details : err})
    }
}

export const listTasks = async (req : Request , res : Response) => {
    try {
      const tasks = await TaskModel.listTasks()
      res.json(tasks)
    }
    catch(err) {
      res.status(500).json({error : 'failed to fetch tasks ' , details : err})
    }
}

export const updateTask = async (req : Request , res : Response) => {
    try {
      const id = Number(req.params.id)
      const updatedTask = await TaskModel.updateTask(id , req.body)
      res.json(updatedTask)      
    }
    catch (err) {
      res.status(500).json({error : 'failed to update task' , details : err})
    }
}

export const deleteTask = async (req : Request , res : Response) => {
    try {
      const id = Number(req.params.id)
      const result = await TaskModel.deleteTask(id)
      res.json(result)
    }
    catch (err) {
      res.status(500).json({error : 'failed to delete task' ,details : err})
    }
}