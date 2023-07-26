import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import axios from "axios";
import Modal from "react-modal";
import s from "./Total.module.css";
import { limpiarCarrito,reinicia_store } from '../../../redux/actions/actions.js'; 
//import { getAllCategorias, getAllProducts } from '../../../redux/actions/actions';

const urlBack = 'http://localhost:3001';
//const urlBack = 'https://commerce-back-2025.up.railway.app';

Modal.setAppElement("#root");

export function showMessage(message, url) {
 const link = <a href={url}>{url}</a>;
 alert(
   <div>
     <p>{message}</p>
     {link}
   </div>
 );
}
export default function Total({ productos, sumatotal }) {
 const dispatch = useDispatch();
    const [mensaje, setMensaje] = useState(""); 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [urlPago, setUrlPago] = useState("");

    const handleCompra = async () => {
    const loginuser = "claudiodavid339@gmail.com";
    const hashvalidacionpago = "AUN_NO";
    const valortotaloc = sumatotal;
    const estadooc = "pendiente";

    const detalleocx = productos.map((producto) => ({
      idproducto: producto.id,
      nombreproducto: producto.nombre,
      valorunitario: producto.valorunit,
      cant: producto.cantidad,
      subtotal: producto.subtotalitem.toString(),
    }));

    const body = { loginuser, hashvalidacionpago, valortotaloc, estadooc, detalleocx, };

    try {
      const response = await axios.post(urlBack + "/generar-orden", body);
      const urlPago = response.data.URLo;
      setUrlPago(urlPago);
      setModalIsOpen(true);

   // showMessage("Orden de compra generada. Haz clic en el enlace para pagar: ", urlPago);
      
   //  console.log('body: ', body);
   //  showMessage(" Pago realizado exitosamente.: "+ body.data+'..'); 
   //  console.log('Respuesta: ' ,response.data, '.'); // Handle the response as needed
   //  console.log('body: ' ,body.data, '.'); 

   /**limpio el carro */
   //dispatch(limpiarCarrito());

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

  return (
    <div className={s.fondo}>
      <div className={s.titulo}>Sumatoria</div>
      <div className={s.total}>
        <h1>Total</h1>
        <p>${sumatotal}</p>
      </div>
      <div className={s.total}>
        <button onClick={ reiniciaCarro }>Limpia CArro </button>
      </div>
      <button className={s.button} onClick={handleCompra}>
        <span>Comprar</span>
      </button>
      <Modal  isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="URL de Pago" >
        <h2>Pago realizado exitosamente</h2>
        <p>Haz clic en el enlace para pagar:</p>
        <a href={urlPago}>{urlPago}</a>
        <button onClick={closeModal}>Cerrar</button>        
      </Modal>
    </div>
  );
}
