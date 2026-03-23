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
exports.deleteDeal = exports.updateDeal = exports.listDeals = exports.getDealById = exports.createDeal = void 0;
const DealModel = __importStar(require("../models/dealModel"));
const createDeal = async (req, res) => {
    try {
        const deal = await DealModel.createDeal(req.body);
        res.status(201).json(deal);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create deal', detail: err });
    }
};
exports.createDeal = createDeal;
const getDealById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deal = await DealModel.getDealById(id);
        res.json(deal);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch deal', detail: err });
    }
};
exports.getDealById = getDealById;
const listDeals = async (req, res) => {
    try {
        const deals = await DealModel.listDeals();
        res.json(deals);
    }
    catch (err) {
        res.status(500).json({ message: 'failed to get deals', detail: err });
    }
};
exports.listDeals = listDeals;
const updateDeal = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedDeal = await DealModel.updateDeal(id, req.body);
        if (!exports.updateDeal)
            return res.status(404).json({ error: 'Deal not found' });
        res.json(updatedDeal);
    }
    catch (err) {
        res.status(500).json({ message: "failed to update deal", details: err });
    }
};
exports.updateDeal = updateDeal;
const deleteDeal = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = DealModel.deleteDeal(id);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: 'failed to delete deal', detail: err });
    }
};
exports.deleteDeal = deleteDeal;
