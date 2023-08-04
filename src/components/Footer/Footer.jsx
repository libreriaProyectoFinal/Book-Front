import React from 'react';
import { Container, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

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
                <a href="/contacto">Contacto</a>
              </li>
              <li>
                <a href="/terms">Términos y condiciones</a>
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
                <a href="#">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="#">Ayuda y soporte</a>
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
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
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
