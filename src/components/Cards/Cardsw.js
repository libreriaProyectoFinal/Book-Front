import React from 'react';

import './Cardsw.css'
import Cardw from '../Card/Cardw';

const Cardsw = ({ books }) => {
 if (!books) {
  return null;
}
  return (
    <div className="cards-container">
      {books.map((book) => (
        <Cardw key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Cardsw;
