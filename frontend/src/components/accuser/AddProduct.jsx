import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            required
            type="text"
            id="slug"
            onChange={(e) => setSlug(e.target.value)}
            value={slug}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            required
            type="text"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            required
            type="text"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="form-group form-image product">
          <img
            src={
              previewImageProduct ||
              "https://res.cloudinary.com/primalappsje/image/upload/v1652227975/primal/1652227496734_rnnh7m.png"
            }
            alt=""
          />
          <label htmlFor="image_upload_product">
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
          <button type="submit">
            <FontAwesomeIcon icon={faPlusCircle} />
            {uploadingImageProduct ? "Guardando..." : "Guardar producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
