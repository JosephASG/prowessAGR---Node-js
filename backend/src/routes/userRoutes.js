import { Router } from "express";
import fileUpload from "express-fileupload";
import * as userController from "../controllers/userController.js";

const router = Router();

//for login user
router.post("/login", userController.loginUser);
router.put(
  "/update/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/uploads",
  }),
  userController.updateUser
);
router.post(
  "/register",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/uploads",
  }),
  userController.postUser
);
router.get("/all", userController.getUser);
router.get("/user/:id", userController.getUserById);

export default router;
