import express from "express";
import userRoutes from "@modules/users/user.routes";
import productRoutes from "@modules/products/product.routes";
import orderRoutes from "@modules/orders/order.routes";
import authRoutes from "@modules/auth/auth.routes";
import { env } from "@config/env";
import { errorMiddleware } from "core/errors/error.middleware";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);
app.use(errorMiddleware);
app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});
