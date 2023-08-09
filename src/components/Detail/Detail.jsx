import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import "./Detail.css";

import { useDispatch, useSelector } from "react-redux";
import { agregaCarrito, urlBack } from "../../redux/actions/actions.js";
import MensajeAgregado from "./MensajeAgregadoCarrito/Mensaje.jsx";
import NavBar from "../Navbar/Navbar";


function Detail() {
  const dispatch = useDispatch();
  const [libro, setLibro] = useState({});
  const user = useSelector((state) => state.user);
  const carrito = useSelector((state) => state.carrito);
  let { idl } = useParams();
  const navigate = useNavigate();
  console.log("idl:", idl, "-");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMensaje, setPopupMensaje] = useState("");

  useEffect(() => {
    const obtenerDetalleLibro = async () => {
      try {
        const response = await axios.get(urlBack + `/obtenerLibroId/${idl}`);
        const data = response.data;
        console.log(data);
        if (data.id === idl) {
          setLibro(data);
        } else {
          window.alert("No hay Libro con ese ID");
          navigate(-1); // Redirigir al usuario de vuelta a la página anterior si no se encuentra el libro
        }
      } catch (error) {
        window.alert("Error al obtener el detalle del libro");
        console.error(error);
        navigate(-1); // Redirigir al usuario de vuelta a la página anterior en caso de error
      }
    };

    obtenerDetalleLibro();
  }, [idl, navigate]);

  function handleSubmit(e) {
    const productExists = carrito.some((libro) => libro.id === idl);
    if (productExists) {
      alert("Este producto ya está en el carrito.");
      return;
    }

    const librosAgregar = {
      idlibro: libro.id,
      imagen: libro.fotolibro,
      nombrelibro: libro.nombrelibro,
      preciolibro: libro.preciolibro,
      cantidad: 1,
      subtotalitem: 1 * libro.preciolibro,
    };

    dispatch(agregaCarrito(librosAgregar));

    setPopupMensaje(`Agregaste el libro ${libro.nombrelibro} a tu carrito`);
    setShowPopup(true);
  }

  return (
    <div>
      <NavBar />
      <div className="contenedor">
        <div className="texto">
          <h3 className="titulo">Título: {libro.nombrelibro}</h3>
          <h3 className="descripcion">Descripción: {libro.desclibro}</h3>
          <h3 className="autor">Autor: {libro.autor?.nombreautor}</h3>
          <h3 className="precio">Precio: $ {libro.preciolibro}</h3>
          <h3 className="stock">Disp Stock: {libro.displibro}</h3>
          {user?
          ((user.tipoUsuario.rol === 'admin' || libro.displibro <= 0)?
          <button
            className="agregar-carrito-btn"
            onClick={() => handleSubmit()}
            disabled
          >
            No disponible
          </button>
          
          : 
            <button
            className="agregar-carrito-btn"
            onClick={() => handleSubmit()}
          
          >
            Agregar a carrito
          </button>):(
          (libro.displibro <= 0)?
           <button
           className="agregar-carrito-btn"
           onClick={() => handleSubmit()}
         disabled
         >
           No disponible
         </button>:
         
         <button
           className="agregar-carrito-btn"
           onClick={() => handleSubmit()}
         
         >
           Agregar a carrito
         </button>
         ) }
        </div>
        <img className="img" src={libro.fotolibro} alt="" />
      </div>
      <MensajeAgregado
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        mensaje={`Agregaste el libro "${libro.nombrelibro}" a tu carrito.`}
        onContinuar={() => {
          setShowPopup(false);
          navigate("/home");
        }}
        onIrACarrito={() => {
          setShowPopup(false);
          navigate("/carrito"); // Redirigir al carrito
        }}
      />
    </div>
  );
}

export default Detail;
