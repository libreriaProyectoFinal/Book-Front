import React from 'react';
import { Container, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

  // -----------------------''-----------''--------------------

  // -Acerca: component sobre nosotros(equipo)

  // -Politica/Privacidad: component de texto explicativo de la pagina

  // ---------------------------^^crear un component^^---------
  const handlerDireccionContacto = () => {
    const url = 'https://chat.whatsapp.com/IBQNBZ3lquIDqBSfcGYHy4';
    window.location.href = url;
  };
  const handlerDireccionAyuda = () => {
    const url = 'https://chat.whatsapp.com/IBQNBZ3lquIDqBSfcGYHy4';
    window.location.href = url;
  };
  const handlerDireccionFacebook = () => {
    const url = 'https://www.facebook.com/';
    window.location.href = url;
  };
  const handlerDireccionTwitter = () => {
    const url = 'https://twitter.com/?lang=es';
    window.location.href = url;
  };
  const handlerDireccionInstagram = () => {
    const url = 'https://www.instagram.com/';
    window.location.href = url;
  };

function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <div className="footer-container">
          <div className="footer-section">
            <Typography variant="h6" className="footer-section-title">
              Información
            </Typography>
            <ul className="footer-links">
              <li>
                <a href="/aboutus">Acerca de nosotros</a>
              </li>
             <li>
             <a href="#"onClick={handlerDireccionContacto}>Contacto</a>              
             </li>
              <li>
                <a href="/privacidad">Política de privacidad</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <Typography variant="h6" className="footer-section-title">
              Soporte
            </Typography>
            <ul className="footer-links">
              <li>
                <a href="#"onClick={handlerDireccionAyuda}>Ayuda y soporte</a>
              </li>
              <li>
                <a href="#">Envíos y devoluciones</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <Typography variant="h6" className="footer-section-title">
              Síguenos
            </Typography>
            <ul className="footer-social">
              <li>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" onClick={handlerDireccionFacebook}>
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" onClick={handlerDireccionTwitter}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" onClick={handlerDireccionInstagram}>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="footer-bottom">
        <Typography variant="body2">&copy; 2023 BookClub. Todos los derechos reservados.</Typography>
      </div>
    </footer>
  );
}

export default Footer;