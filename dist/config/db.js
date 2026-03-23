"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default('crm.db');
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER,
  email TEXT
);

CREATE TABLE IF NOT EXISTS Deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client INTEGER NOT NULL,
  assignedUserId INTEGER NOT NULL,
  status TEXT NOT NULL,
  createdAt TEXT,
  FOREIGN KEY (client) REFERENCES Clients(id),
  FOREIGN KEY (assignedUserId) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dealId INTEGER NOT NULL,
  description TEXT NOT NULL,
  dueDate TEXT,
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (dealId) REFERENCES Deals(id)
);
`);
exports.default = db;
