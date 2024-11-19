import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/components/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);


  // Mientras el contexto está cargando, muestra un "loader" o pantalla vacía
  if (isLoading) {
    return <div>Loading...</div>; // Puedes reemplazar esto con un spinner o un componente visual
  }


  // Redirige al login si no está autenticado
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
