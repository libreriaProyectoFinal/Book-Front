import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./ListLibros.css";
import { useDispatch } from "react-redux";
import { obtener_Todos_Libros } from "../../../redux/actions/actions";

const LibroList = ({ libro, borrarLibro }) => {

  // Lista de los 15 géneros más usados
const generos = [
  "Novela contemporánea",
  "Novela histórica",
  "Ciencia ficción",
  "Fantasía",
  "Romance",
  "Misterio/Thriller",
  "Terror",
  "Aventura",
  "Drama",
  "Poesía",
  "Cuento/Colección de relatos cortos",
  "Ficción histórica",
  "Autoayuda",
  "Literatura infantil y juvenil",
  "Biografía/Memorias",
];
  const [existingImageUrl, setExistingImageUrl] = useState(libro.fotolibro);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombrelibro: libro.nombrelibro,
    desclibro: libro.desclibro,
    obslibro:libro.obslibro,
    nombregenero: libro.nombregenero,
    preciolibro: libro.preciolibro,
    nombreautor: libro.nombreautor,
    fotolibro: existingImageUrl,
    displibro: libro.displibro,
  });
  const [imagePreview, setImagePreview] = useState(libro.fotolibro);
  const [isUploading, setIsUploading] = useState(false); // Estado para controlar el proceso de carga de imagen

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = async (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setIsUploading(true);
      let file = e.target.files[0];
      let url = await uploadImageToCloudinary(file);
      // await deleteImageFromCloudinary(existingImageUrl)
      setFormData((prevFormData) => ({
        ...prevFormData,
        fotolibro: url,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setIsUploading(false);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const cloudinaryCloudName = "mjkjz1oa";

  const cloudinaryUploadPreset = "shoppie";

  // const deleteImageFromCloudinary = async (imageUrl) => {
  //   try {
  //     // Extrae el public_id de la URL de Cloudinary
  //     const publicId = imageUrl.split('/').slice(-2, -1).join('/');

  //     // Realiza la solicitud para eliminar la imagen por su public_id
  //     const response = await axios.delete(
  //       `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy/${publicId}`
  //     );

  //     console.log('Imagen eliminada de Cloudinary:', imageUrl);
  //   } catch (error) {
  //     console.error('Error al eliminar la imagen de Cloudinary:', error);
  //     throw error;
  //   }
  // };

  const uploadImageToCloudinary = async (file) => {
    try {
      setIsUploading(true); // Habilitar el estado de carga
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      );

      setIsUploading(false); // Deshabilitar el estado de carga después de que se haya subido la imagen
      console.log(response.data.secure_url);
      return response.data.url;
    } catch (error) {
      setIsUploading(false); // Deshabilitar el estado de carga en caso de error
      console.error("Error al subir la imagen a Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.patch(
        `http://localhost:3001/actualizarLibro/${libro.idlibro}`,
        formData
      );

      handleCloseModal();
      dispatch(obtener_Todos_Libros());
      console.log("Libro actualizado:", response.data);
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
    }
  };

  return (
    <>
     
        
        <tbody>
          <tr>
            <td>{libro.id}</td>
            <td>{libro.nombrelibro}</td>
            <td>{libro.autor.nombreautor}</td>
            <td>{libro.desclibro}</td>
            <td>{libro.displibro}</td>
            <td>{libro.genero.nombregenero}</td>
            <td>{libro.preciolibro}</td>
            <td>
              <img
                src={libro.fotolibro}
                alt=""
                className="imagen card-img-top"
              />
            </td>
            <td className="">
              <div className="botones_acciones_table">
                <button
                  className="btn btn-danger me-2 "
                  onClick={() => borrarLibro(libro.idlibro)}
                >
                  Borrar
                </button>
                <button className="btn btn-primary " onClick={handleShowModal}>
                  Editar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre del libro:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombrelibro"
                  value={formData.nombrelibro}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAutor">
                <Form.Label>Autor del libro:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreautor"
                  value={formData.nombreautor}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción del libro:</Form.Label>
                <Form.Control
                  type="text"
                  name="desclibro"
                  value={formData.desclibro}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formObservacion">
                <Form.Label>Observaciòn del libro:</Form.Label>
                <Form.Control
                  type="text"
                  name="obslibro"
                  value={formData.obslibro}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDisponibilidad">
                <Form.Label>Disponibilidad del libro:</Form.Label>
                <Form.Control
                  type="text"
                  name="displibro"
                  value={formData.displibro}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formGenero">
              <Form.Label>Género del libro:</Form.Label>
              <Form.Control
                as="select"
                name="nombregenero"
                value={formData.nombregenero}
                onChange={handleChange}
              >
                <option value="">Seleccionar género</option>
                {generos.map((genero) => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
              <Form.Group controlId="formPrecio">
                <Form.Label>Precio del libro:</Form.Label>
                <Form.Control
                  type="number"
                  name="preciolibro"
                  value={formData.preciolibro}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formImagen">
                <Form.Label>Imagen del libro:</Form.Label>
                <Form.Control
                  type="file"
                  name="fotolibro"
                  onChange={handleChange}
                />
                {/* Previsualización de la nueva imagen seleccionada */}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Previsualización de la nueva imagen"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isUploading}>
                {isUploading ? "Subiendo imagen..." : "Actualizar Libro"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
     
    </>
  );
};

export default LibroList;
