import { getCategories } from "../services/category";
import { getSellers } from "../services/seller";
import { postProduct } from "../services/product";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import ReactSelect from "react-select";

const ModalAddProducts = ({ isOpen, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    pro_nombre: "",
    pro_precio: "",
    pro_stock: "",
    pro_descripcion: "",
    pro_categoria: "",
    pro_medida: "",
    pro_vendedor: "",
    pro_fechaFinal: "",
    pro_fechaInicio: "",
    pro_estado: "",
    pro_imagen: null,
    pro_numero: "",
    sub_measures: {}, // Almacena las medidas inferiores
  });
  const [categorias, setCategorias] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  const measuresSubunits = {
    Qm: ["Kg", "gr"],
    Kg: ["gr", "Lb"],
    gr: [],
    Lb: ["Oz"],
    Oz: [],
    Unidades: [],
    cubetas: [],
    racimos: [],
    arrobas: ["Lb"],
  };
  useEffect(() => {
    if (!isOpen) return;
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");
      await fetchCategories(token);
      await fetchSellers(token);
    };
    fetchInitialData();
  }, [isOpen]);

  const fetchSellers = async (token) => {
    const res = await getSellers(token);
    setVendedores(res.data);
  };

  const fetchCategories = async (token) => {
    const res = await getCategories(token);
    setCategorias(res.data);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pro_imagen" && files) {
      setNewProduct({
        ...newProduct,
        pro_imagen: files[0],
      });
    } else if (measuresSubunits[newProduct.pro_medida]?.includes(name)) {
      const updatedSubMeasures = { ...newProduct.sub_measures, [name]: value };
      setNewProduct({
        ...newProduct,
        sub_measures: updatedSubMeasures,
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };
  const handleMeasureChange = (e) => {
    const { value } = e.target;
    setNewProduct({
      ...newProduct,
      pro_medida: value,
      sub_measures: {}, // Resetea medidas inferiores al cambiar la medida principal
    });
  };

  const renderSubMeasureInputs = () => {
    const subMeasures = measuresSubunits[newProduct.pro_medida] || [];
    return subMeasures.map((measure) => (
      <InputGroup className="mb-3" key={measure}>
        <InputGroup.Text>{measure}</InputGroup.Text>
        <FormControl
          type="number"
          placeholder={`Valor en ${measure}`}
          name={measure}
          value={newProduct.sub_measures[measure] || ""}
          onChange={handleInputChange}
        />
      </InputGroup>
    ));
  };

  const handleSave = async () => {
    if (!newProduct.pro_imagen) {
      return alert("Debe seleccionar una imagen");
    }
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const token = localStorage.getItem("token");
    const response = await postProduct(formData, token);
    if (response.status === 200) {
      onClose();
    } else {
      console.error("Error al agregar el producto en el servidor");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text>Nombre</InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Nombre del producto"
              name="pro_nombre"
              value={newProduct.pro_nombre}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Precio</InputGroup.Text>
            <FormControl
              type="number"
              placeholder="Precio"
              name="pro_precio"
              value={newProduct.pro_precio}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Stock</InputGroup.Text>
            <FormControl
              type="number"
              placeholder="Stock"
              name="pro_stock"
              value={newProduct.pro_stock}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Descripción</InputGroup.Text>
            <FormControl
              as="textarea"
              placeholder="Descripción del producto"
              name="pro_descripcion"
              value={newProduct.pro_descripcion}
              onChange={handleInputChange}
            />
          </InputGroup>
          <Form.Control
            as="select"
            name="pro_medida"
            value={newProduct.pro_medida}
            onChange={handleMeasureChange}
          >
            <option value="">Selecciona una medida</option>
            <option value="Qm">Quintal</option>
            <option value="Kg">Kilogramo</option>
            <option value="gr">Gramo</option>
            <option value="Lb">Libra</option>
            <option value="Oz">Onza</option>
            <option value="Unidades">Unidad</option>
            <option value="cubetas">Cubetas</option>
            <option value="racimos">Racimos</option>
            <option value="arrobas">Arrobas</option>
          </Form.Control>

          {renderSubMeasureInputs()}

          <InputGroup className="mb-3">
            <InputGroup.Text>Categoría</InputGroup.Text>
            <Form.Control
              as="select"
              name="pro_categoria"
              value={newProduct.pro_categoria}
              onChange={handleInputChange}
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombreCategoria}>
                  {categoria.nombreCategoria}
                </option>
              ))}
            </Form.Control>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Fecha de subida</InputGroup.Text>
            <FormControl
              type="date"
              name="pro_fechaInicio"
              value={newProduct.pro_fechaInicio}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Fecha de Vencimiento</InputGroup.Text>
            <FormControl
              type="date"
              name="pro_fechaFinal"
              value={newProduct.pro_fechaFinal}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Vendedor</InputGroup.Text>
            <ReactSelect
              id="pro_vendedor"
              name="pro_vendedor"
              value={{
                value: newProduct.pro_vendedor,
                label: newProduct.pro_vendedor || "Seleccione un vendedor",
              }}
              onChange={(selectedOption) => {
                setNewProduct({
                  ...newProduct,
                  pro_vendedor: selectedOption.value,
                });
              }}
              options={vendedores.map((vendedor) => ({
                value: vendedor.name,
                label: vendedor.name,
              }))}
              classNamePrefix="select"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Estado</InputGroup.Text>
            <ReactSelect
              id="pro_estado"
              name="pro_estado"
              value={{
                value: newProduct.pro_estado,
                label: newProduct.pro_estado || "Seleccione estado",
              }}
              onChange={(selectedOption) => {
                setNewProduct({
                  ...newProduct,
                  pro_estado: selectedOption.value,
                });
              }}
              options={["Disponible", "No disponible", "Reservado"].map(
                (estado) => ({
                  value: estado,
                  label: estado,
                })
              )}
              classNamePrefix="select"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Número Vendedor</InputGroup.Text>
            <FormControl
              type="number"
              placeholder="Número del vendedor"
              name="pro_numero"
              value={newProduct.pro_numero}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Imagen del Producto</InputGroup.Text>
            <FormControl
              type="file"
              name="pro_imagen"
              onChange={handleInputChange}
            />
          </InputGroup>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddProducts;
