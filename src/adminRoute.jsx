import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../src/components/context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, getUser, user} = useContext(AuthContext);
  const [userReady, setUserReady] = useState(false)

  useEffect(() => {
    
    getUser();
    setUserReady(true);
    
  }, [])
  


  // Mientras el contexto está cargando, muestra un "loader" o pantalla vacía
  if (!userReady) {
    return <div>Loading...</div>; // Puedes reemplazar esto con un spinner o un componente visual
  }


  // Redirige al login si no está autenticado
  return user.rol === 3 ? children : <Navigate to="/" />;
};

export default AdminRoute;
