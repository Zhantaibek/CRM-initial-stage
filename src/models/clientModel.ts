
import db from "../config/db";
import { Client } from "../types/client";


export const createClient = async (client: Omit<Client, "id">): Promise<Client> => {
  const stmt = db.prepare(
    "INSERT INTO Clients (name, age, email) VALUES (?, ?, ?)"
  );

  const info = stmt.run(client.name, client.age, client.email);

  return {
    id: Number(info.lastInsertRowid),
    ...client,
  };
};


export const getClientById = async (id: number): Promise<Client | null> => {
  const stmt = db.prepare("SELECT * FROM Clients WHERE id = ?");
  const client = stmt.get(id) as Client | undefined;
  return client || null;
};


export const getClientByName = async (name: string): Promise<Client | null> => {
  const stmt = db.prepare("SELECT * FROM Clients WHERE name = ?");
  const client = stmt.get(name) as Client | undefined;
  return client || null;
};


export const listClients = async (): Promise<Client[]> => {
  const stmt = db.prepare("SELECT * FROM Clients");
  const clients = stmt.all() as Client[];
  return clients;
};


export const updateClient = async (
  id: number,
  data: Partial<Omit<Client, "id">>
): Promise<Client | null> => {
  const existingClient = await getClientById(id);
  if (!existingClient) return null;

  const updatedClient: Client = { ...existingClient, ...data };

  const stmt = db.prepare(
    "UPDATE Clients SET name = ?, age = ?, email = ? WHERE id = ?"
  );
  stmt.run(updatedClient.name, updatedClient.age, updatedClient.email, id);

  return updatedClient;
};


export const deleteClient = async (id: number): Promise<{ message: string }> => {
  const stmt = db.prepare("DELETE FROM Clients WHERE id = ?");
  stmt.run(id);

  return { message: "Client was deleted" };
};