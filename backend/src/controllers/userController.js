import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {
  uploadImage,
  deleteImage,
  updateImage,
} from "../utils/cloudinaryConfig.js";
import fs from "fs-extra";

//LOGIN USER
export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //if user exists
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
  if (
    (!req.body.name,
    !req.body.email,
    !req.body.password,
    !req.body.address,
    !req.body.phone)
  )
    return res.status(400).json({ message: "All fields are required" });
  try {
    const newUser = new User(req.body);
    newUser.image = {
      public_id: req.body.public_id || "prowess/seller_tlpqnm",
      secure_url:
        req.body.secure_url ||
        "https://res.cloudinary.com/primalappsje/image/upload/v1671478343/primal/seller_tlpqnm.png",
    };
    newUser.password = bcrypt.hashSync(req.body.password);
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
    newUser.password = bcrypt.hashSync(req.body.password);
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET
export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//GET BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//PUT
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    },
  });
  if (!user) {
    return res.status(400).send({
      message: `Error, This user with id: ${id}, does not exist`,
    });
  }

  return res.status(200).json({
    message: `User was updated succesfully`,
  });
};
