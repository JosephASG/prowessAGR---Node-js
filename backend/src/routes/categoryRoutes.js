import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = Router();

// Para buscar u obtener categoría de la base de datos
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

export default router;
