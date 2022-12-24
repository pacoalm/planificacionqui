import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CalendarioPl from "./calendarioPl";
import "./css/planificacion.css";
import ReactLoading from "react-loading";
import ServyRecursos from "./ServyRecursos";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function Planificacion(props) {
    const [open, setOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [ubicaciones, setUbicaciones] = React.useState([]);

    const handleClose = () => {
        props.handleClose();
    };

    return (
        <React.Fragment>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <div className="tituloLoading">
                        <Typography
                            fontFamily="Open Sans"
                            fontSize={20}
                            fontWeight="bold"
                            color="navy"
                            sx={{ marginRight: 2, marginBottom: 1 }}
                        >
                            Planificación Quirúrgica: {props.data.DESCRIPCION}
                        </Typography>
                        {isLoading && (
                            <ReactLoading
                                type="spin"
                                color="navy"
                                width={24}
                                height={24}
                            />
                        )}
                    </div>

                    <IconButton
                        aria-label="close"
                        onClick={(e) => handleClose(e)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <div className="containerFull">
                        <div className="containerCalendario">
                            <CalendarioPl data={props.data} />
                        </div>
                        <div className="containerServicios">
                            <ServyRecursos data={props.data} />
                        </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Planificacion;
