import React from 'react';
import './Paginate.css';

const Pagination = ({ libros, onPageChange}) => {
 const { paginaActual, librosPorPagina, totalLibros , totalPaginas} = libros;
 const totalPages = Math.ceil(totalLibros / librosPorPagina);

 const pageNumbers = [];

  // Limitar la paginación a un máximo de 7 páginas
  const maxDisplayedPages = 20;
  const middlePage = Math.floor(maxDisplayedPages / 2);
  let startPage = paginaActual - middlePage;
  let endPage = paginaActual + middlePage;

  if (startPage <= 0) {
    startPage = 1;
    endPage = Math.min(totalPaginas, maxDisplayedPages);
  }

  if (endPage > totalPaginas) {
    endPage = totalPaginas;
    startPage = Math.max(1, totalPaginas - maxDisplayedPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {/* Agregar botón "Anterior" */}
      {paginaActual > 1 && (
        <li className="page-item">
          <button className="page-link" onClick={() => onPageChange(paginaActual - 1)}>
            ANTERIOR
          </button>
        </li>
      )}

      {pageNumbers.map((number) => (
        <li key={number} className={`page-item ${paginaActual === number ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(number)}>
            {number}
          </button>
        </li>
      ))}

      {/* Agregar botón "Siguiente" */}
      {paginaActual < totalPages && (
        <li className="page-item">
          <button className="page-link" onClick={() => onPageChange(paginaActual + 1)}>
            SIGUIENTE
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
