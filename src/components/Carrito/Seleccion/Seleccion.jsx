import React from "react";
import { useDispatch } from "react-redux";
import s from "./Seleccion.module.css";
import { deleteLibroCarro } from "../../../redux/actions/actions"

//import { updateCarrito, removeFavorites, deleteProdCarro } from "/../../../redux/actions/actions";
import { updateCarrito,  deleteProdCarro } from '../../../redux/actions/actions.js'; 

const Seleccion = ({ key, pokes, updateQuantity, deleteLibro, valorunitario }) => {
 const dispatch = useDispatch();
 const { idlibro, nombrelibro, imagen, cantidad,  preciolibro } = pokes;

 const handleIncrement = () => { 
  if (cantidad < 10) { 
    updateQuantity(idlibro, cantidad + 1, preciolibro); 
    const subtotal = (cantidad + 1) * valorunitario;      
    dispatch(updateCarrito(idlibro,imagen,nombrelibro,preciolibro,cantidad + 1,subtotal));     
  } 
};
const handleDecrement = () => { 
 if (cantidad > 1)  { 
   updateQuantity(idlibro, cantidad - 1, preciolibro); 
   const subtotal = (cantidad - 1) * preciolibro;
   dispatch(updateCarrito(idlibro,imagen,nombrelibro,preciolibro,cantidad - 1,subtotal));
 } 
};
const handleDelete = () => {  
   deleteLibro(idlibro);  
   dispatch(deleteLibroCarro(idlibro)); 
};
const precioTotal = cantidad * valorunitario;
console.log('valorunitario: ', valorunitario);

return (
 <div className={s.fondo}>
   <div className={s.cajaImagen}>
     <img src={imagen} alt="" className={s.imagen} />
   </div>
   <div className={s.caja2}>
     <h3>{nombrelibro}</h3>
     <button className={s.eliminar} onClick={handleDelete}>
       Eliminar
     </button>
   </div>
   <div className={s.cantidad}>
     <div className={s.botones}>
       <button onClick={handleDecrement}>-</button>
       {cantidad}
       <button onClick={handleIncrement}>+</button>
     </div>
   </div>
   <div className = {s.subtotal}>Prec: ${valorunitario}</div>
   <div className = {s.subtotal}>Subt: ${(precioTotal )}</div>
   <div className = {s.separador}></div>
 </div>
);
};

export default Seleccion;