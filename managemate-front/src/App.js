import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import {Route, Routes} from "react-router-dom";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" Component={Landing} />
				<Route path="/login" Component={Login} />
			</Routes>
		</div>
	);
}

export default App;
