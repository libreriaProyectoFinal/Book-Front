// RegisterForm.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Registro.css"; 
import styles from './Registro.module.css';
import axios from "axios";
import { urlBack } from "../../../redux/actions/actions";
import Footer from '../../Footer/Footer';
import NavBar from "../../Navbar/Navbar";

const RegisterForm = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Estado para controlar la ventana modal de registro exitoso
  const [formError, setFormError] = useState(null);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rol, setRol] = useState("");
  const [picture, setPicture] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [name, nickname, password, email, selectedImage, picture]);


  
  const validateForm = () => {
      // Validaciones de campos
      if (!name || !nickname || !password || !email || !picture || !imageName) {
        setFormError("Por favor, completa todos los campos.");
        return;
      }
      if (!selectedImage && !picture) {
        setFormError("Por favor, carga una imagen de perfil.");
        return;
      }
  
      // Additional validation for the picture URL
      if (picture && !isValidImageUrl(picture)) {
        setFormError("URL de imagen inválida. Asegúrate de proporcionar una URL válida o cargar una imagen local.");
        return;
      }
  
      // Clear the form error if any image option is provided
      setFormError(null);
    }

    const isValidImageUrl = (url) => {
      // Validate the image URL format using a regular expression or any other validation logic
      // For simplicity, we are checking if the URL starts with "http://" or "https://"
      return /^https?:\/\//i.test(url);
    };
      
    const isValidEmail = (email) => {
      // Validación de correo electrónico
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);

    }
    
   
    const handleSubmit = async (e) => {
      e.preventDefault();

      validateForm();

      
    // Crear el objeto con la información a enviar por POST
    const data = {
      name: name,
      nickname: nickname,
      password: password,
      // rol: rol,
      email: email,
      picture: imageUrl,
    };

    try {
      const response = await axios.post(
        urlBack+"/crearUsuario",
        data
      );
      console.log("Respuesta del servidor:", response.data);
      setSuccessModalOpen(true); 
      // Navigate("/login");
    } catch (error) {
      console.error("Error al enviar los datos del formulario:", error);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


 

  // const handleGoogleRegister = () => {
  //   // Aquí puedes agregar la lógica para iniciar el proceso de registro con Google
  //   // Por ejemplo, puedes redirigir al usuario a la página de registro con Google
  // };

  
  return (
    <>
    <NavBar/>
    <div className={styles['register-form-container']}>
    <div className={styles['register-form-card']}>
      <h5 className={styles['register-form-title']}>Registro de Usuario</h5>
      {formError && <div className={styles['error-message']}>{formError}</div>}
      <form className={styles['form_registro']} onSubmit={handleSubmit}>
        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <div className={styles['form-label']}>
              <label htmlFor="username">Nombre de usuario</label>
            </div>
            <input
              type="text"
              className={`form-control ${!name && styles['is-invalid']}`}
              id="name"
              placeholder="tu  usuario"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!name && <div className="invalid-feedback">Campo requerido</div>}
          </div>
          <div className={styles['form-group']}>
            <div className={styles['form-label']}>
              <label htmlFor="nickname">Nickname</label>
            </div>
            <input
              type="text"
              className={`form-control ${!nickname && styles['is-invalid']}`}
              id="nickname"
              placeholder="tu nickname"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {!nickname && <div className="invalid-feedback">Campo requerido</div>}
          </div>
        </div>
        <div className={styles['mb-3']}>
          <label htmlFor="email" className={styles['form-label']}>
            Correo electrónico
          </label>
          <input
            type="email"
            className={`form-control ${!email && styles['is-invalid']}`}
            id="email"
            placeholder="Ingresa tu correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!email && <div className="invalid-feedback">Campo requerido</div>}
        </div>
        <div className={styles['mb-3']}>
          <label htmlFor="password" className={styles['form-label']}>
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${!password && styles['is-invalid']}`}
            id="password"
            placeholder="Ingresa tu contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!password && <div className="invalid-feedback">Campo requerido</div>}
        </div>
       
        {/* imagen */}
        <div className={styles['mb-3']}>
      <label htmlFor="imageInput" className={styles['form-label']}>
        Imagen de perfil
      </label>
      <input
        type="file"
        className={`form-control ${!selectedImage && styles['is-invalid']}`}
        id="imageInput"
        accept="image/*"
        required
        onChange={handleImageChange}
      />
      {!selectedImage && (
        <div className="invalid-feedback">Campo requerido</div>
      )}
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Imagen de perfil" />
        </div>
      )}
    </div>
        
       
        <div className="d-grid gap-2">
          <button type="submit" className={`btn ${styles['btn-primary']}`}>
            Registrarse
          </button>
        
        </div>
      </form>
      <div className={styles['text-center mt-3']}>
        <Link to="/login">¿Ya tienes una cuenta? Iniciar sesión aquí</Link>
      </div>
    </div>
     {/* Ventana modal de registro exitoso */}
     {successModalOpen && (
      <div className={styles.modal} tabIndex="-1" role="dialog">
        <div className={styles['modal-dialog']} role="document">
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <h5 className={styles['modal-title']}>Registro Exitoso</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSuccessModalOpen(false)} // Cerrar la ventana modal al hacer clic en el botón de cerrar
              ></button>
            </div>
            <div className={styles['modal-body']}>
              <p>Tu registro ha sido exitoso. ¡Bienvenido!</p>
            </div>
            <div className={styles['modal-footer']}>
              <button
                type="button"
                className={`btn ${styles['btn-primary']}`}
                onClick={() => {
                  setSuccessModalOpen(false); // Cerrar la ventana modal al hacer clic en el botón de "OK"
                  navigate("/login"); // Redirigir a la página de inicio de sesión
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  <Footer/>
  </>
  );
};

export default RegisterForm;
