import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../../SASS/style.css";

const Cart = () => {
  const { cart } = useContext(CartContext); // Obtiene los productos del carrito

  const confirmarCompra = () => {
    const usuarioId = 1; // Asume que tienes un ID de usuario, cámbialo según tu lógica
    const total = cart.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );

    const pedido = {
      usuario_id: usuarioId,
      estado: "pendiente", // Cambia esto si es necesario
      fecha: new Date().toISOString().slice(0, 19).replace("T", " "), // Formato de fecha
      precio: total,
    };

    fetch("http://localhost:4000/pedido", {  // Cambia aquí para apuntar al puerto correcto
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el pedido");
        }
        return response.json();
      })
      .then((data) => {
        alert("Compra confirmada con éxito: " + data.id);
        // Aquí puedes agregar lógica adicional, como limpiar el carrito o redirigir al usuario
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al confirmar la compra.");
      });
  };

  return (
    <div className="paginaC">
      <h2>Tu Carrito</h2>
      <div className="cart">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div className="detalle">
            {cart.map((producto) => (
              <div key={producto.id} className="detalle2">
                <h3 className="font-bold">{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <p>Cantidad: x{producto.cantidad}</p>
                <p>${producto.precio * producto.cantidad}</p>
              </div>
            ))}
            <div className="total">
              <h3>
                Total: $
                {cart.reduce(
                  (total, producto) =>
                    total + producto.precio * producto.cantidad,
                  0
                )}
              </h3>
            </div>
            <button onClick={confirmarCompra} className="btn-confirmar">
              Confirmar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
