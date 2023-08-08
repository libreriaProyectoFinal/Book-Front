import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Modal from "react-modal";

const Success = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const closeModal = () => {
    setShowPopup(false);
    const user = localStorage.getItem('user');
    const dataUser = JSON.parse(user);
    navigate(`/comprasusuario/${dataUser.user.idusuario}`);
  };

  // Configuración de la animación de aparición de libros
  const transitions = useTransition(showPopup, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 500 }, // Duración de la animación en milisegundos
  });

  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <Modal isOpen={true} onRequestClose={closeModal} contentLabel="Agradecimiento">
              <animated.div style={{ ...styles, textAlign: "center", padding: "20px" }}>
                <h2>¡Gracias por tu compra!</h2>
                <p>Estamos procesando tu pedido.</p>
                <p>Presiona en cerrar para ir a tus compras.</p>
                <div style={{ marginTop: "20px" }}>
                  {/** Decoración de libros */}
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>📚📘📖</div>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>📕📚📔</div>
                  <div style={{ fontSize: "48px", marginBottom: "10px" }}>📖📚📕</div>
                </div>
                <button className="btn btn-success" onClick={closeModal} style={{ marginTop: "20px" }}>
                  Cerrar
                </button>
              </animated.div>
            </Modal>
          )
      )}
    </>
  );
};

export default Success;
