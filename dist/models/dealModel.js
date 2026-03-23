"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeal = exports.updateDeal = exports.listDeals = exports.getDealById = exports.createDeal = void 0;
const db_1 = __importDefault(require("../config/db"));
const createDeal = async (deal) => {
    const stmt = db_1.default.prepare("INSERT INTO Deals (client, assignedUserId, status, createdAt) VALUES (?, ?, ?, ?)");
    const info = stmt.run(deal.client, deal.assignedUserId, deal.status ?? "open", deal.createdAt ?? new Date().toISOString());
    return {
        id: Number(info.lastInsertRowid),
        ...deal,
    };
};
exports.createDeal = createDeal;
const getDealById = async (id) => {
    const stmt = db_1.default.prepare("SELECT * FROM Deals WHERE id = ?");
    const deal = stmt.get(id);
    return deal || null;
};
exports.getDealById = getDealById;
const listDeals = async () => {
    const stmt = db_1.default.prepare("SELECT * FROM Deals");
    const deals = stmt.all();
    return deals;
};
exports.listDeals = listDeals;
const updateDeal = async (id, data) => {
    const existingDeal = await (0, exports.getDealById)(id);
    if (!existingDeal)
        return null;
    const updatedDeal = { ...existingDeal, ...data };
    const stmt = db_1.default.prepare("UPDATE Deals SET clientId = ?, assignedUserId = ?, status = ?, createdAt = ? WHERE id = ?");
    stmt.run(updatedDeal.client, updatedDeal.assignedUserId, updatedDeal.status ?? "open", updatedDeal.createdAt ?? new Date().toISOString(), id);
    return updatedDeal;
};
exports.updateDeal = updateDeal;
const deleteDeal = async (id) => {
    const stmt = db_1.default.prepare("DELETE FROM Deals WHERE id = ?");
    stmt.run(id);
    return { message: "Deal was deleted" };
};
exports.deleteDeal = deleteDeal;
