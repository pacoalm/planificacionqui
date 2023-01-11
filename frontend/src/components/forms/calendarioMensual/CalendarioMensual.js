import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import ReactLoading from "react-loading";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { styled } from "@mui/material/styles";
import { width } from "@mui/system";
import dayjs from "dayjs";
import CeldaTurno from "./CeldaTurno";
import { AppContext } from "../../../context/appcontext";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const SemanaLarga = [
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
	"Domingo",
];
const SemanaCorta = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

var diasSemana = [];

const turnos = ["Mañana", "Tarde"];

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	height: "95%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

const color = "#225780";

const StyledTableCellShort = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#225780",
		color: theme.palette.common.white,
		fontFamily: "Open Sans",
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#225780",
		color: theme.palette.common.white,
		fontFamily: "Open Sans",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		borderLeft: "1px solid rgba(224, 224, 224, 1)",
		height: 40,
		padding: 0,
		fontFamily: "Open Sans",
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
}));

const StyledTableFixed = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.body}`]: {
		backgroundColor: "#225780",
		color: theme.palette.common.white,
		height: 20,
		fontSize: 12,
		align: "center",
	},
}));

function CalendarioMensual(props) {
	const { dispatch } = React.useContext(AppContext);

	const [open, setOpen] = React.useState(true);
	const [isLoading, setIsLoading] = React.useState(true);
	const [actualiza, setActualiza] = React.useState(false);
	const [valueMes, setValueMes] = React.useState(new dayjs());
	const [arraySemanas, setArraySemanas] = React.useState([]);
	const [inicioCalendario, setInicioCalendario] = React.useState("");
	const [incluirFinesSemana, setIncluirFinesSemana] = React.useState(false);
	const [programacionMes, setProgramacionMes] = React.useState([]);

	React.useEffect(() => {
		const fetchUbicaciones = async () => {
			await fetch(
				"http://" +
					process.env.REACT_APP_API_SERVER +
					":" +
					process.env.REACT_APP_API_PORT +
					"/api/ubicaciones/" +
					props.facility
			)
				.then((response) => response.json())
				.then((data) => {
					dispatch({ type: "SET_LISTA_UBICACIONES", payload: data });
				});
		};

		diasSemana = SemanaCorta;

		fetchUbicaciones();
	}, []);

	React.useEffect(() => {
		const calculaSemanas = () => {
			//'Determinar semanas del mes actual'
			var diasMes = parseInt(valueMes.endOf("Month").format("DD"));

			if (parseInt(valueMes.startOf("Month").format("d")) === 0) {
				diasMes = diasMes + 6;
				setInicioCalendario(
					valueMes.startOf("Month").add(-6, "day").format("DD/MM/YYYY")
				);
			} else {
				diasMes = diasMes + parseInt(valueMes.startOf("Month").format("d")) - 1;
				setInicioCalendario(
					valueMes
						.startOf("Month")
						.add(-parseInt(valueMes.startOf("Month").format("d")) + 1, "day")
						.format("DD/MM/YYYY")
				);
			}

			const semanas = Math.floor(diasMes / 7);
			const resto = diasMes % 7 === 0 ? 0 : 1;

			var sArray = [];
			for (var i = 1; i <= semanas + resto; i++) {
				sArray.push(i);
			}

			setArraySemanas(sArray);
		};

		const fetchProgramacion = async () => {
			const sql =
				"http://" +
				process.env.REACT_APP_API_SERVER +
				":" +
				process.env.REACT_APP_API_PORT +
				"/api/programacion/?facility=" +
				props.facility +
				"&fechaInicio=" +
				valueMes.startOf("Month").format("DD/MM/YYYY") +
				"&fechaFin=" +
				valueMes.endOf("Month").format("DD/MM/YYYY");

			await fetch(sql)
				.then((response) => response.json())
				.then((data) => {
					setProgramacionMes(data);
					setIsLoading(false);
				});
		};

		calculaSemanas();
		fetchProgramacion();
	}, [valueMes]);

	const handleClose = () => {
		props.handleClose();
	};

	const handleSwitchChange = (e) => {
		if (incluirFinesSemana) diasSemana = SemanaCorta;
		else diasSemana = SemanaLarga;
		setIncluirFinesSemana(!incluirFinesSemana);
	};

	const DiadelCalendario = (s, d) => {
		const d1 = dayjs(inicioCalendario, "DD/MM/YYYY");

		const d2 = d1.add(7 * s + d, "day");
		return d2.format("DD/MM/YYYY");
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
								color="#225780"
								sx={{ marginRight: 2, marginTop: 0.8 }}
							>
								Calendario Quirúrgico Mensual:
							</Typography>

							<DatePicker
								onChange={(newValue) => {
									setValueMes(newValue);
								}}
								value={valueMes}
								disablePast
								views={["month", "year"]}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											sx={{
												svg: { color },
												input: { color },
												label: { color },
												fontFamily: "Open Sans",
												fontSize: 20,
												marginTop: -1,
												marginBottom: 1,
												marginRight: 2,
												width: 200,
											}}
										/>
									);
								}}
							/>

							{isLoading && (
								<ReactLoading
									type="spin"
									color={color}
									width={24}
									height={24}
									padding={4}
								/>
							)}
							<FormGroup>
								<FormControlLabel
									control={
										<Switch
											checked={incluirFinesSemana}
											onChange={(e) => handleSwitchChange(e)}
										/>
									}
									label="Incluir fines de semana"
									fontFamily="Open Sans"
								></FormControlLabel>
							</FormGroup>
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
						{!isLoading && (
							<div className="containerFull">
								<TableContainer component={Paper}>
									<Table
										sx={{ Width: "100%" }}
										aria-label="spanning table"
										size="small"
									>
										<TableHead>
											<TableRow>
												{diasSemana.map((d) =>
													d !== "Sábado" && d !== "Domingo" ? (
														<StyledTableCell
															key={d}
															align="center"
															width={"18%"}
															colSpan={2}
														>
															{d}
														</StyledTableCell>
													) : (
														<StyledTableCellShort
															key={d}
															align="center"
															width="1%"
															colSpan={2}
														>
															{d}
														</StyledTableCellShort>
													)
												)}
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
											{arraySemanas.map((s, indexS) => (
												<TableRow key={indexS}>
													{diasSemana.map((d, indexD) =>
														turnos.map((t, indext) => (
															<TableCell height={200} padding="none">
																<CeldaTurno
																	diaSemana={d}
																	turno={t}
																	valueMes={valueMes}
																	dia={DiadelCalendario(indexS, indexD)}
																/>
															</TableCell>
														))
													)}
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						)}
					</Box>
				</Modal>
			</React.Fragment>
		</LocalizationProvider>
	);
}

export default CalendarioMensual;
