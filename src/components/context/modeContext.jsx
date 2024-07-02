import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const DarkModeContext = createContext();

// Crear el proveedor del contexto
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
    
  useEffect(() => {
    // Verifica el estado guardado en localStorage para el modo oscuro
    if (localStorage.getItem("dark-mode") === "enabled") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "disabled");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
