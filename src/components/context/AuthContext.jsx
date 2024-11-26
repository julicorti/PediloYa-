import React, { createContext, useState, useEffect } from "react"; // Importaciones de React primero
import { useNavigate } from 'react-router-dom';  // Después las otras dependencias
import axios from "axios";  // Axios después de 'useNavigate'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Se establece como true inicialmente
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get("http://localhost:4000/getUser", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error al obtener el usuario:", error.response?.data || error.message);
          setIsAuthenticated(false); // En caso de error, no se marca como autenticado
        }
      } else {
        setIsAuthenticated(false); // Si no hay token, no se marca como autenticado
      }
      setIsLoading(false); // Al final de la carga, setIsLoading a false
    };

    fetchUserData();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:4000/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prevUser) => ({ ...(prevUser || {}), ...response.data }));
    } catch (error) {
      console.error("Error al obtener el usuario:", error.response?.data || error.message);
      setIsAuthenticated(false); // Opcional: marca como no autenticado si falla
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", userData.token);
    navigate('/');  // Redirige después de login
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    navigate('/login');  // Redirige a la página de login
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};
