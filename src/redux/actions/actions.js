import * as types from './types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json, useNavigate } from 'react-router-dom';

import axios from "axios";
export const urlBack = 'http://localhost:3001';
// const urlBack = "http://190.100.208.178:3001";
// const urlBack = "https://book-front-mu.vercel.app/"
//  export const urlBack = "https://book-back-libreriaproyectofinal.vercel.app" // acuerdense que esta llamando el BACK-DEPLOY


export const obtener_Todos_Libros = (pagina, limite) => { 
    return  (dispatch) => {      
     try {
       axios.get(urlBack+`/obtenerLibros?pagina=${pagina}&limite=${limite}`).then((response)=> {
          dispatch({
           type: 'OBTENER_TODOS_LIBROS',
           payload: {
             paginaActual: response.data.paginaActual,
             librosPorPagina: response.data.librosPorPagina,
             totalLibros: response.data.totalLibros,
             totalPaginas: response.data.totalPaginas,  
             libros: response.data.libros,                 
           },
                  });  
       }).catch((error) => {
        console.error('Error al obtener los libros:', error);
       })                    
      }
      catch(error){
       console.error('Error al listar libros: ', error);
       toast.error('Error al listar libros.', {  position: toast.POSITION.TOP_RIGHT,  });
     } }    
};

export const librosGenero = (pagina, genero, limite) => {
 return  (dispatch) => {      
    console.log('genero:',genero);
    try {
    axios.get(urlBack+`/obtenerLibrosPorGenero?pagina=${pagina}&genero=${genero}&limite=${limite}`).then((response) => {
    dispatch({
     type: "LIBROS_GENERO",
      payload:{
         paginaActual: response.data.paginaActual, 
         librosPorPagina: response.data.limitePagina,
         totalLibros: response.data.totalLibros, 
         totalPaginas: response.data.totalPaginas,
         libros: response.data.libros, 
       }
      }) } );
      }
    catch(error){
        console.error('Error al listar libros: ', error);
        toast.error('Error al listar libros.', {  position: toast.POSITION.TOP_RIGHT,  });
    }
   };
};

export const librosPorTitulo = (pagina, titulo, limite) => {
 return (dispatch) => {      
    console.log('titulo:',titulo)  /**obtenerLibrosPorTitulo/bat */
    try {
    axios.get(urlBack+`/obtenerLibrosPorTitulo?pagina=${pagina}&titulo=${titulo}&limite=${limite}`).then((response) => {
         dispatch({
           type: "LIBROS_TITULO",
           payload:{
            paginaActual: response.data.paginaActual, librosPorPagina: response.data.limitePagina, totalLibros: response.data.totalLibros, totalPaginas: response.data.totalPaginas, libros: response.data.libros, } }) } );
         }
       catch(error){
           console.error('Error al listar libros: ', error);
           toast.error('Error al listar libros.', {  position: toast.POSITION.TOP_RIGHT,  });
       }
      };
     
};


