import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);

  // Función para eliminar un producto (se define en el componente padre)
  const eliminarProducto = (productoId) => {
    setCart(cart.filter((producto) => producto.id !== productoId));
  };

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <img
                src={`http://localhost:4000/${product.imagen}`}
                alt="Imagen del producto"
              />{" "}
              <span>{product.nombre}</span>{" "}
              <span> - x{product.cantidad}</span>
              <button onClick={() => eliminarProducto(product.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
