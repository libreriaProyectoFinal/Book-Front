import React from 'react';
import { Link } from "react-router-dom";
import Detail from '../Detail/Detail';

import './Cardw.css';

const Cardw = ({ book }) => {
  return (
   
      <Link to={`/detail/${book.id}`} className='link_card'>
    <div className="card">
      {/* Agregar estilos en la clase 'card-img-top' */}
      <img
        src={book.fotolibro}
        alt={book.nombrelibro}
        className="card-img-top custom-card-img"
      />
    
      <div className="card-body">
        
          <h5 className="card-title">{book.nombrelibro}</h5>

        <h3 className="card-text">Género: {book.genero?.nombregenero}</h3>        

      
        <h3 className="card-text">Valor:${book.preciolibro}</h3>
       

        
      </div>
    </div>
    </Link>
   
  );
};

export default Cardw;
