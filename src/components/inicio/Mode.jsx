import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Mode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Verifica el estado guardado en localStorage para el modo oscuro
    if (localStorage.getItem('dark-mode') === 'enabled') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Función para cambiar entre modos claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
    }
  };

  return (
    <div className="mode-switch">
      <button
        onClick={toggleDarkMode}
        className={`mode-button ${darkMode ? 'dark' : 'light'}`}
      >
        {darkMode ? <FaSun className="sun-icon dark-sun" /> : <FaMoon className="moon-icon" />}
      </button>
    </div>
  );
};

export default Mode;
