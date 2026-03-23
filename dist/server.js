"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const dealRoutes_1 = __importDefault(require("./routes/dealRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", userRoutes_1.default);
app.use("/clients", clientRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
app.use("/deals", dealRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
