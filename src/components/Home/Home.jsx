// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   OutlinedInput,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
// } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { useSelector, useDispatch } from "react-redux";
// import { obtener_Todos_Libros, librosGenero,  } from "../../redux/actions/actions";
// // import Footer from './../Footer/Footer';
// import Pagination from '../Paginate/Paginate';

// import Cardsw from '../Cards/Cardsw';
// import { useParams } from "react-router-dom";


// const Home = () => {
//   const todoLibros = useSelector((state) => state.libros);
//  const [libros, setLibros] = useState([]);
//  const [currentPage, setCurrentPage] = useState(1);
//   const [totalLibros, setTotalLibros] = useState();
//   const librosPorPagina = 12;

//   const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
//   const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
//   const [ordenPrecio, setOrdenPrecio] = useState("");
//   const libro = ""; 
//   var { genero } = useParams();
//   if (!genero) {
//     genero = "";
//   } else {
//     setGenerosSeleccionados([genero]);
//   }
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);

//     useEffect(() => {
//       dispatch(obtener_Todos_Libros(currentPage, librosPorPagina));
//     }, [currentPage,dispatch]);

//     useEffect(() => {
//     if (todoLibros) {
//       setLibros(todoLibros.libros);
//       setTotalLibros(todoLibros.totalLibros);
//     }
//     }, [todoLibros]);

//   function handleChangePagina(e, value) {
//     dispatch(
//       obtener_Todos_Libros(value, libro, generosSeleccionados, autoresSeleccionados, ordenPrecio) 
//     );
//     setPage(value);
//   }

//   const { allBooks, paginas, generos } = useSelector((state) => state); 
//   const [librosMostrados, setLibrosMostrados] = useState(12); 

//   const books = allBooks; 

//   const arrayGen = () => {
//     var array = [];
    
//     if (generos && Array.isArray(generos)) {
//       generos.forEach((gen) => {
//         if (!array.includes(gen.nombrecat)) array.push(gen.nombrecat);
//       });
//     }
//     return array;
//   };
  

//   // const mostrarMasLibros = () => {
//   //   setLibrosMostrados((prevLibrosMostrados) => prevLibrosMostrados + 5); 
//   // };

//   const handleOrdenPrecio = (e) => {
//     const orden = e.target.value;
//     setOrdenPrecio(orden);
//   };

//   const handleGenerosChange = (event) => {
//     setGenerosSeleccionados(event.target.value);
//   };

//   const handleAutoresChange = (event) => {
//     const autor = event.target.value; 
//     setAutoresSeleccionados(autor); 
//   };

//   function getStyles(name, personName, theme) {
//     return {
//       fontWeight:
//         personName.indexOf(name) === -1
//           ? theme.typography.fontWeightRegular
//           : theme.typography.fontWeightMedium,
//     };
//   }
//   const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 250,
//       },
//     },
//   };
//   const theme = createTheme({
//     breakpoints: {
//       values: {
//         xs: 0,
//         sm: 600,
//         md: 960,
//         lg: 1280,
//         xl: 1920,
//       },
//     },
//   });

//   const aplicarFiltrado = () => {
//     dispatch(
//       obtener_Todos_Libros(
//         1,
//         libro, 
//         autoresSeleccionados, 
//         generosSeleccionados, 
//         ordenPrecio
//       )
//     );
//     dispatch(librosGenero()); 
//   };
  
//   const limpiarFiltros = () => {
//     setGenerosSeleccionados([]);
//     setAutoresSeleccionados([]);
//     setOrdenPrecio("");
//     dispatch(obtener_Todos_Libros(1, libro));
//     setPage(1);
//   };
  

