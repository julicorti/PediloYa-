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
      // Buscar si el producto ya existe en el carrito
      const productoExistente = prevCart.find((item) => item.id === producto.id);
      
      if (productoExistente) {
        // Si el producto ya existe, solo aumentamos la cantidad
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // Si el producto no existe, lo agregamos con cantidad 1
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, agregarAlCarrito }}>
      {children}
    </CartContext.Provider>
  );
};