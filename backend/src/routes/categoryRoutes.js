import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = Router();

//para obtener una categoría de la base de datos --- PULL CATEGORY
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById); 
 
export default router;
