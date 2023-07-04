import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddProduct.css';

const AddProduct = ({ setOpenAdd }) => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const [uploadingImageProduct, setUploadingImageProduct] = useState(false);
  const [previewImageProduct, setPreviewImageProduct] = useState(false);

  const validateImageProduct = (e) => {
    const fileProduct = e.target.files[0];
    if (fileProduct.size >= 1048576) {
      return alert("El tamaño máximo de la imagen es 1MB");
    } else {
      setImage(fileProduct);
      setPreviewImageProduct(URL.createObjectURL(fileProduct));
    }
  };


  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Permitir solo números y un solo punto decimal, y permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
    if (
      (charCode !== 46 || price.includes(".")) &&
      charCode > 31 &&
      (charCode < 48 || charCode > 57)
    ) {
      e.preventDefault();
    }
    
  }
  const handleKeyPress1 = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Permitir solo números y un solo punto decimal, y permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
    if (
      (charCode !== 46 || slug.includes(".")) &&
      charCode > 31 &&
      (charCode < 48 || charCode > 57)
    ) {
      e.preventDefault();
    }
    
  }
  function handlePaste(e) {
    const pastedData = e.clipboardData.getData("text/plain");
    // Permitir solo números y un punto decimal en el contenido pegado
    if (!/^\d*\.?\d*$/.test(pastedData)) {
      e.preventDefault();
    }
  }
function handleChange(e) {
    if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
      setPrice(e.target.value);
    }

  }


  const handlerAddProduct = async (e) => {
    e.preventDefault();
 
    if (!image) {
      return alert("Por favor seleccione una imagen del producto");
    }
    setUploadingImageProduct(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("sellerId", userInfo._id);
      formData.append("seller", userInfo.name);
      formData.append("sellerImage", userInfo.image.secure_url);
      const data = await axios.post("/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Producto añadido con éxito!");
      navigate("/account");
      window.location.reload();
      setOpenAdd(false);
      console.log(data);
    } catch (error) {
      alert("Error al añadir el producto, ingrese los datos correctamente");
    }
  };

  return (
    <div className="passwords">
      <form onSubmit={handlerAddProduct}>
        <div className="close-form" onClick={() => setOpenAdd(false)}>
          X
        </div>
        <div className="wrapper-add-product">
            <div className="ctn-add-product">
                <div className="form-group">
                <label htmlFor="name">Nombre del producto</label>
                <input
                  required
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                </div>
                <div className="form-group">
                  <label htmlFor="slug">Peso en kg</label>
                  <input
                    required
                    type="text"
                    id="slug"
                    onKeyPress={handleKeyPress1}
                    onPaste={handlePaste}
                     
                    onChange={(e) => setSlug(e.target.value)}
                    value={slug}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Categoria</label>
                  <select value={category} onChange={(e)=> setCategory(e.target.value)}  required>
                 
                    <option value="">Seleccione una Categoria</option>
                    <option value="Fruta">Fruta</option>
                    <option value="Hortaliza">Hortaliza</option>
                    <option value="Verdura">Verdura</option>
                    <option value="Vegetal">Vegetal</option>
                    <option value="Cereales">Cereal</option>
                    <option value="Rubiáceas">Rubiáceas</option> 

                  </select>
                  
                </div>
                <div className="form-group">
                  <label htmlFor="description">Descripción</label>
                  <input
                    required
                    type="text"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Precio por kg</label>
                  <input
                    required
                    type="text"
                    id="price"
                    onKeyPress={handleKeyPress}
                    onPaste={handlePaste}
                    onChange={ handleChange}
                    value={price}
                  />
                </div>
            </div>
            <div className="product-add">
              <div className="form-group form-image product">
              <img
                src={
                  previewImageProduct ||
                  "https://res.cloudinary.com/primalappsje/image/upload/v1674510284/primal/fruits_b6j5kx.png"
                }
                alt=""
              />
                <p>Añade una imagen de tu producto</p>
              <label htmlFor="image_upload_product" title="Añadir imagen">
                <FontAwesomeIcon icon={faPlusCircle} />
              </label>
              <input
                type="file"
                hidden
                id="image_upload_product"
                accept="image/png, image/jpeg"
                onChange={validateImageProduct}
              />
              </div>
              <div className="form-btn">
                <button type="submit" className="button-add-product"> 
                  <FontAwesomeIcon icon={faPlusCircle} className="icon-plus"/>
                  {uploadingImageProduct ? "Guardando..." : "Guardar producto"}
                </button>
              </div>
            </div>
        </div>
        
      </form>
        
    </div>
    
  );
};

export default AddProduct;
