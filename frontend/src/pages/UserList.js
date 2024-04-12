import React, { useState, useEffect, useCallback } from "react";
import { Container, Col, Card, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getUsers, deleteUser } from "../services/user";

const useUsers = (token) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const response = await getUsers(token);
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

    fetchUsers();
  }, [token]);

  const deleteUserById = async (id) => {
    try {
      const response = await deleteUser(token, id);
      if (response.status === 200) {
        setUsers((currentUsers) =>
          currentUsers.filter((user) => user.id !== id)
        );
      } else {
        console.error("Failed to delete user:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return [users, deleteUserById];
};

const UserList = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [users, deleteUserById] = useUsers(token);

  const handleEditUsers = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = useCallback(
    (id) => {
      deleteUserById(id);
    },
    [deleteUserById]
  );

  return (
    <>

      <h1 style={{textAlign:"center"}}>Lista de Usuarios</h1>

      <Container className="mt-4 d-flex justify-content-center">
        <Row xs={1} md={2} lg={3} className="g-4">
          {users.map((user) => (
            <Col key={user.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{`${user.name} ${user.secondName} ${user.lastName} ${user.secondLastName}`}</Card.Title>
                  <Card.Text>
                    Dirección: {user.province} {user.city} {user.address}
                    <br />
                    Correo: {user.email}
                    <br />
                    Cédula: {user.nCedula}
                    <br />
                    Teléfono: {user.cellphone}
                    <br />
                    Tipo: {user.roleUser}
                  </Card.Text>
                  <Button
                    variant="info"
                    onClick={() => handleEditUsers(user)}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {userToEdit && (
          <p style={{ color: "white" }}>Se quiere editar xd, hagan el modal</p>
        )}
      </Container>
    </>
  );
};

export default UserList;
