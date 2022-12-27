import React from "react";
import { useDrag } from "react-dnd";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ServiceIcon from "@mui/icons-material/Groups";
import "./css/planificacion.css";
import { height } from "@mui/system";

export const Servicio = ({ id, description }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: "Servicio",
		item: { id, description },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div className="servicio" ref={dragRef}>
			<ListItem key={id} sx={{ padding: 0, margin: 0 }}>
				<ListItemAvatar>
					<Avatar sx={{ backgroundColor: "#5CDF63", marginLeft: 1 }}>
						<ServiceIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary={id.substring(3)} secondary={description} />
			</ListItem>
		</div>
	);
};

export default Servicio;
