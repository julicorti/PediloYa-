import { DarkModeContext } from "../context/modeContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Importa el contexto de autenticación
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios";
import Swal from "sweetalert2";

const CartaMenu = ({ categoriaId }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { agregarAlCarrito } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext); // Obtén el estado de autenticación
  const navigate = useNavigate(); // Hook para redirección

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/productos/categoria/${categoriaId}`
        );
        setProductos(response.data);
      } catch (err) {
        setError("Error al obtener productos");
      }
    };

    fetchProductos();
  }, [categoriaId]);

  const handleAddToCart = (producto) => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirige al login si el usuario no está autenticado
      return;
    }

    agregarAlCarrito({ ...producto, cantidad: 1 });
    Swal.fire({
      icon: "success",
      title: "Producto Agregado",
      text: `${producto.nombre} ha sido agregado al carrito.`,
      confirmButtonText: "OK",
      background: "#f8f9fa",
      color: "#333",
      timer: 1000,
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
                style={{
                  backgroundColor: darkMode ? "#111214" : "white", // Cambiar color de fondo a #242732
                  color:  darkMode ? "white" : "#000", // Asegurarse de que el texto sea claro sobre el fondo oscuro
                }}
              >
                <div 
                  className="imagen-placeholder h-48 bg-cover bg-center mb-4"
                  style={{
                    backgroundImage: `url(http://localhost:4000/${producto.imagen})`,
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
