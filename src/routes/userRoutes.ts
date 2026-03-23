import { Router } from "express";
import * as UserController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", UserController.createUser);
router.get("/", UserController.listUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);


router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  UserController.deleteUser
);

export default router;