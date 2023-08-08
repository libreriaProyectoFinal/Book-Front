import React from 'react';
import './ConfirmacionDelete.css';

function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-container">
        <p className="confirmation-modal-message">{message}</p>
        <div className="confirmation-modal-buttons">
          <button className="confirmation-modal-confirm-button" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="confirmation-modal-cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
