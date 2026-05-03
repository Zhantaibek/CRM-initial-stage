import express from "express";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "@modules/users/user.routes";
import productRoutes from "@modules/products/product.routes";
import orderRoutes from "@modules/orders/order.routes";
import authRoutes from "@modules/auth/auth.routes";
import { errorMiddleware } from "core/errors/error.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);

app.use(errorMiddleware);

export default app;