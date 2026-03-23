"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.listTasks = exports.getTaskById = exports.createTask = void 0;
const db_1 = __importDefault(require("../config/db"));
const createTask = async (task) => {
    const stmt = db_1.default.prepare('INSERT INTO Tasks (dealId, description, dueDate, status) VALUES (?, ?, ?, ?)');
    const info = stmt.run(task.dealId, task.description, task.dueDate ?? null, task.status ?? 'pending');
    return { id: Number(info.lastInsertRowid), ...task };
};
exports.createTask = createTask;
const getTaskById = async (id) => {
    const stmt = db_1.default.prepare('SELECT * FROM Tasks WHERE id = ?');
    const task = stmt.get(id);
    return task || null;
};
exports.getTaskById = getTaskById;
const listTasks = async () => {
    const stmt = db_1.default.prepare('SELECT * FROM Tasks');
    return stmt.all();
};
exports.listTasks = listTasks;
const updateTask = async (id, data) => {
    const existingTask = await (0, exports.getTaskById)(id);
    if (!existingTask)
        return null;
    const updatedTask = { ...existingTask, ...data };
    const stmt = db_1.default.prepare('UPDATE Tasks SET dealId = ?, description = ?, dueDate = ?, status = ? WHERE id = ?');
    stmt.run(updatedTask.dealId, updatedTask.description, updatedTask.dueDate ?? null, updatedTask.status ?? 'pending', id);
    return updatedTask;
};
exports.updateTask = updateTask;
const deleteTask = async (id) => {
    const stmt = db_1.default.prepare('DELETE FROM Tasks WHERE id = ?');
    stmt.run(id);
    return { message: "Task was deleted" };
};
exports.deleteTask = deleteTask;
