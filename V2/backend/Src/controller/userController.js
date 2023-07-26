import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import HTTP_STATUS from "http-status-codes";
import admin from "firebase-admin";
import { uploadImageUser, deleteImageUser } from "../utils/cloudinaryConfig.js";
import fs from "fs-extra";

// Configurar Firebase Admin SDK con tus credenciales
const serviceAccount = require('./ruta/de/tu/credencial.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tu-proyecto.firebaseio.com'
});

// Referencia a la base de datos de Firebase
const db = admin.firestore();

// Inicio de sesion de usuario
export const loginUser = async (req, res) => {
  try {
    const JWT_SECRET = crypto.randomBytes(64).toString("hex");
    const snapshot = await db.collection('users').where('email', '==', req.body.email).get();
    if (snapshot.empty) {
      return res.status(401).send({ message: "Email o Contraseña Inválidos" });
    }
    
    const user = snapshot.docs[0].data();
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
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
    } else {
      res.status(401).send({ message: "Email o Contraseña Inválidos" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Crear usuario
export const postUser = async (req, res) => {
  try {
    if (
      (!req.body.name,
      !req.body.email,
      !req.body.password,
      !req.body.address,
      !req.body.phone)
    ) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Todos los campos son requeridos" });
    }

    const snapshot = await db.collection('users').where('email', '==', req.body.email).get();
    if (!snapshot.empty) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      address: req.body.address,
      phone: req.body.phone,
      image: {
        public_id: req.body.public_id || "prowess/seller_tlpqnm",
        secure_url:
          req.body.secure_url ||
          "https://res.cloudinary.com/primalappsje/image/upload/v1671478343/primal/seller_tlpqnm.png",
      },
      isAdmin: false,
      commission: 0,
    };

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      newUser.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    const docRef = await db.collection('users').add(newUser);
    newUser._id = docRef.id;
    delete newUser.password;
    return res.status(HTTP_STATUS.CREATED).json(newUser);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al crear el usuario" });
  }
};

// Metodo GET
export const getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];
    snapshot.forEach((doc) => {
      const user = doc.data();
      user._id = doc.id;
      delete user.password;
      users.push(user);
    });
    return res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Error al obtener la lista de usuarios" });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const docRef = db.collection('users').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });
    }
    const user = doc.data();
    user._id = doc.id;
    delete user.password;
    return res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Error al obtener el usuario" });
  }
};

// Metodo PUT para actualizar usuarios
export const updateUser = async (req, res) => {
  try {
    const docRef = db.collection('users').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });
    }
    const user = doc.data();
    if (!user.isAdmin) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "No tiene permisos para actualizar este usuario" });
    }

    const updateUser = {
      commission: req.body.commission ? req.body.commission : user.commission,
      name: req.body.name ? req.body.name : user.name,
      email: req.body.email ? req.body.email : user.email,
      address: req.body.address ? req.body.address : user.address,
      phone: req.body.phone ? req.body.phone : user.phone,
    };

    if (req.body.password) {
      updateUser.password = bcrypt.hashSync(req.body.password);
    }

    if (req.files?.image) {
      if (user.image?.public_id) {
        await deleteImageUser(user.image.public_id);
      }
      const result = await uploadImageUser(req.files.image.tempFilePath);
      updateUser.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    await docRef.update(updateUser);
    return res.status(HTTP_STATUS.OK).json(updateUser);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al actualizar el usuario" });
  }
};

// Metodo DELETE
export const deleteUser = async (req, res) => {
  try {
    const docRef = db.collection('users').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });
    }
    const user = doc.data();
    if (!user.isAdmin) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "No tiene permisos para eliminar este usuario" });
    }

    if (user.image?.public_id) {
      await deleteImageUser(user.image.public_id);
    }

    await docRef.delete();
    return res.status(HTTP_STATUS.OK).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al eliminar el usuario" });
  }
};
