import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, TextField, Grid, MenuItem, Button, Select, } from '@mui/material';
import './Home.css'
import Pagination from '../Paginate/Paginate';
import { obtener_Todos_Libros, obtenerGeneros, obtenerAutores, filterByOrigin, filterByGenre, filterByAuthor, orderByPrice, orderByName, } from '../../redux/actions/actions';
import Cardsw from '../Cards/Cardsw';
import Footer from './../Footer/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const todoLibros = useSelector((state) => state.libros);
  const [libros, setLibros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const librosPorPagina = 12;
  const [totalLibros, setTotalLibros] = useState();

  const indexOfLastBook = currentPage * librosPorPagina;
  const indexOfFirstBook = indexOfLastBook - librosPorPagina;
  const currentBooks = Array.isArray(libros) ? libros.slice(indexOfFirstBook, indexOfLastBook) : [];

  const todoGeneros = useSelector((state)=>state.genero);
  const autores = useSelector((state)=>state.autor);

  const [order, setOrder] = useState('');

  
  useEffect(() => {
    dispatch(obtener_Todos_Libros(currentPage, librosPorPagina));
    obtenerGeneros(dispatch);
    obtenerAutores(dispatch);
  }, [currentPage, dispatch]);
  

  useEffect(() => {
    if (todoLibros && todoLibros.libros) {
      setLibros(todoLibros.libros);
      setTotalLibros(todoLibros.totalLibros);
    }
  }, [todoLibros]);

  const handlePageChange = (pageNumber) => {
    console.log("pageNumber ", pageNumber);
    setCurrentPage(pageNumber);
  };

  // alfabeticamente
  function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Alphabetical ${e.target.value} order`);
    setCurrentPage(1);
    e.target.value= 'default';
  }  

  // precio
  function handlePriceSort(e) {
    e.preventDefault();
    dispatch(orderByPrice(e.target.value)); 
    setOrder(`Price ${e.target.value} order`);
    setCurrentPage(1);
    e.target.value = 'default';
  }

  // genero
  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value)); 
    setOrder(`Filtered by Gender: ${e.target.value}`);
    e.target.value = 'default';
  }

  //autor
  function handleFilterAuthor(e) {
    e.preventDefault();
    dispatch(filterByAuthor(e.target.value)); 
    setOrder(`Filtered by Author: ${e.target.value}`);
    e.target.value = 'default';
  }

  //base de datos y nuevos
  function handleFilterByOrigin(e){
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setOrder(`Filtered by Origin: ${e.target.value}`);
    e.target.value= 'default';
  }

  //limpiar filtros
  function handleClearFilters() {
      handleSort({ target: { value: 'default' } });
      handlePriceSort({ target: { value: 'default' } });
      handleFilterGenre({ target: { value: 'default' } });
      handleFilterAuthor({ target: { value: 'default' } });
      handleFilterByOrigin({ target: { value: 'default' } });
    }


    return (
      <Container component="main" maxWidth="100%">
        <Box sx={{ mt: 10 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Lista de Libros
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', mb: 10}}>
    <Box>
      <Select sx={{ minWidth: 200, mr: 5, }} className="homeFilters" value='default' onChange={e => handleSort(e)}>
        <MenuItem disabled value="default">Órden por nombre...</MenuItem>
        <MenuItem value="asc">A - Z</MenuItem>
        <MenuItem value="desc">Z - A</MenuItem>
      </Select>
    </Box>
  <Box>
    <Select sx={{ minWidth: 200, mr: 5,  }} className="homeFilters" value='default' onChange={e => handlePriceSort(e)}>
      <MenuItem disabled value="default">Precio...</MenuItem>
      <MenuItem value="asc">Menor a Mayor</MenuItem>
      <MenuItem value="desc">Mayor a Menor</MenuItem>
    </Select>
  </Box>
  <Box>
    <Select sx={{ minWidth: 200, mr: 5,  }} className="homeFilters" value='default' onChange={e => handleFilterGenre(e)}>
      <MenuItem disabled value="default">Género...</MenuItem>
      <MenuItem value='all'>Todos</MenuItem>
      <MenuItem value='male'>Male</MenuItem>
      <MenuItem value='female'>Female</MenuItem>
    </Select>
  </Box>
  <Box>
    <Select sx={{ minWidth: 200, mr: 5,  }} className="homeFilters" value='default' onChange={e => handleFilterAuthor(e)}>
      <MenuItem disabled value="default">Autor/a...</MenuItem>
      <MenuItem value='all'>Todos/as</MenuItem>
      <MenuItem value='author1'>Author 1</MenuItem>
      <MenuItem value='author2'>Author 2</MenuItem>
    </Select>
  </Box>
  <Box>
    <Select sx={{ minWidth: 200, mr: 5,  }} className="homeFilters" value='default' onChange={e => handleFilterByOrigin(e)}>
      <MenuItem disabled value="default">Origen...</MenuItem>
      <MenuItem value="all">Todos los libros...</MenuItem>
      <MenuItem value="originals">Originales...</MenuItem>
      <MenuItem value="created by User">Creados Por Usuario...</MenuItem>
    </Select>
    </Box>
    <Box>
      <Button sx={{ minWidth: 200, }} className="clearFilters" onClick={handleClearFilters}>Clear Filters</Button>
    </Box>
  </Box>

        <Cardsw books={libros} />
        <Pagination
          currentPage={currentPage}
          totalBooks={totalLibros}
          librosPorPagina={librosPorPagina}
          onPageChange={handlePageChange}
        />
        <Footer />
      </Container>
    );
};

export default Home;








// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import './Home.css'
// import Pagination from '../Paginate/Paginate';
// import { obtener_Todos_Libros } from '../../redux/actions/actions';
// import NavBar from '../Nav/Nav';
// import Cardsw from '../Cards/Cardsw';
// import Footer from './../Footer/Footer';

// const Home = () => {
//  const dispatch = useDispatch();
//  const todoLibros = useSelector((state) => state.libros);
//  const [libros, setLibros] = useState([]);
//  const [currentPage, setCurrentPage] = useState(1);
//  const librosPorPagina = 4;
//  const [totalLibros, setTotalLibros] = useState();

//  useEffect(() => {
//    dispatch(obtener_Todos_Libros(currentPage, librosPorPagina));
// }, [currentPage,dispatch]);

// useEffect(() => {
//  if (todoLibros) {
//    setLibros(todoLibros.libros);
//    setTotalLibros(todoLibros.totalLibros);
//  }
// }, [todoLibros]);

// const handlePageChange = (pageNumber) => {
//     console.log("pageNumber ", pageNumber);
//     setCurrentPage(pageNumber);
// };

// const indexOfLastBook = currentPage * librosPorPagina;
// const indexOfFirstBook = indexOfLastBook - librosPorPagina;
// const currentBooks = Array.isArray(libros) ? libros.slice(indexOfFirstBook, indexOfLastBook) : [];

//  return (
//  <div className="home-page">
//    {/* <NavBar /> */}
//    <div className="container mt-5">
//      <h1>Lista de Libros</h1>
//      <Cardsw books={libros} />
//     <Pagination
//       currentPage={currentPage} 
//       totalBooks={totalLibros} 
//       librosPorPagina={librosPorPagina}
//       onPageChange={handlePageChange}
//     />
//    </div>   
//    <Footer />
//  </div>
// );
// };

// export default Home;
