import { Request, Response } from "express";
import * as ClientModel from "../models/clientModel";


export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await ClientModel.createClient(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: "failed to create client", detail: err });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const client = await ClientModel.getClientById(id);
    if (!client) return res.status(404).json({ error: "client not found" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "failed to get client", detail: err });
  }
};

export const listClients = async (req: Request, res: Response) => {
  try {
    const clients = await ClientModel.listClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "failed fetch clients", detail: err });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateClient = await ClientModel.updateClient(id, req.body);
    if (!updateClient)
      return res.status(404).json({ error: "Client not found" });
    res.json(updateClient);
  } catch (err) {
    res.status(500).json({ message: "not found client", detail: err });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const client = await ClientModel.deleteClient(id);
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "failed to delete", detail: err });
  }
};
