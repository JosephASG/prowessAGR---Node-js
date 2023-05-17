import { faPlusCircle, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const EditProduct = ({ setOpenEdit, pro }) => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [name, setName] = useState(pro.name);
  const [slug, setSlug] = useState(pro.slug);
  const [category, setCategory] = useState(pro.category);
  const [description, setDescription] = useState(pro.description);
  const [price, setPrice] = useState(pro.price);
  const [image, setImage] = useState(pro.image);
  const [uploadingImageProduct, setUploadingImageProduct] = useState(false);
  const [previewImageProduct, setPreviewImageProduct] = useState(
    pro.image.secure_url
  );

  const validateImageProduct = async (e) => {
    const fileProduct = e.target.files[0];
    if (fileProduct.size >= 1048576) {
      return alert("El tamaño máximo de la imagen es 1MB");
    } else {
      setImage(fileProduct);
      setPreviewImageProduct(URL.createObjectURL(fileProduct));
    }
  };

  const handlerUpdateProduct = async (e) => {
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
      const data = await axios.put(
        `/api/products/update/${pro._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Producto actualizado con éxito!");
      navigate("/account");
      window.location.reload();
      setOpenEdit(false);
      console.log(data);
    } catch (error) {
      alert("Error al actualizar el producto, error: " + error);
    }
    setUploadingImageProduct(false);
  };

  return (
    <div>
      <div className="passwords">
        <form onSubmit={handlerUpdateProduct}>
          <div className="close-form" onClick={() => setOpenEdit(false)}>
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
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
              </div>
              <div className="product-add">
                <div className="form-group form-image product">
                  <img src={previewImageProduct} alt="" />
                  <label htmlFor="image_update_product">
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </label>
                  <input
                    type="file"
                    hidden
                    id="image_update_product"
                    accept="image/png, image/jpeg"
                    onChange={validateImageProduct}
                  />
                </div>
                <div className="form-btn">
                  <button type="submit" className="button-add-product">
                    <FontAwesomeIcon icon={faRefresh} className="icon-plus"/>
                    {uploadingImageProduct ? "Changing..." : "Edit Product"}
                  </button>
                </div>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
