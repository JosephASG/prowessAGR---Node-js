import React, { useState, useEffect, useCallback } from "react"; // Import React and necessary hooks
import { Container, Col, Row, Button, Spinner, Alert } from "react-bootstrap"; // Import Bootstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import { getUsers, deleteUser, updateUser } from "../services/user"; // Import user-related service functions
import EditUserModal from "./EditUserModal"; // Import EditUserModal component
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import DeleteConfirmationModal component
import UserSearchBox from "./UserSearchBox"; // Import UserSearchBox component
import "./UserList.css"; // Import CSS file for styling

// Custom hook to handle user-related logic
const useUsers = (token) => {
  // States to handle users, loading, errors, and all users
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // State to store all users

  // Effect to fetch users from the server when token changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return; // If token is not present, return
      setIsLoading(true); // Set loading state to true
      try {
        const response = await getUsers(token); // Fetch users using token
        if (response.data && response.data.users) {
          // If response contains users data
          setUsers(response.data.users); // Set users state
          setAllUsers(response.data.users); // Save all users
        } else {
          setError("Error: getUsers response data is missing or invalid"); // Set error message
          console.error("Error: getUsers response data is missing or invalid:", response); // Log error
        }
      } catch (error) {
        setError("Error fetching users"); // Set error message
        console.error("Error fetching users:", error); // Log error
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchUsers(); // Call fetchUsers function
  }, [token]); // Dependency array with token

  // Function to delete a user by their ID
  const deleteUserById = async (id) => {
    try {
      const response = await deleteUser(token, id); // Delete user using token and user ID
      if (response.status === 200) {
        // If deletion is successful
        // Filter out the deleted user from the users list
        setUsers((currentUsers) =>
          currentUsers.filter((user) => user.id !== id)
        );
        setAllUsers((currentUsers) =>
          currentUsers.filter((user) => user.id !== id)
        );
      } else {
        setError("Failed to delete user"); // Set error message
        console.error("Failed to delete user:", response); // Log error
      }
    } catch (error) {
      setError("Error deleting user"); // Set error message
      console.error("Error deleting user:", error); // Log error
    }
  };

  // Function to update a user by their ID
  const updateUserById = async (userData) => {
    try {
      const response = await updateUser(token, userData); // Update user using token and user data
      if (response.status === 200) {
        // If update is successful
        // Update the users list with the updated data
        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === userData.id ? userData : user
          )
        );
        setAllUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === userData.id ? userData : user
          )
        );
      } else {
        setError("Failed to update user"); // Set error message
        console.error("Failed to update user:", response); // Log error
      }
    } catch (error) {
      setError("Error updating user"); // Set error message
      console.error("Error updating user:", error); // Log error
    }
  };

  // Function to search users
  const searchUsers = (query) => {
    if (!query) {
      setUsers(allUsers); // If the query is empty, show all users
    } else {
      setUsers(allUsers.filter((user) =>
        user.nCedula.toLowerCase().includes(query.toLowerCase())|| 
        user.name.toLowerCase().includes(query.toLowerCase())
      ));
    }
  };

  // Return users, loading status, error, and related functions
  return { users, isLoading, error, deleteUserById, updateUserById, searchUsers };
};

// Main component for the user list
const UserList = () => {
  // States to handle token, modals, and users to edit or delete
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  // Destructure data from useUsers custom hook
  const { users, isLoading, error, deleteUserById, updateUserById, searchUsers } = useUsers(token);

  // Function to handle editing a user
  const handleEditUser = (user) => {
    setUserToEdit(user); // Set user to edit
    setIsEditModalOpen(true); // Open edit modal
  };

  // Save the changes of the edited user
  const handleSaveUser = (updatedUser) => {
    updateUserById(updatedUser); // Update user
    setIsEditModalOpen(false); // Close edit modal
  };

  // Confirm user deletion
  const handleDeleteConfirmation = useCallback((user) => {
    setUserToDelete(user); // Set user to delete
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  }, []);

  // Confirm user deletion and close the modal
  const handleDeleteConfirmed = useCallback((id) => {
    deleteUserById(id); // Delete user
    setIsDeleteModalOpen(false); // Close delete confirmation modal
  }, [deleteUserById]); // Dependency array with deleteUserById function

  return (
    <>
      <h1 style={{ textAlign: "center" , color: "white"}}>Lista de Usuarios</h1>

      <Container className="mt-4 container-user-list">
        <UserSearchBox onSearch={searchUsers} />

        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <div className="header-row-user-list">
              <div>Nombre</div>
              <div>Apellido</div>
              <div>Dirección</div>
              <div>Correo</div>
              <div>Cédula</div>
              <div>Teléfono</div>
              <div>Tipo</div>
              <div>Acciones</div>
            </div>
            <Row className="container-users">
              {users.map((user) => (
                <Col key={user.id} className="user">
                  <div>{user.name} {user.secondName} </div>
                  <div>{user.lastName} {user.secondLastName}</div>
                  <div>{user.province} {user.city} {user.address}</div>
                  <div>{user.email}</div>
                  <div>{user.nCedula}</div>
                  <div>{user.cellphone}</div>
                  <div>{user.roleUser}</div>
                  <div>
                    <Button
                      variant="info"
                      onClick={() => handleEditUser(user)}
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteConfirmation(user)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      {userToEdit && (
        <EditUserModal
          show={isEditModalOpen}
          onHide={() => setIsEditModalOpen(false)}
          user={userToEdit}
          onSave={handleSaveUser}
        />
      )}

      {userToDelete && (
        <DeleteConfirmationModal
          user={userToDelete}
          show={isDeleteModalOpen}
          onHide={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default UserList;
