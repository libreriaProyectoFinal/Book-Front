import React, { useState, useEffect } from "react";
import axios from "axios";
import LibroList from "./Libros/ListarLibros/ListLibros";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar/Navbar";
import "./Admin.css";

import AdminLibros from "./Libros/Libros";
import AdminUsuarios from "./Usuarios/Usuarios";
import { GetUsuarios } from "../../redux/actions/actions";
import Ventas from "./Ventas/Ventas";


function Admin() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetUsuarios())
  },[])
// codigo para dividir admin 

const [selectedColumn, setSelectedColumn] = useState('libros');

const handleUsuariosClick = () => {
  setSelectedColumn('usuarios');
};

const handleLibrosClick = () => {
  setSelectedColumn('libros');
};

const handleVentasClick = () => {
  setSelectedColumn("ventas");
  // Aquí puedes realizar las acciones que desees cuando se hace clic en el botón "Ventas"
};
// codigo para dividir admin

  return (
    <>
      <NavBar />

      <div className="row admin-container">
        {/* Columna de botones */}

      <div className="botones-columna" style={{ flex: 1, padding: "10px", background: "#f0f0f0" }}>
      <button className={selectedColumn === "usuarios" ? "selected" : ""} onClick={handleUsuariosClick}>
        Usuarios
      </button>
      <button className={selectedColumn === "libros" ? "selected" : ""} onClick={handleLibrosClick}>
        Libros
      </button>
      <button className={selectedColumn === "ventas" ? "selected" : ""} onClick={handleVentasClick}>
        Ventas
      </button>
    </div>
        {/* <div className="col-md-2 Administrador_btn">

        </div> */}

        {/* Columna del contenido */}
      <div className="admin_contenido" style={{ flex: 5}}>
        {selectedColumn === 'usuarios' && <AdminUsuarios />}
        {selectedColumn === 'libros' && <AdminLibros />}
        {selectedColumn === 'ventas' && <Ventas />}
      </div>
      
      
      </div>
    </>
  );
}

export default Admin;
