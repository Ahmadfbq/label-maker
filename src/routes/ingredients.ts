import { Router } from "express";
import { IngredientController } from "../controllers/ingredients";

// Router for handling ingredient-related routes
export const ingredientsRouter = Router()

ingredientsRouter.get("/", IngredientController.getAll)
ingredientsRouter.get("/:id", IngredientController.getById)

ingredientsRouter.post("/", IngredientController.create)
ingredientsRouter.put("/:id", IngredientController.update) 
ingredientsRouter.delete("/:id", IngredientController.delete)