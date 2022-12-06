import { createContext, useReducer } from "react";

const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGIN_OK":
            return {
                ...state,
                loginOk: action.payload,
            };
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
    loginOk: false,
    usurarioPQ: {
        loginUser: "",
        nombre: "",
        codCentro: "",
        email: "",
        rol: "",
    },
    centros: [],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                loginOk: state.loginOk,
                usuarioPQ: state.usuarioPQ,
                centros: state.centros,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
