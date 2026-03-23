"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.listUsers = exports.getUserByName = exports.getUserById = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const createUser = async (user) => {
    const stmt = db_1.default.prepare("INSERT INTO Users (username, password, role) VALUES (?, ?, ?)");
    const info = stmt.run(user.username, user.password, user.role);
    return {
        id: Number(info.lastInsertRowid),
        ...user,
    };
};
exports.createUser = createUser;
const getUserById = async (id) => {
    const stmt = db_1.default.prepare("SELECT * FROM Users WHERE id = ?");
    const user = stmt.get(id);
    return user || null;
};
exports.getUserById = getUserById;
const getUserByName = async (username) => {
    const stmt = db_1.default.prepare("SELECT * FROM Users WHERE username = ?");
    const user = stmt.get(username);
    return user || null;
};
exports.getUserByName = getUserByName;
const listUsers = async () => {
    const stmt = db_1.default.prepare("SELECT * FROM Users");
    const users = stmt.all();
    return users;
};
exports.listUsers = listUsers;
const updateUser = async (id, data) => {
    const existingUser = await (0, exports.getUserById)(id);
    if (!existingUser)
        return null;
    const updatedUser = {
        ...existingUser,
        ...data,
    };
    const stmt = db_1.default.prepare('UPDATE Users SET username = ? , password = ? , role = ? WHERE id = ?');
    stmt.run(updatedUser.username, updatedUser.password, updatedUser.role, id);
    return updatedUser;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const stmt = db_1.default.prepare('DELETE FROM Users WHERE id = ?');
    stmt.run(id);
    return { message: 'User was delete' };
};
exports.deleteUser = deleteUser;
