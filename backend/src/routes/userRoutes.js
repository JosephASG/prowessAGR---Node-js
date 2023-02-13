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
router.get("/all", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.delete("/delete/:id", userController.deleteUser);

export default router;
