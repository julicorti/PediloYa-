import "../../SASS/style.css";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const [mensaje, setMensaje] = useState("");
  const { cart, setCart } = useContext(CartContext);
  const { user, getUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const vaciarCarrito = async () => {
    const token = localStorage.getItem("authToken"); // Usa la clave correcta
  
    if (!token) {
      setMensaje("No se encontró un token de autenticación.");
      return;
    }
  
    try {
      await axios.delete("http://localhost:4000/carrito/vaciar", {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
        },
      });
  
      setCart([]); // Vaciar el carrito
      setMensaje("Carrito vaciado correctamente.");
    } catch (error) {
      console.error("Error al vaciar el carrito", error);
      setMensaje("Hubo un error al vaciar el carrito.");
    }
  };
  
  
  
  const confirmarPedido = async () => {
    if (!user || cart.length === 0) {
      setMensaje(
        "No hay productos en el carrito o no se ha encontrado el usuario."
      );
      return;
    }

    try {
      const pedido = {
        usuario_id: user.id,
        productos: cart.map((producto) => ({
          id: producto.id,
          cantidad: producto.cantidad,
          precio: producto.precio,
        })),
      };

      const response = await axios.post(
        "http://localhost:4000/pedido/confirmarPedido",
        pedido
      );
      setMensaje(response.data.mensaje);
      setCart([]);
      navigate("/confirmacion");
    } catch (error) {
      console.error("Error al confirmar el pedido", error);
      setMensaje("Hubo un error al confirmar el pedido.");
    }
  };

  const eliminarProducto = (id) => {
    setCart(cart.filter((producto) => producto.id !== id));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito</h2>

      {cart.length === 0 ? (
        <p className="cart-empty-message">El carrito está vacío.</p>
      ) : (
        <div className="cart-products">
          {cart.map((producto) => (
            <div className="cart-item" key={producto.id}>
              <img
                src={`http://localhost:4000/${producto.imagen}`}
                alt={producto.nombre}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{producto.nombre}</h3>
                <p className="cart-item-price">${producto.precio}</p>
                <p className="cart-item-quantity">
                  Cantidad: {producto.cantidad}
                </p>
                <button
                  className="cart-item-remove"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="cart-action-button" onClick={vaciarCarrito}>
          Vaciar Carrito
        </button>
        <button
          className="cart-action-button"
          onClick={confirmarPedido}
          disabled={cart.length === 0}
        >
          Confirmar Pedido
        </button>
      </div>

      {mensaje && <p className="cart-message">{mensaje}</p>}
    </div>
  );
};

export default Cart;
