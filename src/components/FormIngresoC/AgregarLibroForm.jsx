import React, { useState, useRef } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Contenedor, Tit, Img, Btn } from './styled.Detail.js';
import { Formik, Form, Field } from 'formik';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { editarProducto } from '../../redux/actions/actions';
import { agregarLibro } from '../../redux/actions/actions';

const cloudName = "dmjkjz1oa";

function AgregarProductoForm() {
   const navigate = useNavigate(); 
   const dispatch = useDispatch();
   const {id} = useParams();
  const fileInputRef = useRef(null);
  const [urlImagen, setUrlImagen] = useState('');
  const [imagenCargada, setImagenCargada] = useState(false);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shoppie");
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      let urlImagen = response.data.url;
      setUrlImagen(urlImagen);
      setImagenCargada(true);
      return urlImagen;
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = async (event, setFieldValue) => { /** estos parametros van en el HTML en el field 'fotolibro*/
    setImagenCargada(false);
    let file = event.target.files[0];
    let url = await handleImageUpload(file);
    setFieldValue("fotolibro", url);
    alert(`Imagen cargada: ${url}`);

  };

  const handleFileUpload = () => {  fileInputRef.current.click();  };

  return (
   <Contenedor>
 <Container maxWidth="sm">
   <Formik
     initialValues={{
        nombrelibro: "Titulo Libro.",
        desclibro: "Descripcion",
        nombreautor: "Autor del libro",
        fotolibro: "http://aqui-va-lafotodelibro.jpg",
        preciolibro: 1,
        displibro: 8,
        nombregenero:"anime",
        esborrado:0
     }}
     validate={(values) => {
      const errors = {};
      if (!values.nombrelibro) { values.nombrelibro = "Titulo Libro";  }
      if (!values.desclibro) {  values.desclibro = "Descripcion Libro";  }
      if (!values.nombreautor) {  values.nombreautor = "Autor Libro";  }
      if (!values.fotolibro) {  values.fotolibro = "http://res.cloudinary.com/dmjkjz1oa/image/upload/v1690215105/shoppieimg/dqobcgbvcba9icme03sv.webp";      }
  
      if (!values.preciolibro) {  values.preciolibro = 0;  }
      if (!values.displibro) {  values.displibro = 0;  }
      if (!Number.isInteger(Number(values.preciolibro))) { errors.preciolibro = 'El precio debe ser un número entero';   }
      if (!Number.isInteger(Number(values.displibro))) {  errors.displibro = 'El stock debe ser un número entero';   }

      if (!values.nombregenero) {  values.nombregenero = "anime";  }

      return errors;
    }}
    onSubmit={(values) => {
    // Asegurémonos de que los valores sean números enteros
    values.preciolibro = parseInt(values.preciolibro);
    values.displibro = parseInt(values.displibro);
    // Aquí invocamos la acción agregarLibro con los datos del formulario (values)
    dispatch(agregarLibro(values));
    navigate('/');
    // navigate('/detail/'+values.idlibro);
    }}
   >
  {({ handleSubmit, setFieldValue, errors }) => (
 <Form onSubmit={ handleSubmit }>
  <h1>AGREGAR LIBRO</h1>
  <Box mb={2}>
    <p></p>
    <Field name="nombrelibro" as={TextField} label="Nombre Libro" style={{ width: "100%", background: "white" }} />
    <p></p>
    <Field name="desclibro" as={TextField} label="Descripción" style={{ width: "100%", background: "white" }} />
    <p></p>
    <Field name="nombreautor" as={TextField} label="Nombre del autor" style={{ width: "100%", background: "white" }} />
    <p></p>
    <Field name="fotolibro" as={TextField} label="Imagen Libro" style={{ width: "100%", background: "white" }} />
    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange = { (event) => handleFileChange(event, setFieldValue) } />
    <Button type="button"                                              onClick = { ()  => handleFileUpload(setFieldValue) }>Cargar Imagen</Button>
   <p></p>
    <Field
        name="preciolibro"
        as={TextField}
        label="Precio Libro"
        style={{ width: "100%", background: "white" }}
        helperText={errors.preciolibro}
        error={!!errors.preciolibro}
      />
    <p></p>
    <Field
        name="displibro"
        as={TextField}
        label="Disponibilidad Stock"
        style={{ width: "100%", background: "white" }}
        helperText={errors.displibro}
        error={!!errors.displibro}
      />
   <p></p>
    <Field name="nombregenero" as={TextField} label="Genero Libro" style={{ width: "100%", background: "white" }} />

  </Box>
  <Button type="submit" variant="contained"  sx={{ background: '#66CCFF', color: '#fff', fontSize: '18px', padding: '15px 30px', borderRadius: '10px', marginTop: '20px' }}
color="primary" disabled={!imagenCargada} >Guardar</Button>
 </Form>
  )}
   </Formik>
 </Container>
 </Contenedor>
  );
}

export default AgregarProductoForm;
