import React , {  useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Nav.css';
import { librosGenero, librosPorTitulo , obtenerGeneros ,cambiarFlagNav, elGenero, elTitulo} from '../../redux/actions/actions';

import { loginUser, logoutUser } from "../../redux/actions/actions";

//const urlBack = 'http://localhost:3001';
//const urlBack = "http://190.100.208.178:3001";

const NavBar = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate(); 

 const [selectedGenre, setSelectedGenre] = useState(null);
 const [buscaTitulo, setBuscaTitulo] = useState(''); 
 const generos = useSelector(state => state.generos); 
//  user 
const user = useSelector((state) => state.user);
 
const cambiarFlag1   = (numchar)   => { dispatch(cambiarFlagNav(numchar)); };

const cambiarGenero  = (param)     => { dispatch(elGenero(param)); };

const cambiarTitulo  = (param)     => { dispatch(elTitulo(param)); };


const searchBooksByTitle = (buscaTitulo) => {
    cambiarFlag1("2");
    cambiarTitulo(buscaTitulo);
    navigate("/home");
};

const fetchBooksByGenre = (nombregenero) => {
    cambiarFlag1("1");
    cambiarGenero(nombregenero);
    navigate("/home");
 };

 const navigateToHome = () => {
    cambiarFlag1("0");
    cambiarGenero("all");
    navigate("/home");
  //   window.location.reload(); // Recargar la página
};

// codiog user 
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
        <img
          src="https://img.freepik.com/vector-gratis/plantilla-logotipo-libreria-diseno-plano_23-2149325325.jpg?w=2000"
          alt="Logo de la tienda de libros"
          width="100"
          height="60"
        />
      </Link>
      <div className="d-flex justify-content-center mt-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar por título..."
              value={buscaTitulo}
              onChange={(e) => {  setBuscaTitulo(e.target.value); searchBooksByTitle(e.target.value);
             }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {  searchBooksByTitle(e.target.value);  }
              }}
            />

        </div>
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
              <button className="nav-link" onClick={navigateToHome}>
                Inicio
              </button>
            </li>
          {generos.map((genero) => (
            <li className="nav-item" key={genero.nombregenero}>
              <button
                className={`nav-link ${selectedGenre === genero.idgenero ? 'active' : ''}`}
                onClick={() => fetchBooksByGenre(genero.nombregenero)}
              >
                {genero.nombregenero}
              </button>
            </li>
          ))}
          <li className="nav-item">
            <Link className="nav-link" to="/contacto">
              Contacto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/agregalibro">
              Ingreso Libros
            </Link>
          </li>
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
                  <Link className="nav-link username-link" to="/perfil">
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

