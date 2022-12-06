import React, { useContext } from "react";
import "./App.css";
import { AppContext } from "./context/appcontext";
import Login from "./pages/login";
import PrimarySearchAppBar from "./components/header";

function App() {
    const { loginOk } = useContext(AppContext);

    if (!loginOk) {
        return <Login />;
    } else {
        return (
            <div className="App">
                <PrimarySearchAppBar />
            </div>
        );
    }
}

export default App;
