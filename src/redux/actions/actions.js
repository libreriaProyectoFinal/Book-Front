import * as types from './types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import axios from "axios";
//const urlBack = 'http://localhost:3001';
const urlBack = "http://190.100.208.178:3001";


export const obtener_Todos_Libros = (pagina,limite) => { 
    return async (dispatch) => {      
     try {
          const  response  = await axios.get(urlBack+`/obtenerLibros?pagina=${pagina}&limite=${limite}`);
          let data = response.data;          
          console.log('data: ', data, ' .');
          dispatch({
            type: "OBTENER_TODOS_LIBROS",
            payload: data,
          });              
      }
      catch(error){
       console.error('Error al listar libros: ', error);
       // Mostrar una notificación de error si es necesario
       toast.error('Error al listar libros.', {  position: toast.POSITION.TOP_RIGHT,  });
     } }    
};

export const agregarLibro = (librodata) => {
   return async (dispatch) => {      
    try {
     const navigate = useNavigate(); 
         const  response  = await axios.post(urlBack+`/agregaLibro`,librodata);
         let data = response.data;
         console.log('agregarLibro: ', data, ' .');
         alert('¡Libro agregado correctamente! de ID:'+data.idlibro+'.');
        // navigate('/detail/'+data.idlibro);
         dispatch({
           type: "AGREGA_LIBRO",
           payload: data,
         });    
     }
     catch(error){
      console.error('Error al agregar el libro: ', error);
      // Mostrar una notificación de error si es necesario
      toast.error('Error al agregar libro. Inténtalo nuevamente.', {  position: toast.POSITION.TOP_RIGHT,  });
     }   
   };
}
export const librosGenero = (genero) => {
 return async (dispatch) => {      
    console.log('genero:',genero)
         const  response  = await axios.get(urlBack+`/obtenerLibroPorGenero/${genero}`);
         let data = response.data;
         console.log('data libros x genero: ', data, ' .');

        return  dispatch({
           type: "LIBROS_GENERO",
           payload: data,
         });    
     };
};

export const librosPorTitulo = (titulo) => {
 return async (dispatch) => {      
    console.log('genero:',titulo)  /**obtenerLibrosPorTitulo/bat */
         const  response  = await axios.get(urlBack+`/obtenerLibrosPorTitulo/${titulo}`);
         let data = response.data;
         console.log('data libros x genero: ', data, ' .');

        return  dispatch({
           type: "LIBROS_TITULO",
           payload: data,
         });    
     };
};

export const eliminaLibro = (idlibro) => {
 return async (dispatch) => {      
    console.log('idlibro:',idlibro)
         const  response  = await axios.delete(urlBack+`/borradoLibro/${idlibro}`);
         let data = response.data;
         console.log('Eliminar: ', data, ' .');
         if (data.status === 200) {
          // Mostrar la alerta con el mensaje
          alert(`eliminado OK id: ${idlibro} `+ data.message);
         }
        // return  dispatch({
        //    type: "ELIMINA_LIBRO",
        //    payload: data,
        //  });    
     };
};

export const modificaLibro = (idlibro) => {
 return async (dispatch) => {      
  console.log('idlibro:',idlibro)
       const  response  = await axios.get(urlBack+`/actualizarLibro/${idlibro}`);
       let data = response.data;
       console.log('modificar ', data, ' .');
       if (response.status === 200) {
        // Mostrar la alerta con el mensaje
        alert(`modificado OK id: ${idlibro} `+ data.message);
      }
   };
};



/*
  librosPorPagina: 4
  paginaActual:1
  totalLibros:103
 */

export const obtener_Libro_Por_Id = () => ({})
export const agregar_Libro = () => ({})
export const eliminar_Libro = () => ({})
export const actualizar_Libro = () => ({})
export const filtrar_Libros = () => ({})
export const quitar_Filtro = () => ({})
export const ordenar_Libros = () => ({})
export const quitar_Orden = () => ({})
export const siguiente_Pagina = () => ({})
export const pagina_Anterior = () => ({})
export const agregar_Localizacion = () => ({})
export const buscar_Libro_Por_Titulo = () => ({})
