"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.listClients = exports.getClientByName = exports.getClientById = exports.createClient = void 0;
const db_1 = __importDefault(require("../config/db"));
const createClient = async (client) => {
    const stmt = db_1.default.prepare("INSERT INTO Clients (name, age, email) VALUES (?, ?, ?)");
    const info = stmt.run(client.name, client.age, client.email);
    return {
        id: Number(info.lastInsertRowid),
        ...client,
    };
};
exports.createClient = createClient;
const getClientById = async (id) => {
    const stmt = db_1.default.prepare("SELECT * FROM Clients WHERE id = ?");
    const client = stmt.get(id);
    return client || null;
};
exports.getClientById = getClientById;
const getClientByName = async (name) => {
    const stmt = db_1.default.prepare("SELECT * FROM Clients WHERE name = ?");
    const client = stmt.get(name);
    return client || null;
};
exports.getClientByName = getClientByName;
const listClients = async () => {
    const stmt = db_1.default.prepare("SELECT * FROM Clients");
    const clients = stmt.all();
    return clients;
};
exports.listClients = listClients;
const updateClient = async (id, data) => {
    const existingClient = await (0, exports.getClientById)(id);
    if (!existingClient)
        return null;
    const updatedClient = { ...existingClient, ...data };
    const stmt = db_1.default.prepare("UPDATE Clients SET name = ?, age = ?, email = ? WHERE id = ?");
    stmt.run(updatedClient.name, updatedClient.age, updatedClient.email, id);
    return updatedClient;
};
exports.updateClient = updateClient;
const deleteClient = async (id) => {
    const stmt = db_1.default.prepare("DELETE FROM Clients WHERE id = ?");
    stmt.run(id);
    return { message: "Client was deleted" };
};
exports.deleteClient = deleteClient;
