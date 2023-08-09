import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { urlBack } from '../../redux/actions/actions';
import axios from 'axios';
import UsuarioPerfil from './UsuarioPerfil/UsuarioPerfil';
import NavBar from '../navbar/navbar';
import styles from './perfil.module.css'; 
const UsuarioPerfilPagina = () => {
  const { id } = useParams();
  const [userPerfil, setUserPerfil] = useState(null);
  const [loading, setLoading] = useState(true); // Agregar estado de carga

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = localStorage.getItem('user');
        const dataUser = JSON.parse(user);
        console.log(dataUser);
        const response = await axios.get(urlBack + `/usuario/${id}`, {
          headers: { Authorization: dataUser.accessToken },
        });
        console.log(response.data)
        setUserPerfil(response.data);
        setLoading(false); // La llamada a la API se completó, ya no estamos cargando
      } catch (error) {
        console.error(error);
        setLoading(false); // Si hay un error, también dejamos de cargar
      }
    };

    fetchUserProfile();
  }, [id]);

  // Mostrar mensaje de carga mientras se obtiene el perfil del usuario
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="containerPerfil">
<NavBar/>
    <div>
      <h1 className={styles.titlePerfil}>Perfil {userPerfil.name}</h1>
      {/* Renderizar el componente UsuarioPerfil solo cuando se haya obtenido el perfil del usuario */}
      {userPerfil && <UsuarioPerfil user={userPerfil} />}
    </div>
    </div>
  );
};

export default UsuarioPerfilPagina;
