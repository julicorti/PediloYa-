import "../../SASS/style.css";
import { CartContext } from "../context/CartContext";
import React, { useContext,useState, useEffect } from 'react'; // Importa React y los hooks
import axios from "axios";
import { useNavigate } from 'react-router-dom';  // Cambiar a useNavigate

const Cart = () => {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();  // Usamos useNavigate para redirigir

  useEffect(() => {
    obtenerProductosCarrito();
    obtenerDatosUsuario();
  }, []);

  const obtenerProductosCarrito = async () => {
    try {
      const response = await axios.get('http://localhost:4000/carrito');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  const obtenerDatosUsuario = async () => {
    try {
      const response = await axios.get('http://localhost:4000/usuario');
      setUsuario(response.data);
    } catch (error) {
      console.error('Error al obtener datos del usuario', error);
    }
  };

  const confirmarPedido = async () => {
    if (!usuario || productos.length === 0) {
      setMensaje('No hay productos en el carrito o no se ha encontrado el usuario.');
      return;
    }

    setLoading(true);
    try {
      const pedido = {
        usuario_id: usuario.id,
        productos: productos.map((producto) => ({
          id: producto.id,
          cantidad: producto.cantidad,
          precio: producto.precio,
        })),
      };

      const response = await axios.post('http://localhost:4000/pedido/confirmarPedido', pedido);
      setMensaje(response.data.mensaje);
      navigate('/confirmacion');  // Redirigir usando navigate
    } catch (error) {
      console.error('Error al confirmar el pedido', error);
      setMensaje('Hubo un error al confirmar el pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Confirmar Pedido</h2>
      <button onClick={confirmarPedido} disabled={loading}>
        {loading ? 'Procesando...' : 'Confirmar Pedido'}
      </button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Cart;