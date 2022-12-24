import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";

function ServyRecursos(props) {
    const [servicios, setServicios] = React.useState([]);

    React.useEffect(() => {
        const fetchServiciosQui = async () => {
            await fetch(
                "http://" +
                    process.env.REACT_APP_API_SERVER +
                    ":" +
                    process.env.REACT_APP_API_PORT +
                    "/api/servicios/" +
                    props.data.FACILITY
            )
                .then((response) => response.json())
                .then((data) => {
                    setServicios(data.filter((s) => s.QUI === 1));
                });
        };

        fetchServiciosQui();
    }, []);

    const ListaServicios = () => {
        return (
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 950,
                    overflow: "hidden",
                    overflowY: "scroll",
                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                }}
            >
                <List dense={false}>
                    {servicios.map((s) => (
                        <ListItem key={s.XKEY}>
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "#5CDF63" }}>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={s.XKEY.substring(3)}
                                secondary={s.DESCRIPTION}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    };

    const ListaRecursos = () => {
        return <></>;
    };

    const [defaultTab, setDefaultTab] = React.useState("servicios");

    const handleChangeTab = (event, newValue) => {
        setDefaultTab(newValue);
    };

    return (
        <div>
            <TabContext value={defaultTab}>
                <Box
                    sx={{
                        width: "100%",
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <TabList
                        onChange={handleChangeTab}
                        aria-label="configuracion"
                    >
                        <Tab label="Servicios" value="servicios" />
                        <Tab label="Recursos" value="recursos" />
                    </TabList>
                </Box>
                <TabPanel value="servicios">
                    <ListaServicios />
                </TabPanel>
                <TabPanel value="recursos"></TabPanel>
            </TabContext>
        </div>
    );
}

export default ServyRecursos;
