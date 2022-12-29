import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ConfigIcon from "@mui/icons-material/BuildCircleTwoTone";
import PlantillaIcon from "@mui/icons-material/ArchitectureTwoTone";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import "./header.css";

export default function Sidebar(props) {
    const [state, setState] = useState(true);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);

        if (!open) props.handleClose(event, 0);
    };

    const handleAbreConfig = (event) => {
        props.handleClose(event, 1);
    };

    const handleAbrePlantillas = (event) => {
        props.handleClose(event, 2);
    };

    const list = () => (
        <Box
            sx={{
                width: 220,
                height: "100%",
                bgcolor: "whitesmoke",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className="AvatarContainer">
                <AccountCircle sx={{ marginTop: 1, height: 40, width: 40 }} />
                <Typography sx={{ fontFamily: "Open Sans", fontSize: 12 }}>
                    {props.usuarioPQ.nombre}
                </Typography>
                <hr
                    style={{
                        color: "white",
                        height: "2px",
                        width: "100%",
                        marginTop: 4,
                    }}
                />
            </div>

            <Divider />
            <List dense={true}>
                <ListItem
                    key={"Plantillas"}
                    disablePadding
                    onClick={() => {
                        handleAbrePlantillas();
                    }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <PlantillaIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                marginLeft: -2,
                                fontFamily: "Open Sans",
                                fontSize: 12,
                            }}
                            primary="Plantillas/Planificación"
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem
                    key={"config"}
                    disablePadding
                    onClick={() => {
                        handleAbreConfig();
                    }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ConfigIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ marginLeft: -2 }}
                            primary="Configuración"
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key="left">
                <Drawer
                    anchor={"left"}
                    open={true}
                    onClose={toggleDrawer(false)}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
