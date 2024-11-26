import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../SASS/style.css";
import FormProducto from "./formulario";

const AgregarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(""); // Para filtrar por categoría
  const [mostrarCategorias, setMostrarCategorias] = useState(false); // Controla si se muestra la lista de categorías
  const [editando, setEditando] = useState(null); // Estado para controlar qué producto se está editando
  const [error, setError] = useState(""); // Para manejar errores

  // Función para obtener todos los productos
  const obtenerProductos = async (categoriaId = "") => {
    try {
      console.log("Cargando productos...");
      const url = categoriaId
        ? `http://localhost:4000/productos/categoria/${categoriaId}`
        : "http://localhost:4000/productos"; // Filtrar productos por categoría
      const response = await axios.get(url);
      console.log("Productos recibidos:", response.data);
      setProductos(response.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setError("Error al obtener productos");
    }
  };

  // Función para obtener categorías
  const obtenerCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categorias");
      setCategorias(response.data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
      setError("Error al obtener categorías");
    }
  };

  // Llamadas a obtener productos y categorías cuando el componente se monta
  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Efecto para cargar productos según la categoría seleccionada
  useEffect(() => {
    if (categoriaSeleccionada) {
      obtenerProductos(categoriaSeleccionada);
    } else {
      obtenerProductos(); // Cargar todos los productos si no hay categoría seleccionada
    }
  }, [categoriaSeleccionada]); // Ejecuta solo si cambia la categoría

  // Manejadores de cambios en el filtro de categoría
  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    setMostrarCategorias(false); // Cierra la lista de categorías después de seleccionar una
  };

  const toggleCategorias = () => {
    setMostrarCategorias(!mostrarCategorias);
  };

  // Manejadores de cambios en los campos de los productos
  const handleInputChange = (e, productoId, campo) => {
    const valorNuevo = e.target.value;
    const productosActualizados = productos.map((producto) =>
      producto.id === productoId ? { ...producto, [campo]: valorNuevo } : producto
    );
    setProductos(productosActualizados);
  };

  // Función para guardar los cambios de un producto
  const guardarCambios = (productoId) => {
    const producto = productos.find((prod) => prod.id === productoId);
    axios
      .put(`http://localhost:4000/producto/${productoId}`, producto)
      .then(() => {
        alert("Producto actualizado correctamente.");
        setEditando(null);
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
        alert("Hubo un problema al actualizar el producto.");
      });
  };

  // Función para eliminar un producto
  const eliminarProducto = (productoId) => {
    console.log("Intentando eliminar producto con ID:", productoId); // Agregar un log para depurar

    axios
      .delete(`http://localhost:4000/producto/${productoId}`)
      .then(() => {
        console.log("Producto eliminado con éxito");
        setProductos(productos.filter((producto) => producto.id !== productoId));
      })
      .catch((error) => {
        console.error("Error al intentar eliminar el producto:", error.response || error);
        alert("Hubo un problema al eliminar el producto.");
      });
  };

  return (
    <div className="contenedor">
      <div className="filtro-categoria">
        <button onClick={toggleCategorias}>
          {mostrarCategorias ? "Ocultar categorías" : "Filtrar por categoría"}
        </button>
        {mostrarCategorias && (
          <div className="categorias-dropdown">
            <select
              id="categoriaId"
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Todas</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>} {/* Mostrar error si lo hay */}

      <div className="lista-productos">
  <table className="min-w-full table-auto border-collapse">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 text-left">Imagen</th>
        <th className="px-4 py-2 text-left">Nombre</th>
        <th className="px-4 py-2 text-left">Categoría</th>
        <th className="px-4 py-2 text-left">Cantidad</th>
        <th className="px-4 py-2 text-left">Precio</th>
        <th className="px-4 py-2 text-left">Descripción</th>
        <th className="px-4 py-2 text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((producto) => (
        <tr key={producto.id} className="border-t">
          <td className="px-4 py-2">
            <div
              className="imagen-placeholder"
              style={{ backgroundImage: `url(${producto.imagen})` }}
            >
              <img
                src={`http://localhost:4000/${producto.imagen}`}
                alt=""
              />
            </div>
          </td>
          <td className="px-4 py-2">
            {editando === producto.id ? (
              <input
                type="text"
                value={producto.nombre}
                onChange={(e) => handleInputChange(e, producto.id, "nombre")}
                className="px-3 py-1 border rounded-md text-sm w-full"
              />
            ) : (
              producto.nombre
            )}
          </td>
          <td className="px-4 py-2">
            {editando === producto.id ? (
              <select
                value={producto.id_categoria}
                onChange={(e) => handleInputChange(e, producto.id, "id_categoria")}
                className="px-3 py-1 border rounded-md text-sm w-full"
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            ) : (
              producto.categoria
            )}
          </td>
          <td className="px-4 py-2">
            {editando === producto.id ? (
              <input
                type="number"
                value={producto.cantidad_stock}
                onChange={(e) => handleInputChange(e, producto.id, "cantidad_stock")}
                className="px-3 py-1 border rounded-md text-sm w-full"
              />
            ) : (
              producto.cantidad_stock
            )}
          </td>
          <td className="px-4 py-2">
            {editando === producto.id ? (
              <input
                type="number"
                value={producto.precio}
                onChange={(e) => handleInputChange(e, producto.id, "precio")}
                className="px-3 py-1 border rounded-md text-sm w-full"
              />
            ) : (
              producto.precio
            )}
          </td>
          <td className="px-4 py-2">
            {editando === producto.id ? (
              <input
                type="text"
                value={producto.descripcion}
                onChange={(e) => handleInputChange(e, producto.id, "descripcion")}
                className="px-3 py-1 border rounded-md text-sm w-full"
              />
            ) : (
              producto.descripcion
            )}
          </td>
          <td className="botones px-4 py-2">
            {editando === producto.id ? (
              <button
                onClick={() => guardarCambios(producto.id)}
                className="px-4 py-1 bg-blue-500 text-white rounded-md"
              >
                Guardar
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditando(producto.id)}
                  className="px-4 py-1 bg-yellow-500 text-white rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md"
                >
                  Eliminar
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AgregarProductos;
