import React, { useEffect, useState } from 'react';
import "../../SASS/style.css";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/usuarios')
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => { throw new Error(text) });
        }
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const mostrarUsuarios = () => {
    if (error) return <p>{`Error: ${error}`}</p>;
    if (loading) return <p>Cargando usuarios...</p>;
    if (usuarios.length === 0) return <p>No hay usuarios disponibles.</p>;

    return usuarios.map((usuario) => (
      <div className="item-usuario" key={usuario.id}>
        <div className="item-izquierda">
          
        </div>
        <div className="item-derecha">
          <div><strong>Nombre:</strong> {usuario.nombre || 'Desconocido'}</div>
          <div><strong>Email:</strong> {usuario.email || 'No proporcionado'}</div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <header>
        <h1>Lista de Usuarios</h1>
        <nav>
        
        </nav>
      </header>
      <div className="contenedor">
        <div className="lista-usuarios">
          {mostrarUsuarios()}
        </div>
      </div>
    </div>
  );
}

export default ListaUsuarios;
