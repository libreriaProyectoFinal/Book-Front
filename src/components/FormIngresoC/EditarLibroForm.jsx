import React, { useState, useRef } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editarProducto } from '../../../Redux/actions';

const cloudName = "dmjkjz1oa";

function EditarProductoForm() {
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

  const handleFileChange = async (event, setFieldValue, handleSubmit) => {
    setImagenCargada(false);
    let file = event.target.files[0];
    let url = await handleImageUpload(file);
    setFieldValue("fotoprinc", url);
    alert(`Imagen cargada: ${url}`);
    handleSubmit(); 
  };

  const handleFileUpload = () => {  
    fileInputRef.current.click();
     };

  const handleEditarProducto = (values) => {    
   values.id = id;
   console.log('idp:', id, ' formulario', values);  
   dispatch(editarProducto(id,values));
  }; 

  return (
 <Container maxWidth="sm">
   <Formik
     initialValues={{
      nombreproducto: "Tu Hermana.",
      descproducto: "DESCRIPCION",
      colorproducto: ["blanco","azul"],
      fotoprinc: "http://la-foto-de-tuhermana1.jpg",
      precioproducto: 1971,
      disponibproducto: 100,
     }}
     onSubmit={handleEditarProducto}
   >
  {({ handleSubmit, setFieldValue }) => (
    <Form onSubmit={ handleSubmit }>
     <h1>EDITAR PRODUCTO</h1>
     <Box mb={2}>
       <h2>Nombre de Producto</h2>
       <Field name="nombreproducto" as={TextField} label="nombreproducto" style={{ width: "100%", background: "white" }} />
       <h2>Descripcion de Producto</h2>
       <Field name="descproducto" as={TextField} label="descproducto" style={{ width: "100%", background: "white" }} />
       <h2>Colores de Producto</h2>
       <Field name="colorproducto" as={TextField} label="colorproducto" style={{ width: "100%", background: "white" }} />
       <h2>Foto Producto</h2>
       <Field name="fotoprinc" as={TextField} label="fotoprinc" style={{ width: "100%", background: "white" }} />
       <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange = { (event) => handleFileChange(event, setFieldValue, handleSubmit) } />
       <Button type="button"                                              onClick = { ()      => handleFileUpload(setFieldValue) }>Cargar Imagen</Button>
       <h2>Precio de Producto</h2>
       <Field name="precioproducto" as={TextField} label="precioprod" style={{ width: "100%", background: "white" }} />
       <h2>Disponibilidad de Producto</h2>
       <Field name="disponibproducto" as={TextField} label="dispprod" style={{ width: "100%", background: "white" }} />
     </Box>
     <Button type="submit" variant="contained" color="primary" disabled={!imagenCargada} >Guardar</Button>
    </Form>
  )}
   </Formik>
 </Container>
  );
}

export default EditarProductoForm;
