import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/planificacion.css";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Programacion = (props) => {
    const [valueIni, setValueIni] = React.useState(null);
    const [valueFin, setValueFin] = React.useState(null);
    const [anularPrevia, setAnularPrevia] = React.useState(false);

    const handleClose = () => {
        props.handleClose();
    };

    const handleChangeSwitch = (e) => {
        setAnularPrevia(!anularPrevia);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Dialog open={true} fullWidth={true} maxWidth="sm">
                <DialogTitle className="text" sx={{ m: 0, p: 2 }}>
                    Planificar rango de fechas
                </DialogTitle>

                <DialogContent dividers sx={{ minHeight: 400 }}>
                    <Stack spacing={3}>
                        <DatePicker
                            className="datePicker"
                            label="Seleccione fecha inicial:"
                            value={valueIni}
                            fullWidth
                            onChange={(newValue) => {
                                setValueIni(newValue);
                                setValueFin(newValue);
                            }}
                            disablePast={true}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <DatePicker
                            className="datePicker"
                            label="Seleccione fecha final:"
                            value={valueFin}
                            fullWidth
                            onChange={(newValue) => {
                                setValueFin(newValue);
                            }}
                            disablePast={true}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <FormControlLabel
                            control={<Switch checked={anularPrevia} />}
                            label="Anular programación existente"
                            onChange={(e) => handleChangeSwitch(e)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
};

export default Programacion;
