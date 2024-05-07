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
  Row,
  Col,
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
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [startProductPage, setStartProductPage] = useState(null);
  const [endProductPage, setEndProductPage] = useState(null);
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
      setIsLoading(false); // Establece isLoading en false cuando los productos se han cargado correctamente
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

  const filterPages = (products) => {
    console.log(products.length);
    console.log(currentPage);
    console.log(productsPerPage);
    console.log(
      "Datos que se tiene:\n " +
        "COMBOBOX:" +
        Number(productsPerPage) +
        "\nnumero de productos:" +
        Number(products.length) +
        "\nPÁGINA ACTUAL" +
        Number(currentPage)
    );
    let inicio =
      Number(productsPerPage) * Number(currentPage) - productsPerPage;
    let final = inicio + Number(productsPerPage);
    setStartProductPage(inicio);
    setEndProductPage(final);
    console.log("NÚMERO DE INICIO: " + inicio + "FINAL:" + final);
  };
  //PARA FILTRAR N ELEMENTOS POR PÁGINA.
  useEffect(() => {
    setProductsPerPage(productsPerPage);
    filterPages(products);
  }, [products, filterPages]);
  //AQUÍ ESTÁN ALGUNOS FILTROS
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortedColumn(criteria);
  };

  // DEBES IMPLEMENTAR UNA FUNCIÓN DÓNDE LAS PÁGINAS NO SE HABILITEN PARA CAMBIAR SI NO EXISTEN SUFICIENTES ELEMENTOS A MOSTRAR.

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
        product.pro_nombre.toLowerCase().includes(filterProduct.toLowerCase())
    );
  }

  const totalPages = Math.ceil(
    sortedAndFilteredProducts.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
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
          Filtrar por Producto:
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
            {/* DETALLES: Dentro va lo de Descripción, Estado, Medida, N° Vendedor*/}
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(startProductPage, endProductPage).map((product) => (
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
                <Button variant="success" size="sm" style={{ margin: "5px" }}>
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
        <Form.Select
          onChange={(e) => {
            filterPages(products);
            setProductsPerPage(e.target.value);
          }}
          size="sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Form.Select>
      </Table>

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

      {/* <div>
      </div>
      <div className="header-row-product-list">
        <b
          className={sortedColumn === "pro_nombre" ? "sorted" : ""}
          onClick={() => handleSort("pro_nombre")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}>
          Nombre
        </b>
        <b
          className={sortedColumn === "pro_precio" ? "sorted" : ""}
          onClick={() => handleSort("pro_precio")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}
        >
          Precio
        </b>
        <b
          className={sortedColumn === "pro_stock" ? "sorted" : ""}
          onClick={() => handleSort("pro_stock")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}
        >
          Stock
        </b>
        <b
          className={sortedColumn === "pro_categoria" ? "sorted" : ""}
          onClick={() => handleSort("pro_categoria")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}
        >
          Categoría
        </b>
        <b
          className={sortedColumn === "pro_fechaInicio" ? "sorted" : ""}
          onClick={() => handleSort("pro_fechaInicio")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}
        >
          Ingreso
        </b>
        <b
          className={sortedColumn === "pro_fechaFinal" ? "sorted" : ""}
          onClick={() => handleSort("pro_fechaFinal")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}
        >
          Caducidad
        </b>
        <b
          className={sortedColumn === "pro_vendedor" ? "sorted" : ""}
          onClick={() => handleSort("pro_vendedor")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}
        >
          Vendedor
        </b>
        <b
          className={sortedColumn === "pro_estado" ? "sorted" : ""}
          onClick={() => handleSort("pro_estado")}
          style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}
        >
          Estado
        </b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}>Imagen</b>
        <b style={{textShadow:"none", fontFamily: "Roboto", WebkitTextStroke: ".1px white", color: "white"}}>Acciones</b>
      </div>

      <div className="container-products">
        {productsToDisplay.map((product) => (
          <div className="product" key={product.id}>
            <div>{product.pro_nombre}</div>
            <div>${product.pro_precio}</div>
            {product.pro_medida != null ? (
              <div>{product.pro_stock + " " + product.pro_medida}</div>
            ) : (
              <div>{product.pro_stock}</div>
            )}
            <div>{product.pro_categoria}</div>
            <div>{product.pro_fechaInicio}</div>
            <div>{product.pro_fechaFinal}</div>
            <div>{product.pro_vendedor}</div>
            <div>{product.pro_estado}</div>
            <div>
              <img
                src={product.pro_imagen}
                alt={product.pro_name}
                className="product-image-list"
              />
            </div>
            <div className="actions-container">
              <FontAwesomeIcon
                className="fa-icon-edit"
                icon={faPenToSquare}
                onClick={() => handleEditProduct(product)} // Asegúrate de que `product` contenga el ID
              />
              <FontAwesomeIcon
                className="fa-icon-trash"
                icon={faTrash}
                onClick={() => handleDelete(product.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div> */}
    </Container>
  );
};

export default ProductList;
