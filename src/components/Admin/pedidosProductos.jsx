import React, { useEffect, useState } from 'react';

const PedidoProductos = ({ productos, socket, pedidoId }) => {
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("pedidoConfirmado", ({ pedidoId: id }) => {
        if (id === pedidoId) {
          setEstado("Confirmado");
        }
      });

      socket.on("pedidoCancelado", ({ pedidoId: id }) => {
        if (id === pedidoId) {
          setEstado("Cancelado");
        }
      });

      return () => {
        socket.off("pedidoConfirmado");
        socket.off("pedidoCancelado");
      };
    }
  }, [socket, pedidoId]);

  return (
    <div>
      <h2>Productos del Pedido</h2>
      <p>Estado del pedido: {estado}</p>
      {productos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.producto_id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>{(producto.precio * producto.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos en este pedido.</p>
      )}
    </div>
  );
};

export default PedidoProductos;
