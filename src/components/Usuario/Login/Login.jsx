import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Login.css";
import styles from './Login.module.css';
import { loginUser, urlBack } from "../../../redux/actions/actions";

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import NavBar from "../../navbar/navbar";

// const urlBack = "https://book-back-libreriaproyectofinal.vercel.app" 

const firebaseConfig = {
  apiKey: "AIzaSyDsWr0rA7m8n9MpkZyBbWxS8wda0Qp9KJQ",
  authDomain: "libreriaproyectofinal-188c0.firebaseapp.com",
  projectId: "libreriaproyectofinal-188c0",
  storageBucket: "libreriaproyectofinal-188c0.appspot.com",
  messagingSenderId: "104377466475",
  appId: "1:104377466475:web:d75dfd6474a859fc9e3b2e",
  measurementId: "G-ZX8EJPBGV7"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [acceptedRedirect, setAcceptedRedirect] = useState(false);
const [useremail,setUseremail] =useState('')
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? "" : "Por favor, ingresa un correo electrónico válido.";
  };
  
  const validatePassword = (password) => {
    return password.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres.";
  };
  
  /*const validateGoogleEmail = (email) => {
    return email.endsWith("@gmail.com") ? "" : "El correo electrónico debe ser de Google (@gmail.com).";
  };*/


 // Función para almacenar el usuario en el Local Storage
 const storeUserInLocalStorage = (user, accessToken) => {
  // Obtener la fecha y hora actual en milisegundos
  const now = new Date().getTime();

  // Definir la información del usuario a almacenar en el Local Storage
  const userData = {
    user,
    accessToken,
    expiresAt: now + 3600 * 1000, // Expira en 1 hora (3600 segundos)
  };

  // Convertir la información en una cadena JSON
  const userDataJSON = JSON.stringify(userData);

  // Almacenar la información en el Local Storage
  localStorage.setItem('user', userDataJSON);
};

// Función para cargar el usuario desde el Local Storage
const loadUserFromLocalStorage = () => {
  const userDataJSON = localStorage.getItem('user');

  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    const now = new Date().getTime();

    // Verificar si el token de acceso aún no ha expirado
    if (userData.expiresAt > now) {
      // Si el token de acceso es válido, actualizar el estado global
      dispatch(loginUser(userData.user));
    } else {
      // Si el token ha expirado, eliminar la información del Local Storage
      localStorage.removeItem('user');
    }
  }
};

useEffect(() => {
  // Cargar el usuario desde el Local Storage al cargar la página
  loadUserFromLocalStorage();
}, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = e.target.email;
    const passwordInput = e.target.passwordKey;
  
    const email = emailInput.value.trim();
    const passwordKey = passwordInput.value;
   
      // Validar el campo de correo electrónico
  const emailError = validateEmail(email);
  setEmailError(emailError);
  if (emailError) {
    return;
  }

  // Validar el campo de contraseña
  const passwordError = validatePassword(passwordKey);
  setPasswordError(passwordError);
  if (passwordError) {
    return;
  }

  // Validar que el correo sea de Google
  /*const googleEmailError = validateGoogleEmail(email);
  setEmailError(googleEmailError);
  if (googleEmailError) {
    return;
  }*/

   
    // Resto del código de manejo de autenticación...
 
    try {
      // Enviar los datos al servidor mediante una solicitud POST
      const response = await axios.post(urlBack+"/login", {
        email,
        passwordKey,
      });
        console.log(response.data)
      // Comprobar la respuesta del servidor y mostrar el mensaje correspondiente
      if (response.data.user.tipoUsuario.rol === 'admin' || response.data.user.tipoUsuario.rol === 'usuario') {
        // Guardar la información del usuario en el Local Storage
        storeUserInLocalStorage(response.data.user, response.data.accessToken);

        setUseremail(response.data.user.name);
        setModalMessage(response.data.user.rol === 'admin' ? 'Es administrador' : 'Es usuario');
        setShowModal(true);
        setShowRedirectMessage(true);
      }
    } catch (error) {
      // Manejar errores en caso de fallo en la solicitud POST
      console.error("Error al iniciar sesión:", error);
      setModalMessage("Error al iniciar sesión");
      setShowModal(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

     // Iniciar sesión con Google utilizando Firebase Authentication
     const result = await signInWithPopup(auth, provider);
     const idToken =await result.user.getIdToken();
     console.log(result)
console.log(idToken)
      try {
        // Enviar el idToken al servidor utilizando Axios o cualquier otra biblioteca de solicitudes HTTP
        const response = await axios.post(urlBack+'/login/google', { idToken });

        // Comprobar la respuesta del servidor y mostrar el mensaje correspondiente
        if (response.data.user.rol === 'admin') {
          setUseremail(result.user.name);
          setModalMessage('Es administrador');
          setShowModal(true);
          dispatch(loginUser(response.data.user)); // Guardar la información del usuario en el estado global
          setShowRedirectMessage(true);
        } else {
          setUseremail(result.user.name);
          setModalMessage('Es usuario');
          setShowModal(true);
          dispatch(loginUser(response.data.user)); // Guardar la información del usuario en el estado global
          setShowRedirectMessage(true);
        }
      } catch (error) {
        // Manejar errores en caso de fallo en la solicitud POST
        console.error('Error al iniciar sesión:', error);
        setModalMessage('Error al iniciar sesión');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  useEffect(() => {
    if (acceptedRedirect) {
      navigate("/home"); // Redirigir a /home cuando el usuario acepte la bienvenida
    }
  }, [acceptedRedirect]);

  const handleAcceptRedirect = () => {
    setAcceptedRedirect(true);
  };

  return (
    <>
    <NavBar/>
    <div className={styles.containerLogin}>
      <div className={styles['row']}>
        <div className={styles['col-md-6']}>
          <div className={styles['card']}>
            <div className={styles['card-body']}>
              <h5 className={styles['card-title']}>Login de Usuario</h5>
              <form onSubmit={handleSubmit}>
                <div className={styles['mb-3']}>
                  <label htmlFor="email" className={styles['form-label']}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className={styles['form-control']}
                    id="email"
                    placeholder="Ingresa tu correo electrónico"
                    required
                  />
                   {emailError && <div className={styles['error-message']}>{emailError}</div>}
                </div>
                <div className={styles['mb-3']}>
                  <label htmlFor="passwordKey" className={styles['form-label']}>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className={styles['form-control']}
                    id="passwordKey"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  {passwordError && <div className={styles['error-message']}>{passwordError}</div>}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className={`btn ${styles['btn-primary']}`}>
                    Ingresar
                  </button>
                  <button
                    type="button"
                    className={`btn ${styles['btn-danger']} bg-danger text-white`}
                    onClick={handleGoogleLogin}
                  >
                    Iniciar con Google
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Popup con el mensaje */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Popup con el mensaje de redirección */}
      <Modal
        show={showRedirectMessage && !acceptedRedirect}
        onHide={() => setShowRedirectMessage(false)}
      >
        <Modal.Body>Bienvenido/a "{useremail}"</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAcceptRedirect}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default LoginForm;
