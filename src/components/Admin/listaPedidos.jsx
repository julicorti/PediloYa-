import { useState, useEffect } from "react";
import axios from "axios";

const ListaPedidos = ({ socket }) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener todos los pedidos inicialmente
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/pedidos");
        setPedidos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        setLoading(false);
      }
    };

    fetchPedidos();

    if (socket) {
      socket.on("nuevoPedido", (pedido) => {
        setPedidos((prevPedidos) => [...prevPedidos, pedido]);
      });

      socket.on("actualizarPedido", (pedidoActualizado) => {
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.pedido_id === pedidoActualizado.pedido_id
              ? pedidoActualizado
              : pedido
          )
        );
      });

      socket.on("pedidoCancelado", ({ pedidoId }) => {
        setPedidos((prevPedidos) =>
          prevPedidos.filter((pedido) => pedido.pedido_id !== pedidoId)
        );
      });

      return () => {
        socket.off("nuevoPedido");
        socket.off("actualizarPedido");
        socket.off("pedidoCancelado");
      };
    }
  }, [socket]);

  const handleConfirmarPedido = async (pedidoId) => {
  try {
    const response = await axios.put(`http://localhost:4000/pedido/${pedidoId}/estado`, {
      estado: "completado",
    });

    if (response.status === 200) {
      alert(`El pedido con ID ${pedidoId} ha sido confirmado.`);
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.pedido_id === pedidoId
            ? { ...pedido, estado_nombre: "completado" }
            : pedido
        )
      );
    } else {
      alert("Hubo un error al confirmar el pedido.");
    }
  } catch (error) {
    console.error("Error al confirmar el pedido:", error);
    alert("Hubo un error al intentar confirmar el pedido.");
  }
};

  
  const handleCancelPedido = async (pedidoId) => {
    console.log("Borrando")
    try {
      const response = await axios.delete(`http://localhost:4000/pedido/${pedidoId}`);

      if (response.status === 200) {
        alert(`El pedido con ID ${pedidoId} fue cancelado.`);
      } else {
        alert("Hubo un error al intentar cancelar el pedido.");
      }
    } catch (error) {
      console.error("Error al cancelar el pedido:", error);
      if (error.response) {
        // Si hay una respuesta del servidor
        alert(`Error en el servidor: ${error.response.data.message}`);
      } else {
        // Si no hay respuesta
        alert("Error al conectar con el servidor.");
      }
    }
  };
  
  
  return (
    <div className="pedido-lista-container">
    {loading ? (
      <p className="loading">Cargando pedidos...</p>
    ) : (
      <>
        <h2>Lista de Pedidos</h2>
        {pedidos.length === 0 ? (
          <p className="no-pedidos">No hay pedidos disponibles.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Precio Total</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Productos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.pedido_id}>
                  <td>{pedido.pedido_id}</td>
                  <td>${pedido.precio_total}</td>
                  <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                  <td>{pedido.estado_nombre}</td>
                  <td>
                    {pedido.productos.map((producto) => (
                      <div key={producto.producto_id}>
                        {producto.nombre} - {producto.cantidad} x ${producto.precio}
                      </div>
                    ))}
                  </td>
                  <td className="acciones">
                    <button
                      className="btn confirm"
                      onClick={() => handleConfirmarPedido(pedido.pedido_id)}
                    >
                      Confirmar
                    </button>
                    <button
                      className="btn cancel"
                      onClick={() => handleCancelPedido(pedido.pedido_id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    )}
  </div>
  
  );
}  

export default ListaPedidos;
