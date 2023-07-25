import axios from "axios";

const URL_MAIL = "http://localhost:3002/mail";

export const sendMail = (data) => {
  return axios
    .post(URL_MAIL, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const sendMailToUsuario = (data) => {
  return axios
    .post(`${URL_MAIL}/profile`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const sendMailRespuesta = (data) => {
  return axios
    .post(`${URL_MAIL}/respuesta`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const sendMailDocumento = (data) => {
  return axios
    .post(`${URL_MAIL}/email`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};



export const sendMailCita = (data) => {
  return axios
    .post(`${URL_MAIL}/compra`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};