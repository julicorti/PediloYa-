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
  const obtenerProductos = async () => {
    try {
      console.log("Cargando productos...");
      const response = await axios.get("http://localhost:4000/productos");
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
    obtenerProductos();
    obtenerCategorias();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Efecto para cargar productos según la categoría seleccionada
  useEffect(() => {
    if (categoriaSeleccionada) {
      const obtenerCategorias = async () => {
        try {
          console.log("Cargando categorías...");
          const response = await axios.get("http://localhost:4000/categorias");
          console.log("Categorías recibidas:", response.data); // Asegúrate de que esto muestra un array de categorías
          setCategorias(response.data);
        } catch (err) {
          console.error("Error al obtener categorías:", err);
          setError("Error al obtener categorías");
        }
      };
      
      obtenerCategorias();
    } else {
      obtenerProductos();
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
    axios
      .delete(`http://localhost:4000/producto/${productoId}`)
      .then(() => {
        setProductos(productos.filter((producto) => producto.id !== productoId));
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el producto:", error);
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
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <div
                    className="imagen-placeholder"
                    style={{ backgroundImage: `url(${producto.imagenUrl})` }}
                  ></div>
                </td>
                <td>
                  {editando === producto.id ? (
                    <input
                      type="text"
                      value={producto.nombre}
                      onChange={(e) => handleInputChange(e, producto.id, "nombre")}
                    />
                  ) : (
                    producto.nombre
                  )}
                </td>
                <td>
                  {editando === producto.id ? (
                    <select
                      value={producto.id_categoria}
                      onChange={(e) => handleInputChange(e, producto.id, "id_categoria")}
                    >
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>{producto.categoria}</>
                  )}
                </td>
                <td>
                  {editando === producto.id ? (
                    <input
                      type="number"
                      value={producto.cantidad_stock}
                      onChange={(e) => handleInputChange(e, producto.id, "cantidad_stock")}
                    />
                  ) : (
                    producto.cantidad_stock
                  )}
                </td>
                <td>
                  {editando === producto.id ? (
                    <input
                      type="number"
                      value={producto.precio}
                      onChange={(e) => handleInputChange(e, producto.id, "precio")}
                    />
                  ) : (
                    producto.precio
                  )}
                </td>
                <td>
                  {editando === producto.id ? (
                    <input
                      type="text"
                      value={producto.descripcion}
                      onChange={(e) => handleInputChange(e, producto.id, "descripcion")}
                    />
                  ) : (
                    producto.descripcion
                  )}
                </td>
                <td>
                  {editando === producto.id ? (
                    <>
                      <button onClick={() => guardarCambios(producto.id)}>Guardar cambios</button>
                      <button onClick={() => setEditando(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditando(producto.id)}>Editar</button>
                      <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>

      </div>

    </div>
  );
};

export default AgregarProductos;
