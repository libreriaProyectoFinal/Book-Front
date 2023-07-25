
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './Home.css'
import Pagination from '../Paginate/Paginate';
import { obtener_Todos_Libros } from '../../redux/actions/actions';
import NavBar from '../Nav/Nav';
import Cardsw from '../Cards/Cardsw';
import Footer from './../Footer/Footer';

const Home = () => {
 const dispatch = useDispatch();
 const todoLibros = useSelector((state) => state.libros);
 const [libros, setLibros] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const librosPorPagina = 4;
 const [totalLibros, setTotalLibros] = useState();

 useEffect(() => {
   dispatch(obtener_Todos_Libros(currentPage, librosPorPagina));
}, [currentPage,dispatch]);

useEffect(() => {
 if (todoLibros) {
   setLibros(todoLibros.libros);
   setTotalLibros(todoLibros.totalLibros);
 }
}, [todoLibros]);

const handlePageChange = (pageNumber) => {
    console.log("pageNumber ", pageNumber);
    setCurrentPage(pageNumber);
};

const indexOfLastBook = currentPage * librosPorPagina;
const indexOfFirstBook = indexOfLastBook - librosPorPagina;
const currentBooks = Array.isArray(libros) ? libros.slice(indexOfFirstBook, indexOfLastBook) : [];

 return (
 <div className="home-page">
   {/* <NavBar /> */}
   <div className="container mt-5">
     <h1>Lista de Libros</h1>
     <Cardsw books={libros} />
    <Pagination
      currentPage={currentPage} 
      totalBooks={totalLibros} 
      librosPorPagina={librosPorPagina}
      onPageChange={handlePageChange}
    />
   </div>   
   <Footer />
 </div>
);
};

export default Home;

