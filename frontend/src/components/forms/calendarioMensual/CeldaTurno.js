import React from "react";
import "./css/calendarioMensual.css";

function CeldaTurno(props) {
    return <div className="celdaContainer">{props.dia}</div>;
}

export default CeldaTurno;
