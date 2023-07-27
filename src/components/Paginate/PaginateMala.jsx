import React from 'react';

const Paginate = ({ paginaActual, librosPorPagina, totalLibros, onPageChange }) => {
  const totalPages = Math.ceil(totalLibros / librosPorPagina);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => onPageChange(number)}
        className={paginaActual === number ? 'active' : ''}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={paginaActual === 1}>
        {'<<'}
      </button>
      <button onClick={() => onPageChange(paginaActual - 1)} disabled={paginaActual === 1}>
        {'<'}
      </button>
      {renderPageNumbers()}
      <button onClick={() => onPageChange(paginaActual + 1)} disabled={paginaActual === totalPages}>
        {'>'}
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={paginaActual === totalPages}>
        {'>>'}
      </button>
    </div>
  );
};

export default Paginate;
