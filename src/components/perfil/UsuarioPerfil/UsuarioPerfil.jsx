import React from 'react';
import styles from './UsuarioPerfil.module.css';
import { Link } from 'react-router-dom';

const UsuarioPerfil = ({ user }) => {
  return (
    <div className={styles.profileWrapper}>
    <div className={styles.profileContainer}>
      <div className={styles.profileImageContainer}>
        <img src={user.picture} alt="" className={styles.profileImage} />
      </div>
      <div className={styles.profileInfoContainer}>
        

        <h2 className={styles.profileDetail}>{user.name}</h2>
        <p className={styles.profileDetail}>Email: <strong> {user.email}</strong> </p>
        <p className={styles.profileDetail}>Nickname: <strong>{user.nickname}</strong> </p>
        <Link className="btn btn-info text-light" to={`/comprasusuario/${user.idusuario}`}>
               Mis compras
              </Link>
       
        
      </div>
    </div>
  </div>
  );
};

export default UsuarioPerfil;
