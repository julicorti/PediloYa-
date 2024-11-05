// CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>{product.name}</li> // Muestra los nombres de los productos
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
