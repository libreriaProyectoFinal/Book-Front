import React, { useState, useEffect } from "react";
import axios from "axios";
import LibroList from "./ListarLibros/ListLibros";
import { useDispatch, useSelector } from "react-redux";
import { librosGenero, librosPorTitulo, obtener_Todos_Libros } from "../../../redux/actions/actions";
import AgregarLibroModal from "./AgregarLibro/AgregarLibroModal";
import Modal from "react-modal";
import './Libros.css'
import FiltrosLibros from "./FiltrosLibros/FiltrosLibros";

import PaginationAdmin from "./FiltrosLibros/PaginateLibros";


const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      border: "none", // Eliminar borde de la ventana modal
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Sombra ligera
      maxWidth: "300px", // Ancho máximo
      padding: "20px", // Espaciado interno
      textAlign: "center", // Centrar contenido
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semitransparente
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
function AdminLibros() {
    const flagNav = useSelector((state) => state.flagNav);
  const generonav = useSelector((state) => state.generonav);
  const titulonav = useSelector((state) => state.titulonav);
  const dispatch = useDispatch();
  const todoLibros = useSelector((state) => state.libros);
  const librosxpag = 4;

  useEffect(() => {
    if (flagNav === "0") dispatch(obtener_Todos_Libros(1, librosxpag));
    if (flagNav === "1") dispatch(librosGenero(1, generonav, librosxpag));

    if (flagNav === "2") dispatch((1, titulonav, librosxpag));
  }, [flagNav, generonav, titulonav]);

  const handlePageChange = (pageNumber) => {
    if (flagNav === "0") dispatch(obtener_Todos_Libros(pageNumber, librosxpag));
    if (flagNav === "1")
      dispatch(librosGenero(pageNumber, generonav, librosxpag));
    if (flagNav === "2")
      dispatch(librosPorTitulo(pageNumber, titulonav, librosxpag));
  };



    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    
    const [libros, setLibros] = useState([]);
    useEffect(() => {
      dispatch(obtener_Todos_Libros());
    }, []);
  
    useEffect(() => {
      if (todoLibros && todoLibros.libros) {
        const librosFiltrados = todoLibros.libros.filter(
          (libro) => libro.esborrado === 0
        );
        setLibros(librosFiltrados);
      }
    //   setLibros(todoLibros.libros);
    }, [todoLibros]);

    const borrarLibro = (id) => {

        console.log(id);
        axios
          .patch(`http://localhost:3001/borradoLibro/${id}`)
          .then((response) => {
            if (response.status === 200) {
              // Realizar cualquier acción necesaria después de borrar el libro
              console.log(response.data.libro)
              dispatch(obtener_Todos_Libros());
            } else {
              // Mostrar el mensaje de error del backend en la ventana modal
              if (response.data && response.data.error) {
                setErrorMessage(response.data.error);
                setModalIsOpen(true);
              } else {
                // Mostrar mensaje de error genérico en la ventana modal
                setErrorMessage("Ocurrió un error inesperado.");
                setModalIsOpen(true);
              }
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              setErrorMessage(error.response.data.error);
              setModalIsOpen(true);
            } else {
              // Mostrar mensaje de error genérico en la ventana modal
              setErrorMessage("Ocurrió un error inesperado.");
              setModalIsOpen(true);
            }
          });
      };

     //   agregar libro
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(libros)
    return ( <>
      <div className="col-md-12  Admin_libros">
          <div className="table_List">
            <div className="table_List_cuerpo">
                <div className="row contenidoFiltrosLibro bg-secondary">

                <div className="AgregarLibro">
                  {/* Botón para activar el popup */}
                  <button
                    className="agregar-libro-button"
                    onClick={handleShowModal}
                  >
                    Agregar Libro
                  </button>

                  {/* Componente del popup */}
                  <AgregarLibroModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    // handleAgregarLibro={handleAgregarLibro}
                  />
                </div>
                <div className="Pagination">

                    <PaginationAdmin libros={todoLibros} onPageChange={handlePageChange} />
                    </div>
                <div className="FiltrosLibros">

                <FiltrosLibros/>
                </div>
               
                </div>
              <div className="div contenido_tabla">

                <h2>Listado de Libros</h2>
                <table className="table_libros">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Autor</th>
                      <th>Descripciòn</th>
                      <th>Disponibilidad</th>
                      <th>Genero</th>
                      <th>Precio</th>
                      <th>Imagen</th>
                      <th colSpan="2">Acciones</th>
                    </tr>
                  </thead>
                  {libros.map((libro) => (
                    <LibroList
                      key={libro.id}
                      libro={libro}
                      borrarLibro={borrarLibro}
                    />
                  ))}
                </table>
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={customStyles}
            >
              <h2>Error</h2>
              <p>{errorMessage}</p>
              <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
            </Modal>
          </div>
        </div>
   </> );
}

export default AdminLibros;