"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.listUsers = exports.getUserById = exports.createUser = void 0;
const UserModel = __importStar(require("../models/userModel"));
const createUser = async (req, res) => {
    try {
        const user = await UserModel.createUser(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to created user", details: err });
    }
};
exports.createUser = createUser;
const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await UserModel.getUserById(id);
        if (!user)
            return res.status(404).json({ error: "user not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "failed to fetch user", details: err });
    }
};
exports.getUserById = getUserById;
const listUsers = async (req, res) => {
    try {
        const users = await UserModel.listUsers();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "failed to fetch user", details: err });
    }
};
exports.listUsers = listUsers;
const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedUser = await UserModel.updateUser(id, req.body);
        if (!exports.updateUser)
            return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: "failed to update user", details: err });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await UserModel.deleteUser(id);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "failed to delete user", details: err });
    }
};
exports.deleteUser = deleteUser;
