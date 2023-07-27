import React from "react";
import s from "./ProductosDtl.module.css";

export default function Productos() {
  return (
    <div className={s.caja2}>
      <div className={s.cajaInterna2}>
        <div className={s.productos}>
          <div className={s.cajaImagen}>
            <div>image</div>
          </div>
          <div className={s.titulo}>Producto Aleatorio</div>
          <div className={s.precio}>
            <h3>$000</h3>
          </div>
          <button className={s.verMas}>Ver Mas</button>
        </div>
        <div className={s.productos}>
          <div className={s.cajaImagen}>
            <div>image</div>
          </div>
          <div className={s.titulo}>Producto Aleatorio</div>
          <div className={s.precio}>
            <h3>$000</h3>
          </div>
          <button className={s.verMas}>Ver Mas</button>
        </div>
        <div className={s.productos}>
          <div className={s.cajaImagen}>
            <div>image</div>
          </div>
          <div className={s.titulo}>Producto Aleatorio</div>
          <div className={s.precio}>
            <h3>$000</h3>
          </div>
          <button className={s.verMas}>Ver Mas</button>
        </div>
        <div className={s.productos}>
          <div className={s.cajaImagen}>
            <div>image</div>
          </div>
          <div className={s.titulo}>Producto Aleatorio</div>
          <div className={s.precio}>
            <h3>$000</h3>
          </div>
          <button className={s.verMas}>Ver Mas</button>
        </div>
        <div className={s.productos}>
          <div className={s.cajaImagen}>
            <div>image</div>
          </div>
          <div className={s.titulo}>Producto Aleatorio</div>
          <div className={s.precio}>
            <h3>$000</h3>
          </div>
          <button className={s.verMas}>Ver Mas</button>
        </div>
      </div>
    </div>
  );
}