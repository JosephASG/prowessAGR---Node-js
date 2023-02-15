import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = Router();

//for fetch or get category from db --- PULL CATEGORY
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

export default router;
