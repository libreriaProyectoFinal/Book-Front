import React, { useState, useEffect }  from 'react';
import { Contenedor, Tit, Img, Btn } from './styled.Detail.js';
import { useParams , useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
//const urlBack = 'http://localhost:3001';
const urlBack = "http://190.100.208.178:3001";

function Detail() {
  const [libro, setLibro] = useState({});
  let  {idl} = useParams();
  const navigate = useNavigate();
 console.log('idl:', idl ,'-');
 let hola= axios(urlBack+`/obtenerLibroId/${idl}`);
 console.log(hola);
 useEffect(() => {
  const obtenerDetalleLibro = async () => {
    try {
      const response = await axios.get(urlBack+`/obtenerLibroId/${idl}`);
      const data = response.data;
      if (data.idlibro) {
        setLibro(data);
      } else {
        window.alert('No hay Libro con ese ID');
        navigate(-1); // Redirigir al usuario de vuelta a la página anterior si no se encuentra el libro
      }
    } catch (error) {
      window.alert('Error al obtener el detalle del libro');
      console.error(error);
      navigate(-1); // Redirigir al usuario de vuelta a la página anterior en caso de error
    }
  };

  obtenerDetalleLibro();
}, [idl, navigate]);

  let handleGoBack = () => { navigate(-1); };
  return (
  <div>
     <Contenedor>
        <Btn onClick={handleGoBack}>Volver</Btn>
        <Img src={libro.fotolibro} />
        <Tit>id: {libro.idlibro}</Tit>
        <Tit>Titulo: {libro.nombreautor}</Tit>
        <Tit>Descripcion:: {libro.desclibro}</Tit>
        <Tit>Nota Biografica {libro.nombreautor}</Tit>
        <Tit>Precio: $ {libro.preciolibro}</Tit>
        <Tit>Disp Stock: {libro.displibro}</Tit>
         {/* <Tit>Temperamentos: {libro.temperament}</Tit>
        <Tit>Años de Vida: {libro.life_span}</Tit> */}
       <button className="btn btn-primary" style={{ fontSize: '24px', padding: '15px 30px' }}>
          Agregar a carrito
       </button>
     </Contenedor>
  </div>
 );
}

export default Detail;
