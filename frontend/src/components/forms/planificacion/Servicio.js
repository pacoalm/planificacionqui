import React from "react";
import { useDrag } from "react-dnd";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";

export const Servicio = ({ id, description }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "Servicio",
        item: { id, description },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={dragRef}>
            <ListItem key={id}>
                <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#5CDF63" }}>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={id.substring(3)}
                    secondary={description}
                />
            </ListItem>
        </div>
    );
};

export default Servicio;
