import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import s from "./Pago.module.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ color: "red", fontSize: "12px" }}
        onClick={handleClickOpen}
      >
        Ver los medios de pago
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <h1 className={s.h1}>Medios de pago para este producto</h1>
        <h2 className={s.h2}>
          Podés pagar tus compras con cualquiera de estos medios. Es rápido y
          seguro, siempre.
        </h2>
        <div className={s.cajaTarejtas}>
          <Typography gutterBottom className={s.tarjetas}>
            <img
              src="https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo.png"
              alt=""
              className={s.imagen}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Logo_Naranja.png"
              alt=""
              className={s.imagen}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Nuevo_logo_cabal.gif"
              alt=""
              className={s.imagen}
            />
            <img
              src="https://solicitartarjeta.com.ar/wp-content/uploads/2022/12/Screenshot_2.png"
              alt=""
              className={s.imagen}
            />
            <img
              src="https://guiadetarjetas.com/wp-content/uploads/2020/01/tarj-cencosud.jpg"
              alt=""
              className={s.imagen}
            />
          </Typography>
          <Typography gutterBottom className={s.tarjetas}>
            <img
              src="https://e7.pngegg.com/pngimages/557/386/png-clipart-hsbc-rajesky-associates-ltd-the-hongkong-and-shanghai-banking-corporation-logo-horse-logo-design-angle-company.png"
              alt=""
              className={s.imagen}
            />
            <img
              src="https://seeklogo.com/images/T/tarjeta-argencard-logo-F44537E5A5-seeklogo.com.png"
              alt=""
              className={s.imagen}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/72/MasterCard_early_1990s_logo.png"
              alt=""
              className={s.imagen}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
              alt=""
              className={s.imagen}
            />
          </Typography>
        </div>

        <DialogActions>
          <Button autoFocus onClick={handleClose} className={s.boton}>
            Deacuerdo
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}