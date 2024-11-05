import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext.jsx"; // Asegúrate que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert

const Producto = ({ categoriaId }) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext); // Obtiene la función del contexto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/productos/categoria/${categoriaId}`
        );
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
    }); };

  return (
    <div>
      {error && <p>{error}</p>}
      <div id="lista-productos">
        {productos.length > 0 ? (
          productos.map((producto) =>
            producto.cantidad_stock > 0 && (
              <div key={producto.id} className="item-producto border rounded-lg shadow-lg overflow-hidden">
                <div
                  className="imagen-placeholder h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(http://localhost:4000${producto.imagen})`,
                  }}
                >
                  {!producto.imagen ? "+" : ""}
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-xl">{producto.nombre || "Nombre no disponible"}</h2>
                  <p className="text-gray-600">
                    <strong>Stock:</strong> {producto.cantidad_stock}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    <strong>Precio: $</strong>
                    {producto.precio}
                  </p>
                  <button onClick={() => handleAddToCart(producto)}>Agregar al Carrito</button>
                </div>
              </div>
            )
          )
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Producto;
