import { Router } from "express"
import { LabelController } from "../controllers/labels"

export const labelRouter = Router()

labelRouter.get("/:id", LabelController.getById)

labelRouter.post("/", LabelController.create)
labelRouter.put("/:id", LabelController.update)
labelRouter.delete("/:id", LabelController.delete)