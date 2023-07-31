import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import librosJSON from './libros.json';
import axios from 'axios';
import NavBar from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import NotFoundPage from './components/NotFound/NotFound';
import FormC from './components/FormIngresoC/form.jsx';
import Detail from './components/Detail/Detail.jsx';
import Carrito from "./components/Carrito/Carrito/Carrito";

import AgregaLibro from './components/FormIngresoC/AgregarLibroForm.jsx';
import { obtener_Todos_Libros, obtenerGeneros } from './redux/actions/actions';
import Admin from './components/Admin/Admin';
//import EditaLibro from './components/FormIngresoC/EditarLibroForm.jsx';
// user
import LoginForm from './components/Usuario/Login/Login';
import RegisterForm from './components/Usuario/Registro/Registro';


document.title = "Book Club";
//const urlBack = 'http://localhost:3001';
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
 const dispatch = useDispatch();
 const [currentPage, setCurrentPage] = useState(1);
 const librosPorPagina = 4;
 useEffect(() => {   dispatch(obtenerGeneros()); 
                     dispatch(obtener_Todos_Libros(1,4));
                 }, []);
  return (
    <div className="App">
     <NavBar /> 
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/formC" element={<FormC/>} />
        {/* registro de usuario */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />

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
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/editalibro/:idl"  element={<EditaLibro />} /> */}
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}
export default App;