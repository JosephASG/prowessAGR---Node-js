import { Router } from "express";
import * as orderController from "../controllers/orderController.js";

const router = Router();

router.post("/", orderController.createOrder);
router.get("/mine/:id", orderController.getMyOrders);
router.get("/userorders/:id", orderController.getOrders);
router.get("/:id", orderController.getOrder);

export default router;
