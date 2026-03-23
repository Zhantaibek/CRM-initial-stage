import { Request, Response } from "express";
import * as UserModel from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to created user", details: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await UserModel.getUserById(id);
    if (!user) return res.status(404).json({ error: "user not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch user", details: err });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.listUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch user", details: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await UserModel.updateUser(id, req.body);
    if (!updateUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "failed to update user", details: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await UserModel.deleteUser(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "failed to delete user", details: err });
  }
};
