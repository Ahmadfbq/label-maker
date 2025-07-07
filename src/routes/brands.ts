import { Router } from "express";
import { BrandsController } from "../controllers/brands";

export const brandsRouter = Router();

brandsRouter.get("/", BrandsController.getAll);
brandsRouter.get("/:id", BrandsController.getById);

brandsRouter.post("/", BrandsController.create);
brandsRouter.put("/:id", BrandsController.update);
brandsRouter.delete("/:id", BrandsController.delete);
