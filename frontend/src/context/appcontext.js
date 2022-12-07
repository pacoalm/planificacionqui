import { createContext, useReducer } from "react";

const centros = [
	{
		codigo: "07",
		descripcion: "Hospital San Juan de Dios Tenerife",
		quirofanos: 5,
		ambulatorio: true,
		urpa: true,
		preanestesia: true,
		facility: 1900,
	},
];

const AppReducer = (state, action) => {
	switch (action.type) {
		case "SET_USUARIOPQ":
			return {
				...state,
				usuarioPQ: action.payload,
			};
		case "SET_CENTROS":
			return {
				...state,
				centros: action.payload,
			};
		default:
			return state;
	}
};

const initialState = {
	usurarioPQ: {
		loginUser: "",
		nombre: "",
		codCentro: "",
		email: "",
		rol: "",
	},
	centros: centros,
	roles: ["ADMIN", "JEFE SERVICIO", "MEDICO", "ADMISION"],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				usuarioPQ: state.usuarioPQ,
				centros: state.centros,
				roles: state.roles,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
