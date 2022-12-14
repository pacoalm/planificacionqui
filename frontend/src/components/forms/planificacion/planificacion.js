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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SendIcon from "@mui/icons-material/Send";
import Programacion from "./programacion";

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
	const [isLoading, setIsLoading] = React.useState(false);
	const [actualiza, setActualiza] = React.useState(false);
	const [programacionOpen, setProgramacionOpen] = React.useState(false);

	const handleClose = () => {
		props.handleClose();
	};

	const handleStartLoading = () => {
		setIsLoading(true);
	};

	const handleEndLoading = () => {
		setIsLoading(false);
	};

	const handleActualiza = () => {
		setActualiza(!actualiza);
	};

	const handleProgramacionOpen = (e) => {
		setProgramacionOpen(true);
	};
	const handleProgramacionClose = (e) => {
		setProgramacionOpen(false);
	};

	return (
		<React.Fragment>
			<Modal
				hideBackdrop
				open={open}
				onClose={(e) => handleClose(e)}
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
							<ReactLoading type="spin" color="navy" width={24} height={24} />
						)}
						<Button
							onClick={(e) => handleProgramacionOpen(e)}
							sx={{ marginLeft: 10, marginTop: -0.6 }}
							variant="contained"
							endIcon={<SendIcon />}
						>
							Programar periodo con esta plantilla
						</Button>
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
					<DndProvider backend={HTML5Backend}>
						<div className="containerFull">
							<div className="containerCalendario">
								<CalendarioPl
									data={props.data}
									handleStartLoading={handleStartLoading}
									handleActualiza={handleActualiza}
								/>
							</div>
							<div className="containerServicios">
								<ServyRecursos
									data={props.data}
									handleEndLoading={handleEndLoading}
								/>
							</div>
						</div>
					</DndProvider>
				</Box>
			</Modal>
			{programacionOpen && (
				<Programacion data={props.data} handleClose={handleProgramacionClose} />
			)}
		</React.Fragment>
	);
}

export default Planificacion;
