import React from 'react';

import Footer from '../Footer/Footer';
import styles from "./Privacidad.css";
import NavBar from '../navbar/navbar';

const Privacidad = () => {
    return (
        <>
          <NavBar />
          <div className={styles['privacidad-container']} style={{ marginTop: '110px', marginBottom: '110px', marginLeft: '20%', marginRight: '20%',}}>
            <h2 className={styles['privacidad-heading']}>Política de Privacidad</h2>
            <p className={styles['privacidad-text']}>
              En BookClub estamos comprometidos a respetar y garantizar su privacidad.
            </p>
      
            <p className={styles['privacidad-text']}>
              Nuestro sitio utiliza "cookies" para mantener un registro de los ítems que usted suma al carrito, para recordar información al pasar de página en página sin necesidad de volver a solicitársela, para recolectar detalles acerca de sus preferencias y las de otros clientes, para reconocer qué áreas del sitio debemos desarrollar más y qué otras no son de acceso frecuente.
            </p>
      
            <p className={styles['privacidad-text']}>
              Cuando le solicitamos sus datos personales, lo hacemos para poder procesar, despachar y avisarle acerca del estado de su orden.
            </p>
      
            <p className={styles['privacidad-text']}>
              La información acerca de su tarjeta de crédito ó débito no queda registrada en nuestras bases de datos, utilizamos el sistema de Mercado Pago para compras con tarjetas. De esta manera no conocemos los datos de la tarjeta ingresada en línea, únicamente recibimos un número de autorización o rechazo de la operación.
            </p>
      
            <p className={styles['privacidad-text']}>
              Cuando ingresa su e-mail, únicamente consideramos su dirección de e-mail para identificarlo/a como usuario, no enviamos publicidad no solicitada y no compartimos ni entregamos nuestras bases de datos a terceras partes bajo ningún motivo.
            </p>
      
            <p className={styles['privacidad-text']}>
              Cuando usted se registra como cliente e informa su clave personal, ésta permanece totalmente encriptada y si usted la pierde o no la recuerda, nosotros no podemos acceder a recuperarla, únicamente podemos asignarle una nueva. De esta forma queda garantizada la privacidad de la misma.
            </p>
      
            <p className={styles['privacidad-text']}>
              Es necesario aclarar que cuando usted clickea sobre un link o un aviso publicitario que lo conecta con otros sitios web, usted está sujeto a las políticas de dicho sitio. No nos hacemos responsables por las acciones de estas terceras partes y por ello recomendamos lea detenidamente la política de privacidad del sitio accedido.
            </p>
      
            <p className={styles['privacidad-text']}>
              Estamos comprometidos a brindar el mejor servicio en línea posible, verifique periódicamente si hubo algún cambio en esta página, pues el uso del sitio cuspide.com implica el conocimiento y aceptación de nuestra política de privacidad.
            </p>
          </div>
          <Footer />
        </>
      );
      
};

export default Privacidad;


