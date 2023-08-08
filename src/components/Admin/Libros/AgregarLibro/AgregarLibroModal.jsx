import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { obtener_Todos_Libros } from '../../../../redux/actions/actions';

const cloudName = "dmjkjz1oa";
const back_url ="https://book-back-libreriaproyectofinal.vercel.app" 


const AgregarLibroModal = ({ show, handleClose }) => {
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
    "Biografía/Memorias"
  ];


  const dispatch = useDispatch()
  const [urlImagen, setUrlImagen] = useState('');
  const [imagenCargada, setImagenCargada] = useState(false);

  const [formData, setFormData] = useState({
    nombrelibro: "",
    nombreautor: "",
    desclibro: "",
    displibro: "",
    nombregenero: "",
    preciolibro: "",
    fotolibro: urlImagen,
    obslibro:'',
    esborrado : 0,
    errores: {}
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    if (name === 'fotolibro') {
        
        let file = event.target.files[0];
        let url = await handleImageUpload(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          fotolibro: url, // Actualiza la propiedad fotolibro en formData
        }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Código para subir imagen
  const handleImageUpload = async (file) => {
    setImagenCargada(true)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shoppie");
    console.log(formData)
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      let urlImagen = response.data.url;
      setUrlImagen(urlImagen);
      setImagenCargada(false);
      console.log('imagen enviada', response.data)
      return urlImagen;
    } catch (error) {
      console.log(error.message);
      alert("Error al cargar la imagen");
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Realizar las validaciones aquí
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      // Enviar el formulario si no hay errores
      // Aquí iría la lógica para enviar los datos al servidor, por ejemplo:
      try {
        const response = await axios.post(`${back_url}/agregaLibro`, formData);
        console.log("Formulario enviado:", formData);
      } catch (error) {
        console.log(error.message);
        alert("Error al enviar el formulario");
      }
      // Luego cerramos el modal
      dispatch(obtener_Todos_Libros());
      handleClose();
    } else {
      // Mostrar los errores si existen
      setFormData((prevFormData) => ({
        ...prevFormData,
        errores: errors
      }));
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.nombrelibro) {
      errors.nombrelibro = "Debe ingresar el nombre del libro";
    }

    if (!data.nombreautor) {
      errors.nombreautor = "Debe ingresar el nombre del autor";
    }

    if (!data.desclibro) {
      errors.desclibro = "Debe ingresar la descripción del libro";
    }

    if (!data.displibro) {
      errors.displibro = "Debe ingresar la disponibilidad del libro";
    }

    if (!data.nombregenero) {
      errors.nombregenero = "Debe ingresar el género del libro";
    }

    if (!data.preciolibro) {
      errors.preciolibro = "Debe ingresar el precio del libro";
    } else if (!Number.isInteger(Number(data.preciolibro))) {
      errors.preciolibro = "El precio debe ser un número entero";
    }

    // Aquí puedes agregar más validaciones según tus necesidades

    return errors;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Libro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Aquí van los campos del formulario */}
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre del libro:</Form.Label>
            <Form.Control type="text" name="nombrelibro" value={formData.nombrelibro} onChange={handleChange} />
            {formData.errores.nombrelibro && <Form.Text className="text-danger">{formData.errores.nombrelibro}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="formAutor">
            <Form.Label>Autor del libro:</Form.Label>
            <Form.Control type="text" name="nombreautor" value={formData.nombreautor} onChange={handleChange} />
            {formData.errores.nombreautor && <Form.Text className="text-danger">{formData.errores.nombreautor}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción del libro:</Form.Label>
            <Form.Control type="text" name="desclibro" value={formData.desclibro} onChange={handleChange} />
            {formData.errores.desclibro && <Form.Text className="text-danger">{formData.errores.desclibro}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="formDisponibilidad">
            <Form.Label>Disponibilidad del libro:</Form.Label>
            <Form.Control type="text" name="displibro" value={formData.displibro} onChange={handleChange} />
            {formData.errores.displibro && <Form.Text className="text-danger">{formData.errores.displibro}</Form.Text>}
          </Form.Group>
         <Form.Group controlId="formGenero">
            <Form.Label>Género del libro:</Form.Label>
            <Form.Control as="select" name="nombregenero" value={formData.nombregenero} onChange={handleChange}>
              <option value="">Seleccionar género</option>
              {generos.map((genero) => (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              ))}
            </Form.Control>
            {formData.errores.nombregenero && <Form.Text className="text-danger">{formData.errores.nombregenero}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="formPrecio">
            <Form.Label>Precio del libro:</Form.Label>
            <Form.Control type="number" name="preciolibro" value={formData.preciolibro} onChange={handleChange} />
            {formData.errores.preciolibro && <Form.Text className="text-danger">{formData.errores.preciolibro}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="formImagen">
            <Form.Label>Imagen del libro:</Form.Label>
            <Form.Control type="file" name="fotolibro" onChange={handleChange} />
            {/* No mostramos errores para el campo de imagen */}
          </Form.Group>
          <Form.Group controlId="formGenero">
            <Form.Label>Obserbaciòn libro:</Form.Label>
            <Form.Control type="text" name="obslibro" value={formData.obslibro} onChange={handleChange} />
            {formData.errores.obslibro && <Form.Text className="text-danger">{formData.errores.obslibro}</Form.Text>}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={imagenCargada}>
                {imagenCargada ? "Subiendo imagen..." : "Agregar Libro"}
              </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AgregarLibroModal;
