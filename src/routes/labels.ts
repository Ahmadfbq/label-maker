import { Router } from "express"
import { LabelController } from "../controllers/labels"

export const labelsRouter = Router()

labelsRouter.get("/:id", LabelController.getById)

labelsRouter.post("/", LabelController.create)
labelsRouter.put("/:id", LabelController.update)
labelsRouter.delete("/:id", LabelController.delete)