import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GalaxyNote from "../../Archivos pruebas/galaxy note 10.jpg";
import s from "./DetailProducto.module.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import ProductosDtl from "./Productos/ProductosDtl";
import Pago from "./Pagos/Pagos";
import Descripcion from "./Descripcion/Descripcion";
import { getDetail, addCarrito, obtenerCategoriaPorId, } from "../../Redux/actions";

//Aquí se renderiza el detalle de cada producto

export default function DetailProducto() {
  // Las CALIFICACIONES sera un array acumulativo de estreñas x compras del producto
  const [value, setValue] = React.useState(3);

  let { id } = useParams();
  const dispatch = useDispatch();
  const nameCatego = useSelector((state) => state.nombreCategoria);
  const elCarrito = useSelector((state) => state.carrito);
  const [carrito, setCarrito] = useState([]);
  console.log(elCarrito);

  const productDetails = useSelector((state) => state.details);

  const {
    nombreproducto,
    descproducto,
    colorproducto,
    fotoprinc,
    precioproducto,
    disponibproducto,
    categoriaId,
  } = productDetails;

  useEffect(() => { dispatch(getDetail(id));  }, []);
  useEffect(() => { dispatch(obtenerCategoriaPorId(categoriaId));  }, []);

  //########### EL HANDLE DE AGREGAR PRODUCTO AL CARRITO ##############
  function handleSubmit(e) {
    e.preventDefault();
    const productToAdd = {
      id: id,
      nombre: nombreproducto,
      precio: precioproducto,
      cantidad: disponibproducto,
      imagen: fotoprinc,
    };
    dispatch(addCarrito(productToAdd));
    alert(`Agregaste el producto ${nombreproducto} a tu carrito`);
  }

  return (
    <div className={s.fondo}>
      <form action="" onSubmit={handleSubmit} className={s.fromu}>
        <div className={s.producto}>Detalles del producto</div>
        <div className={s.cajaInterna}>
          <div className={s.cajaImagen}>
            <div className={s.imagenPosition}>
              <img
                src={fotoprinc}
                alt="image not found"
                className={s.imagen}
              ></img>
            </div>
            <div className={s.linea}></div>
            <h1>Descripcion :</h1>
            <Descripcion descripcion={descproducto}></Descripcion>
          </div>
          <div className={s.datos}>
            <h1>{productDetails.name}</h1>
            <h4>
              Categoria :{" "}
              <h5 style={{ color: "red" }}>{nameCatego.nombrecat}</h5>
            </h4>

            <h2>{nombreproducto}</h2>
            <p>${precioproducto}</p>

            {/* ###############  Boton para mostrar que tarjetas acepta All Market ################# */}

            <Pago></Pago>
            <h4>Color:{colorproducto}</h4>
            <h4>Stock disponible:{disponibproducto}</h4>

            {/* ###############  BOTON DEL CARRITO ################# */}

            <button type="submit" className={s.agregar}>
              Agregar al carrito
            </button>

            <h3>Calificaciones:</h3>
            {/* ###############   Deberan ser mapeadar cada calificacion ################# */}
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend"></Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <a
              href="https://www.soyhenry.com/?utm_source=google&utm_medium=cpc&utm_campaign=GADS_SEARCH_ARG_BRAND&utm_content=Brand&gad=1&gclid=Cj0KCQjwtO-kBhDIARIsAL6LorcDR-GnZb0eUPEkd6yyO2cXte6yEokKM93fcVlckILE3eU0a3JxTB8aAht3EALw_wcB"
              target="_blank"
            >
              <div className={s.propaganda}></div>
            </a>
          </div>
        </div>

        <ProductosDtl />
      </form>
    </div>
  );
}