import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  cambiarFlagNav,
  elGenero,
  elTitulo,
} from "../../../../redux/actions/actions";

//const urlBack = 'http://localhost:3001';
//const urlBack = "http://190.100.208.178:3001";

const FiltrosLibros = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


 
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const generos = useSelector((state) => state.generos);

  const cambiarFlag1 = (numchar) => {
    dispatch(cambiarFlagNav(numchar));
  };

  const cambiarGenero = (param) => {
    dispatch(elGenero(param));
  };

  const cambiarTitulo = (param) => {
    dispatch(elTitulo(param));
  };

  const searchBooksByTitle = (buscaTitulo) => {
    cambiarFlag1("2");
    cambiarTitulo(buscaTitulo);
   
  };

  const fetchBooksByGenre = (nombregenero) => {
    cambiarFlag1("1");
    cambiarGenero(nombregenero);
   
  };

  const navigateToHome = () => {
    cambiarFlag1("0");
    cambiarGenero("all");
    navigate("/home");
    //   window.location.reload(); // Recargar la página
  };

  return (
    <nav className="navbar navbar-expand-lg filtroAdmin bg-secondary" >
      <div className="container">
        {/* <div className="d-flex justify-content-center ">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar por título..."
            value={buscaTitulo}
            onChange={(e) => {
              setBuscaTitulo(e.target.value);
              searchBooksByTitle(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchBooksByTitle(e.target.value);
              }
            }}
          />
        </div> */}

        <div className="Filtro">
          <select
            className="form-select "
            onChange={(e) => fetchBooksByGenre(e.target.value)}
          >
            <option value="">Selecciona un género</option>
            {generos.map((genero) => (
              <option value={genero.nombregenero} key={genero.idgenero}>
                {genero.nombregenero}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default FiltrosLibros;