//   return (
//     <Grid
//       container
//       spacing={8}
//       sx={{
//         justifyContent: "center",
//         padding: "5%",
//         width: {
//           mobile: "99.5%",
//           tablet: "99.5%",
//           laptop: "99.5%",
//         },
//         alignSelf: "center",
//         mb: 8,
//         mt: 1,
//       }}
//     >
//       <Grid
//           container
//           spacing={2}
//           sx={{
//             display: "space-between",
//             justifyContent: "center",
//           }}
//         >
//         <Box
//           xs={12}
//           sm={6}
//           md={6}
//           lg={6}
//           sx={{
//             display: "space-between",
//             justifyContent: "center",
//             alignItems: "center",
//             mt: 8,
//             margin: 0,
//           }}
//         >
//           <FormControl sx={{ m: 1, width: 300 }}>
//             <InputLabel id="demo-genero-label">Género</InputLabel>
//             <Select
//               labelId="demo-genero-label"
//               id="demo-genero"
//               value={generosSeleccionados}
//               onChange={handleGenerosChange}
//               input={<OutlinedInput label="Género" />}
//               MenuProps={MenuProps}
//             >
//               {generosDisponibles.map((genero) => (
//                 <MenuItem
//                   key={genero}
//                   value={genero}
//                   style={getStyles(genero, generosSeleccionados, theme)}
//                 >
//                   {genero === 'nombregenero' ? 'nombregenero' : genero}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         <Box
//           xs={12}
//           sm={6}
//           md={6}
//           lg={6}
//           sx={{
//             display: "space-between",
//             justifyContent: "center",
//             alignItems: "center",
//             mt: 8,
//             margin: 0,
//           }}
//         >
//           <FormControl sx={{ m: 1, width: 300 }}>
//             <InputLabel id="demo-autor-label">Autores</InputLabel>
//             <Select
//               labelId="demo-autor-label"
//               id="demo-autor"
//               value={autoresSeleccionados}
//               onChange={handleAutoresChange}
//               input={<OutlinedInput label="Autores" />}
//               MenuProps={MenuProps}
//             >
//               {books
//                 ?.reduce((autores, libro) => {
//                   libro.nombreautor?.forEach((autor) => {
//                     if (!autores.includes(autor)) {
//                       autores.push(autor);
//                     }
//                   });
//                   return autores;
//                 }, [])
//                 .map((autor, index) => (
//                   <MenuItem
//                     key={index}
//                     value={autor}
//                     style={getStyles(autor, autoresSeleccionados, theme)}
//                   >
//                     {autor}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Box>

//         <Box
//           xs={12}
//           sm={6}
//           md={6}
//           lg={6}
//           sx={{
//             display: "space-between",
//             justifyContent: "center",
//             alignItems: "center",
//             mt: 8,
//             margin: 0,
//           }}
//         >
//           <FormControl sx={{ m: 1, width: 200 }}>
//             <Select
//               labelId="Orden precio"
//               label="Orden precio"
//               id="price"
//               value={ordenPrecio}
//               onChange={handleOrdenPrecio}
//               input={<OutlinedInput label="Orden" />}
//               MenuProps={MenuProps}
//             >
//               <MenuItem key={"undefined"} value={undefined}>
//                 ---
//               </MenuItem>
//               <MenuItem key={"Ascendente"} value={"up"}>
//                 Ascendente
//               </MenuItem>
//               <MenuItem key={"down"} value={"down"}>
//                 Descendente
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <Box sx={{ textAlign: "right", mt: 2 }}>
//           <Button variant="contained" onClick={aplicarFiltrado} sx={{ ml: 2 }}>
//             Aplicar
//           </Button>
//           <Button
//             variant="contained"
//             onClick={limpiarFiltros}
//             sx={{ marginLeft: 2 }}
//           >
//             Limpiar
//           </Button>
//         </Box>
//       </Grid>

//       <Cardsw books={libros} />


//       <Grid>
//         <Pagination count={paginas} page={page} showFirstButton showLastButton onChange={handleChangePagina} />
//         </Grid>
//       </Grid>
//   );
// };

// export default Home;





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
