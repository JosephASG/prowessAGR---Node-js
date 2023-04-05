import { Router } from "express";
import fileUpload from "express-fileupload";
import * as productController from "../controllers/productController.js";

const router = Router();

router.get("/seller/:id", productController.getProductBySellerId);
router.get("/product/:id", productController.getProductById);
router.post(
  "/add",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/uploads",
  }),
  productController.postProduct
);
router.get("/", productController.getProducts);
router.get("/detail/:id", productController.getProductBySlug);
router.put(
  "/update/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/uploads",
  }),
  productController.updateProduct
);
router.delete("/delete/:id", productController.deleteProduct);
export default router;
