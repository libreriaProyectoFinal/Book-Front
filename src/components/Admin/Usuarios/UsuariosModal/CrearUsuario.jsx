import React, { useState } from 'react';
import axios from 'axios';
import { GetUsuarios, urlBack } from '../../../../redux/actions/actions';
import './CrearUsuario.css';
import SuccessPopup from '../CreacionExitosa/CreacionExitosa';
import { useDispatch } from 'react-redux';

function CrearUsuarioModal({ onClose }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [picture, setPicture] = useState('https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg');
  const [rol, setRol] = useState('usuario');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleCreateUser = () => {
    const newUser = {
      name,
      password,
      email,
      nickname,
      picture:picture,
      rol:rol,
    };

    console.log(newUser)
    axios
      .post(urlBack+'/crearUsuario', newUser)
      .then((response) => {
        // Realizar acciones adicionales si es necesario
        console.log('Usuario creado:', response.data); 
        setShowSuccessPopup(true); // Mostrar el popup de éxito
        dispatch(GetUsuarios())
        onClose(); // Cerrar la ventana modal después de crear un usuario
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="modal crear-usuario-modal">
      <div className="modal-content">
        <h1>Crear Usuario</h1>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>



        {/* Agregar más campos de usuario aquí */}
        <button className="modal-action-btn" onClick={handleCreateUser}>
          Crear Usuario
        </button>
        <button className="modal-close-btn w-100" onClick={onClose}>
          Cancelar
        </button>
         
     
      </div>
       {/* Mostrar el mensaje de éxito en el popup */}
       {showSuccessPopup && (
        <SuccessPopup
          message="Usuario creado con éxito"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
}

export default CrearUsuarioModal;

;
