import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { urlBack } from '../../redux/actions/actions';
import { useParams } from 'react-router-dom';
import ModalDetalleCompra from './ModalDetalleCompra/ModalDetalleCompra'; // Importar el nuevo componente
import styles from './Compras.module.css';
import NavBar from '../Navbar/Navbar';



const ComprasUsuario = ({ match }) => {
    const [nombre, setNombre] = useState('');
  const [compras, setCompras] = useState([]);
  const [selectedCompra, setSelectedCompra] = useState(null); // Estado para controlar el popup
  const { idusuario } = useParams();

  useEffect(() => {
    // Realizar la petición al backend para obtener las compras del usuario
    const user = localStorage.getItem('user');
    const dataUser = JSON.parse(user);

    axios
      .get(`${urlBack}/compras/${idusuario}`, {
        headers: { Authorization: dataUser.accessToken },
      })
      .then((response) => {
        console.log(response.data);
            // Sort the purchases by date in descending order
            const sortedCompras = Object.values(response.data).sort((a, b) => {
                return new Date(b.fechaCompra) - new Date(a.fechaCompra);
            });
            setCompras(sortedCompras);
            setNombre(dataUser.user.name);
            console.log(sortedCompras);
      })
      .catch((error) => {
        console.error('Error al obtener las compras:', error);
      });
  }, [idusuario]);

  // Función para mostrar el popup con los detalles de la compra seleccionada
  const openModal = (compra) => {
    setSelectedCompra(compra);
  };

  // Función para cerrar el popup
  const closeModal = () => {
    setSelectedCompra(null);
  };

  return (
    <>
    
        <NavBar/> 
      <h2 className={styles.title}>
        Tus compras <strong>"{nombre}"</strong>
      </h2>
    <div className={styles.container}>
      <div className="container">

      {compras.length === 0 ? (
        <p>No tiene compras actualmente.</p>
      ) : (
        compras.map((compra, index) => (
          <div key={index} className={`${styles.compra} ${index === 0 ? styles.latestCompra : ''}`}
     
          onClick={() => openModal(compra)} >
            <div className={styles.header}>
            <p className={styles.fecha}>
                  Fecha de Compra:{' '}
                  {new Date(compra.fechaCompra).toLocaleString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </p>
              <p className={styles.fecha}>Monto Total: {compra.montoTotal} $</p>
              <p className={styles.fecha}>Cantidad libros: {compra.cantidadTotal}</p>
              <button
                className={styles.detailsButton}
                onClick={() => openModal(compra)} // Abrir el modal al hacer clic
              >
                Mostrar detalles
              </button>
            </div>
          </div>
        ))
      )}
      </div>

      {/* Modal para mostrar los detalles de la compra */}
      {selectedCompra && (
        <ModalDetalleCompra compra={selectedCompra} closeModal={closeModal} />
      )}
    </div>
    </>
  );
};

export default ComprasUsuario;
