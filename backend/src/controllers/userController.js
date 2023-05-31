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

//Inicio de sesion de usuario
export const loginUser = async (req, res) => {
  const JWT_SECRET = crypto.randomBytes(64).toString("hex");
  const user = await User.findOne({ email: req.body.email });
  //si el usuario existe y la contraseña es correcta enviar datos de usuario
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      // devolver datos de usuario y token
       res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin,
        commission: user.commission,  
      });
      return;
    }
  }
  res.status(401).send({ message: "Email o Contraseña Inválidos" });
};

//Crear usuario
export const postUser = async (req, res) => {
  // Comprueba si todos los campos están rellenados y envía un error si no lo están
  if (
    (!req.body.name,
    !req.body.email,
    !req.body.password,
    !req.body.address,
    !req.body.phone))
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Todos los campos son requeridos" });

  try {
    // crear un nuevo usuario con los datos del cuerpo de la solicitud
    const newUser = new User(req.body);
    newUser.image = {
      public_id: req.body.public_id || "prowess/seller_tlpqnm",
      secure_url:
        req.body.secure_url ||
        "https://res.cloudinary.com/primalappsje/image/upload/v1671478343/primal/seller_tlpqnm.png",
    };
    // Creacion y cifrado de la contaseña
    newUser.password = bcrypt.hashSync(req.body.password);
      // Guardar la imagen en cloudinary BD
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
    // Guardar el usuario en la base de datos y enviar la respuesta
    const user = await newUser.save();
    return res.status(HTTP_STATUS.CREATED).json(user);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  }
};

//METODO GET
export const getUsers = async (req, res) => {
  try {
    //Obtener todos los usuarios de la base de datos
    const users = await User.find();
    //Devuelve todos los usuarios de la respuesta
    return res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    //Si se produce un error, devuélvalo en la respuesta
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

//OBTENER POR ID
export const getUserById = async (req, res) => {
  try {
    //Obtener usuario por id de la base de datos
    const user = await User.findById(req.params.id);
    // Si el usuario no se encuentra en la base de datos
    if (!user) {
      // Devolver el estado 404 y el mensaje de error
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "user not found" });
    }
    // Devuelve el estado 200 y el objeto de usuario
    return res.status(HTTP_STATUS.OK).send(user);
  } catch (error) {
    // Devolver el estado 404 y el mensaje de error
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
  }
};

// Metodo put para verificar usuarios
export const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    // Si el usuario no se encuentra, devuelva el error
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "User not found" });
    }
    // Actualizar datos del usuario con datos
    user.commission = req.body.commission? req.body.commission : user.commission;
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.address = req.body.address ? req.body.address : user.address;
    user.phone = req.body.phone ? req.body.phone : user.phone;
    // si se cambia la contraseña, haga un cifrado hash y guárdela en la base de datos
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password);
    }
    // si se carga la imagen, guárdela en cloudinary y guarde el enlace en la base de datos y elimine la imagen anterior
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

    // Guardar el usuario en la base de datos y enviar la respuesta
    const updatedUser = await user.save();
    return res.status(HTTP_STATUS.OK).json(updatedUser);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//Metodo eliminar
export const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    // Si el usuario no se encuentra registrado, devolver un mensaje de error
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Usuario no encontrado" });
    }
    //Validacion del usuario
    const currentUser = await User.findById(userId);
    if (!currentUser.isAdmin)
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: "No tiene permisos para eliminar este usuario" });
    //Eliminar usuario
    await user.remove();
    return res.status(HTTP_STATUS.OK).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR) 
      .json({ message: error.message });
  }
};
