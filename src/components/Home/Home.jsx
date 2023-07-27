
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './Home.css'
import Pagination from '../Paginate/Paginate';
import { obtener_Todos_Libros , librosGenero, librosPorTitulo} from '../../redux/actions/actions';
import NavBar from '../Nav/Nav';
import Cardsw from '../Cards/Cardsw';
import Footer from './../Footer/Footer';

const Home = () => {
 const flagNav = useSelector((state) => state.flagNav);
 const generonav =  useSelector((state) => state.generonav);
 const titulonav =  useSelector((state) => state.titulonav);
 const dispatch = useDispatch();
 const libros = useSelector(state => state.libros); 
 const librosxpag = 4;
 
 useEffect(() => {
    if (flagNav === "0") (dispatch(obtener_Todos_Libros(1, librosxpag)));
    if (flagNav === "1") (dispatch(librosGenero(1,generonav,librosxpag)));
    if (flagNav === "2") (dispatch(librosPorTitulo(1,titulonav,librosxpag)));
}, [ flagNav, generonav,titulonav ]);

const handlePageChange = (pageNumber) => {
   if (flagNav === "0") (dispatch(obtener_Todos_Libros(pageNumber, librosxpag)));
   if (flagNav === "1") (dispatch(librosGenero(pageNumber,generonav,librosxpag)));
   if (flagNav === "2") (dispatch(librosPorTitulo(pageNumber,titulonav,librosxpag)))

};


 return (
 <div className="home-page">
   {/* <NavBar /> */}
   <div className="container mt-5">
     <h1>Lista de Libros</h1>
     <Cardsw books={libros.libros} />
    <Pagination
      libros={libros} 

      onPageChange={handlePageChange}
    />
   </div>   
   <Footer />
 </div>
);
};

export default Home;

