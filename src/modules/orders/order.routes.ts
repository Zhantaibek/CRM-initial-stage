import { Router } from "express";
import { orderController } from "./order.controller";
import { authMiddleware } from "core/middlewares/auth.middleware";
import { roles } from "core/middlewares/roles.middleware";
import { validate } from "core/middlewares/validate.middleware";
import { createOrderSchema, orderIdSchema } from "./order.validators";

const router = Router();

router.post("/", authMiddleware, validate(createOrderSchema), orderController.createOrder);
router.get("/", authMiddleware, roles("admin"), orderController.getOrders);
router.get("/my", authMiddleware, orderController.getMyOrder);
router.get("/:id", authMiddleware, validate(orderIdSchema), orderController.getOrderById);
router.delete("/:id", authMiddleware, roles("admin"), orderController.delete);

export default router;