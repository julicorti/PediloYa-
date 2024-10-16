import React, { useEffect, useState } from "react";
import axios from "axios";
import Add from "./add.jsx";

const Producto = ({ categoriaId }) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar la solicitud al servidor al cargar el componente
    const fetchProductos = async () => {
      try {
        // Hacer la solicitud a la API con la categoría especificada
        const response = await axios.get(
          `http://localhost:4000/productos/categoria/${categoriaId}`
        );
        console.log("Productos obtenidos:", response.data);
        setProductos(response.data); // Guardar los productos en el estado
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al obtener productos"); // Manejar error
      }
    };

    fetchProductos();
  }, [categoriaId]); // El efecto se ejecuta cada vez que cambia el categoriaId

  return (
    <div>
      {error && <p>{error}</p>} {/* Mostrar mensaje de error si ocurre */}
      <div id="lista-productos">
        {productos.length > 0 ? (
          productos.map(
            (producto, index) =>
              producto.cantidad_stock > 0 && ( // Solo mostrar productos activos
                <div
                  key={index}
                  className="item-producto border rounded-lg shadow-lg overflow-hidden"
                >
                  <div
                    className="imagen-placeholder h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(http://localhost:4000${producto.imagen})`,
                    }}
                  >
                    {!producto.imagen ? "+" : ""}
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-xl">
                      {producto.nombre || "Nombre no disponible"}
                    </h2>
                    <img
                      src={`http://localhost:4000${producto.imagen}`}
                      alt={producto.nombre}
                    />
                    <div className="contenido">

                    <p className="text-gray-600">
                      <strong>Stock:</strong> {producto.cantidad_stock}{" "}
                      
                    </p>
                    <p className="text-gray-800 font-semibold">
                      <strong>Precio: $</strong>
                      {producto.precio} 
                    </p>
                    </div>
                    <Add></Add>
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
