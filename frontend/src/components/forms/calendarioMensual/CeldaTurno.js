import React from "react";
import "./css/calendarioMensual.css";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";

function CeldaTurno(props) {
	const celdaActiva = props.valueMes.format("MM") === props.dia.substring(3, 5);

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
			<div className="diaPosition">
				{props.turno === "Tarde" && (
					<Avatar
						sx={{
							fontSize: 12,
							bgcolor: "#225780",
							width: 24,
							height: 24,
						}}
					>
						{props.dia.substring(0, 2)}
					</Avatar>
				)}
			</div>
		</div>
	);
}

export default CeldaTurno;
