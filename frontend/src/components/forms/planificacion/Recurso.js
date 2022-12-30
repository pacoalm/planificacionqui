import React from "react";
import { useDrag } from "react-dnd";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ResourceIcon from "@mui/icons-material/DonutSmallTwoTone";
import "./css/planificacion.css";

export const Recurso = ({ id, alias, descripcion }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: "Recurso",
		item: { id, descripcion },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div className="servicio" ref={dragRef}>
			<ListItem key={id} sx={{ padding: 0, margin: 0 }}>
				<ListItemAvatar>
					<Avatar sx={{ backgroundColor: "coral", marginLeft: 1 }}>
						<ResourceIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary={descripcion} secondary={alias} />
			</ListItem>
		</div>
	);
};

export default Recurso;
