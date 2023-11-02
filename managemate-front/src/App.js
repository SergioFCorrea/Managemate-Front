import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import StoresManager from "./Components/Stores Manager/StoresManager";
import Statistics from "./Components/Admin Dashboard/Statistics";
import Home from "./Components/Admin Dashboard/Home";
import Clients from "./Components/Admin Dashboard/Clients";
import Orders from "./Components/Admin Dashboard/Orders";
import ClientCreation from "./Components/Admin Dashboard/ClientCreation";
import Inventory from "./Components/Admin Dashboard/Inventory";
import OrderCreation from "./Components/Admin Dashboard/OrderCreation";
import StoreConfigurator from "./Components/Admin Dashboard/StoreConfigurator";
import AccountSettings from "./Components/Admin Dashboard/AccountSettings";
import BoughtTwice from "./Components/Admin Dashboard/BoughtTwice";
import CathegoryDetail from "./Components/Admin Dashboard/CathegoryDetail";
import {Route, Routes} from "react-router-dom";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" Component={Landing} />
				<Route path="/login" Component={Login} />
				<Route path="/register" Component={Register} />
				<Route path="/manager" Component={StoresManager} />
				<Route path="/dashboard/home" Component={Home} />
				<Route path="/dashboard/statistics" Component={Statistics} />
				<Route path="/dashboard/clients" Component={Clients} />
				<Route path="/dashboard/orders" Component={Orders} />
				<Route path="/dashboard/inventory" Component={Inventory} />
				<Route path="/dashboard/client-creation" Component={ClientCreation} />
				<Route path="/dashboard/order-creation" Component={OrderCreation} />
				<Route path="/manager/store-configurator" Component={StoreConfigurator} />
				<Route path="/manager/account" Component={AccountSettings} />
				<Route path="/dashboard/inventory/cathegory" Component={CathegoryDetail} />
				<Route path="/dashboard/clients/bought-twice" Component={BoughtTwice} />
			</Routes>
		</div>
	);
}

export default App;
