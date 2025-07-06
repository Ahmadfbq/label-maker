import { Router } from "express"
import { LabelController } from "../controllers/label"

export const labelRouter = Router()

labelRouter.get("/:id", LabelController.getById)

labelRouter.post("/", LabelController.create)