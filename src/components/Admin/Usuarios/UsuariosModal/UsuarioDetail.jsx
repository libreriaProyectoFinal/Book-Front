import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { urlBack } from '../../../../redux/actions/actions';

function UsuarioDetailModal({ userId, onClose }) {
  const [user, setUser] = useState(null);
  console.log(userId)
  useEffect(() => {
    const user = localStorage.getItem('user');
    const dataUser = JSON.parse(user)
    console.log(dataUser)
    axios.get(urlBack+`/usuario/${userId}`, {  headers: {  Authorization: dataUser.accessToken}})
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [userId]);
console.log(user)
  return (
    <div className="modal">
      <div className="modal-content">
        {user ? (
          <div>
            <h1>Detalles del Usuario</h1>
            <p><strong>ID:</strong> {user.idusuario}</p>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Estado:</strong> {user.isActive?'activo':'Inactivo'}</p>
            {user.picture && (
              <div>
                <p><strong>Imagen:</strong></p>
                <img src={user.picture} alt="Imagen del usuario" />
              </div>
            )}
            {/* Mostrar más detalles del usuario aquí */}
          </div>
        ) : (
          <p>Cargando...</p>
        )}
        <button className="modal-close-btn bg-danger" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default UsuarioDetailModal;
