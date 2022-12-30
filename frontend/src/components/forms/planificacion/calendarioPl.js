import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDrop } from "react-dnd";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const turnos = ["Mañana", "Tarde"];

const StyledTableFixed = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.body}`]: {
		backgroundColor: "#2B2B47",
		color: theme.palette.common.white,
		fontSize: 14,
		align: "center",
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#2B2B47",
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		borderLeft: "1px solid rgba(224, 224, 224, 1)",
		height: 40,
		width: 100,
		padding: 0,
	},
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
}));

export default function CalendarioPl(props) {
	var arraySemanas = [1, 2];
	const [ubicaciones, setUbicaciones] = React.useState([]);
	const [detallePlantilla, setDetallePlantilla] = React.useState([]);
	const [actualiza, setActualiza] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);

	React.useEffect(() => {
		const fetchUbicaciones = async () => {
			await fetch(
				"http://" +
					process.env.REACT_APP_API_SERVER +
					":" +
					process.env.REACT_APP_API_PORT +
					"/api/ubicaciones/" +
					props.data.FACILITY
			)
				.then((response) => response.json())
				.then((data) => {
					setUbicaciones(
						data.filter((ub) => {
							if (ub.ACTIVA === 1 && ub.SERVICIO === null) {
								return ub;
							}
						})
					);
					console.log(ubicaciones);
				});
		};
		const fetchDetallesPlantilla = async () => {
			await fetch(
				"http://" +
					process.env.REACT_APP_API_SERVER +
					":" +
					process.env.REACT_APP_API_PORT +
					"/api/detalleplantilla/" +
					props.data.UUID
			)
				.then((response) => response.json())
				.then((data) => {
					setDetallePlantilla(data);
					console.log(data);
				});
		};

		fetchUbicaciones();
		fetchDetallesPlantilla();
	}, [actualiza]);

	function ServiciosTurno(propsS) {
		var servicios = [];
		if (propsS.d !== "Miércoles") {
			servicios = detallePlantilla.filter(
				(dp) =>
					dp.SEMANA === propsS.s &&
					dp.DIA === propsS.d.substring(0, 1) &&
					dp.TURNO === propsS.t.substring(0, 1) &&
					dp.UBICACION === propsS.ub &&
					dp.SERVICIO !== null
			);
		} else {
			servicios = detallePlantilla.filter(
				(dp) =>
					dp.SEMANA === propsS.s &&
					dp.DIA === "X" &&
					dp.TURNO === propsS.t.substring(0, 1) &&
					dp.UBICACION === propsS.ub &&
					dp.SERVICIO !== null
			);
		}

		return (
			<React.Fragment>
				{servicios.map((ser) => (
					<Chip
						label={ser.SERVICIO.substring(3)}
						color="primary"
						size="small"
						sx={{
							width: "80",
							height: "20px",
							fontSize: "12px",
						}}
						onDelete={(e) =>
							handleDeleteServicio(
								e,
								propsS.s,
								propsS.d,
								propsS.t,
								propsS.ub,
								ser.SERVICIO
							)
						}
					/>
				))}
			</React.Fragment>
		);
	}

	function RecursosTurno(propsR) {
		var recursos = [];

		if (propsR.d !== "Miércoles") {
			recursos = detallePlantilla.filter(
				(dp) =>
					dp.SEMANA === propsR.s &&
					dp.DIA === propsR.d.substring(0, 1) &&
					dp.TURNO === propsR.t.substring(0, 1) &&
					dp.UBICACION === propsR.ub &&
					dp.RECURSO !== null
			);
		} else {
			recursos = detallePlantilla.filter(
				(dp) =>
					dp.SEMANA === propsR.s &&
					dp.DIA === "X" &&
					dp.TURNO === propsR.t.substring(0, 1) &&
					dp.UBICACION === propsR.ub &&
					dp.RECURSO !== null
			);
		}

		return (
			<React.Fragment>
				{recursos.map((rec) => (
					<Chip
						label={rec.ALIASR}
						size="small"
						sx={{
							width: "50",
							height: "20px",
							fontSize: "12px",
							backgroundColor: "coral",
							color: "white",
						}}
						onDelete={(e) =>
							handleDeleteRecurso(
								e,
								propsR.s,
								propsR.d,
								propsR.t,
								propsR.ub,
								rec.RECURSO
							)
						}
					/>
				))}
			</React.Fragment>
		);
	}

	function CeldaTurno(propsC) {
		const [{ isOver }, dropRef] = useDrop({
			accept: ["Servicio", "Recurso"],
			drop: (item) => {
				handleCellDrop(
					item,
					propsC.semana,
					propsC.ub,
					propsC.dia,
					propsC.turno
				);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
			}),
		});

		return (
			<StyledTableCell>
				<div className={isOver ? "celdaTurnoSel" : "celdaTurno"} ref={dropRef}>
					<Stack spacing={0}>
						<div>
							<ServiciosTurno
								s={propsC.semana}
								d={propsC.dia}
								t={propsC.turno}
								ub={propsC.ub}
							/>
						</div>
						<div>
							<RecursosTurno
								s={propsC.semana}
								d={propsC.dia}
								t={propsC.turno}
								ub={propsC.ub}
							/>
						</div>
					</Stack>
				</div>
			</StyledTableCell>
		);
	}

	const handleDeleteServicio = (e, s, d, t, ub, ser) => {
		setDialogOpen(true);
	};

	const handleDeleteRecurso = (e, s, d, t, ub, res) => {
		setDialogOpen(true);
	};

	const handleCellDrop = (item, s, ub, d, t) => {
		const url =
			"http://" +
			process.env.REACT_APP_API_SERVER +
			":" +
			process.env.REACT_APP_API_PORT +
			"/api/detalleplantilla";
		const postData = {
			plantilla: props.data.UUID,
			semana: s,
			dia: d === "Miércoles" ? "X" : d.substring(0, 1),
			turno: t.substring(0, 1),
			ubicacion: ub,
			servicio: item.id.length <= 10 ? item.id : null,
			recurso: item.id.length > 10 ? item.id : null,
		};

		const fetchData = async () => {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			});
			setActualiza(!actualiza);
			props.handleEndLoading();
			const data = await response.json();
		};

		fetchData();
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	return (
		<>
			{actualiza}
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center" rowSpan={2}>
								Sem.
							</StyledTableCell>
							<StyledTableCell align="center" rowSpan={2}>
								Ubq.
							</StyledTableCell>
							{diasSemana.map((d) => (
								<StyledTableCell
									key={d}
									align="center"
									width={"18%"}
									colSpan={2}
								>
									{d}
								</StyledTableCell>
							))}
						</TableRow>

						<TableRow>
							{diasSemana.map((d) =>
								turnos.map((t, index) => (
									<StyledTableCell key={index} align="center">
										{t}
									</StyledTableCell>
								))
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{arraySemanas.map((sem) =>
							ubicaciones.map((ub, indexU) => (
								<StyledTableRow key={indexU}>
									{indexU === 0 && (
										<StyledTableFixed
											align="center"
											rowSpan={ubicaciones.length}
										>
											S{sem}
										</StyledTableFixed>
									)}
									<StyledTableFixed align="center">{ub.ALIAS}</StyledTableFixed>

									{diasSemana.map((d, indexd) =>
										turnos.map((t, indext) => (
											<CeldaTurno
												index={indext}
												semana={sem}
												ub={ub.ALIAS}
												dia={d}
												turno={t}
											/>
										))
									)}
								</StyledTableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog
				open={dialogOpen}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"¡Atención!"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Se eliminara el servicio del día seleccionado
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Cancelar</Button>
					<Button onClick={handleDialogClose} autoFocus>
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
