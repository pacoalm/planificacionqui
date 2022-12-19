import * as React from "react";
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

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
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
export default function Rcursos(props) {
    const [recursos, setRecursos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchRecursos = async () => {
            await fetch(
                "http://" +
                    process.env.REACT_APP_API_SERVER +
                    ":" +
                    process.env.REACT_APP_API_PORT +
                    "/api/recursos/" +
                    props.facility
            )
                .then((response) => response.json())
                .then((data) => {
                    setRecursos(data);
                });
        };

        fetchRecursos();
        console.log(recursos);
        setIsLoading(false);
    }, []);

    function GridRecursos() {
        const { useState } = React;
        const [selectedRow, setSelectedRow] = useState(null);

        const [columns, setColumns] = useState([
            { title: "uuid", field: "UUID", hidden: true },
            { title: "Descripción", field: "DESCRIPCION" },
            { title: "Alias", field: "ALIAS" },

            {
                title: "Activo",
                field: "ACTIVO",
                initialEditValue: true,
                type: "boolean",
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
                            addTooltip: "Añadir",
                            deleteTooltip: "Eliminar",
                            editTooltip: "Editar",
                            filterRow: {
                                filterTooltip: "Filtrar",
                            },
                            editRow: {
                                deleteText: "¿Segura(o) que quiere eliminar?",
                                cancelTooltip: "Cancelar",
                                saveTooltip: "Guardar",
                            },
                        },
                        grouping: {
                            placeholder:
                                "Arrastre un encabezado aquí para agrupar",
                            groupedBy: "Agrupado por",
                        },
                        header: {
                            actions: "Acciones",
                        },
                        pagination: {
                            firstAriaLabel: "Primera página",
                            firstTooltip: "Primera página",
                            labelDisplayedRows: "{from}-{to} de {count}",
                            labelRowsPerPage: "Filas por página:",
                            labelRowsSelect: "filas",
                            lastAriaLabel: "Ultima página",
                            lastTooltip: "Ultima página",
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
                    icons={tableIcons}
                    title="Ubicaciones quirúrgicas"
                    columns={columns}
                    data={recursos}
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
                                    "/api/recursos";
                                let postData = {};
                                postData["facility"] = props.facility;
                                postData["DESCRIPCION"] = newData.DESCRIPCION;
                                postData["ALIAS"] = newData.ALIAS;
                                postData["ACTIVO"] = newData.ACTIVO ? "1" : "0";

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

                                setRecursos([...recursos, newData]);

                                resolve();
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...recursos];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setRecursos([...dataUpdate]);

                                    resolve();
                                }, 1000);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...recursos];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setRecursos([...dataDelete]);

                                    resolve();
                                }, 1000);
                            }),
                    }}
                    onRowClick={(evt, selectedRow) =>
                        setSelectedRow(selectedRow.tableData.id)
                    }
                    options={{
                        headerStyle: {
                            backgroundColor: "#075218",
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
    return <GridRecursos />;
}
