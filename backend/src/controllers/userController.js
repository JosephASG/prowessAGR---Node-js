import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { uploadImage, deleteImage } from "../utils/cloudinaryConfig.js";
import fs from "fs-extra";

//LOGIN USER
export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //if user exists and password is correct send user data
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
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
    return res.status(400).json({ message: "All fields are required" });
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
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET
export const getUser = async (req, res) => {
  try {
    // search all users in DB
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//GET BY ID
export const getUserById = async (req, res) => {
  try {
    // obtein user to the id from params and search user by id in DB
    const user = await User.findById(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//PUT
export const updateUser = async (req, res) => {
  try {
    // obtein user to the id from params and search user by id in DB
    const { id: userId } = req.params;
    // if user not found, return error
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // update user data with data
    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    user.phone = req.body.phone;
    // if password is provided, hash it and update user
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password);
    }
    // if image is provided, delete old image and upload new image to cloudinary
    if (req.files?.image) {
      if (user.image?.public_id) {
        await deleteImage(user.image.public_id);
      }
      const result = await uploadImage(req.files.image.tempFilePath);
      user.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    // save user in database and return updated user
    const updateUser = await user.save();

    // return updated user to client
    return res.status(200).json({ user: updateUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
