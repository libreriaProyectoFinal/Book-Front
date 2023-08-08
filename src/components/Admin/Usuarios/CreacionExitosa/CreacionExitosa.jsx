import React from 'react';
import './CreacionExitosa.css';

const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="success-popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
