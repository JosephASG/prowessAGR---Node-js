import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import HTTP_STATUS from "http-status-codes";
import User from "../models/userModel.js";
import {
  uploadImageUser,
  deleteImageUser
} from "../utils/cloudinaryConfig.js";
import fs from "fs-extra";

//LOGIN USER
export const loginUser = async (req, res) => {
  const JWT_SECRET = crypto.randomBytes(64).toString("hex");
  const user = await User.findOne({ email: req.body.email });
  //if user exists and password is correct send user data
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      // return user data and token
       res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin,
      });
      return;
    }
  }
  res.status(401).send({ message: "Email o Contraseña Inválidos" });
};

//CREATE USER
export const postUser = async (req, res) => {
  // Check if all fields are filled and send error if not filled
  if (
    (!req.body.name,
    !req.body.email,
    !req.body.password,
    !req.body.address,
    !req.body.phone)
  )
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "All fields are required" });

  try {
    // create a new user with the data from the request body
    const newUser = new User(req.body);
    newUser.image = {
      public_id: req.body.public_id || "prowess/seller_tlpqnm",
      secure_url:
        req.body.secure_url ||
        "https://res.cloudinary.com/primalappsje/image/upload/v1671478343/primal/seller_tlpqnm.png",
    };
    // Create a salt and hash the password
    newUser.password = bcrypt.hashSync(req.body.password);
    // save image to cloudinary
    if (req.files?.image) {
      if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        newUser.image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        await fs.unlink(req.files.image.tempFilePath);
      }
    }
    // save user to DB and send response
    const user = await newUser.save();
    return res.status(HTTP_STATUS.CREATED).json(user);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  }
};

//GET
export const getUsers = async (req, res) => {
  try {
    // Get all users from the database
    const users = await User.find();
    // Return all users in the response
    return res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    // If an error occurs, return it in the response
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

// GET BY ID
export const getUserById = async (req, res) => {
  try {
    // Get user by id from the database
    const user = await User.findById(req.params.id);
    // If user is not found in the database
    if (!user) {
      // Return 404 status and error message
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "user not found" });
    }
    // Return 200 status and user object
    return res.status(HTTP_STATUS.OK).send(user);
  } catch (error) {
    // Return 404 status and error message
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

//PUT
export const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    // if user not found, return error
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "User not found" });
    }
    // update user data with data
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.address = req.body.address ? req.body.address : user.address;
    user.phone = req.body.phone ? req.body.phone : user.phone;
    // if password is changed, hash it and save it to DB
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password);
    }
    // if image is uploaded, save it to cloudinary and save the link to DB and delete the old image
    if (req.files?.image) {
      if (user.image?.public_id) {
        await deleteImageUser(user.image.public_id);
      }
      const result = await uploadImageUser(req.files.image.tempFilePath);
      user.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    // save user to DB and send response
    const updatedUser = await user.save();
    return res.status(HTTP_STATUS.OK).json(updatedUser);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//DELETE
export const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    // if user not found, return error
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "User not found" });
    }
    // validate user
    const currentUser = await User.findById(userId);
    if (!currentUser.isAdmin)
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: "You don't have permission to delete this user" });
    // delete user
    await user.remove();
    return res.status(HTTP_STATUS.OK).json({ message: "User deleted" });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
