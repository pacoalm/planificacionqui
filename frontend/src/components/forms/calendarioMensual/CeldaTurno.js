import React, { useContext, useEffect } from "react";
import "./css/calendarioMensual.css";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../../../context/appcontext";
import Stack from "@mui/material/Stack";

function CeldaTurno(props) {
	const { listaUbicaciones } = useContext(AppContext);
	const celdaActiva =
		props.valueMes.format("MM") === props.dia.substring(3, 5) &&
		props.diaSemana !== "Sábado" &&
		props.diaSemana !== "Domingo";

	React.useEffect(() => {
		//'Determinar semanas del mes actual'
	}, []);

	return (
		<div
			className={
				celdaActiva
					? props.turno === "Tarde"
						? "celdaContainerActivaT"
						: "celdaContainerActivaM"
					: "celdaContainerInactiva"
			}
		>
			<div className="diaPosition">{props.dia.substring(0, 2)}</div>

			{celdaActiva && (
				<Stack spacing={1}>
					{listaUbicaciones
						.filter((ub) => {
							if (ub.ACTIVA === 1 && ub.SERVICIO === null) {
								return ub;
							}
						})
						.map((u) => (
							<Avatar
								sx={{
									fontSize: 10,
									bgcolor: "#e5fff1",
									color: "#225780",
									width: 24,
									height: 24,
								}}
							>
								{u.ALIAS}
							</Avatar>
						))}
				</Stack>
			)}
		</div>
	);
}

export default CeldaTurno;
