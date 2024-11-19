import React, { useState, useEffect } from "react";
import "../../SASS/style.css";

const AgregarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState({
    categoria: "",
    cantidad: "",
    nombre: "",
    precio: "",
    descripcion: "",
    imagenUrl: "",
  });
  const [editando, setEditando] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    // Cargar productos desde localStorage al montar el componente
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);
  }, []);

  useEffect(() => {
    // Guardar productos en localStorage cuando cambien
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormulario({ ...formulario, [id]: value });
  };

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

  const guardarProducto = () => {
    const { categoria, cantidad, nombre, precio, descripcion, imagenUrl } = formulario;

    if (!categoria || !cantidad || !nombre || !precio || !descripcion || (!imagenUrl && !editando)) {
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
    } else {
      setProductos([...productos, nuevoProducto]);
    }

    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormulario({
      categoria: "",
      cantidad: "",
      nombre: "",
      precio: "",
      descripcion: "",
      imagenUrl: "",
    });
    setEditando(false);
    setProductoEditando(null);
  };

  const eliminarProducto = (producto) => {
    const nuevosProductos = productos.filter((prod) => prod !== producto);
    setProductos(nuevosProductos);
  };

  const editarProducto = (producto) => {
    setEditando(true);
    setProductoEditando(producto);
    setFormulario(producto);
  };

  const toggleProductoActivo = (producto) => {
    const nuevosProductos = productos.map((prod) =>
      prod === producto ? { ...prod, activo: !prod.activo } : prod
    );
    setProductos(nuevosProductos);
  };

  return (
    <div className="contenedor">
      <header>
        <h1>Gestión de Productos</h1>
        <button className="btn-cerrar">Cerrar</button>
      </header>

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
            <label htmlFor="categoria">Categoría</label>
            <select id="categoria" value={formulario.categoria} onChange={handleInputChange}>
              <option value="">Seleccione una categoría</option>
              <option value="Almuerzo">Almuerzo</option>
              <option value="Desayuno">Desayuno</option>
              <option value="Golosinas">Golosinas</option>
              <option value="Snacks">Snacks</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>
          <div className="grupo-formulario">
            <label htmlFor="cantidad">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              placeholder="Ingrese la cantidad de productos"
              value={formulario.cantidad}
              onChange={handleInputChange}
            />
          </div>
          <div className="grupo-formulario">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese el nombre del producto"
              value={formulario.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="grupo-formulario">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              placeholder="Ingrese el precio del producto"
              value={formulario.precio}
              onChange={handleInputChange}
            />
          </div>
          <div className="grupo-formulario">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              placeholder="Ingrese la descripción del producto"
              value={formulario.descripcion}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="botones">
        <button className="btn btn-guardar" onClick={guardarProducto}>
          {editando ? "GUARDAR CAMBIOS" : "GUARDAR"}
        </button>
        <button className="btn btn-descartar" onClick={limpiarFormulario}>
          DESCARTAR
        </button>
      </div>

      <div className="lista-productos">
        {productos.map((producto, index) => (
          <div className="item-producto" key={index}>
            <div className="item-izquierda">
              <div
                className="imagen-placeholder"
                style={{ backgroundImage: `url(${producto.imagenUrl})` }}
              ></div>
              <p>{producto.nombre}</p>
            </div>
            <div className="item-derecha">
              <p>
                <strong>Categoría:</strong> {producto.categoria}
              </p>
              <p>
                <strong>Cantidad:</strong> {producto.cantidad} Unidades
              </p>
              <p>
                <strong>Precio: $</strong> {producto.precio} Pesos
              </p>
              <p>
                <strong>Descripción:</strong> {producto.descripcion}
              </p>
            </div>
            <div className="icono-editar">
              <button onClick={() => editarProducto(producto)}>Editar</button>
            </div>
            <div className="icono-eliminar">
              <button onClick={() => eliminarProducto(producto)}>Eliminar</button>
            </div>
            <div className="switch-activar">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={producto.activo}
                  onChange={() => toggleProductoActivo(producto)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgregarProductos;
