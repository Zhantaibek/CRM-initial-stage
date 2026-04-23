import { Router } from "express";
import { productController } from "./product.controller";
import { authMiddleware } from "@common/middlewares/auth.middleware";
import { roles } from "@common/middlewares/roles.middleware";
import { validate } from "@common/middlewares/validate.middleware";

import { createProductSchema } from "./product.validators";

const router = Router();


router.get(
  "/",
  authMiddleware,
  productController.getAll
);


router.get(
  "/:id",
  authMiddleware,
  productController.getById
);


router.post(
  "/",
  authMiddleware,
  roles("admin"),validate(createProductSchema),
  productController.create
);


router.put(
  "/:id",
  authMiddleware,
  roles("admin"),
  productController.update
);


router.delete(
  "/:id",
  authMiddleware,
  roles("admin"),
  productController.delete
);

export default router;