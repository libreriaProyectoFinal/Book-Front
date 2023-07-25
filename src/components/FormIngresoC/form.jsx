
import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import {Cont, FormContainer, InputContainer,SelectContainer,Tit1,Form,Label,Input,Select,InputData,Button} from './styled.Form.js';
import axios from 'axios';
const FormPage = () => { 
 const [image, setImage] = useState(null);
 const [id, setId] = useState('');
 const [name, setName] = useState('');
 const [lifeSpan, setLifeSpan] = useState('');

 const cloudName = 'dmjkjz1oa';

const handleImageUpload = async (file) => {
  const formData = new FormData();
  console.log('antes del append')
  formData.append('file', file);
  formData.append('upload_preset', 'shoppie'); // Reemplaza 'tu_upload_preset' por tu propio valor
  try {
    console.log('form data:',formData); 
    const response = await axios.post( `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,  formData   );
    console.log('response data:', response.data); 
    console.log(response.data); 
  } catch (error) {  console.log(error);  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const dogData = {
  //     id: parseInt(id),
  //     name,
  //     life_span: lifeSpan,
  //     updatedAt: new Date().toISOString(),
  //     createdAt: new Date().toISOString(),
  //   };
  //    try {
  //      console.log('esto va a post:',dogData,'.' )
  //      await axios.post('http://localhost:3001/postdog/', dogData);      
  //      alert('La raza fue creada correctamente');         
  //      setId('');
  //      setName('');
  //      setLifeSpan(''); 

  //    } catch (error) {
  //      console.error(error);
  //      alert('Error al crear raza de perro');
  //    }
  // }; 

  return (
   <Cont>
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      {image && (
        <div>
          <Image cloudName={cloudName} publicId={image.name} />
        </div>
      )}
      <button onClick={() => handleImageUpload(image)}>Subir imagen</button>
    </div>
     <FormContainer>
      <Tit1>Ingreso Libro </Tit1>
       <InputContainer>
        <Form onSubmit="">
         <Label>ID:</Label>
         <Input type="number" value={id} onChange={(e) => setId(e.target.value)} required />
         <Label>Nombre:</Label>   
         <Input type="text" value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} required />
           <SelectContainer>
         <Label>Temperamentos:</Label>             
       </SelectContainer> 
         <Button type="submit">Crear nueva raza</Button>
        </Form>
       </InputContainer>          
     </FormContainer>      
   </Cont>
 );
};
export default FormPage;

/**
 Cloud Name:
 dmjkjz1oa

 API KEY:
 591721673815553

 API SECRET:
ktZTu62q7rv7JgN-5C6qFf4ppis


 */