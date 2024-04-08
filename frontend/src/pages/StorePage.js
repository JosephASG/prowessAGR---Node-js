import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { getProductsFromApi } from "../services/product";
import { Carousel, Container, Row, Col, Button, Card } from "react-bootstrap";

import SearchBar from "../components/SearchBar";

function StorePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const productsPerPage = 20;

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getProductos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await getProductsFromApi(token);
      if (res.data) {
        const data = res.data;
        setProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.pro_categoria))
        );
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find(
        (product) => product.id === productToAdd.id
      );
      if (!isProductInCart) {
        const updatedCart = [...prevCart, productToAdd];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prevCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };


  let filteredProducts = products.filter(
    (product) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.pro_categoria)
  );

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.pro_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container fluid="lg" style={{ marginTop: "20px", marginBottom: "40px" }}>
      <Row>
        <Col xs={12}>
          <h1 className="text-center mt-4 mb-4">TIENDA DE PRODUCTOS</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3} style={{ marginBottom: "20px" }}>
          <h2 style={{color:"white"}}>Categorías</h2>
          <ul className="list-group">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  selectedCategories.includes(category) ? "active" : ""
                }`}
                onClick={() => toggleCategory(category)}
                style={{ cursor: "pointer" }}
              >
                {category}
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={12} md={9}>
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <Row xs={2} md={3} lg={4} className="g-4 mt-3">
            {currentProducts.map((product) => (
              <Col key={product.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={product.pro_imagen}
                    alt={product.pro_nombre}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "black" }}>
                      {product.pro_nombre}
                    </Card.Title>
                    <Card.Text style={{ color: "black", textShadow:"none" }}>
                      {product.pro_descripcion && (
                        <>
                          {product.pro_descripcion}
                          <br />
                        </>
                      )}
                      {product.pro_categoria && (
                        <>
                          <b style={{textShadow:"none"}}>Categoría:</b> {product.pro_categoria}
                          <br />
                        </>
                      )}
                      {product.pro_precio && (
                        <>
                          <b style={{textShadow:"none"}} >Precio:</b> ${product.pro_precio}
                          <br />
                        </>
                      )}
                      {product.pro_fechaFinal && (
                        <>
                          <b style={{textShadow:"none"}}>Disponible hasta:</b> {product.pro_fechaFinal}
                        </>
                      )}
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => addToCart(product)}
                    >
                      Agregar al carrito{" "}
                      <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center my-4">
            <Button
              variant="outline-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ marginRight: "10px" }}
            >
              Anterior
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default StorePage;
