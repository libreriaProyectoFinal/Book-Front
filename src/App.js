<<<<<<< HEAD
import React, { } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
=======
import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
>>>>>>> aad8582fcf1e22130e9adf4e3becb76bafdeb7d3
import './App.css';
import Home from './components/Home/Home.jsx';
// import librosJSON from './libros.json';
// import axios from 'axios';
import NavBar from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import NotFoundPage from './components/NotFound/NotFound';
import FormC from './components/FormIngresoC/form.jsx';
import Detail from './components/Detail/Detail.jsx';
<<<<<<< HEAD
=======
import Carrito from "./components/Carrito/Carrito/Carrito";

>>>>>>> aad8582fcf1e22130e9adf4e3becb76bafdeb7d3
import AgregaLibro from './components/FormIngresoC/AgregarLibroForm.jsx';
import { obtener_Todos_Libros, obtenerGeneros } from './redux/actions/actions';
//import EditaLibro from './components/FormIngresoC/EditarLibroForm.jsx';


document.title = "Book Club";
<<<<<<< HEAD
// const urlBack = 'http://localhost:3001';
=======
//const urlBack = 'http://localhost:3001';
>>>>>>> aad8582fcf1e22130e9adf4e3becb76bafdeb7d3
//const urlBack = 'http://190.100.208.178:3001';

// codigo para agregar libros
 // URL del endpoint del backend para guardar los libros
//const backendURL =urlBack+"/agregaLibro";


 // Función para enviar un libro al backend
 // async function enviarLibro(libro) {
 //   try {
 //     const response = await axios.post(backendURL, libro);
 //     console.log(`Libro "${libro.nombrelibro}" enviado correctamente.`);
 //     return response.data;
 //   } catch (error) {
 //     console.error(`Error al enviar el libro "${libro.nombrelibro}": ${error.message}`);
 //     throw error;
 //   }
 // }
 
 // Función para recorrer y enviar todos los libros
 // async function enviarLibros() {
 //   for (const libro of librosJSON) {
 //     try {
 //       await enviarLibro(libro);
 //     } catch (error) {
 //       console.log(error.message)
 //     }
 //   }
 // }

 //enviarLibros();

function App() {
<<<<<<< HEAD

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

=======
 const dispatch = useDispatch();
 const [currentPage, setCurrentPage] = useState(1);
 const librosPorPagina = 4;
 useEffect(() => {   dispatch(obtenerGeneros()); 
                     dispatch(obtener_Todos_Libros(1,4));
                 }, []);
>>>>>>> aad8582fcf1e22130e9adf4e3becb76bafdeb7d3
  return (
    <div className="App">
      {!isLandingPage && <NavBar />} 
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/formC" element={<FormC/>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/feed" element={<h1>Feed</h1>} />
        <Route path="/book/:id" element={<h1>Get by Id</h1>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/createbook" element={<h1>Add</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/detail/:idl"  element={<Detail />} />
        <Route path="/agregalibro" element={<AgregaLibro />} />
        <Route path="/carrito" element={<Carrito />} />
        {/* <Route path="/editalibro/:idl"  element={<EditaLibro />} /> */}
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
<<<<<<< HEAD
      
=======
>>>>>>> aad8582fcf1e22130e9adf4e3becb76bafdeb7d3
    </div>
  );
}
export default App;