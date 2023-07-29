import React, { useState, useEffect }  from 'react';
import { Contenedor, Tit, Img, Btn } from './styled.Detail.js';
import { useParams , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { agregaCarrito } from '../../redux/actions/actions';
import { obtieneDetalleLibro } from '../../redux/actions/actions.js'
import { Link } from "react-router-dom";
import axios from 'axios';


function Detail() {
  let  { idl } = useParams();
  const [libro, setLibro] = useState({});

  const carrito = useSelector((state) => state.carrito);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();  
 console.log('idl:', idl ,'-');

 const libroDetail = useSelector( (state) => state.details );

  // Actualiza el estado 'libro' con los datos de 'libroDetail'
  useEffect(() => {
   setLibro(libroDetail);
 }, [libroDetail]); 

 const { id, nombrelibro, desclibro, nombreautor, preciolibro, displibro, fotolibro } = libro;

  console.log('idparams', libro.id);
  console.log('nombrelibro:',libro.nombrelibro);
  console.log('desclibro:',libro.desclibro);


 
   useEffect( 
    () =>{ dispatch ( obtieneDetalleLibro(idl) )  }, [idl] );


  //########### EL HANDLE DE AGREGAR PRODUCTO AL CARRITO ##############
  function handleSubmit(e) {

     const productExists = carrito.some((libro) => libro.id === id);
     if (productExists) { alert("Este producto ya está en el carrito.");
       return; 
     }

   const librosAgregar = {
     idlibro: id,
     imagen: fotolibro,
     nombrelibro: nombrelibro,
     preciolibro: preciolibro, 
     cantidad: 1,
     subtotalitem: (1 * preciolibro)
   };

   dispatch( agregaCarrito( librosAgregar ));
   
   alert(`Agregaste el libro ${nombrelibro} a tu carrito`);
 }


  return (
  <div>

     <Contenedor >
        {/* <Btn onClick={handleGoBack}>Volver</Btn> */}
        <Img src={fotolibro} />
        <Tit>id: {id}</Tit>
        <Tit>Titulo: {nombrelibro}</Tit>
        <Tit>Descripcion: {desclibro}</Tit>
        <Tit>Nota Biografica {nombreautor}</Tit>
        <Tit>Precio: $ {preciolibro}</Tit>
        <Tit>Disp Stock: {displibro}</Tit>
         {/* <Tit>Temperamentos: {libro.temperament}</Tit>
        <Tit>Años de Vida: {libro.life_span}</Tit> */}
       <button  onClick={ () => handleSubmit() }     style={{ fontSize: '24px', padding: '15px 30px' }}>
          Agregar a carrito
       </button>
     </Contenedor>
   
  </div>
 );
}

export default Detail;
