import React from "react";
import NavBar from "./components/inicio/NavBar";
import Inicio from "./components/inicio/Inicio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Asegúrate de importar BrowserRouter
import Products from "./components/Products/Products";
function App() {
  return (
    <Router>

      <NavBar />

      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path="/desayuno" element={<Products />} />
        <Route path="/almuerzo" element={<Products />} />
        <Route path="/bebidas" element={<Products />} />
        <Route path="/golosinas" element={<Products />} />
      
      </Routes>

    </Router>
  );
}

export default App;
