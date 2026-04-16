import { Router } from "express";
import { productController } from "./product.controller";
import { authMiddleware } from "@common/middlewares/auth.middleware";
import { roleMiddleware } from "@common/middlewares/roles.middleware";

const router = Router();


router.get(
  "/",
  authMiddleware,
  productController.getProducts
);


router.get(
  "/:id",
  authMiddleware,
  productController.getProductById
);


router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.createProduct
);


router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.updateProduct
);


router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.deleteProduct
);

export default router;