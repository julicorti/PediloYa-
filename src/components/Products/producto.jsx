import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar la solicitud al servidor al cargar el componente
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/producto');
        console.log('Productos obtenidos:', response.data);
        setProductos(response.data); // Guardar los productos en el estado
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setError('Error al obtener productos'); // Manejar error
      }
    };

    fetchProductos();
  }, []); // El array vacío asegura que se ejecute solo una vez al cargar el componente

  return (
    <div>
      {error && <p>{error}</p>} {/* Mostrar mensaje de error si ocurre */}
      <div id="lista-productos">
        {productos.length > 0 ? (
          productos.map((producto, index) =>
            producto.cantidad_stock > 0 && ( // Solo mostrar productos activos
              <div key={index} className="item-producto border rounded-lg shadow-lg overflow-hidden">
                <div
                  className="imagen-placeholder h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${producto.imagenUrl})` }}
                >
                  {!producto.imagenUrl ? '+' : ''}
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-xl">{producto.nombre || 'Nombre no disponible'}</h2>
                  <p className="text-gray-600"><strong>Categoría:</strong> {producto.id_categoria || 'Sin Categoría'}</p>
                  <p className="text-gray-600"><strong>Cantidad:</strong> {producto.cantidad_stock} Unidades</p>
                  <p className="text-gray-800 font-semibold"><strong>Precio: $</strong>{producto.precio} Pesos</p>
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