export const agregarLibro = (librodata) => {
  const user = localStorage.getItem("user");
  const dataUser = JSON.parse(user);
  return async (dispatch) => {
    try {
      const response = await axios.post(urlBack + `/agregaLibro`, librodata, {
        headers: { Authorization: dataUser.accessToken },
      });
      let data = response.data;
      console.log("agregarLibro: ", data, " .");
      alert("¡Libro agregado correctamente! ");
      obtener_Todos_Libros();
      dispatch({
        type: "AGREGA_LIBRO",
        payload: data,
      });
    } catch (error) {
      console.error("Error al agregar el libro: ", error);
      toast.error("Error al agregar libro. Inténtalo nuevamente.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
};


/** */
export const obtenerGeneros = () => {
 return async (dispatch) => {      
        const  response  = await axios.get(urlBack+`/obtenerGeneros`);
        let data = response.data;
        console.log('data generos: ', data, ' .');
        return  dispatch({
           type: "OBTIENE_GENEROS",
           payload: data,
         });    
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
 /** */
export function agregaCarrito(libro) {
 console.log('si entra al carrito');
 return {
   type: "AGREGAR_AL_CARRITO",
   payload: libro,
 };
}

export function obtieneDetalleLibro(idlibro) {
 return async function (dispatch) {
  console.log('idlibro: ',idlibro)
   const resp = await axios( urlBack+`/obtenerLibroId/${idlibro}` );
   console.log('actionresp: ',resp.data)
   return dispatch({
     type: "DETALLE_LIBRO",
     payload: resp.data,
   });
 };
}

export const deleteLibroCarro = (idlibro) => {
 return {
   type: "BORRA_LIBROCARRO",
   payload: idlibro
 };
};



export const updateCarrito = (idlibro,imagen,nombrelibro,preciolibro,cantidad,subtotalitem) => {
 return {
   type: 'UPDATE_CARRITO',
   payload: {
     idlibro,
     imagen,
     nombrelibro,
     preciolibro,  
     cantidad,            
     subtotalitem
   }
 };
};

export const cambiarFlagNav = (nuevoValor) => {
 return (dispatch) => {
   dispatch({
     type: 'CAMBIAR_FLAG_NAV',
     payload: nuevoValor,
   });
 };
};

export const elGenero = (nuevoValor) => {
 return (dispatch) => {
   dispatch({
     type: 'CAMBIAR_GEN',
     payload: nuevoValor,
   });
 };
};

export const elTitulo = (nuevoValor) => {
 return (dispatch) => {
   dispatch({
     type: 'CAMBIAR_TITULO',
     payload: nuevoValor,
   });
 };
};



 /**  LIMPIAR carrito DE LA PERSISTENCIA  */
 export const limpiarCarrito = () => {
  return {  type: "LIMPIAR_CARRITO" };
 };
 /** REINICIA STORE */
 export const reinicia_store = () => {
 return {  type: "REINICIA_STORE"  }; 
 };
  

/*

export function getDetail(id) {
  return async function (dispatch) {
    const json = await axios( urlBack+`/producto/${id}` );
    return dispatch({
      type: GET_DETAIL,
      payload: json.data,
    });
  };
}
*/

// usuarios
export const loginUser = (user) => {
  return {
    type: "LOGIN_USER",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export function GetUsuarios() {
  return async function (dispatch) {
    const user = localStorage.getItem("user");
    const dataUser = JSON.parse(user);
    console.log(dataUser);
    if (dataUser.accessToken) {
      const resp = await axios(urlBack + `/usuarios/`, {
        headers: { Authorization: dataUser.accessToken },
      });
      console.log(resp.data)
      return dispatch({
        type: "USUARIOS",
        payload: resp.data,
      });
    }
  };
}

export const editarLibro = (idlibro, dataLibro) => {
  const user = localStorage.getItem("user");
  const dataUser = JSON.parse(user);
  console.log(idlibro, dataLibro);
  return async (dispatch) => {
    const response = await axios.put(
      urlBack + `/actualizarLibro/${idlibro}`,
      dataLibro,
      { headers: { Authorization: dataUser.accessToken } }
    );
    let data = response.data;
    console.log("modificar ", dataLibro, " .");
    if (response.status === 200) {
      // Mostrar la alerta con el mensaje
      alert(data.message)
      obtener_Todos_Libros();
    }
  };
};

export const eliminaLibro = (idlibro) => {
  const user = localStorage.getItem("user");
  const dataUser = JSON.parse(user);
  return async (dispatch) => {      
     console.log('idlibro:',idlibro)
     try {
      
       const  response  = await axios.delete(urlBack+`/borradoLibro/${idlibro}`, { headers: { Authorization: dataUser.accessToken } });
       let data = response.data;
       console.log('Eliminar: ', data, ' .');
       if (data.status === 200) {
        // Mostrar la alerta con el mensaje
        alert(`eliminado OK id: ${idlibro} `+ data.message);
       }
     } catch (error) {
       if (error.response && error.response.status === 401){
         alert(error.response.data.error);
       }else {
        console.log(error)
       }
     }
         // return  dispatch({
         //    type: "ELIMINA_LIBRO",
         //    payload: data,
         //  });    
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
