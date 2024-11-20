import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../SASS/style.css";

const AgregarProductos = () => {
  const [productos, setProductos] = useState([]); // Todos los productos
  const [productosFiltrados, setProductosFiltrados] = useState([]); // Productos filtrados
  const [formulario, setFormulario] = useState({
    categoriaId: "",
    cantidad: "",
    nombre: "",
    precio: "",
    descripcion: "",
    imagenUrl: "",
  });
  const [editando, setEditando] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(""); // Estado para la categoría seleccionada
  const [categorias, setCategorias] = useState([]); // Estado para las categorías

  // Usar useEffect para obtener los productos y categorías desde el backend
  useEffect(() => {
    // Obtener productos
    axios
      .get("http://localhost:4000/productos")  // Cambiar la URL si es necesario
      .then((response) => {
        setProductos(response.data); // Asignar los productos a estado
        setProductosFiltrados(response.data); // Inicialmente mostramos todos los productos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los productos: ", error);
      });

    // Obtener categorías para el filtro
    axios
      .get("http://localhost:4000/categorias")  // Cambiar la URL si es necesario
      .then((response) => {
        setCategorias(response.data); // Asignar las categorías
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las categorías: ", error);
      });
  }, []); // Se ejecuta una sola vez al cargar el componente

  // Función para filtrar productos por categoriaId
  const filtrarProductos = (categoriaId) => {
    if (categoriaId === "") {
      setProductosFiltrados(productos); // Si no hay categoría seleccionada, mostrar todos los productos
    } else {
      // Filtrar productos según la categoría seleccionada
      const productosFiltradosPorCategoria = productos.filter(
        (producto) => producto.categoriaId === categoriaId
      );
      setProductosFiltrados(productosFiltradosPorCategoria);
    }
  };

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormulario({ ...formulario, [id]: value });
  };

  // Función para manejar cambios de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormulario({ ...formulario, imagenUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para guardar un nuevo producto o actualizar uno existente
  const guardarProducto = () => {
    const { categoriaId, cantidad, nombre, precio, descripcion, imagenUrl } = formulario;

    if (!categoriaId || !cantidad || !nombre || !precio || !descripcion || (!imagenUrl && !editando)) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const nuevoProducto = {
      ...formulario,
      activo: true,
    };

    if (editando && productoEditando) {
      const nuevosProductos = productos.map((prod) =>
        prod === productoEditando ? nuevoProducto : prod
      );
      setProductos(nuevosProductos);
      setProductoEditando(null); // Limpiar producto editando
      setEditando(false);
      filtrarProductos(categoriaSeleccionada); // Filtrar después de editar
    } else {
      setProductos([...productos, nuevoProducto]);
      filtrarProductos(categoriaSeleccionada); // Filtrar después de agregar
    }

    limpiarFormulario();
  };

  // Función para limpiar el formulario después de guardar
  const limpiarFormulario = () => {
    setFormulario({
      categoriaId: "",
      cantidad: "",
      nombre: "",
      precio: "",
      descripcion: "",
      imagenUrl: "",
    });
    setEditando(false);
    setProductoEditando(null);
  };

  // Función para eliminar un producto
  // Función para eliminar un producto
  const eliminarProducto = (productoId) => {
    console.log("Eliminando producto con ID:", productoId); // Verifica que el ID esté correcto
    axios
      .delete(`http://localhost:4000/producto/${productoId}`)
      .then((response) => {
        console.log("Producto eliminado correctamente:", response.data);
        
        // Filtrar el producto eliminado de la lista de productos en el estado
        const nuevosProductos = productos.filter((producto) => producto.id !== productoId);
        
        // Actualizar el estado de productos
        setProductos(nuevosProductos); 
  
        // Si estás filtrando productos por categoría, re-aplicamos el filtro
        filtrarProductos(categoriaSeleccionada);
  
        alert("Producto eliminado correctamente"); // Notificar al usuario
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un problema al eliminar el producto"); // Mensaje de error
      });
  };
  
  // Función para editar un producto
  const editarProducto = (producto) => {
    setEditando(true);
    setProductoEditando(producto);
    setFormulario(producto);
  };

  // Función para manejar el cambio de categoría en el filtro
  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value;
    setCategoriaSeleccionada(categoriaId);
    filtrarProductos(categoriaId); // Filtrar productos al cambiar la categoría
  };

  return (
    <div className="contenedor">
      <div className="filtro-categoria">
        <label htmlFor="categoriaId">Filtrar por categoría:</label>
        <select
          id="categoriaId"
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
        >
          <option value="">Todas</option>
          {/* Asegúrate de que categorías tiene más de una opción */}
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

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
            {productosFiltrados.map((producto, index) => (
              <tr key={index}>
                <td>
                  <div
                    className="imagen-placeholder"
                    style={{ backgroundImage: `url(${producto.imagenUrl})` }}
                  ></div>
                </td>
                <td>{producto.nombre}</td>
                <td>{producto.categoriaId}</td> {/* Mostrar el ID de la categoría */}
                <td>{producto.cantidad_stock}</td>
                <td>${producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <button onClick={() => editarProducto(producto)}>Editar</button>
                  <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario para agregar o editar productos */}
      <div className="formulario-producto">
        <div className="formulario-izquierda">
          <div
            className="imagen-placeholder"
            style={{ backgroundImage: `url(${formulario.imagenUrl})` }}
          >
            {!formulario.imagenUrl && "+"}
          </div>
          <input type="file" id="imagen-producto" onChange={handleImageChange} />
        </div>
        <div className="formulario-derecha">
          <div className="grupo-formulario">
            <label htmlFor="categoriaId">Categoría</label>
            <select
              id="categoriaId"
              value={formulario.categoriaId}
              onChange={handleInputChange}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Otros campos del formulario para nombre, cantidad, precio, etc. */}
          <button onClick={guardarProducto}>Guardar Producto</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarProductos;