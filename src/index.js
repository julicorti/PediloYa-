import React from "react";
import { createRoot } from "react-dom/client"; // Cambia a createRoot
import App from "./App";
import { DarkModeProvider } from "./components/context/modeContext";

const container = document.getElementById("root");
const root = createRoot(container); // Crea el root usando createRoot

root.render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);