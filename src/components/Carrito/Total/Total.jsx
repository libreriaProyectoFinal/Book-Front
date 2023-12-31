import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import axios from "axios";
import Modal from "react-modal";
import s from "./Total.module.css";
import { urlBack, limpiarCarrito,reinicia_store } from '../../../redux/actions/actions.js'; 
import { useNavigate } from "react-router-dom";
//import { getAllCategorias, getAllProducts } from '../../../redux/actions/actions';
//const urlBack = 'http://localhost:3001';
//const urlBack = 'https://commerce-back-2025.up.railway.app';


Modal.setAppElement("#root");

export default function Total({ productos, sumatotal }) {


 const dispatch = useDispatch();
 const navigate  =useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");


      const handleCompra = async () => {
        const user = localStorage.getItem("user");
        const dataUser = JSON.parse(user);
        if (!dataUser) {
   
          setRedirectUrl("/login");
          setModalIsOpen(true);
          return;
        }
    
        const loginuser = dataUser.user.email;
        const hashvalidacionpago = "AUN_NO";
        const valortotaloc = sumatotal;
        const estadooc = "pendiente";

      const detalleocx = productos.map((producto) => ({
        idlibro: producto.idlibro,
        nombrelibro: producto.nombrelibro,
        valorunitario: producto.preciolibro,
        cant: producto.cantidad,
        subtotal: producto.subtotalitem.toString(),
      }));
      const body = { loginuser, hashvalidacionpago, valortotaloc, estadooc, detalleocx, };
      try {
        const response = await axios.post(urlBack + "/generar-orden", body, {
          headers: { Authorization: dataUser.accessToken },
        });
        console.log('deda de oc generada: ', response.data)
        const urlPago = response.data.URLo;
      
        // Redirigir a la URL de pago
        window.location.href = urlPago;
      } catch (error) {
        console.error(error);
      }
  };
  
  const reiniciaCarro= ()=> { 
   dispatch(reinicia_store());
 
   // dispatch(getAllProducts(1));
   // dispatch(getAllCategorias());

  // dispatch(limpiarCarrito());
  
 }
 const closeModal = () => {
  setModalIsOpen(false);
};

 const handleRedirect = () => {
  if (redirectUrl) {
    navigate(redirectUrl)
  }
};

  return (
    <div className={s.fondo}>
      <div className={s.titulo}>Sumatoria</div>
      <div className={s.total}>
        <h1>Total</h1>
        <p>${sumatotal}</p>
      </div>
      <div className={s.total}>
        <button onClick={ reiniciaCarro }>Limpiar Carro </button>
      </div>
      <button className={s.button} onClick={handleCompra}>
        <span>Comprar</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Redirección"
        className={s.modalContent}
        overlayClassName={s.modalOverlay}
      >
        <p>Debes iniciar sesión para poder comprar.</p>
        <button onClick={handleRedirect}>Iniciar sesión</button>
        <button onClick={() => navigate("/home")}>Ir a Inicio</button>
      </Modal>
     
    </div>
  );
}
