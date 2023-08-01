import React, { useState, useEffect } from "react";
import Total from "../Total/Total";
import s from "./Carrito.module.css";
import Mensaje from "../Mensaje/Mensaje";
import Seleccion from "../Seleccion/Seleccion";
import { updateCarrito } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Carrito = () => {

 
  let elCarrito = useSelector((state) => state.carrito);
  const [productos, setProductos] = useState(elCarrito);
  const [sumaTotal, setSumaTotal] = useState(0);

  useEffect(() => {

   updateSumaTotal(productos); // Actualizar la suma total al cargar o cambiar los productos
  }, [productos]);

  const updateQuantity = (idlibro, quantity) => {
    console.log('idlibro, quantit',idlibro, quantity ,'.' );
    const updatedProducts = productos.map((producto) => {
      if (producto.idlibro === idlibro) {
        const subtotal = quantity * producto.preciolibro;
        return { ...producto, cantidad: quantity, subtotalitem: subtotal };
      }
      return producto;
    });
    setProductos(updatedProducts);
    updateSumaTotal(updatedProducts);
 };

 const deleteLibro = (id) => {
  const updatedProducts = productos.filter((producto) => producto.idlibro !== id);
  setProductos(updatedProducts);
  updateSumaTotal(updatedProducts);
};

 const updateSumaTotal = (updatedProducts) => {
  let sum = 0;
  for (const producto of updatedProducts) {
    sum += producto.subtotalitem;
  }
  setSumaTotal(sum);
 };

 return (
  <div>
    <div className={s.fondo}>
      <div className={s.caja}>
        <div className={s.fondo2}>
          <div className={s.titulo}>
            <h1>Carrito</h1>
          </div>
          {  productos.length === 0 ? (
            <Mensaje></Mensaje>
              ) : (
                productos?.map((producto) => (
                 <Seleccion
                   key={producto.idlibro}
                   pokes={producto}
                   updateQuantity={updateQuantity}
                   deleteLibro={deleteLibro}
                   valorunitario={producto.preciolibro}             
                  />
                ))
              ) }         
        <div className={s.subtotalTotal}>
          Total: ${sumaTotal}
        </div>
        </div>    
        <Total productos={productos} sumatotal={sumaTotal} updateCarrito={updateCarrito} />            
      </div>
    </div>
    <div></div>
  </div>
);
};
export default Carrito;