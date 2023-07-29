import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { eliminaLibro } from  '../../redux/actions/actions';
import Detail from '../Detail/Detail';

import './Cardw.css';

const Cardw = ({ book }) => {
 const dispatch = useDispatch();

 const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta
 const [buttonName, setButtonName] = useState(''); 

 const handleEditClick = (idlibro) => {
  setShowAlert(true);
  alert('Ud va a editar libro con Id: '+idlibro+'.');
 //setButtonName('Editar');
};

const handleDeleteClick = (idlibro) => {
  setShowAlert(true);
  alert('Ud va a eliminar libro con Id: '+idlibro+'.');
 // dispatch(eliminaLibro(idlibro));
  //setButtonName('Eliminar');
};



  return (
    <div className="card">
      {/* Agregar estilos en la clase 'card-img-top' */}
      <img
        src={book.fotolibro}
        alt={book.nombrelibro}
        className="card-img-top custom-card-img"
      />
      <div className="card-body">
        <p className="card-text">ID: {book.id}</p> 
        <Link to={`/detail/${book.id}`}>
          <h5 className="card-title">{book.nombrelibro}</h5>
        </Link>
        <Link to={`/detail/${book.id}`}>
        <h3 className="card-text">Género: {book.genero?.nombregenero}</h3>        
        </Link>
        <p></p>
        <h3 className="card-text">Valor:${book.preciolibro}</h3> 
        {/* <button onClick={()=>handleEditClick(book.idlibro)} className="btn btn-primary custom-btn">Editar</button>
        <button onClick={()=>handleDeleteClick(book.idlibro)} className="btn btn-primary custom-btn">Eliminar</button> */}

        <p>-</p>
      </div>
    </div>
  );
};

export default Cardw;
