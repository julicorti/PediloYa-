// components/Products/CartaMenu.jsx
import { DarkModeContext } from "../context/modeContext";
import { CartContext } from "../context/CartContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importa SweetAlert

const CartaMenu = ({ categoriaId }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { agregarAlCarrito } = useContext(CartContext); // Obtiene la función del contexto
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/productos/categoria/${categoriaId}`
        );
        console.log("Productos obtenidos:", response.data);
        setProductos(response.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al obtener productos");
      }
    };

    fetchProductos();
  }, [categoriaId]);

  const handleAddToCart = (producto) => {
    agregarAlCarrito({ ...producto, cantidad: 1 }); // Llama a la función
    Swal.fire({
      icon: 'success',
      title: 'Producto Agregado',
      text: `${producto.nombre} ha sido agregado al carrito.`,
      confirmButtonText: 'OK',
      background: '#f8f9fa', // Cambia el color de fondo
      color: '#333', // Cambia el color del texto
      timer: 2000, // Desaparece automáticamente después de 2 segundos
    });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="flex flex-wrap gap-6 justify-center" id="lista-productos">
        {productos.length > 0 ? (
          productos.map((producto) => (
            producto.cantidad_stock > 0 && (
              <div
                key={producto.id}
                className={`w-64 p-4 rounded-xl shadow-lg transition-all duration-300 ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
              >
                <div
                  className="imagen-placeholder h-48 bg-cover bg-center mb-4"
                  style={{
                    backgroundImage: `url(http://localhost:4000${producto.imagen})`,
                  }}
                >
                  {!producto.imagen ? "+" : ""}
                </div>
                <h2 className="text-lg font-bold mb-2" id="name">
                  {producto.nombre || "Nombre no disponible"}
                </h2>
                <p className="text-gray-400 mb-4">{producto.descripcion}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-500">
                    ${producto.precio}
                  </span>
                  <span className="text-gray-600">
                    <strong>Stock:</strong> {producto.cantidad_stock}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(producto)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Agregar al carrito
                </button>
              </div>
            )
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CartaMenu;
