import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "core/middlewares/auth.middleware";
import { roles } from "core/middlewares/roles.middleware";
import { validate } from "core/middlewares/validate.middleware";
import { updateMeSchema, userIdSchema } from "./user.validation";

const router = Router();


router.get("/me", authMiddleware, userController.getMe);
router.patch("/me", authMiddleware, validate(updateMeSchema), userController.updateMe);


router.get("/", authMiddleware, roles("admin"), userController.getAll);
router.get("/:id", authMiddleware, roles("admin"), validate(userIdSchema), userController.getById);
router.delete("/:id", authMiddleware, roles("admin"), userController.delete);

export default router;