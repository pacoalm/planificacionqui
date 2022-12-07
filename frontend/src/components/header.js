import React, { useState, useContext, useEffect } from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AppContext } from "../context/appcontext";

import "./header.css";

export default function PrimarySearchAppBar(props) {
	const [nombreCentro, setNombreCentro] = useState("");

	const { dispatch, usuarioPQ, centros } = useContext(AppContext);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const menuId = "primary-search-account-menu";

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleProfileMenuClose = (event) => {
		setAnchorEl(null);
	};

	const handleProfileCloseSession = (event) => {
		setAnchorEl(null);
		props.handleLoginOk(false);
	};

	useEffect(() => {
		const centro = centros.find((item) => item.codigo === usuarioPQ.codCentro);
		setNombreCentro(centro.descripcion);
	}, []);

	const renderMenuProfile = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleProfileMenuClose}
		>
			<MenuItem
				sx={{ fontFamily: "Open Sans", fontSize: 14 }}
				onClick={handleProfileMenuClose}
			>
				Mi cuenta
			</MenuItem>
			<MenuItem
				sx={{ fontFamily: "Open Sans", fontSize: 14 }}
				onClick={handleProfileCloseSession}
			>
				Cerrar sesión
			</MenuItem>
		</Menu>
	);

	return (
		<React.Fragment>
			<AppBar component="nav" sx={{ bgcolor: "navy", margin: 0 }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							display: { xs: "none", sm: "block" },
							fontFamily: "Open Sans",
							fontSize: 22,
						}}
					>
						{"Planificación Quirúrgica " + nombreCentro}
					</Typography>
					<Box m={2} pt={3} />

					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge badgeContent={17} color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							aria-label="cuenta usuario actual"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-haspopup="true"
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMenuProfile}
		</React.Fragment>
	);
}
