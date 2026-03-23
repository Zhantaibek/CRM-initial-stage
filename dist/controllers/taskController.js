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
exports.deleteTask = exports.updateTask = exports.listTasks = exports.getTaskById = exports.createTask = void 0;
const TaskModel = __importStar(require("../models/taskModel"));
const createTask = async (req, res) => {
    try {
        const task = await TaskModel.createTask(req.body);
        res.status(201).json(task);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to create task', details: err });
    }
};
exports.createTask = createTask;
const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const task = await TaskModel.getTaskById(id);
        res.json(task);
    }
    catch (err) {
        res.status(500).json({ error: "failed to fetch task", details: err });
    }
};
exports.getTaskById = getTaskById;
const listTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.listTasks();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to fetch tasks ', details: err });
    }
};
exports.listTasks = listTasks;
const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedTask = await TaskModel.updateTask(id, req.body);
        res.json(updatedTask);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to update task', details: err });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await TaskModel.deleteTask(id);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to delete task', details: err });
    }
};
exports.deleteTask = deleteTask;
