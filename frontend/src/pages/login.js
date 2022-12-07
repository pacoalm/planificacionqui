import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "../img/4433982.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "../context/appcontext";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://sjd.es/tenerife/">
				Hospital San Juan de Dios Tenerife
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function Login(props) {
	const [errorVisible, setErrorVisible] = useState(false);
	const [mensajeError, setMensajeError] = useState("");
	const [isValidating, setIsValidating] = useState(false);
	const { dispatch, roles } = useContext(AppContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setIsValidating(true);
		setErrorVisible(false);
		var tieneGrupoPQ = false;

		const data = new FormData(event.currentTarget);

		const postData = {
			username: data.get("usuario"),
			password: data.get("password"),
		};

		function http(url) {
			return fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(postData),
			})
				.then((response) => response.json())
				.then((data) => data);
		}

		const url =
			"http://" +
			process.env.REACT_APP_AUTH_SERVER +
			":" +
			process.env.REACT_APP_AUTH_PORT +
			"/validate";

		http(url).then((mensaje) => {
			if (!mensaje.error) {
				//Comprobar a cuantos centros pertenece y a que roles
				tieneGrupoPQ = false;
				var contador = 0;
				var nombreGrupo = "";
				mensaje.grupos.map((grupo) => {
					if (grupo.cn.toUpperCase().includes("BETICA ACCESO-APPPQ")) {
						contador = contador + 1;
						tieneGrupoPQ = true;
						nombreGrupo = grupo.cn.toUpperCase();
					}
				});

				if (!tieneGrupoPQ) {
					setMensajeError("No tiene permisos de acceso a la aplicación.");
					setErrorVisible(true);
				} else {
					if (contador > 1) {
						setMensajeError("El usuario tiene mas de un centro asignado.");
					} else {
						var user = {
							loginUser: mensaje.usuario.saMAccountname,
							nombre: mensaje.usuario.displayName,
							email: mensaje.usuario.userPrincipalName,
							codCentro: nombreGrupo.substring(21, 23),
							rol: nombreGrupo.substring(24),
						};

						if (!roles.includes(user.rol.toUpperCase())) {
							setMensajeError("Rol de usuario inválido.");
							setErrorVisible(true);
						} else {
							//Login OK

							dispatch({ type: "SET_USUARIOPQ", payload: user });
							props.handleLoginOk(true);
						}
					}
				}
			} else {
				setMensajeError("Usuario/Password no válidos");
				setErrorVisible(true);
			}
		});

		setIsValidating(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ height: "100vh" }}>
				<CssBaseline />
				<Grid
					container
					alignItems="flex-end"
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url(${Image})`,
						backgroundRepeat: "no-repeat",
						backgroundColor: "#1565C0",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<Grid color={"white"} textAlign={"center"} width="100%">
						<p className="font-face-nm">
							PLANIFICACIÓN QUIRÚRGICA HOSPITALES SAN JUAN DE DIOS
						</p>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
							<UserIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={(e) => handleSubmit(e)}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="usuario"
								label="Identificador (Usuario portal empleado)"
								name="usuario"
								autoComplete="usuario"
								autoFocus
								onChange={(e) => setErrorVisible(false)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) => setErrorVisible(false)}
							/>

							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Recuerdame"
							/>
							<Button
								disabled={isValidating}
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								{isValidating && (
									<CircularProgress
										size={20}
										sx={{
											color: "white",
										}}
									/>
								)}
								Entrar
							</Button>

							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Olvidaste la password?
									</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
					{errorVisible && (
						<Grid xs={12} width="100%" textAlign="center">
							<FormLabel
								sx={{
									color: "red",
									fontSize: 16,
								}}
							>
								{mensajeError}
							</FormLabel>
						</Grid>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
