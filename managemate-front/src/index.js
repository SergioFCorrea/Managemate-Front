import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {NextUIProvider} from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<NextUIProvider>
		<Router>
			<App />
		</Router>
	</NextUIProvider>
);

reportWebVitals();
