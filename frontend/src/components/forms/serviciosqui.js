import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

function Serviciosqui(props) {
    const [servicios, setServicios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 60,
        width: "19%",
        lineHeight: "60px",
        marginLeft: 12,
        marginTop: 12,
    }));
    const lightTheme = createTheme({ palette: { mode: "light" } });

    useEffect(() => {
        const fetchServicios = async () => {
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
                    setServicios(data);
                    setIsLoading(false);
                });
        };
        fetchServicios();
    }, []);

    if (isLoading) {
        return <div>Cargando servicios...</div>;
    } else {
        return (
            <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                <Typography fontFamily="Open Sans" fontSize={18} color="navy">
                    Servicios Quirúrgicos del hospital
                </Typography>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={1}>
                        {servicios.map((ser) => (
                            <Item key={ser.XKEY} elevation={6}>
                                <Typography
                                    color="navy"
                                    fontFamily="Open Sans"
                                    fontSize={16}
                                >
                                    {ser.XKEY.substring(3)}
                                </Typography>
                                <Typography
                                    fontFamily="Open Sans"
                                    fontSize={12}
                                >
                                    {ser.DESCRIPTION}
                                </Typography>
                            </Item>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Serviciosqui;
