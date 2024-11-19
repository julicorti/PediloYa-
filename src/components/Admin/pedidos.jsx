import React, { useState } from 'react';
import "../../SASS/style.css";

// Datos iniciales de los pedidos
const initialPedidos = [
    { id: 1, cliente: 'Lisandro Lobosco', productos: 'Sanguche de Milanesa', metodoPago: 'Mercado Pago', total: 3000, estado: 'Pendiente' },
    { id: 2, cliente: 'Eloy Tejero', productos: 'Pebete', metodoPago: 'Efectivo', total: 1500, estado: 'Aceptado' },
    { id: 3, cliente: 'Jeremias Leiva', productos: 'Medialuna de JyQ', metodoPago: 'Mercado Pago', total: 500, estado: 'Aceptado' },
    { id: 4, cliente: 'Julieta Corti', productos: 'Sanguche de Milanesa', metodoPago: 'Mercado Pago', total: 3000, estado: 'Rechazado' },
    { id: 5, cliente: 'Tomas Coch', productos: 'Gaseosa 500ml', metodoPago: 'Efectivo', total: 300, estado: 'Pendiente' },
];

function Pedidos() {
    const [pedidos, setPedidos] = useState(initialPedidos);
    const [ventanaDetalles, setVentanaDetalles] = useState(null);
    const [ventanaCrear, setVentanaCrear] = useState(false);
    const [ventanaNotificar, setVentanaNotificar] = useState(false);
    const [ventanaAdvertencia, setVentanaAdvertencia] = useState(false);

    // Estado del formulario para agregar un nuevo pedido
    const [nuevoPedido, setNuevoPedido] = useState({
        id: '',
        cliente: '',
        productos: '',
        metodoPago: 'Mercado Pago',
        total: '',
    });

    // Función para actualizar el estado de un pedido
    const actualizarEstadoPedido = (id, nuevoEstado) => {
        setPedidos(pedidos.map(pedido =>
            pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
        ));
    };

    // Función para mostrar detalles de un pedido
    const mostrarDetallesPedido = (id) => {
        const pedido = pedidos.find(p => p.id === id);
        setVentanaDetalles(pedido);
    };

    // Función para agregar un nuevo pedido
    const agregarPedido = () => {
        const { id, cliente, productos, metodoPago, total } = nuevoPedido;
        
        if (pedidos.some(p => p.id === id)) {
            setVentanaAdvertencia(true);
        } else {
            setPedidos([...pedidos, { id, cliente, productos, metodoPago, total, estado: 'Pendiente' }]);
            setVentanaCrear(false);
            setNuevoPedido({ id: '', cliente: '', productos: '', metodoPago: 'Mercado Pago', total: '' });
        }
    };

    // Función para manejar los cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNuevoPedido(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Función para cerrar ventanas emergentes
    const cerrarVentana = (tipo) => {
        switch (tipo) {
            case 'detalles':
                setVentanaDetalles(null);
                break;
            case 'crear':
                setVentanaCrear(false);
                break;
            case 'notificar':
                setVentanaNotificar(false);
                break;
            case 'advertencia':
                setVentanaAdvertencia(false);
                break;
            default:
                break;
        }
    };

    return (
        <div className="app-container-pedidos">
            <header className="header-pedidos">
                <h1>Pedilo Ya</h1>
                <nav className="nav-pedidos">
                    <ul>
                        <li><a href="Ingresar_productos.html">Productos</a></li>
                        <li><a href="Administrar_pedidos.html">Pedidos</a></li>
                        <li><a href="pedidos_cliente.html">Cliente</a></li>
                    </ul>
                </nav>
                <button className="btn-cerrar-pedidos" onClick={() => window.close()}>Cerrar</button>
            </header>

            <section className="main-content-pedidos">
                <h2>Lista de Pedidos</h2>
                <button className="btn-agregar-pedido" onClick={() => setVentanaCrear(true)}>+ Agregar Pedido</button>
                <table className="tabla-pedidos">
                    <thead>
                        <tr>
                            <th>N° Pedido</th>
                            <th>Cliente</th>
                            <th>Producto/s</th>
                            <th>Método de Pago</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedido => (
                            <tr key={pedido.id} data-pedido-id={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.cliente}</td>
                                <td>{pedido.productos}</td>
                                <td>{pedido.metodoPago}</td>
                                <td className={`estado estado-${pedido.estado.toLowerCase()}`}>{pedido.estado}</td>
                                <td>
                                    <button onClick={() => actualizarEstadoPedido(pedido.id, 'Aceptado')} className="btn-aceptar">Aceptar</button>
                                    <button onClick={() => actualizarEstadoPedido(pedido.id, 'Rechazado')} className="btn-rechazar">Rechazar</button>
                                    <button onClick={() => mostrarDetallesPedido(pedido.id)} className="btn-detalles">Detalles</button>
                                    <button onClick={() => setVentanaNotificar(true)} className="btn-notificar">Notificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Ventana de Detalles */}
            {ventanaDetalles && (
                <div className="ventana-emergente-pedidos">
                    <div className="ventana-emergente-contenido-pedidos">
                        <button className="btn-cerrar-ventana-pedidos" onClick={() => cerrarVentana('detalles')}>Cerrar</button>
                        <h2>Detalles del Pedido</h2>
                        <p>ID: <span>{ventanaDetalles.id}</span></p>
                        <p>Cliente: <span>{ventanaDetalles.cliente}</span></p>
                        <p>Productos: <span>{ventanaDetalles.productos}</span></p>
                        <p>Método de Pago: <span>{ventanaDetalles.metodoPago}</span></p>
                        <p>Total: <span>{ventanaDetalles.total}</span></p>
                    </div>
                </div>
            )}

            {/* Ventana de Crear Pedido */}
            {ventanaCrear && (
                <div className="ventana-emergente-pedidos">
                    <div className="ventana-emergente-contenido-pedidos">
                        <button className="btn-cerrar-ventana-pedidos" onClick={() => cerrarVentana('crear')}>Cerrar</button>
                        <h2>Crear Nuevo Pedido</h2>
                        <form onSubmit={(e) => { e.preventDefault(); agregarPedido(); }}>
                            <label>ID Pedido:</label>
                            <input type="number" id="id" value={nuevoPedido.id} onChange={handleInputChange} required />
                            <label>Cliente:</label>
                            <input type="text" id="cliente" value={nuevoPedido.cliente} onChange={handleInputChange} required />
                            <label>Productos:</label>
                            <input type="text" id="productos" value={nuevoPedido.productos} onChange={handleInputChange} required />
                            <label>Método de Pago:</label>
                            <select id="metodoPago" value={nuevoPedido.metodoPago} onChange={handleInputChange} required>
                                <option value="Mercado Pago">Mercado Pago</option>
                                <option value="Efectivo">Efectivo</option>
                            </select>
                            <label>Total:</label>
                            <input type="number" id="total" value={nuevoPedido.total} onChange={handleInputChange} required />
                            <button type="submit" className="btn-crear-pedido">Crear Pedido</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Ventana de Notificación */}
            {ventanaNotificar && (
                <div className="ventana-emergente-pedidos">
                    <div className="ventana-emergente-contenido-pedidos">
                        <button className="btn-cerrar-ventana-pedidos" onClick={() => cerrarVentana('notificar')}>Cerrar</button>
                        <h2>Notificar al Cliente</h2>
                        <p>Pedido actualizado correctamente.</p>
                    </div>
                </div>
            )}

            {/* Ventana de Advertencia */}
            {ventanaAdvertencia && (
                <div className="ventana-emergente-pedidos">
                    <div className="ventana-emergente-contenido-pedidos">
                        <button className="btn-cerrar-ventana-pedidos" onClick={() => cerrarVentana('advertencia')}>Cerrar</button>
                        <h2>Advertencia</h2>
                        <p>¡Ya existe un pedido con este ID!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pedidos;
