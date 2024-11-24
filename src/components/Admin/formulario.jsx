import React, { useState } from "react";
import axios from "axios";
import "../../SASS/style.css";

const FormProducto = ({ obtenerProductos }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria_id: "",
    cantidad: "",
    precio: "",
    descripcion: "",
    imagen: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post("http://localhost:4000/producto", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Producto agregado correctamente");
      obtenerProductos(); // Actualizar la lista de productos
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Hubo un problema al guardar el producto");
    }
  };

  return (
    <div className="pg">

  
<form onSubmit={handleSubmit} className="product-form">
  <div className="form-row">
    <div className="input-group">
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="input-group">
      <label htmlFor="categoria_id">Categoría</label>
      <select
        id="categoria_id"
        name="categoria_id"
        value={formData.categoria_id}
        onChange={handleInputChange}
        required
      >
        <option value="">Seleccione una categoría</option>
        <option value="6">Almuerzo</option>
        <option value="4">Desayuno</option>
        <option value="5">Golosinas</option>
        <option value="8">Menu</option>
        <option value="7">Bebidas</option>
      </select>
    </div>
  </div>

  <div className="form-row">
    <div className="input-group">
      <label htmlFor="cantidad">Cantidad</label>
      <input
        type="number"
        id="cantidad"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="input-group">
      <label htmlFor="precio">Precio</label>
      <input
        type="number"
        id="precio"
        name="precio"
        value={formData.precio}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="input-group">
      <label htmlFor="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="input-group">
      <label htmlFor="imagen">Imagen</label>
      <input
        type="file"
        id="imagen"
        name="imagen"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  </div>

  <button id="guardar" type="submit">Guardar</button>
</form>

    </div>
  );
};

export default FormProducto;
