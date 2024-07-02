import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Asegúrate de importar tu componente principal
import { DarkModeProvider } from './components/context/modeContext';

ReactDOM.render(
<DarkModeProvider>
    <App />
  </DarkModeProvider>,
  document.getElementById('root')
);
