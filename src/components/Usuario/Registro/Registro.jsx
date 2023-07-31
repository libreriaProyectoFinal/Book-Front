// RegisterForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Registro.css"; 
import styles from './Registro.module.css';
import axios from "axios";

const RegisterForm = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Estado para controlar la ventana modal de registro exitoso
  const [formError, setFormError] = useState(null);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [picture, setPicture] = useState("");

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
      // Validaciones de campos
      if (!name || !nickname || !password || !rol || !email || !picture) {
        setFormError("Por favor, completa todos los campos.");
        return;
      }
  
      // Validación de correo electrónico
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setFormError("El correo electrónico no es válido.");
        return;
      }
      
   
    // Crear el objeto con la información a enviar por POST
    const data = {
      name: name,
      nickname: nickname,
      password: password,
      rol: rol,
      email: email,
      picture: picture,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/crearUsuario",
        data
      );
      console.log("Respuesta del servidor:", response.data);
      setSuccessModalOpen(true); 
      // Navigate("/login");
    } catch (error) {
      console.error("Error al enviar los datos del formulario:", error);
    }
  };

  // const handleGoogleRegister = () => {
  //   // Aquí puedes agregar la lógica para iniciar el proceso de registro con Google
  //   // Por ejemplo, puedes redirigir al usuario a la página de registro con Google
  // };

  
  return (
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
        {/* Rol */}
        <div className={styles['mb-3']}>
          <label htmlFor="rol" className={styles['form-label']}>
            Rol
          </label>
          <select
            className={`form-control ${!rol && styles['is-invalid']}`}
            id="rol"
            required
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="">Selecciona un rol</option>
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
            {/* Agrega más opciones de rol según tus necesidades */}
          </select>
          {!rol && <div className="invalid-feedback">Campo requerido</div>}
        </div>
        {/* imagen */}
        <div className={styles['mb-3']}>
          <label htmlFor="picture" className={styles['form-label']}>
            Imagen de perfil
          </label>
          <input
            type="text"
            className={`form-control ${!picture && styles['is-invalid']}`}
            id="picture"
            placeholder="Ingresa tu Foto"
            required
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          {!picture && <div className="invalid-feedback">Campo requerido</div>}
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className={`btn ${styles['btn-primary']}`}>
            Registrarse
          </button>
          {/* <button
            type="button"
            className={`btn ${styles['btn-danger']}`}
            onClick={handleGoogleRegister}
          >
            Registrarse con Google
          </button> */}
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
  );
};

export default RegisterForm;
