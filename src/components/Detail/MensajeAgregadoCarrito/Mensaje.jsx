import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '400px',
    height: '250px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: 'none',
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
  },
};

const buttonStyle = {
    
    padding: '8px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    margin:'5px'
  };
const btnAgregarCarrito={
display:'flex',
}

const PopupMensaje = ({ isOpen, onClose, mensaje, onContinuar, onIrACarrito }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
      >
        <div>
          <h3>{mensaje}</h3>
          <div className="btnAgregarCarrito" style={{...btnAgregarCarrito}}>

          <button onClick={onContinuar}b style={{...buttonStyle}}>Continuar en Libros</button>
          <button onClick={onIrACarrito} style={{...buttonStyle}}>Ir al Carrito</button>
          </div>
        </div>
      </Modal>
    );
  };
  
  export default PopupMensaje;