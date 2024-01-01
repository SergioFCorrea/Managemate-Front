import {useMemo, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./styles.css";
import {
	Navbar,
	Button,
	NavbarContent,
	NavbarMenuToggle,
	Progress,
	NavbarMenu,
	DropdownItem,
	Avatar,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	NavbarItem,
	Spinner,
} from "@nextui-org/react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {logOut} from "./logOut";

const Statistics = () => {
	const navigate = useNavigate();

	// --------------------
	const [selectedKeys, setSelectedKeys] = useState(new Set(["Select month"]));

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);

	// PARAMS ID
	const {id} = useParams();
	// ------------------------------
	const userId = localStorage.getItem("userId");
	const [loading, setLoading] = useState(true);
	const userImage = localStorage.getItem("userImage");

	// STORE INFO STATES

	const [storeInfo, setStoreInfo] = useState([]);
	const [sales4Months, setSales4Months] = useState([]);
	const [totalProfit, setTotalProfit] = useState(0);
	const [profit4Months, setProfit4Months] = useState([]);
	const [customerMostPurch, setCustomerMostPurch] = useState([]);
	const [newCustomers, setNewCustomers] = useState([]);
	const [customersBougthTwice, setCustomersBoughtTwice] = useState([]);
	const [customerOrigin, setCustomerOrigin] = useState([]);
	// ----------------------------
	// ERROR STATES
	const [salesError, setSalesError] = useState(false);
	const [totalProfitError, setTotalProfitError] = useState(false);
	const [profitMonthError, setProfitMonthError] = useState(false);
	const [mostPurchError, setMostPurchError] = useState(false);
	const [newCustomerError, setNewCustomerError] = useState(false);
	const [customerBought2Error, setCustomerBought2Error] = useState(false);
	const [originError, setOriginError] = useState(false);

	// GET STORE INFO

	const getStoreInfo = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/store/${id}`
			);
			const result = response.data;
			setStoreInfo(result);
		} catch (error) {
			console.log(error.response.data.error);
		}
	};
	// ---------------------------

	// SALES LAST FOUR MONTHS
	const getSales4Months = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/order/last-four-months/${id}`
			);
			const result = [response.data];

			setSales4Months(result);
		} catch (error) {
			setSalesError(true);
		}
	};

	// ----------------

	// TOTAL PROFIT

	const getTotalProfit = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/order/total-profit/${id}`
			);
			const result = response.data;

			setTotalProfit(result);
		} catch (error) {
			setTotalProfitError(true);
		}
	};

	// --------------------------

	// PROFIT IN THE LAST FOUR MONTHS

	const getProfit4Months = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/order/profit-last-four-months/${id}`
			);
			const result = response.data;

			setProfit4Months(result);
		} catch (error) {
			setProfitMonthError(true);
		}
	};

	// ------------------------------

	// CUSTOMER WITH MOST PURCHASES BY MONTH

	const getCustomerMostPurch = async (param) => {
		try {
			const month = param || "current";
			const response = await axios.get(
				`https://managemate.onrender.com/client/most-by-month/${id}/${month}`
			);
			const result = response.data;
			
			setCustomerMostPurch(result);
		} catch (error) {
			setMostPurchError(true);
		}
	};

	// -----------------------------

	// NEW CUSTOMERS BY MONTH

	const getNewCustomers = async (param) => {
		try {
			const month = "current" || param;
			const response = await axios.get(
				`https://managemate.onrender.com/client/new-by-month/${id}/${month}`
			);
			const result = response.data.length;

			setNewCustomers(result);
		} catch (error) {
			setNewCustomerError(true);
		}
	};
	// -------------------------------

	// CUSTOMERS THAT BOUGHT TWICE OR MORE PER MONTH

	const getCustomersBoughtTwice = async (param) => {
		try {
			const month = param || "current";
			const respone = await axios.get(
				`https://managemate.onrender.com/client/bought-twice-month/${id}/${month}`
			);
			const result = respone.data;


			setCustomersBoughtTwice(result);
		} catch (error) {
			setCustomerBought2Error(true);
		}
	};

	// -----------------

	const [loadinMonth, setLoadingMonth] = useState(null)

	// SELECT INFO PER MONTH

	const setInfoPerMonth = async (month) => {
		try {
			const newPerMonth = await axios.get(`https://managemate.onrender.com/client/new-by-month/${id}/${month}`)
			const newResult = newPerMonth.data.length

			setNewCustomers(newResult)
			// -----------------------
			await getCustomersBoughtTwice(month);

			// -------------------
			await getCustomerMostPurch(month);

			setLoadingMonth(null)
		} catch (error) {}
	};
	// ----------------------------------

	// CUSTOMER ORIGIN

	const getCustomerOrigin = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/client/origin-percentage/${id}`
			);
			const result = response.data;

			setCustomerOrigin(result);
		} catch (error) {
			setOriginError(true);
		}
	};

	// ------------------------------

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");

		if (!loggedUser) {
			navigate("/login");
		}

		const fetchData = async () => {
			try {
				await getStoreInfo();
				await getSales4Months();
				await getTotalProfit();
				await getProfit4Months();
				await getCustomerMostPurch();
				await getNewCustomers();
				await getCustomersBoughtTwice();
				await getCustomerOrigin();
				setLoading(false);
			} catch (error) {
				console.log("Error fetching api data");
			}
		};

		fetchData();
	}, [id]);

	return (
		<div>
			<Navbar
				maxWidth="xl"
				className="md:bg-[#EBD5C4] justify-center flex "
				classNames={{
					item: [
						"data-[active=true]:text-[#ebd5c4]",
						"data-[active=true]:bg-[#232529]",
						"data-[active=true]:fill-[#ebd5c4]",
						"data-[active=true]:w-20",
					],
				}}>
				<NavbarContent className="hidden md:flex">
					<p className="font-[Satoshi-Bold] text-[#232529] w-full text-sm lg:text-medium">
						Store: {storeInfo.name}
					</p>
				</NavbarContent>
				<NavbarContent className="md:hidden" justify="start">
					<NavbarMenuToggle className=" text-[#EBD5C4]" />
				</NavbarContent>
				<NavbarContent
					justify="center"
					color="foreground"
					className="flex gap-12">
					<Link to={`/dashboard/home/${id}`} className="text-sm h-full">
						<NavbarItem className="hidden h-full w-16 md:flex md:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]">
							<svg
								className="hidden sm:flex w-8 h-auto"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
							</svg>
							Home
						</NavbarItem>
					</Link>
					<Link to={`/dashboard/statistics/${id}`} className="text-sm h-full">
						<NavbarItem
							className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529] "
							isActive="true">
							<svg
								className="hidden sm:flex w-8 h-auto"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M280-280h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
							</svg>
							Statistics
						</NavbarItem>
					</Link>
					<Link to={`/dashboard/clients/${id}`} className="text-sm h-full">
						<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]">
							<svg
								className="hidden sm:flex w-8 h-auto"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
							</svg>
							Clients
						</NavbarItem>
					</Link>
					<Link to={`/dashboard/orders/${id}`} className="text-sm h-full">
						<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]">
							<svg
								className="hidden sm:flex w-8 h-auto"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
							</svg>
							Orders
						</NavbarItem>
					</Link>
					<Link to={`/dashboard/inventory/${id}`} className="text-sm h-full">
						<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]">
							<svg
								className="hidden sm:flex w-8 h-auto"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z" />
							</svg>
							Inventory
						</NavbarItem>
					</Link>
				</NavbarContent>

				<NavbarMenu>
					<Link
						className="w-full font-[Satoshi-Bold]"
						to={`/dashboard/home/${id}`}>
						Home
					</Link>
					<Link
						className="w-full font-[Satoshi-Bold]"
						to={`/dashboard/statistics/${id}`}>
						Statistics
					</Link>
					<Link
						className="w-full font-[Satoshi-Bold]"
						to={`/dashboard/clients/${id}`}>
						Clients
					</Link>
					<Link
						className="w-full font-[Satoshi-Bold]"
						to={`/dashboard/orders/${id}`}>
						Orders
					</Link>
					<Link
						className="w-full font-[Satoshi-Bold]"
						to={`/dashboard/inventory/${id}`}>
						Inventory
					</Link>
				</NavbarMenu>
				<NavbarContent as="div" justify="end">
					<Dropdown
						placement="bottom-end"
						className="bg-[#3D1D93] text-white shadow-[4px_4px_12px_2px_rgba(0,0,0,0.8)] font-[Satoshi-Medium]">
						<DropdownTrigger>
							<Avatar
								as="button"
								className="transition-transform object-cover"
								color="primary"
								name="Jason Hughes"
								size="md"
								src={userImage}
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="shadow">
							<DropdownItem key="settings">
								<Link to={`/manager/account/${userId}`}>Settings</Link>
							</DropdownItem>
							<DropdownItem key="system">
								<Link to="/manager">Go to store manager</Link>
							</DropdownItem>
							<DropdownItem key="logout" color="danger">
								<button
									onClick={() => {
										logOut();
										navigate("/login");
									}}>
									Log Out
								</button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
			</Navbar>
			<div className="flex flex-col items-center gap-8">
				<h1 className="fonts-[Poppins] font-semibold text-4xl text-center text-white mt-10">
					Statistics
				</h1>
				<p className="font-[Questrial] text-sm text-white w-[30ch] md:w-[90ch] lg:w-auto">
					Check out the general statistics of your store, including sales and
					clients and get detailed information sorted by a specific month.
				</p>
				{loading ? (
					<Spinner color="success" />
				) : (
					<div className="w-[250px] md:w-[680px] lg:w-[1000px] flex flex-col justify-center items-center md:flex-trow gap-8 mt-20 md:mt-0">
						<div className="w-full md:w-full flex justify-between items-center mb-6 md:mb-0">
							<h2 className="font-[Satoshi-Medium] text-[#EBD5C4] text-lg">
								Sales
							</h2>
						</div>
						<div className="w-full flex flex-col justify-center items-center md:flex-row gap-8">
							<div className="w-full h-[450px] md:h-[180px] lg:h-[250px] md:w-[48%] lg:w-1/2 bg-gradient-to-br from-[#3d1d93] to-[#9477E4] rounded-[30px] flex flex-col justify-center items-center md:flex-row gap-8 md:gap-3 lg:gap-8 shadow-[4px_4px_11px_3px_rgba(0,0,0,0.3)]">
								<div className="w-52 h-52 md:w-36 md:h-36 lg:w-52 lg:h-52 rounded-[18px] bg-[#232529] flex flex-col justify-center items-center gap-3 inner-shadow">
									<p className="text-[#C8D9FF] font-[Poppins] font-semibold text-7xl md:text-5xl lg:text-7xl">
										{salesError ? 0 : sales4Months[0]?.currentMonth.length}
									</p>
									<p className="font-[Questrial] text-white text-medium">
										Sales this month
									</p>
								</div>
								<div className="w-auto md:w-36 lg:w-[200px] h-44 lg:h-44 md:h-40 flex flex-col justify-between items-center">
									<p className="font-[Poppins] text-sm text-white md:text-[12px] lg:text-sm text-center">
										Sales in the last 3 months
									</p>
									{salesError ? (
										<span className="h-1/2 font-[Satoshi-Medium] text-white text-medium text-center">
											No completed orders
										</span>
									) : (
										<div className="w-full h-full flex flex-col justify-center items-center text-white font-[Questrial] fill-[#232529] gap-3 text-sm md:text-[12px] lg:text-sm md:gap-2 lg:gap-5">
											<div className="flex justify-between items-center w-full gap-3">
												<p className="text-left">June</p>
												<hr className="w-20  border-[#232529]" />
												<p>{sales4Months[0]?.twoMonths.length}</p>
											</div>
											<div className="flex justify-between items-center w-full gap-3">
												<p className="text-left">May</p>
												<hr className="w-20  border-[#232529]" />
												<p>{sales4Months[0]?.threeMonths.length}</p>
											</div>
											<div className="flex justify-between items-center w-full gap-3">
												<p className="text-left">April</p>
												<hr className="w-20  border-[#232529]" />
												<p>{sales4Months[0]?.fourMonths.length}</p>
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="w-full h-[450px] md:h-[180px] lg:h-[250px] md:w-[48%] lg:w-1/2 bg-gradient-to-br from-[#3d1d93] to-[#9477E4] rounded-[30px] flex flex-col justify-center items-center md:flex-row gap-8 md:gap-3 lg:gap-8 shadow-[4px_4px_11px_3px_rgba(0,0,0,0.3)]">
								<div className="w-52 h-52 md:w-36 md:h-36 lg:w-52 lg:h-52 rounded-[18px] bg-[#232529] flex flex-col justify-center items-center gap-3 inner-shadow">
									<p className="text-[#C8D9FF] font-[Poppins] font-semibold text-5xl md:text-2xl lg:text-5xl">
										{profitMonthError ? 0 : totalProfit}
									</p>
									<p className="font-[Questrial] text-white text-medium">
										Overall profit
									</p>
								</div>
								<div className="w-auto md:w-36 lg:w-[200px] h-44 lg:h-44 md:h-40 flex flex-col justify-between items-center">
									<p className="font-[Poppins] text-sm text-white md:text-[12px] lg:text-sm text-center">
										Profit in the last 4 months
									</p>
									{profitMonthError ? (
										<span className="h-1/2 font-[Satoshi-Medium] text-white text-medium text-center">
											No completed orders
										</span>
									) : (
										<div className="w-full flex flex-col justify-center items-center text-white font-[Questrial] fill-[#232529] gap-3 text-sm md:text-[12px] lg:text-sm md:gap-2 lg:gap-3">
											<div className="flex justify-between items-center w-full gap-3">
												<p className="text-left">June</p>
												<hr className="w-20  border-[#232529]" />
												<p>${profit4Months.currentMonth}</p>
											</div>
											<div className="flex justify-between items-center w-full gap-3">
												<p className="text-left">May</p>
												<hr className="w-20  border-[#232529]" />
												<p>${profit4Months.twoMonths}</p>
											</div>
											<div className="flex justify-between items-center w-full gap-3">
												<p className="text-left">April</p>
												<hr className="w-20  border-[#232529]" />
												<p>${profit4Months.threeMonths}</p>
											</div>
											<div className="flex justify-between items-center w-full gap-3">
												<p className="text-left">March</p>
												<hr className="w-20  border-[#232529]" />
												<p>${profit4Months.fourMonths}</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="w-full md:w-full flex justify-between items-center mt-16 md:mt-0 mb-6 md:mb-0">
							<h2 className="font-[Satoshi-Medium] text-[#EBD5C4] text-lg">
								Customers
							</h2>
							<Dropdown
								aria-label="Button"
								classNames={{
									base: "bg-[#3D1D93] text-white font-[Satoshi-Medium]",
								}}>
								<DropdownTrigger aria-label="Menu">
									<Button
										aria-label="Button"
										radius="sm"
										className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-[135px] text-[13px]">
										{selectedValue}
										<svg
											className="fill-white"
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											viewBox="0 -960 960 960"
											width="24">
											<path d="M480-360 280-560h400L480-360Z" />
										</svg>
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label="Menu"
									selectedKeys={selectedKeys}
									onSelectionChange={setSelectedKeys}
									onChange={setInfoPerMonth}
									selectionMode="single">
									<DropdownItem
										onClick={() => setInfoPerMonth("current")}
										aria-label="Button"
										key="Select month">
										Select month
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("01");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="January">
										January
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("02");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="Febuary">
										February
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("03");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="March">
										March
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("04");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="April">
										April
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("05");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="May">
										May
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("06");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="June">
										June
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("07");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="July">
										July
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("08");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="August">
										August
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("09");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="September">
										September
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("10");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="October">
										October
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("11");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="November">
										November
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setInfoPerMonth("12");
											setLoadingMonth(true);
										}}
										aria-label="Button"
										key="December">
										December
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
							{loadinMonth === true ? (
								<div className="h-[250px] w-full lg:w-[500px] flex justify-center items-center"><Spinner color="success" /></div>	
							) : (
								<>
									<div className="w-full lg:w-[250px] h-[250px] rounded-[25px] bg-[#3D1D93] flex flex-col justify-center items-center shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] gap-4 ">
										<p className="font-[Poppins] font-medium leading-[18px] text-medium text-center text-white">
											Customer with most purchases this month
										</p>
										{mostPurchError || customerMostPurch === null ? (
											<>
												<Avatar className="w-28 h-28 font-[Satoshi-Medium] text-xl text-white bg-gray-700" />
												<span className="h-auto font-[Satoshi-Medium] text-white text-medium text-center">
													No data
												</span>
											</>
										) : (
											<>
												<img
													src={customerMostPurch?.img}
													alt={
														<Avatar className="w-28 h-28 font-[Satoshi-Medium] text-xl text-white bg-gray-700" />
													}
													className="w-36 h-36 object-cover rounded-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
												/>
												<p className="font-[Poppins] text-white text-sm">
													{customerMostPurch?.userName
														? customerMostPurch?.userName
														: customerMostPurch?.name}
												</p>
											</>
										)}
									</div>
									<div className="w-full md:w-[250px] flex flex-col justify-center items-center gap-4">
										<div className="w-full h-[100px] md:h-[117px] rounded-[18px] bg-[#3D1D93] flex flex-col justify-center items-center shadow-[4px_4px_11px_3px_rgba(0,0,0,0.3)]  ">
											<p className="font-[Poppins] font-medium text-4xl text-[#EBD5C4]">
												{newCustomers || 0}
											</p>
											<p className="font-[Poppins] font-light text-white text-[12px] text-center md:w-[20ch]">
												New customers this month
											</p>
										</div>
										<div className="w-full h-[100px] md:h-[117px] rounded-[18px] bg-[#3D1D93] flex flex-col justify-center items-center shadow-[4px_4px_11px_3px_rgba(0,0,0,0.3)]  ">
											<p className="font-[Poppins] font-medium text-4xl text-[#EBD5C4]">
												{customerBought2Error
													? 0
													: Object.keys(customersBougthTwice).length}
											</p>
											<p className="font-[Poppins] font-light text-white text-[12px] md:text-[10px] lg:text-[12px] text-center w-[20ch] lg:w-[30ch]">
												Customers bought twice or more this month
											</p>
										</div>
									</div>
								</>
							)}
							<div className="inner-shadow-2 w-full h-[300px] md:h-[250px] flex flex-col justify-center items-center md:w-[450px] bg-[#232529] rounded-[30px] lg:py-4">
								<p className="font-[Poppins] text-[#C8D9FF] text-sm lg:text-xl">
									Customer origin
								</p>
								<div className="w-full h-[80%] flex lg:flex-col justify-center items-center md:gap-5">
									<div className="w-16 lg:w-auto flex flex-col lg:flex-row-reverse justify-center gap-16 lg:gap-4 items-center h-[200px] lg:h-auto ">
										<p className="text-sm font-[Questrial] text-white">
											{Math.round(customerOrigin?.Whatsapp) || 0}%
										</p>
										<Progress
											ariaLabel="sisa"
											value={customerOrigin?.Whatsapp || 0}
											size="lg"
											radius="sm"
											className="-rotate-90 w-32 lg:rotate-0 lg:w-52"
											classNames={{
												track:
													"bg-zinc-800 shadow-[4px_0_18px_0_rgba(0,0,0,0.6)]",
												indicator:
													"bg-gradient-to-br from-[#3d1d93] to-[#9477E4]",
											}}
										/>
										<svg
											className="h-6 w-6 fill-white"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<title>WhatsApp</title>
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
										</svg>
									</div>
									<div className="w-16 lg:w-auto flex flex-col lg:flex-row-reverse justify-center gap-16 lg:gap-4 items-center h-[200px] lg:h-auto ">
										<p className="text-sm font-[Questrial] text-white">
											{Math.round(customerOrigin?.Facebook) || 0}%
										</p>
										<Progress
											ariaLabel="sisa"
											value={customerOrigin?.Facebook || 0}
											size="lg"
											radius="sm"
											className="-rotate-90 w-32 lg:rotate-0 lg:w-52"
											classNames={{
												track:
													"bg-zinc-800 shadow-[4px_0_18px_0_rgba(0,0,0,0.6)]",
												indicator:
													"bg-gradient-to-br from-[#3d1d93] to-[#9477E4]",
											}}
										/>
										<svg
											className="h-6 w-6 fill-white"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<title>Facebook</title>
											<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
										</svg>
									</div>
									<div className="w-16 lg:w-auto flex flex-col lg:flex-row-reverse justify-center gap-16 lg:gap-4 items-center h-[200px] lg:h-auto ">
										<p className="text-sm font-[Questrial] text-white">
											{Math.round(customerOrigin?.Instagram) || 0}%
										</p>
										<Progress
											ariaLabel="sisa"
											value={customerOrigin?.Instagram || 0}
											size="lg"
											radius="sm"
											className="-rotate-90 w-32 lg:rotate-0 lg:w-52"
											classNames={{
												track:
													"bg-zinc-800 shadow-[4px_0_18px_0_rgba(0,0,0,0.6)]",
												indicator:
													"bg-gradient-to-br from-[#3d1d93] to-[#9477E4]",
											}}
										/>
										<svg
											className="h-6 w-6 fill-white"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<title>Instagram</title>
											<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Statistics;
