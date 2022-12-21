import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import "./css/plantillas.css";

export default function Plantillas(props) {
	const handleClose = (event, accion) => {
		if (accion === 1) props.handleClose();
	};

	return (
		<div>
			<Dialog
				open={true}
				onClose={(e, accion) => handleClose(e, 0)}
				maxWidth="xl"
				fullWidth={true}
				keepMounted={true}
				scroll="paper"
			>
				<DialogTitle className="text" sx={{ m: 0, p: 2 }}>
					<Typography
						fontFamily="Open Sans"
						fontSize={28}
						fontWeight="bold"
						color="navy"
					>
						{"Plantillas de planificación"}
					</Typography>
					<IconButton
						aria-label="close"
						onClick={(e, accion) => handleClose(e, 1)}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
					<Typography fontFamily="Open Sans" fontSize={18} color="navy">
						Mantenimiento de plantillas para la programación
					</Typography>
				</DialogTitle>
				<DialogContent dividers sx={{ minHeight: 700 }}></DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={(e, accion) => handleClose(e, 1)}
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
