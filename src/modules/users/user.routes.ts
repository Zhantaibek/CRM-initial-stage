import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "@common/middlewares/auth.middleware";
import { roles } from "@common/middlewares/roles.middleware";
import { validate } from "@common/middlewares/validate.middleware";
import { updateMeSchema } from "./user.validation";

const router = Router();


router.get(
  "/",
  authMiddleware,
  roles("admin"),
  userController.getAll
);

router.delete(
  "/:id",
  authMiddleware,
  roles("admin"),
  userController.delete
);


router.get(
  "/me",
  authMiddleware,
  userController.getMe
);

router.patch(
  "/me",
  authMiddleware,validate(updateMeSchema),
  userController.updateMe
);

export default router;