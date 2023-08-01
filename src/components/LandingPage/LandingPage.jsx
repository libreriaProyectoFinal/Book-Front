import React from 'react';
import './LandingPage.css';
import {  useNavigate } from 'react-router-dom';


const LandingPage = () => {

  const navigate = useNavigate()

  const handleVerLibros = () => {
    // Redirige a la ruta "/home" cuando se hace clic en el botón
    navigate('/home');
  };
  return (
    <div className="landing-page">
      <header className="bg-light py-3">
        <div className="container d-flex align-items-center">
          <img src="https://img.freepik.com/vector-gratis/plantilla-logotipo-libreria-diseno-plano_23-2149325325.jpg?w=2000" alt="Logo de la tienda de libros" width="80" height="80" />
          <h1 className="ms-4">Tu e-commerce de libros</h1>
        </div>
      </header>
      <main>
        <section className="banner text-center text-white py-5 bg-primary">
          <img src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-e-commerce-book-knowledge-teacher-education-banner-background-image_186719.jpg" alt="Banner destacado" className="img-fluid mb-4" />
          <p className="fs-5">¡Descubre nuestra selección de libros!</p>
          <button className="btn btn-warning btn-lg" onClick={handleVerLibros}>Ver libros </button>
        </section>
        <section className="destacados">
          {/* Aquí puedes colocar la sección de libros destacados */}
        </section>
        <section className="ofertas">
          {/* Aquí puedes colocar la sección de ofertas especiales */}
        </section>
        {/* Otras secciones de la landing page */}
      </main>
      <footer className="bg-light py-3 text-center">
        <p className="fs-6 text-muted">Contacto: contacto@books.com</p>
      </footer>
     
    </div>
  );
};

export default LandingPage;
