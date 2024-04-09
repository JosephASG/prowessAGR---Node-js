import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./UserList.css";
import { getUsers, deleteUser } from "../services/user";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [UserToEdit, setUserToEdit] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleUsers(token);
    }
  }, [token]);

  const handleEditUsers = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleUsers = async (token) => {
    try {
      const response = await getUsers(token);
      console.log(response);
      if (response.data && response.data.users) {
        setUsers(response.data.users);
      } else {
        console.error(
          "Error: getUsers response data is missing or invalid:",
          response
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await deleteUser(token, id);
    console.log(response);
    if (response.status === 200) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container-user-list">
      <h1 style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "1.5px white", color: "white"}}>LISTA DE USUARIOS</h1>
      <div className="btn-add-container"></div>
      <div className="header-row-user-list">
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Nombre</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Direccion</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Correo</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Cedula</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Telefono</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Tipo</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Imagen</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: "0.1px white", color: "white"}}>Acciones</b>
      </div>
      <div className="container-users">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <div>
              {user.nombreUsuario} {user.nombreUsuarioS} {user.apellidoUsuario}{" "}
              {user.nombreUsuarioS}
            </div>
            <div>{user.direccionUsuario}</div>
            <div>{user.correoUsuario}</div>
            <div>{user.cedulaUsuario}</div>
            <div>{user.telefonoUsuario}</div>
            <div>{user.categoriaUsuario}</div>
            <div>
              <img
                src={user.imagenUsuario}
                alt={user.nombreUsuario}
                className="user-image-list"
              />
            </div>
            <div className="actions">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="edit"
                onClick={() => handleEditUsers(user)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="delete"
                onClick={() => handleDeleteUser(user.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
