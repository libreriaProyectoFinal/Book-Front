import React , {  useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Nav.css';
import { librosGenero, librosPorTitulo } from '../../redux/actions/actions';

//const urlBack = 'http://localhost:3001';
const urlBack = "http://190.100.208.178:3001";

const NavBar = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate(); 
 const [generos, setGeneros] = useState([]);
 const [selectedGenre, setSelectedGenre] = useState(null);
 const [buscaTitulo, setBuscaTitulo] = useState(''); 
 
 useEffect(() => {

  axios.get(urlBack+'/obtenerGeneros')
    .then((response) => {  setGeneros(response.data);  })
    .catch((error) => {  console.error('Error al obtener los géneros:', error);  });
}, []);

const searchBooksByTitle = () => {
 if (buscaTitulo.trim() !== '') { navigate('/home');
   dispatch(librosPorTitulo(buscaTitulo));
 }
};
  const fetchBooksByGenre = (genreId) => {
     navigate("/home");
     dispatch(librosGenero(genreId));
 };
 const navigateToHome = () => {
     navigate("/home");
  //   window.location.reload(); // Recargar la página
};

 return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img
          src="https://img.freepik.com/vector-gratis/plantilla-logotipo-libreria-diseno-plano_23-2149325325.jpg?w=2000"
          alt="Logo de la tienda de libros"
          width="100"
          height="30"
        />
      </Link>
      <div className="d-flex justify-content-center mt-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar por título..."
              value={buscaTitulo}
              onChange={(e) => {
               setBuscaTitulo(e.target.value);
               searchBooksByTitle();
             }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchBooksByTitle();
                }
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
        </ul>
      </div>
   
      </div> 
  </nav>
);
};

export default NavBar;

