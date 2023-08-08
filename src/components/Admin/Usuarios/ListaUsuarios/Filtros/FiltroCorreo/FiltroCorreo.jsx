import React from 'react';

const BuscarPorCorreo = ({ value, onChange }) => {
   const inputBusqueda  ={
    height:'3rem',
   }
  return (
    <input className='border border-primary' style={inputBusqueda}
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Buscar por email..."
    />
  );
};

export default BuscarPorCorreo;
