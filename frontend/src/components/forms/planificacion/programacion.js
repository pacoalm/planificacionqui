import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/planificacion.css";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import dateFormat, { masks } from "dateformat";

const Programacion = (props) => {
	const [valueIni, setValueIni] = React.useState(null);
	const [valueFin, setValueFin] = React.useState(null);
	const [anularPrevia, setAnularPrevia] = React.useState(false);
	const [mensajeError, setMensajeError] = React.useState(false);

	const handleClose = () => {
		props.handleClose();
	};

	const handleChangeSwitch = (e) => {
		setMensajeError("");
		setAnularPrevia(!anularPrevia);
	};

	const handleProgramarPeriodo = (e) => {
		setMensajeError("");

		async function crearProgramacion() {
			alert("ahora si");
		}

		async function buscarProgramacion() {
			var url =
				"http://" +
				process.env.REACT_APP_API_SERVER +
				":" +
				process.env.REACT_APP_API_PORT +
				"/api/programacion/existe?" +
				new URLSearchParams({
					facility: props.data.FACILITY,
					fechaInicio: dateFormat(valueIni, "dd/mm/yyyy"),
					fechaFin: dateFormat(valueFin, "dd/mm/yyyy"),
				});

			await fetch(url)
				.then((response) => response.json())
				.then((data) => {
					if (data.valor) {
						setMensajeError(
							"Existe progración en el periodo. Seleccione la opción de anular existente."
						);
					} else {
						crearProgramacion();
					}
				});
		}

		if (!valueIni || !valueFin) {
			setMensajeError("Las fechas de inicio y final son obligatorias.");
			return;
		}

		if (valueIni > valueFin) {
			setMensajeError("Error en el rango de fechas.");
			return;
		}

		if (!anularPrevia) buscarProgramacion();
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
			<Dialog open={true} fullWidth={true} maxWidth="sm">
				<DialogTitle className="text" sx={{ m: 0, p: 2 }}>
					Planificar rango de fechas
				</DialogTitle>

				<DialogContent dividers sx={{ minHeight: 400 }}>
					<Stack spacing={3}>
						<DatePicker
							className="datePicker"
							label="Seleccione fecha inicial:"
							value={valueIni}
							fullWidth
							onChange={(newValue) => {
								setMensajeError("");
								setValueIni(newValue);
								if (valueFin === null) setValueFin(newValue);
							}}
							disablePast={true}
							renderInput={(params) => <TextField {...params} />}
						/>

						<DatePicker
							className="datePicker"
							label="Seleccione fecha final:"
							value={valueFin}
							fullWidth
							onChange={(newValue) => {
								setMensajeError("");
								setValueFin(newValue);
							}}
							disablePast={true}
							renderInput={(params) => <TextField {...params} />}
						/>
						<FormControlLabel
							control={<Switch checked={anularPrevia} />}
							label="Anular programación existente"
							onChange={(e) => handleChangeSwitch(e)}
						/>
						<Typography
							variant="overline"
							display="block"
							sx={{ color: "red" }}
						>
							{mensajeError}
						</Typography>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={(e) => handleProgramarPeriodo(e)} autoFocus>
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</LocalizationProvider>
	);
};

export default Programacion;
