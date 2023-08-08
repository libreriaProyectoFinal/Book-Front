import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Nav.css";
import { loginUser, logoutUser } from "../../redux/actions/actions";



// //const urlBack = 'http://localhost:3001';
// const urlBack = "http://190.100.208.178:3001";

const NavBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
 

  const handleLogout = () => {
    // Aquí invocas la acción de cerrar sesión para limpiar el estado de Redux
    dispatch(logoutUser());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/home')
  };

  // Función para cargar el usuario desde el Local Storage
const loadUserFromLocalStorage = () => {
  const userDataJSON = localStorage.getItem('user');

  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    const now = new Date().getTime();

    // Verificar si el token de acceso aún no ha expirado
    if (userData.expiresAt > now) {
      // Si el token de acceso es válido, actualizar el estado global
      dispatch(loginUser(userData.user));
    } else {
      // Si el token ha expirado, eliminar la información del Local Storage
      localStorage.removeItem('user');
    }
  }
};

  useEffect(() => {
    // Cargar el usuario desde el Local Storage al cargar el navbar
    loadUserFromLocalStorage();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="img_logo_navbar"
            src="https://img.freepik.com/vector-gratis/plantilla-logotipo-libreria-diseno-plano_23-2149325325.jpg?w=2000"
            alt="Logo de la tienda de libros"
            width="100"
            height="60"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/agregalibro">
                Ingreso Libros
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito
              </Link>
            </li>
            {user ? (
              <>
                {(user.tipoUsuario.rol === 'admin') && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin
                    </Link>
                  </li>
                )}
                 <li className="nav-item perfilUsuario">
                  {/* Agregar la clase CSS "username-link" al enlace del nombre de usuario */}
                  <Link className="nav-link username-link" to={"/perfil/"+ user.idusuario}>
                    {/* Usar una etiqueta <span> para aplicar el estilo de la clase resaltada */}
                    <span className="primer_span"> <img className="img_usuario" src={user.picture} alt="" /> : {user.name}</span>
                   
                    <span className="segundo_span">{user.tipoUsuario.rol==='admin' ? "Administrador" : "Usuario"}</span>
                    {/* <span>{user.tipoUsuario.rol==='admin' ? "Administrador" : "Usuario"}: {user.name}</span> */}
                  </Link>
                </li>
                <li className="nav-item btn_cierre">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
            // Mostrar enlaces de "Login" y "Registrarse" si el usuario no está autenticado
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Registrarse
                </Link>
              </li>
            </>
          )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;