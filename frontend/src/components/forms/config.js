import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

export default function Config(props) {
	const handleChange = () => {};

	const handleClose = (event, accion) => {
		if (accion === 1 || accion === 2) props.handleClose();
	};

	return (
		<div>
			<Dialog
				open={true}
				onClose={(e, accion) => handleClose(e, 0)}
				maxWidth="xl"
				fullWidth={true}
				keepMounted={true}
			>
				<DialogTitle
					disableTypography={true}
					className="text"
					sx={{ m: 0, p: 2 }}
				>
					<Typography
						fontFamily="Open Sans"
						fontSize={28}
						fontWeight="bold"
						color="navy"
					>
						{"Configuración del  " + props.nombreCentro}
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
						Configuración de los datos básicos de un hospital
					</Typography>
				</DialogTitle>
				<DialogContent dividers sx={{ minHeight: 700 }}>
					<FormControl sx={{ m: 1, minWidth: 300 }}>
						<InputLabel id="nq">Número de quirófanos</InputLabel>
						<Select
							labelId="nq"
							id="nq"
							value={6}
							label="Número de quirófanos"
							onChange={handleChange}
							fontFamily="Open Sans"
						>
							<MenuItem value={1}>Uno</MenuItem>
							<MenuItem value={2}>Dos</MenuItem>
							<MenuItem value={3}>Tres</MenuItem>
							<MenuItem value={4}>Cuatro</MenuItem>
							<MenuItem value={5}>Cinco</MenuItem>
							<MenuItem value={6}>Seis</MenuItem>
						</Select>
						<FormHelperText>Número de quirófanos del hospital</FormHelperText>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={(e, accion) => handleClose(e, 1)}
					>
						Cancelar
					</Button>
					<Button
						variant="contained"
						onClick={(e, accion) => handleClose(e, 2)}
					>
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
