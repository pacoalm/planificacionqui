import React, { useState } from "react";
import "./App.css";

import Login from "./pages/login";
import LoadData from "./data/loaddata";
import { AppProvider } from "./context/appcontext";
import PrimarySearchAppBar from "./components/header";

function App() {
	const [loginOk, setLoginOk] = useState(false);

	const handleLoginOk = (state) => {
		setLoginOk(state);
	};

	return (
		<AppProvider>
			{!loginOk && <Login handleLoginOk={handleLoginOk} />}
			{loginOk && (
				<div className="App">
					<LoadData />
					<PrimarySearchAppBar handleLoginOk={handleLoginOk} />
					<div>ESTO ES UNA PRUEBA</div>
				</div>
			)}
		</AppProvider>
	);
}

export default App;
