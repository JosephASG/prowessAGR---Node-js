import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './CategoriesPage.css';
import ModalAddCategory from '../components/ModalAddCategory';
import ModalEditCategory from '../components/ModalEditCategory';
import { getCategories, deleteCategory, updateCategory } from '../services/category';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Loading from "components/General/Loading";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    getCategory(token);
  }, [token]);

  const getCategory = async (token) => {
    try {
      setIsLoading(true);
      const res = await getCategories(token);
      const data = res.data;
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar las categorías', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    const response = await deleteCategory(categoryId, token);
    if (response.status === 200) {
      setCategories(categories.filter((category) => category.id !== categoryId));
    } else {
      console.error('Error al eliminar la categoría en el servidor');
    }
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  const handleEdit = (editedCategory) => {
    setCategoryToUpdate(editedCategory);
  };

  const handleUpdateCategory = useCallback(async () => {
    if (!categoryToUpdate) {
      return;
    }
    const response = await updateCategory(categoryToUpdate, token);
    if (response && response.status === 200) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryToUpdate.id ? categoryToUpdate : category
        )
      );
      setIsEditModalOpen(false);
    } else {
      console.error('Error al guardar los cambios en el servidor');
    }
  }, [categoryToUpdate, token]);

  useEffect(() => {
    if (categoryToUpdate) {
      handleUpdateCategory();
    }
  }, [categoryToUpdate, handleUpdateCategory]);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  let sortedAndFilteredCategories = [...categories];

  if (sortCriteria) {
    sortedAndFilteredCategories.sort((a, b) =>
      a[sortCriteria] > b[sortCriteria] ? 1 : -1
    );
  }

  if (filterCategory) {
    sortedAndFilteredCategories = sortedAndFilteredCategories.filter(
      (category) =>
        category.nombre.toLowerCase().includes(filterCategory.toLowerCase())
    );
  }

  const totalPages = Math.ceil(sortedAndFilteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const categoriesToDisplay = sortedAndFilteredCategories.slice(startIndex, endIndex);

  return (
    <Container fluid>
      {isLoading && <Loading />}
      <h1 style={{ textShadow: "none", fontFamily: "Roboto", WebkitTextStroke: "1.5px white", color: "white" }}>LISTA DE CATEGORÍAS</h1>
      <div className='btn-add-container'>
        <Button onClick={handleOpenModal} className='btn-add-product' style={{ textShadow: "none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white" }}>Agregar Categoría</Button>
      </div>
      <Row>
        <ModalAddCategory isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        <ModalEditCategory
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          categoryToEdit={categoryToEdit}
          handleEdit={handleEdit}
        />
        <Col>
          <div className="filter-row">
            <Form.Label style={{ textShadow: "none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white" }}>Filtrar por Categoría:</Form.Label>
            <Form.Control
              type="text"
              value={filterCategory}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="header-row-category-list">
            <b onClick={() => handleSort('nombre')} style={{ textShadow: "none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white" }}>Nombre</b>
            <b style={{ textShadow: "none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white" }}>Descripción</b>
            <b style={{ textShadow: "none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white" }}>Acciones</b>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="container-products" style={{ color: 'black', margin: '10px 50px' }}>
            {categoriesToDisplay.map((category) => (
              <div
                className={`category ${selectedCategoryId === category.id ? 'selected' : ''}`}
                key={category.id}
                onClick={() => handleSelectCategory(category.id)}
                style={{ backgroundColor: selectedCategoryId === category.id ? 'blue' : 'white' }}
              >
                <div>{category.nombreCategoria}</div>
                <div>{category.descripcionCategoria}</div>
                <div className='actions-container'>
                  <FontAwesomeIcon
                    className="fa-icon-edit"
                    icon={faPenToSquare}
                    onClick={() => handleEditCategory(category)}
                  />
                  <FontAwesomeIcon
                    className="fa-icon-trash"
                    icon={faTrash}
                    onClick={() => handleDelete(category.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="pagination">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span style={{ color: "white" }}>{currentPage}</span>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryList;
