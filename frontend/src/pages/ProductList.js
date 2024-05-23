import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.css";
import ModalAddProducts from "../components/ModalAddProducts";
import ModalEditProduct from "../components/ModalEditProduct";
import { getProductsFromApi, deleteProduct } from "../services/product";
import { getCategories } from "../services/category";
import { getSellers } from "../services/seller";
import Loading from "components/General/Loading";
import {
  Button,
  Table,
  Container,
  Image,
  Form,
} from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const WEBURL = process.env.REACT_APP_API_URL;

  const ITEMS_PER_PAGE = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [filterProduct, setFilterProduct] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    handleProducts(token);
    handleCategories(token);
    handleVendedores(token);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false); 
    }
  }, [products]);

  const handleProducts = async (token) => {
    const response = await getProductsFromApi(token);
    const data = await response.data;
    if (response.data) {
      setProducts(data);
    } else {
      console.log(response.data.message);
    }
  };

  const handleCategories = async (token) => {
    const response = await getCategories(token);
    if (response.data.categories) {
      setCategorias(response.data);
    } else {
      console.log(response.data.message);
    }
  };

  const handleVendedores = async (token) => {
    const response = await getSellers(token);
    if (response.data) {
      setVendedores(response.data);
    } else {
      console.log(response.error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const admintoken = localStorage.getItem("token");
      const response = await deleteProduct(productId, admintoken);
      console.log(response);
      if (response.data) {
        setProducts(products.filter((product) => product.id !== productId));
        
      } else {
        console.log(response.data.message);
      }
    } catch (error) {}
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleEdit = (editedProduct) => {
    setProductToUpdate(editedProduct);
  };

  useEffect(() => {
    if (productToUpdate) {
      handleUpdateProduct();
    }
  }, [productToUpdate]);

  const handleUpdateProduct = () => {
    if (!productToUpdate) {
      return;
    }

    console.log("productToUpdate:", productToUpdate.id);

    fetch(`${WEBURL}fb/producto/${productToUpdate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToUpdate),
    })
      .then((response) => {
        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productToUpdate.id ? productToUpdate : product
            )
          );
          setIsEditModalOpen(false);
        } else {
          console.error("Error al guardar los cambios en el servidor");
        }
      })
      .catch((error) => {
        console.error("Error de red al guardar los cambios", error);
      });
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortedColumn(criteria);
  };

  const handleFilter = (product) => {
    setFilterProduct(product);
  };

  let sortedAndFilteredProducts = [...products];

  if (sortCriteria) {
    sortedAndFilteredProducts.sort((a, b) =>
      a[sortCriteria] > b[sortCriteria] ? 1 : -1
    );
  }

  if (filterProduct) {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
      (product) =>
        product.pro_nombre &&
        (product.pro_nombre.toLowerCase().includes(filterProduct.toLowerCase()) ||
        product.pro_vendedor.toLowerCase().includes(filterProduct.toLowerCase()))
    );
  }

  const totalPages = Math.ceil(
    sortedAndFilteredProducts.length / productsPerPage
  );
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = sortedAndFilteredProducts.slice(startIndex,endIndex);

  return (
    <Container responsive>
       {isLoading && <Loading></Loading>}
      <h1
        style={{
          textShadow: "none",
          fontFamily: "Roboto",
          WebkitTextStroke: "1.5px white",
          color: "white",
        }}
      >
        LISTA DE PRODUCTOS
      </h1>
      <div className="btn-add-container">
        <Button
          onClick={() => {
            handleOpenModal();
            console.log(products);
          }}
          variant="success"
          size="lg"
          style={{
            textShadow: "none",
            fontFamily: "Roboto",
            WebkitTextStroke: ".5px white",
            color: "white",
          }}
        >
          Agregar Producto
        </Button>
      </div>

      <div className="filter-row">
        <label
          style={{
            textShadow: "none",
            fontFamily: "Roboto",
            WebkitTextStroke: ".2px white",
            color: "white",
          }}
        >
          Coloque el nombre del producto o vendedor:
        </label>
        <input
          type="text"
          value={filterProduct}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <Table
        responsive="lg"
        striped
        bordered
        hover
        size="sm"
        variant="light"
        style={{
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Vendedor</th>
            <th>Ingreso</th>
            <th>Caducidad</th>
            <th>Detalles</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productsToDisplay.map((product) => (
            <tr key={product.id}>
              <td>{product.pro_nombre}</td>
              <td>{product.pro_vendedor}</td>
              <td>{product.pro_fechaInicio}</td>
              <td>{product.pro_fechaFinal}</td>
              <td>
                <Button variant="primary" size="sm">
                  Detalles
                </Button>
              </td>
              <td>{product.pro_stock}</td>
              <td>{product.pro_precio}</td>
              <td>
                <Image src={product.pro_imagen} className="min-max-img" />
              </td>

              <td>
                <Button 
                  variant="success" 
                  size="sm" 
                  style={{ margin: "5px" }}
                  onClick={() => handleEditProduct(product)} // Ensure to edit product
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  variant="danger"
                  size="sm"
                  style={{ margin: "5px" }}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination">
        <Button
          variant="success"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span style={{ color: "white" }}>{currentPage}</span>
        <Button
          variant="success"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>

      <Form.Select
        onChange={(e) => setProductsPerPage(Number(e.target.value))}
        size="sm"
        style={{marginTop: '20px'}}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </Form.Select>

      <ModalAddProducts
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <ModalEditProduct
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        productToEdit={productToEdit}
        handleEdit={handleEdit}
        categorias={categorias}
        vendedores={vendedores}
      />
    </Container>
  );
};

export default ProductList;
