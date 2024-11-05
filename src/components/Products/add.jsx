import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Add = () => {
    const [productos, setProductos] = useState([]);
    const { addToCart } = useCart();

    // Obtener productos de la base de datos al cargar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/productos'); // Cambia esta URL por tu API
                setProductos(response.data); // Supone que la respuesta es un array de productos

            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    // Manejar la acción de agregar al carrito
    const handleAddToCart = (producto) => {
        addToCart(producto); // Pasar el producto real al carrito
    };

    return (
        <div>
            <h1>Lista de Productos</h1>
            {productos.map((producto) => (
                <div key={producto.id}>
                    <h2>{producto.nombre}</h2>
                    <p>Precio: ${producto.precio}</p>
                    <button onClick={() => handleAddToCart(producto)}>Agregar al carrito</button>
                </div>
            ))}
        </div>
    );
};

export default Add;
