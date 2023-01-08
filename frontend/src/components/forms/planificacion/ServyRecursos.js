import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Servicio from "./Servicio";
import Recurso from "./Recurso";
import List from "@mui/material/List";

function ServyRecursos(props) {
    const [servicios, setServicios] = React.useState([]);
    const [recursos, setRecursos] = React.useState([]);

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

        const fetchRecursos = async () => {
            await fetch(
                "http://" +
                    process.env.REACT_APP_API_SERVER +
                    ":" +
                    process.env.REACT_APP_API_PORT +
                    "/api/recursos/" +
                    props.data.FACILITY
            )
                .then((response) => response.json())
                .then((data) => {
                    props.handleEndLoading();
                    setRecursos(data.filter((r) => r.ACTIVO === 1));
                });
        };

        fetchServiciosQui();
        fetchRecursos();
    }, []);

    const ListaServicios = () => {
        return (
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 950,
                    overflow: "visible",
                    overflowY: "visible",
                    margin: 0,
                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                }}
            >
                <List dense={true}>
                    {servicios.map((s, index) => (
                        <Servicio
                            key={index}
                            id={s.XKEY}
                            description={s.DESCRIPTION}
                        />
                    ))}
                </List>
            </Box>
        );
    };

    const ListaRecursos = () => {
        return (
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 950,
                    overflow: "visible",
                    overflowY: "visible",
                    margin: 0,
                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                }}
            >
                <List dense={true}>
                    {recursos.map((r, index) => (
                        <Recurso
                            key={index}
                            id={r.UUID}
                            alias={r.ALIAS}
                            descripcion={r.DESCRIPCION}
                        />
                    ))}
                </List>
            </Box>
        );
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
                <TabPanel value="servicios" sx={{ margin: 0, padding: 0 }}>
                    <ListaServicios />
                </TabPanel>
                <TabPanel value="recursos" sx={{ margin: 0, padding: 0 }}>
                    <ListaRecursos />
                </TabPanel>
            </TabContext>
        </div>
    );
}

export default ServyRecursos;
