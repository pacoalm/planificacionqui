import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ReactLoading from "react-loading";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import "./css/serviciosqui.css";

function Serviciosqui(props) {
    const [servicios, setServicios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actualiza, setActualiza] = useState(false);

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
    }, [actualiza]);

    const handleSwitchChange = (event, xkey, state) => {
        var url =
            "http://" +
            process.env.REACT_APP_API_SERVER +
            ":" +
            process.env.REACT_APP_API_PORT +
            "/api/servicios";

        const postData = { facility: props.facility, servicio: xkey };

        if (!state) {
            const fetchData = async () => {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });
                setActualiza(!actualiza);
                const data = await response.json();
                console.log(data);
            };

            fetchData();
        }
    };

    if (isLoading) {
        return (
            <div className="containerLoading">
                <div className="centerLoading">
                    <ReactLoading type="spinningBubbles" color="navy" />
                </div>
            </div>
        );
    } else {
        return (
            <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                <Typography fontFamily="Open Sans" fontSize={18} color="navy">
                    Servicios Quirúrgicos del hospital
                </Typography>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={1}>
                        {servicios.map((ser) => (
                            <Item
                                key={ser.XKEY}
                                elevation={6}
                                sx={{ backgroundColor: ser.QUI && "#5CDF63" }}
                            >
                                <div className="tituloContainer">
                                    <Typography
                                        color="navy"
                                        fontFamily="Open Sans"
                                        fontSize={16}
                                    >
                                        {ser.XKEY.substring(3)}
                                    </Typography>
                                    <div className="switchStyle">
                                        <Switch
                                            key={ser.XKEY}
                                            checked={ser.QUI ? true : false}
                                            onChange={(e) =>
                                                handleSwitchChange(
                                                    e,
                                                    ser.XKEY,
                                                    ser.QUI ? true : false
                                                )
                                            }
                                        />
                                    </div>
                                </div>

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
