import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import "./css/plantillas.css";

import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { forwardRef } from "react";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import Calendar from "@mui/icons-material/CalendarMonthTwoTone";
import Planificacion from "./planificacion";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Cal: forwardRef((props, ref) => <Calendar {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Plantillas(props) {
    const [plantillas, setPlantillas] = React.useState([]);
    const [serviciosQui, setServiciosQui] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [planificacionVisible, setPlanificacionVisible] =
        React.useState(false);
    const [rowSel, setRowSel] = React.useState([]);

    var semanas = [];
    semanas[1] = 1;
    semanas[2] = 2;
    semanas[3] = 3;
    semanas[4] = 4;

    React.useEffect(() => {
        const fetchServiciosQui = async () => {
            await fetch(
                "http://" +
                    process.env.REACT_APP_API_SERVER +
                    ":" +
                    process.env.REACT_APP_API_PORT +
                    "/api/servicios/" +
                    props.facility
            )
                .then((response) => response.json())
                .then((data) => {
                    let arrayServicios = {};

                    data.map((s) => {
                        arrayServicios[s.XKEY] = s.DESCRIPTION;
                    });

                    setServiciosQui(arrayServicios);
                    setIsLoading(false);
                });
        };

        const fetchPlantillas = async () => {
            await fetch(
                "http://" +
                    process.env.REACT_APP_API_SERVER +
                    ":" +
                    process.env.REACT_APP_API_PORT +
                    "/api/plantillas/" +
                    props.facility
            )
                .then((response) => response.json())
                .then((data) => {
                    setPlantillas(data);
                    setIsLoading(false);
                });
        };

        fetchServiciosQui();
        fetchPlantillas();
    }, []);

    function GridPlantillas() {
        const { useState } = React;
        const [selectedRow, setSelectedRow] = useState(null);

        const [columns, setColumns] = useState([
            { title: "uuid", field: "UUID", hidden: true },
            { title: "Descripci??n", field: "DESCRIPCION", width: "25%" },

            {
                title: "Servicio",
                field: "SERVICIO",
                type: "string",
                lookup: serviciosQui,
                width: "20%",
            },

            {
                title: "Semanas",
                field: "SEMANAS",
                initialEditValue: 1,
                type: "numeric",
                lookup: semanas,
                width: "10%",
            },
        ]);

        const defaultMaterialTheme = createTheme();
        return (
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    const
                    localization={{
                        body: {
                            emptyDataSourceMessage: "No hay datos por mostrar",
                            addTooltip: "A??adir",
                            deleteTooltip: "Eliminar",
                            editTooltip: "Editar",
                            filterRow: {
                                filterTooltip: "Filtrar",
                            },
                            editRow: {
                                deleteText: "??Segura(o) que quiere eliminar?",
                                cancelTooltip: "Cancelar",
                                saveTooltip: "Guardar",
                            },
                        },
                        grouping: {
                            placeholder:
                                "Arrastre un encabezado aqu?? para agrupar",
                            groupedBy: "Agrupado por",
                        },
                        header: {
                            actions: "Acciones",
                        },
                        pagination: {
                            firstAriaLabel: "Primera p??gina",
                            firstTooltip: "Primera p??gina",
                            labelDisplayedRows: "{from}-{to} de {count}",
                            labelRowsPerPage: "Filas por p??gina:",
                            labelRowsSelect: "filas",
                            lastAriaLabel: "Ultima p??gina",
                            lastTooltip: "Ultima p??gina",
                            nextAriaLabel: "Pagina siguiente",
                            nextTooltip: "Pagina siguiente",
                            previousAriaLabel: "Pagina anterior",
                            previousTooltip: "Pagina anterior",
                        },
                        toolbar: {
                            addRemoveColumns: "Agregar o eliminar columnas",
                            exportAriaLabel: "Exportar",
                            exportName: "Exportar a CSV",
                            exportTitle: "Exportar",
                            nRowsSelected: "{0} filas seleccionadas",
                            searchPlaceholder: "Buscar",
                            searchTooltip: "Buscar",
                            showColumnsAriaLabel: "Mostrar columnas",
                            showColumnsTitle: "Mostrar columnas",
                        },
                    }}
                    actions={[
                        {
                            icon: Calendar,
                            tooltip: "Editar plantilla",
                            onClick: (event, rowData) => {
                                setRowSel(rowData);
                                setPlanificacionVisible(true);
                            },
                        },
                    ]}
                    icons={tableIcons}
                    title="Plantillas Quir??rgicas"
                    columns={columns}
                    data={plantillas}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve, reject) => {
                                const data = JSON.stringify(newData);
                                console.log(data);
                                const url =
                                    "http://" +
                                    process.env.REACT_APP_API_SERVER +
                                    ":" +
                                    process.env.REACT_APP_API_PORT +
                                    "/api/plantilla";
                                let postData = {};
                                postData["facility"] = props.facility;
                                postData["DESCRIPCION"] = newData.DESCRIPCION;
                                postData["SERVICIO"] = newData.SERVICIO;
                                postData["SEMANAS"] = newData.SEMANAS;
                                const fetchData = async () => {
                                    const response = await fetch(url, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(postData),
                                    });

                                    const data = await response.json();
                                };

                                fetchData();

                                setPlantillas([...plantillas, newData]);

                                resolve();
                            }),
                    }}
                    onRowClick={(evt, selectedRow) =>
                        setSelectedRow(selectedRow.tableData.id)
                    }
                    options={{
                        headerStyle: {
                            backgroundColor: "#01579b",
                            color: "#FFF",
                        },
                        rowStyle: (rowData) => ({
                            backgroundColor:
                                selectedRow === rowData.tableData.id
                                    ? "#EEE"
                                    : "#FFF",
                        }),
                    }}
                />
            </ThemeProvider>
        );
    }

    const handleClose = (event, accion) => {
        if (accion === 1) props.handleClose();
    };

    const handleClosePlanificacion = (event) => {
        setPlanificacionVisible(false);
    };

    return (
        <React.Fragment>
            <div>
                <Dialog
                    open={true}
                    onClose={(e, accion) => handleClose(e, 0)}
                    maxWidth="xl"
                    fullWidth={true}
                    keepMounted={true}
                    scroll="paper"
                >
                    <DialogTitle className="text" sx={{ m: 0, p: 2 }}>
                        <Typography
                            fontFamily="Open Sans"
                            fontSize={28}
                            fontWeight="bold"
                            color="navy"
                        >
                            {"Plantillas de planificaci??n"}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={(e, accion) => handleClose(e, 1)}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            fontFamily="Open Sans"
                            fontSize={18}
                            color="navy"
                        >
                            Mantenimiento de plantillas para la programaci??n
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers sx={{ minHeight: 700 }}>
                        <GridPlantillas />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={(e, accion) => handleClose(e, 1)}
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {planificacionVisible && (
                <Planificacion
                    data={rowSel}
                    handleClose={handleClosePlanificacion}
                />
            )}
        </React.Fragment>
    );
}
