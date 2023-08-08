import React from 'react';
import Modal from 'react-modal';
import styles from './ModalDetalleCompra.module.css';

// Configuración del modal
Modal.setAppElement('#root');

const ModalDetalleCompra = ({ compra, closeModal }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Detalle de Compra </h2>
      {/* <p>Fecha de Compra: {compra.fechaCompra}</p> */}
      <p>Valor de Compra: {compra.montoTotal} $</p>
      <div className={styles.detallesCompra}>
        {compra.detalles.map((det) => (
          <div className={styles.detalleCompra} key={det.idDetalle}>
            <div className={styles.infoCompra}>

            <p>Nombre: {det.libro.nombreLibro}</p>
            <p>Cantidad: {det.cantidad}</p>
            <p>Precio Unidad: {det.libro.precioLibro} $</p>
            </div>
            <div className={styles.imgCompra}>

            <img
              src={det.libro.fotolibro}
              alt={det.libro.nombreLibro}
              className={styles.imagenLibro}
            />
            </div>
          </div>
        ))}
      </div>
      <button className={styles.closeButton} onClick={closeModal}>
        Cerrar
      </button>
    </Modal>
  );
};

export default ModalDetalleCompra;
