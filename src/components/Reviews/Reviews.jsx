import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Reviews.css";
import NavBar from "../navbar/navbar.jsx";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { urlBack } from "../../redux/actions/actions.js";

function Reviews() {
  const dispatch = useDispatch();
  const [libro, setLibro] = useState({});
  const carrito = useSelector((state) => state.carrito);
  let { idl } = useParams();
  const navigate = useNavigate();
  console.log("idl:", idl, "-");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMensaje, setPopupMensaje] = useState("");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ratingColors, setRatingColors] = useState([false, false, false, false, false]);


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
          navigate(-1);
        }
      } catch (error) {
        window.alert("Error al obtener el detalle del libro");
        console.error(error);
        navigate(-1);
      }
    };

    obtenerDetalleLibro();
  }, [idl, navigate]);


  function handleEmojiClick(index) {
    const newRatingColors = Array.from({ length: 5 }, (_, i) => i <= index);
    setRatingColors(newRatingColors);
    setRating(index + 1);
  }


  function handleSubmit() {
    const librosAgregar = {
      idlibro: libro.id,
      imagen: libro.fotolibro,
      nombrelibro: libro.nombrelibro,
      preciolibro: libro.preciolibro,
      cantidad: 1,
      subtotalitem: 1 * libro.preciolibro,
      rating: rating,
      comment: comment,
    };
  
    axios.post(urlBack + "/enviarCalificacion", librosAgregar)
      .then(response => {
        // On success, show alert and redirect
        setPopupMensaje(`Calificación recibida: ${rating}`);
        setShowPopup(true);

        // Redirect to profile page after 2 seconds
        setTimeout(() => {
          navigate(`/perfil/${idl}`);
        }, 2000);
      })
      .catch(error => {
        console.error("Error sending rating:", error);
        // Handle error here
      });


    setRatingColors([false, false, false, false, false]);
    setComment("");  }
  
  


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
          
          <div className="rating">
        <div className="rating-text">Calificar:</div>
        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={ratingColors[num - 1] ? "star active" : "star"}
              onClick={() => handleEmojiClick(num - 1)}
            >
              {/* Aquí usamos el caracter unicode de una estrella */}
              &#9733;
            </span>
          ))}
        </div>
      </div>
          
       
          <textarea
            className="comment"
            placeholder="Deja tu comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

        
          <button className="confirm-button" onClick={handleSubmit}>
                  Confirmar
                </button>
                {showPopup && (
                  <div className="popup">
                    <p>{popupMensaje}</p>
                  </div>
                )}
        </div>
        <img className="img" src={libro.fotolibro} alt="" />
      </div>
      <Footer />
    </div>
  );
}

export default Reviews;
