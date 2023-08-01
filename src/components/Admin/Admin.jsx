import React, { useState, useEffect } from "react";
import axios from "axios";
import LibroList from "./ListarLibros/ListLibros";
import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../navbar/navbar";
import "./Admin.css";
import { obtener_Todos_Libros } from "../../redux/actions/actions";
import AgregarLibroModal from "./AgregarLibro/AgregarLibroModal";
import Modal from "react-modal";
import NavBar from "../navbar/navbar";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none', // Eliminar borde de la ventana modal
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Sombra ligera
    maxWidth: '300px', // Ancho máximo
    padding: '20px', // Espaciado interno
    textAlign: 'center', // Centrar contenido
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
const urlBack = "https://book-back-libreriaproyectofinal.vercel.app" 

function Admin() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const todoLibros = useSelector((state) => state.libros);
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
  }, [todoLibros]);

  const borrarLibro = (id) => {
    console.log(id);
    axios
      .delete(urlBack+`/borradoLibro/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // Realizar cualquier acción necesaria después de borrar el libro
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

  // const handleAgregarLibro = (formData) => {
  //   // Aquí puedes manejar la lógica para enviar los datos del libro mediante axios
  //   console.log("Datos del libro a agregar:", formData);
  //   // ...
  //   // Aquí puedes hacer la petición axios para agregar el libro con los datos y la imagen
  // };

  return (
    <>
    <NavBar/>
    <div className="table_List">
      <div className="table_List_cuerpo">
        {/* <NavBar /> */}
        <div className="div">
          <div className="AgregarLibro">
            {/* Botón para activar el popup */}
            <button className="agregar-libro-button" onClick={handleShowModal}>
              Agregar Libro
            </button>

            {/* Componente del popup */}
            <AgregarLibroModal
              show={showModal}
              handleClose={handleCloseModal}
              // handleAgregarLibro={handleAgregarLibro}
            />
          </div>

          <h2>Listado de Libros</h2>
          <table>
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
                key={libro.idlibro}
                libro={libro}
                borrarLibro={borrarLibro}
              />
            ))}
          </table>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
    </>
  );
}

export default Admin;
