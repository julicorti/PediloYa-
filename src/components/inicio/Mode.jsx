import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Mode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('dark-mode') === 'enabled') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

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
    <div className="relative inline-block w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-full">
      <button
        onClick={toggleDarkMode}
        className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'} flex items-center justify-center`}
      >
        {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-900 dark:text-gray-200" />}
      </button>
    </div>
  );
};

export default Mode;
