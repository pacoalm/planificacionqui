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
import Stack from "@mui/material/Stack";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const turnos = ["Mañana", "Tarde"];

const StyledTableFixed = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.body}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 14,
		align: "center",
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
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

		props.handleStartLoading();
		fetchUbicaciones();
		fetchDetallesPlantilla();
	}, []);

	function ServiciosTurno(propsS) {
		var servicios = [];

		if (propsS.DIA !== "Miércoles") {
			servicios = detallePlantilla.filter(
				(dp) =>
					dp.SEMANA === propsS.s &&
					dp.DIA === propsS.d.substring(0, 1) &&
					dp.TURNO === propsS.t.substring(0, 1) &&
					dp.UBICACION === propsS.ub
			);
		} else {
			servicios = detallePlantilla.filter(
				(dp) =>
					dp.SEMANA === propsS.s &&
					dp.DIA === "X" &&
					dp.TURNO === propsS.t.substring(0, 1) &&
					dp.UBICACION === propsS.ub
			);
		}

		return (
			<Stack spacing={1}>
				{servicios.map((ser) => (
					<Chip label={ser.SERVICIO.substring(3)} />
				))}
			</Stack>
		);
	}

	function CeldaTurno(propsC) {
		const [{ isOver }, dropRef] = useDrop({
			accept: "Servicio",
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
					<ServiciosTurno
						s={propsC.semana}
						d={propsC.dia}
						t={propsC.turno}
						ub={propsC.ub}
					/>
				</div>
			</StyledTableCell>
		);
	}

	const handleCellDrop = (item, s, ub, d, t) => {
		alert(item.id + s + ub + d + t);
	};

	return (
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
							<StyledTableCell key={d} align="center" width={"18%"} colSpan={2}>
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
									<StyledTableFixed align="center" rowSpan={ubicaciones.length}>
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
	);
}
