import "./styles.css";
import {useState, useMemo, useEffect} from "react";
import {
	Table,
	Modal,
	ModalBody,
	ModalHeader,
	useDisclosure,
	ModalContent,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Pagination,
	Navbar,
	Button,
	NavbarContent,
	NavbarMenuToggle,
	NavbarMenu,
	DropdownItem,
	Input,
	Avatar,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	NavbarItem,
	Badge,
	Spinner,
	getKeyValue,
} from "@nextui-org/react";
import OrderDetail from "./OrderDetail";
import {Link, useParams, useNavigate} from "react-router-dom";
import { logOut } from "./logOut";
import axios from "axios";

const Orders = () => {

	const navigate = useNavigate()
	// --------------
	const {id} = useParams();
	const userImage = localStorage.getItem("userImage");
	const userId = localStorage.getItem("userId");
	const [loading, setLoading] = useState(true);
	// -----------------------------

	// STORE INFO STATES

	const [storeInfo, setStoreInfo] = useState([]);
	const [activeOrders, setActiveOrders] = useState([]);
	const [orderId, setOrderId] = useState(null);
	const [orderNumber, setOrderNumber] = useState(null);
	const [searchData, setSearchData] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [searchResultError, setSearchResultError] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState("");
	const [orderFrequency, setOrderFrequency] = useState(null);
	const [productQuantity, setProductQuantity] = useState(null);

	// ---------------------------------

	// MODALS

	const {
		isOpen: isOpenModal1,
		onOpen: onOpenModal1,
		onOpenChange: onOpenChangeModal1,
	} = useDisclosure();
	const {
		isOpen: isOpenModal2,
		onOpen: onOpenModal2,
		onOpenChange: onOpenChangeModal2,
	} = useDisclosure();
	// ----------------

	// ERROR STATES

	const [activeError, setActiveError] = useState(false);
	// --------------------------

	// SEARCH ORDER
	const handleChange = (event) => {
		const value = event.target.value;
		setSearchData(value);
	};

	const handleSearch = () => {
		const result = activeOrders?.filter((order) => order._id === searchData);
		if (result.length > 0) {
			setSearchResult(result);
			setSearchResultError(false);
		} else {
			setSearchResult(false);
			setSearchResultError(true);
			setTimeout(() => {
				setSearchResultError(false);
			}, 3000);
		}
	};

	const enterSearch = (event) => {
		if (searchData.length === 0) return;
		if (event.key === "Enter") handleSearch();
	};

	const resetSearch = () => {
		setSearchResult([]);
		setSearchData("");
	};
	// ----------------------------------------

	// STORE INFO

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

	// ---------------------------------------

	// ACTIVE ORDERS
	const getActiveOrders = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/order/active/${id}`
			);
			const orders = response.data;
			const ordersWithKey = orders.map((order, index) => ({
				...order,
				key: index + 1,
			}));

			setActiveOrders(ordersWithKey);
			setActiveError(false);
		} catch (error) {
			setActiveError(true);
		}
	};

	// ----------------------------

	// ORDERS TABLE
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const pages = Math.ceil(activeOrders?.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return activeOrders?.slice(start, end);
	}, [page, activeOrders]);
	// ------------------------------------

	// ORDER FREQUENCY

	const getOrderFrequency = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/order/frequency/${id}`
			);
			const result = response.data <= 0 ? response.data : 1;

			setOrderFrequency(result);
		} catch (error) {}
	};

	// ---------------------------------

	// PRODUCTS PER ORDER

	const getProductsPerOrder = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/order/product-quantity/${id}`
			);
			const result = Math.round(response.data);

			setProductQuantity(result);
		} catch (error) {}
	};

	// --------------------------

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser")

		if(!loggedUser){
			navigate("/login")
		}
		
		const fetchData = async () => {
			try {
				await getStoreInfo();
				await getActiveOrders();
				await getOrderFrequency();
				await getProductsPerOrder();
				setLoading(false);
			} catch (error) {}
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
						<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529] ">
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
						<NavbarItem
							className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]"
							isActive="true">
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
			<div className="flex flex-col items-center gap-8 mb-8">
				<h1 className="fonts-[Poppins] font-semibold text-4xl text-center text-white mt-10 xl:mt-14">
					Orders
				</h1>
				<p className="font-[Questrial] text-sm text-white w-[30ch] md:w-[90ch] lg:w-[120ch] xl:w-[130ch] text-center">
					Manage and create new orders to track, get detailed information about
					orders and find specific orders in the order finder.
				</p>

				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center md:flex-row mt-8 xl:mt-12">
					<Link to={`/dashboard/order-creation/${id}`}>
						<Button
							radius="sm"
							className="bg-[#3d1d93] font-[Satoshi-Medium] text-medium text-white w-34">
							New order
							<svg
								className="fill-white"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
							</svg>
						</Button>
					</Link>
					<div className="w-full md:w-1/2 ">
						<Input
							isDisabled={activeOrders.length === 0 ? true : false}
							value={searchData}
							endContent={
								<Button
									variant="bordered"
									className="bg-none border-none"
									isDisabled={searchData.length === 0 && true}
									onClick={handleSearch}>
									<svg
										className="fill-[#EBD5C4]"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24">
										<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
									</svg>
								</Button>
							}
							onChange={handleChange}
							onKeyDown={enterSearch}
							variant="bordered"
							placeholder="Search Orders"
							radius="full"
							classNames={{
								input: [
									"data-hover:bg-red-500",
									"bg-[#1C1E21]",
									"text-white dark:text-white/90",
									"font-[Satoshi-Medium]",
									"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
								],
								inputWrapper: [
									"data-[hover=true]:border-[#EBD5C4]",
									"border-none",
									"inner-shadow-input",
									"font-[Satoshi-Medium]",
									"bg-[#1C1E21]",
									"!cursor-text",
									"h-11",
									"w-auto",
									"rounded-[10px]",
								],
							}}
						/>
						{searchResult.length > 0 && (
							<Badge
								onClick={resetSearch}
								disableOutline
								content={
									<svg
										className="fill-black w-5 h-5"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24">
										<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
									</svg>
								}
								className="bg-[#C8D9FF]  w-5 h-5"
								classNames={{base: "w-full mt-4"}}>
								{searchResult?.map((result) => {
									return (
										<div
											key={result._id}
											onClick={() => {
												setSelectedOrderId(result._id);
												onOpenModal1();
											}}
											className="overflow-hidden mb-[-10px] h-11 w-full rounded-[10px] flex flex-row justify-star items-center gap-3 bg-[#1c1e21] inner-shadow-input">
											<img
												className="w-11 h-11 object-cover"
												src={result.client?.image}
												alt=""
											/>
											<span className="text-white font-[Satoshi-Medium] text-left text-sm">
												{result.client.igUsername ||
													result.client.name + " " + result.client.lastName}
											</span>
										</div>
									);
								})}
								<Modal
									aria-label="detail"
									radius="lg"
									isOpen={isOpenModal1}
									onOpenChange={onOpenChangeModal1}
									scrollBehavior="outside"
									size="xl">
									<ModalContent>
										<ModalHeader className="bg-[#3d1d93] rounded-t-xl text-center flex justify-center items-center text-white">
											Nº {selectedOrderId}
										</ModalHeader>
										<ModalBody className="rounded-b-xl bg-gradient-to-br from-[#9477E4] to-[#3d1d93]">
											<OrderDetail orderId={selectedOrderId} />
										</ModalBody>
									</ModalContent>
								</Modal>
							</Badge>
						)}
						{searchResultError && (
							<div className="overflow-hidden mb-[-10px] mt-4 px-3 h-11 w-full rounded-[10px] flex flex-row justify-star items-center gap-3 bg-[#1c1e21] inner-shadow-input">
								<span className="text-white font-[Satoshi-Medium] text-left text-sm">
									No results
								</span>
							</div>
						)}
					</div>
				</div>
				{loading ? (
					<Spinner color="success" />
				) : (
					<div className="w-[250px] h-auto md:w-[680px] lg:w-[1000px] flex flex-col justify-center items-center  gap-8 mt-20 md:mt-0 lg:mt-8 ">
						<div className=" w-[280px] md:w-full flex flex-col justify-center items-center gap-6 ">
							<p className="font-[Poppins] font-medium text-xl text-white">
								Active Orders
							</p>
							<Table
								aria-label="Active orders"
								bottomContent={
									<div className="flex w-full justify-center items-center">
										{activeOrders?.length > 5 && (
											<Pagination
												classNames={{
													cursor:
														"bg-[#3d1d93] text-white rounded-full w-6 h-6 md:w-10 md:h-10",
													base: "w-60 h-15 md:w-full md:h-full  m-0  md:mt-0 md:w-auto flex justify-center",
												}}
												isCompact
												showControls
												showShadow
												color="secondary"
												page={page}
												total={pages}
												onChange={(page) => setPage(page)}
											/>
										)}
									</div>
								}
								classNames={{
									tbody: "w-[50px] ",
									th: "bg-[#232529] text-[#ebd5c4] text-[8.3px] md:text-[12px] xl:text-[15px] ",
									tr: " hover:text-[#3d1d93] w-[50px]",
									wrapper:
										"inner-shadow-active-orders min-h-[222px] w-[300px] ml-[-9px] md:ml-0  md:h-[305px] md:w-full  bg-[#EBD5C4] text-[#232529] font-[Poppins]  md:p-3 flex flex-col justify-between items-center overflow-hidden",
									td: "text-[8px] md:text-[12px] xl:text-[13px] font-medium",
								}}>
								<TableHeader>
									<TableColumn key="_id">Number</TableColumn>
									<TableColumn key="paymentStatus">Payment</TableColumn>
									<TableColumn key="shippingStatus">Shipment</TableColumn>
									<TableColumn key="value">Value</TableColumn>
								</TableHeader>
								<TableBody items={items}>
									{(item) => (
										<TableRow
											onClick={() => {
												setOrderNumber(item._id);
												setOrderId(item._id);
												onOpenModal2();
											}}
											key={item.name}>
											{(columnKey) => (
												<TableCell>{getKeyValue(item, columnKey)}</TableCell>
											)}
										</TableRow>
									)}
								</TableBody>
							</Table>
							{activeOrders?.length > 0 && (
								<Modal
									onClose={() => getActiveOrders()}
									aria-label="detail"
									radius="lg"
									isOpen={isOpenModal2}
									onOpenChange={onOpenChangeModal2}
									scrollBehavior="outside"
									size="xl">
									<ModalContent>
										<ModalHeader className="bg-[#3d1d93] rounded-t-xl text-center flex justify-center items-center text-white">
											Nº {orderNumber}
										</ModalHeader>
										<ModalBody className="rounded-b-xl bg-gradient-to-br from-[#9477E4] to-[#3d1d93]">
											<OrderDetail orderId={orderId} />
										</ModalBody>
									</ModalContent>
								</Modal>
							)}
						</div>
						<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-14">
							<div className="bg-gradient-to-br flex flex-col justify-center items-center from-[#383C42] to-[#232529] rounded-[20px] w-full h-[180px] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] gap-8 ">
								<p className="font-[Poppins] text-white text-sm text-center">
									Average order frequency
								</p>
								<p className={`font-[Poppins] font-semibold text-[#ebd5c4] ${orderFrequency === null ? "text-2xl h-1/2 flex justify-center items-center" : "text-6xl"}`}>
									{orderFrequency === null ? "No orders" : orderFrequency + " days" }
								</p>
							</div>
							<div className="bg-gradient-to-br flex flex-col justify-center items-center from-[#383C42] to-[#232529] rounded-[20px] w-full h-[180px] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] gap-5">
								<p className="font-[Poppins] text-white text-sm text-center w-[25ch]">
									Average number of products per order
								</p>
								<p className="font-[Poppins] font-semibold text-[#ebd5c4] text-7xl">
									{productQuantity || 0}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Orders;
