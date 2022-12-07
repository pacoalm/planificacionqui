import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appcontext";

const LoadData = () => {
	const { dispatch } = useContext(AppContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return <div>Cargando datos...</div>;
	} else {
		return <></>;
	}
};

export default LoadData;
