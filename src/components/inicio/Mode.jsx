import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { DarkModeContext } from '../context/modeContext';
import '../../SASS/style.css';

const Mode = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="mode-switch">
      <button
        onClick={toggleDarkMode}
        className={`mode-button ${darkMode ? 'dark' : 'light'}`}
      >
        {darkMode ? (
          <FaSun className="sun-icon dark-sun" style={{ color: '#FFD700' }} /> // Sol amarillo
        ) : (
          <FaMoon className="moon-icon" />
        )}
      </button>
    </div>
  );
};

export default Mode;
