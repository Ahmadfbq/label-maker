import { Router } from "express";
import { IngredientController } from "../controllers/ingredient";


export const ingredientRouter = Router()

ingredientRouter.get("/", IngredientController.getAll)
ingredientRouter.get("/:id", IngredientController.getById)
ingredientRouter.post("/", IngredientController.create)