import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Recuperar el carrito del localStorage al cargar la aplicación
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Guardar el carrito en localStorage cada vez que cambie
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const agregarAlCarrito = (producto) => {
    setCart((prevCart) => {
      const productoExistente = prevCart.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  // Nueva función: actualizar la cantidad de un producto
  const updateQuantity = (id, cantidad) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(0, cantidad) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, agregarAlCarrito, updateQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
