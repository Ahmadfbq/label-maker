import { Router } from "express";
import { MenusController } from "../controllers/menus";

export const menusRouter = Router();

menusRouter.get("/", MenusController.getAll);
menusRouter.get("/:id", MenusController.getById);

menusRouter.post("/", MenusController.create);
menusRouter.put("/:id", MenusController.update);
menusRouter.delete("/:id", MenusController.delete);