import { Router } from "express";
import * as orderController from "../controllers/orderController.js";

const OrderRouter = Router();

OrderRouter.post("/", orderController.createOrder);
OrderRouter.get("/userorders/:id", orderController.getOrders);
OrderRouter.get("/:id", orderController.getOrder);
OrderRouter.get("/mine/:id", orderController.getMyOrders);

export default OrderRouter;
