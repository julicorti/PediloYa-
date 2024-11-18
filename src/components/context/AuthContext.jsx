import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga inicial

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      setUser({ token }); // Simula un usuario o carga más datos si los necesitas
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false); // La inicialización ha terminado
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", userData.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
