import React from "react";
import s from "./Descripcion.module.css";

export default function Descripcion({ descripcion }) {
  return <div className={s.fondo}>{descripcion}</div>;
}