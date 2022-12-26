import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDrop } from "react-dnd";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const turnos = ["Mañana", "Tarde"];

const StyledTableFixed = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        align: "center",
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
        height: 40,
        width: 100,
        padding: 0,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
}));

export default function CalendarioPl(props) {
    const [ubicaciones, setUbicaciones] = React.useState([]);

    const handleCellDrop = (item) => {
        alert(item.id);
    };

    React.useEffect(() => {
        const fetchUbicaciones = async () => {
            await fetch(
                "http://" +
                    process.env.REACT_APP_API_SERVER +
                    ":" +
                    process.env.REACT_APP_API_PORT +
                    "/api/ubicaciones/" +
                    props.data.FACILITY
            )
                .then((response) => response.json())
                .then((data) => {
                    setUbicaciones(
                        data.filter((ub) => {
                            if (ub.ACTIVA === 1 && ub.SERVICIO === null) {
                                return ub;
                            }
                        })
                    );
                    console.log(ubicaciones);
                });
        };

        fetchUbicaciones();
    }, []);

    function CeldaTurno(propsC) {
        const [{ isOver }, dropRef] = useDrop({
            accept: "Servicio",
            drop: (item) => {
                handleCellDrop(item);
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        });

        // alert(propsC.semana);
        return (
            <StyledTableCell
                onClick={(e) =>
                    handleCellClick(e, propsC.sub, propsC.dia, propsC.turno)
                }
            >
                <div className="celdaTurno" ref={dropRef}></div>
            </StyledTableCell>
        );
    }

    const handleCellClick = (e, ub, d, t) => {
        alert(ub + d + t);
    };

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 700 }}
                aria-label="spanning table"
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" rowSpan={2}>
                            Sem.
                        </StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>
                            Ubq.
                        </StyledTableCell>
                        {diasSemana.map((d) => (
                            <StyledTableCell
                                key={d}
                                align="center"
                                width={"18%"}
                                colSpan={2}
                            >
                                {d}
                            </StyledTableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        {diasSemana.map((d) =>
                            turnos.map((t, index) => (
                                <StyledTableCell key={index} align="center">
                                    {t}
                                </StyledTableCell>
                            ))
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableFixed
                        align="center"
                        rowSpan={ubicaciones.length + 1}
                    >
                        S1
                    </StyledTableFixed>
                    {ubicaciones.map((ub) => (
                        <StyledTableRow>
                            <StyledTableFixed align="center">
                                {ub.ALIAS}
                            </StyledTableFixed>

                            {diasSemana.map((d, indexd) =>
                                turnos.map((t, index) => (
                                    <CeldaTurno
                                        index={index}
                                        semana={1}
                                        ub={ub.ALIAS}
                                        dia={d}
                                        turno={t}
                                    />
                                ))
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
