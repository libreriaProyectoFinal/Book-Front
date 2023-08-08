import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlBack } from '../../../redux/actions/actions';
import { format } from 'date-fns';
import styles from './Ventas.module.css'; // Importa el archivo CSS module

const VentasComponent = () => {
  const [ventas, setVentas] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  useEffect(() => {
    const getCompras = async () => {
      const user = localStorage.getItem('user');
      const dataUser = JSON.parse(user);
      try {
        const response = await axios.get(urlBack + '/ventas', {
          headers: { Authorization: dataUser.accessToken },
        });

        setVentas(response.data.ventas);
        setMontoTotal(response.data.montoTotalVentas);
        setCantidadTotal(response.data.cantidadTotalLibrosVendidos);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    getCompras();
  }, []);

  const handleEliminarVenta = async (id) => {
    try {
      const user = localStorage.getItem('user');
      const dataUser = JSON.parse(user);

      await axios.delete(urlBack + `/ventas/${id}`, {
        headers: { Authorization: dataUser.accessToken },
      });

      // Actualizar la lista de ventas después de eliminar
      const updatedVentas = ventas.filter((venta) => venta.id !== id);
      setVentas(updatedVentas);
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  return (
    <div className={styles['ventas-container']}>
      <h1 className={styles['ventas-title']}>Ventas</h1>
      <div className={styles['total-container']}>
        <p className={styles['monto-total']}>Monto Total de la Venta: ${montoTotal}</p>
        <p className={styles['cantidad-total']}>Cantidad Total Vendida: {cantidadTotal}</p>
      </div>

      <div className={styles['table-container']}>
        <table className={styles['ventas-table']}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Libros</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => {
              return (
                <tr key={venta.id}>
                  <td>{format(new Date(venta.fechahoraoc), 'yyyy-MM-dd HH:mm:ss')}</td>
                  <td>{venta.estadooc}</td>
                  <td>{venta.usuario.name}</td>
                  <td>{venta.nombresLibros.join(', ')}</td>
                  <td>{venta.totalCant}</td>
                  <td>{venta.valortotaloc}</td>
                  <td>
                    <button className={styles['eliminar-button']} onClick={() => handleEliminarVenta(venta.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VentasComponent;
