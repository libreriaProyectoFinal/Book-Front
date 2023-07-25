import React, { useEffect, useState } from "react";
import s from "./Total.module.css";
import { initMercadoPago } from '@mercadopago/sdk-react'
import { useDispatch } from 'react-redux';
import { limpiarCarrito,reinicia_store } from '../../../Redux/actions.js'; 
import { getAllCategorias, getAllProducts } from '../../../Redux/actions';
import axios from "axios";
import Modal from "react-modal";

// solo prueba de redireccionamiento falta revisar oc de regreso al back
initMercadoPago('TEST-6150df70-606f-4169-971b-dff2a6c919b6'); //reemplazar por public key actual
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
export default function Total({ productos, sumatotal, updateCarrito }) 
{
 const dispatch = useDispatch();
    const [mensaje, setMensaje] = useState(""); 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [urlPago, setUrlPago] = useState("");

    useEffect(() => {
     // Calcular el nuevo total
     const nuevoTotal = productos.reduce((total, producto) => total + (producto.subtotalitem), 0);
     updateCarrito(nuevoTotal);
   }, [productos, updateCarrito]);

    const handleCompra = async () => {

    const loginuser = "libreriaproyectofinal@gmail.com";
    const hashvalidacionpago = "AUN_NO";
    //const valortotaloc = productos.Total;
    const valortotaloc = productos.reduce((total, producto) => total + producto.subtotalitem, 0);
    console.log('probando:', valortotaloc,' .');

    const estadooc = "pendiente";
    const detalleocx = productos.map((pr) => ({
      idproducto: pr.id,  nombreproducto: pr.nombre,  valorunitario: pr.valorunit,   cant: pr.cantidad,
      subtotal: pr.subtotalitem,    }));
    const body = { loginuser, hashvalidacionpago, valortotaloc, estadooc, detalleocx, };
    
    console.log('body',body);
    
    try {
      const response = await axios.post("/generar-orden", body);
      const urlPago = response.data.URLo;
      setUrlPago(urlPago);
      setModalIsOpen(true);
      //dispatch(reinicia_store());
            
      // dispatch(getAllProducts(1));      
      // dispatch(getAllCategorias());  
      /**limpieza de deploy  */    
    } catch (error) {     console.error(error);   }
  };
  
  const reiniciaCarro = ()=> { 
     dispatch(reinicia_store());

     dispatch(getAllProducts(1));
     dispatch(getAllCategorias());
  }

  const limpiaPantalla = () => {  window.location.reload(true);  }   
  const closeModal = () => {  setModalIsOpen(false);  };
  return (
    <div className={s.fondo}>
      <div className={s.titulo}>Sumatoria</div>
      <div className={s.total}>       
        <h1>TOTAL</h1>
        <p>${sumatotal ?? 0}</p> {/* Usar el operador ?? para manejar valores undefined o NaN */}
      </div>
      <button className={s.button} onClick={handleCompra}>
        <span>COMPRAR</span>
      </button>
      <button className={s.button} onClick={reiniciaCarro}>
        <span>LIMPIA CARRO</span>
      </button>
      <button className={s.button} onClick={limpiaPantalla}>
        <span>LIMPIA PANTALLA</span>
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
