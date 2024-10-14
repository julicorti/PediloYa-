import React from "react";
import NavBar from "./components/inicio/NavBar";
import Inicio from "./components/inicio/Inicio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Asegúrate de importar BrowserRouter
import Products from "./components/Products/Products";
import Login from "./components/Login/login";

import ContactUs from "./components/Contactanos/ContactUs";
import Register from "./components/Login/Register/Register";
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
        <Route path="/login" element={<Login />} />
        <Route path="/producto" element={<Products />} />

        <Route path="/Register" element={<Register />} />
        <Route path="/ContactUs" element={<ContactUs />} />

      </Routes>

    </Router>
  );
}

export default App;
