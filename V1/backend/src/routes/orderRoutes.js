import { Router } from "express";
import * as orderController from "../controllers/orderController.js";

const router = Router();

router.post("/", orderController.createOrder);
router.get("/mine/:id", orderController.getMyOrders);
router.get("/userorders/:id", orderController.getOrders); 
router.get("/:id", orderController.getOrder);
router.put("/update/:id",orderController.Paid); //Ruta para pagar el producto
router.put("/delivered/:id",orderController.delivered); //Ruta para entregar el producto
router.put("/slug/:id",orderController.updateSlug);
router.delete("/delete/:id", orderController.deleteOrden);

export default router;
