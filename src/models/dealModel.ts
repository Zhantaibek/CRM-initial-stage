
import db from "../config/db";
import { Deal } from "../types/deal";


export const createDeal = async (deal: Omit<Deal, "id">): Promise<Deal> => {
  const stmt = db.prepare(
    "INSERT INTO Deals (client, assignedUserId, status, createdAt) VALUES (?, ?, ?, ?)"
  );

  const info = stmt.run(
    deal.client,
    deal.assignedUserId,
    deal.status ?? "open",
    deal.createdAt ?? new Date().toISOString()
  );

  return {
    id: Number(info.lastInsertRowid),
    ...deal,
  };
};


export const getDealById = async (id: number): Promise<Deal | null> => {
  const stmt = db.prepare("SELECT * FROM Deals WHERE id = ?");
  const deal = stmt.get(id) as Deal | undefined;
  return deal || null;
};


export const listDeals = async (): Promise<Deal[]> => {
  const stmt = db.prepare("SELECT * FROM Deals");
  const deals = stmt.all() as Deal[];
  return deals;
};


export const updateDeal = async (
  id: number,
  data: Partial<Omit<Deal, "id">>
): Promise<Deal | null> => {
  const existingDeal = await getDealById(id);
  if (!existingDeal) return null;

  const updatedDeal: Deal = { ...existingDeal, ...data };

  const stmt = db.prepare(
    "UPDATE Deals SET clientId = ?, assignedUserId = ?, status = ?, createdAt = ? WHERE id = ?"
  );

  stmt.run(
    updatedDeal.client,
    updatedDeal.assignedUserId,
    updatedDeal.status ?? "open",
    updatedDeal.createdAt ?? new Date().toISOString(),
    id
  );

  return updatedDeal;
};


export const deleteDeal = async (id: number): Promise<{ message: string }> => {
  const stmt = db.prepare("DELETE FROM Deals WHERE id = ?");
  stmt.run(id);

  return { message: "Deal was deleted" };
};