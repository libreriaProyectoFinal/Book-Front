import React, { useEffect, useState } from "react";
import axios from "axios";
import UsuarioDetailModal from "../UsuariosModal/UsuarioDetail";
import CrearUsuarioModal from "../UsuariosModal/CrearUsuario";
import styles from "./Listausuarios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetUsuarios, urlBack } from "../../../../redux/actions/actions";
import BuscarPorCorreo from "./Filtros/FiltroCorreo/FiltroCorreo";
import ConfirmationModal from "../UsuariosModal/ConfirmacionDelete/ConfirmacionDelete";
import PopupModal from "../UsuariosModal/ModalMensaje/ModalMensaje";

function Listausuarios() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Función para abrir el modal con el título y mensaje proporcionados
  const openModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setUsers(usuarios);
    console.log(usuarios)
  }, [usuarios, dispatch]);

  useEffect(() => {
    dispatch(GetUsuarios());
  }, []);

  const handleShowUserDetails = (userId) => {
    setSelectedUserId(userId);
    setShowUserDetailsModal(true);
  };

  const handleShowCreateUser = () => {
    setShowCreateUserModal(true);
  };

  const handleBusquedaPorCorreo = (e) => {
    setSearchEmail(e.target.value);
  };

  const filtradoUsuarios = users.filter((user) =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const handleDeleteUser = (userId, event) => {
    event.stopPropagation();
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const user = localStorage.getItem("user");
      const dataUser = JSON.parse(user);
      const response = await axios.delete(
        urlBack + "/usuario/" + selectedUserId,
        {
          headers: { Authorization: dataUser.accessToken },
        }
      );

      const responseMessage = response.data.message;

      openModal("Borrar Usuario", responseMessage);
      dispatch(GetUsuarios());
    } catch (error) {
      console.error("Error al borrar el usuario:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSuspendUser = async (userId, event) => {
    event.stopPropagation();
    try {
      const user = localStorage.getItem("user");
      const dataUser = JSON.parse(user);
      const response = await axios.put(
        urlBack + "/usuario/" + userId + "/suspendido",
        null,
        {
          headers: { Authorization: dataUser.accessToken },
        }
      );

      const responseMessage = response.data.message;
      openModal("Suspender Usuario", responseMessage);
      dispatch(GetUsuarios());
    } catch (error) {
      console.error("Error al suspender el usuario:", error);
    }
  };

  const handleActivateUser = async (userId, event) => {
    event.stopPropagation();
    try {
      const user = localStorage.getItem("user");
      const dataUser = JSON.parse(user);
      const response = await axios.put(
        urlBack + "/usuario/" + userId + "/nosuspendido",
        null,
        {
          headers: { Authorization: dataUser.accessToken },
        }
      );

      const responseMessage = response.data.message;
      openModal("Activar Usuario", responseMessage);
      dispatch(GetUsuarios());
    } catch (error) {
      console.error("Error al activar el usuario:", error);
    }
  };

  return (
    <div className={styles["users-list-container"]}>
      <div className={styles["filtrosUsuariosAdmin"]}>
        <button
          className={`${styles["create-user-btn"]} btn btn-info`}
          onClick={handleShowCreateUser}
        >
          Crear Usuario
        </button>
        <BuscarPorCorreo value={searchEmail} onChange={handleBusquedaPorCorreo} />
      </div>
      <h1>Lista de Usuarios</h1>
      <div className={styles["ContainerTable"]}>
        <table className={`${styles["users-table"]} table`}>
          <thead>
            <tr className={`${styles["titulosTable"]} titulosTable`}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nickname</th>
              <th>Correo</th>
              <th className={`${styles["acciones-header-double-width"]} acciones-header-double-width`}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {searchEmail ? (
              filtradoUsuarios.map((user) => (
                <tr
                  className="user-row"
                  key={user.idusuario}
                  onClick={() => handleShowUserDetails(user.idusuario)}
                >
                  <td>{user.idusuario}</td>
                  <td>{user.name}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className={`btn btn-info  ${styles["user-action-btn"]}`}
                      onClick={(event) =>
                        handleShowUserDetails(user.idusuario, event)
                      }
                    >
                      Detalles
                    </button>
                    <button
                      type="button"
                      className={`btn btn-danger  ${styles["user-action-btn"]}`}
                      onClick={(event) =>
                        handleDeleteUser(user.idusuario, event)
                      }
                    >
                      Borrar
                    </button>
                    {user.isActive ? (
                      <button
                        className={`btn btn-secondary ${styles["user-action-btn"]}`}
                        onClick={(event) =>
                          handleSuspendUser(user.idusuario, event)
                        }
                      >
                        Suspender
                      </button>
                    ) : (
                      <button
                        className={`btn btn-warning ${styles["user-action-btn"]}`}
                        onClick={(event) =>
                          handleActivateUser(user.idusuario, event)
                        }
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              users.map((user) => (
                <tr
                  className="user-row"
                  key={user.idusuario}
                  onClick={() => handleShowUserDetails(user.idusuario)}
                >
                  <td>{user.idusuario}</td>
                  <td>{user.name}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td className={styles.btn_box}>
                    <button
                      className={`btn btn-info ${styles["user-action-btn"]}`}
                      onClick={(event) =>
                        handleShowUserDetails(user.idusuario, event)
                      }
                    >
                      Detalles
                    </button>
                    <button
                      className={`btn btn-danger ${styles["user-action-btn"]}`}
                      onClick={(event) =>
                        handleDeleteUser(user.idusuario, event)
                      }
                    >
                      Borrar
                    </button>
                    {user.isActive ? (
                      <button
                        className={`btn btn-secondary ${styles["user-action-btn"]}`}
                        onClick={(event) =>
                          handleSuspendUser(user.idusuario, event)
                        }
                      >
                        Suspender
                      </button>
                    ) : (
                      <button
                        className={`btn btn-warning ${styles["user-action-btn"]}`}
                        onClick={(event) =>
                          handleActivateUser(user.idusuario, event)
                        }
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showUserDetailsModal && (
        <UsuarioDetailModal
          userId={selectedUserId}
          onClose={() => setShowUserDetailsModal(false)}
        />
      )}

      {showCreateUserModal && (
        <CrearUsuarioModal onClose={() => setShowCreateUserModal(false)} />
      )}

      {/* PopupModal mensaje */}
      <PopupModal
        isOpen={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
      />

      {/* PopupModal advertencia borrado */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        message="¿Estás seguro de que deseas borrar este usuario?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default Listausuarios;
