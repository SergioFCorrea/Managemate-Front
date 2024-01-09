import "./styles.css";
import {
	Modal,
	ModalContent,
	useDisclosure,
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
	Spinner,
	Badge,
} from "@nextui-org/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {logOut} from "./logOut";
import ClientDetail from "./ClientDetail";

const Clients = () => {
	const navigate = useNavigate();
	// -----------
	const [loading, setLoading] = useState(true);
	const userImage = localStorage.getItem("userImage");
	const {id} = useParams();
	const userId = localStorage.getItem("userId");
	// ----------------------
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
	const [selectedClientId, setSelectedClientId] = useState(null);

	// STORE INFO STATES
	const [storeInfo, setStoreInfo] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [searchData, setSearchData] = useState("");
	const [last5Sales, setLast5Sales] = useState([]);
	const [clientsByChannel, setClientsByChannel] = useState([]);
	const [clientsBoughtTwiceTotal, setClientsBoughtTwiceTotal] = useState([]);
	const [clientMostPurch, setClientMostPurch] = useState([]);
	// -----------------------------

	// ERROR STATES
	const [searchError, setSearchError] = useState(false);
	const [last5SalesError, setLast5SalesError] = useState(false);
	const [channelNumberError, setChannelNumberError] = useState(false);
	const [twiceTotalError, setTwiceTotalError] = useState(false);
	const [mostPurchasesError, setMostPurchasesError] = useState(false);

	// STORE INFO FUNCTIONS
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

	const getClientSearch = async (searchData) => {
		try {
			const modifiedData = searchData.includes(" ")
				? searchData.replace(/ /g, "%20")
				: searchData;

			const response = await axios.get(
				`https://managemate.onrender.com/client/search/${id}/${modifiedData}`
			);
			const result = response.data;

			setSearchResult(result);
		} catch (error) {
			setSearchError(true);
			setTimeout(() => {
				setSearchError(false);
			}, 3000);
		}
	};

	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearchData(value);
	};

	const enterSearch = (event) => {
		if (searchData.length === 0) return;
		if (event.key === "Enter") getClientSearch(searchData);
	};

	const resetSearch = () => {
		setSearchResult([]);
		setSearchData("");
	};

	// -----------------------------

	const getLast5Sales = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/order/last-five/${id}`
			);
			const result = response.data;

			setLast5Sales(result);
		} catch (error) {
			setLast5SalesError(true);
		}
	};

	// ---------------------------------------------

	const getClientsByChannel = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/client/channel-number/${id}`
			);
			const result = response.data;

			setClientsByChannel(result);
		} catch (error) {
			setChannelNumberError(true);
		}
	};

	// ----------------------------

	const getClientsBoughtTwiceTotal = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/client/twice-total/${id}`
			);
			const result = response.data;

			setClientsBoughtTwiceTotal(result);
		} catch (error) {
			setTwiceTotalError(true);
		}
	};

	// ------------------------

	const getClientMostPurchases = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/client/most/${id}`
			);
			const result = response.data;

			setClientMostPurch(result);
		} catch (error) {
			setMostPurchasesError(true);
		}
	};

	// console.log(clientMostPurch);

	/////////////////////////////////////////////////

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");

		if (!loggedUser) {
			navigate("/login");
		}

		const fetchData = async () => {
			try {
				await getStoreInfo();
				await getLast5Sales();
				await getClientsByChannel();
				await getClientsBoughtTwiceTotal();
				await getClientMostPurchases();
				setLoading(false);
			} catch (error) {
				console.log(error.message);
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
						<NavbarItem
							className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]"
							isActive="true">
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
							<DropdownItem
								onClick={() => navigate(`/manager/account/${userId}`)}
								key="settings">
								Settings
							</DropdownItem>
							<DropdownItem onClick={() => navigate("/manager")} key="system">
								Go to store manager
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
					Clients
				</h1>
				<p className="font-[Questrial] text-sm text-white w-[30ch] md:w-[90ch] lg:w-[120ch] xl:w-[130ch]">
					In this section you can view in full detail all the information
					related to your clients, such as the last 5 sales and the clients who
					bought it, the number of clients by sales channel, search a specific
					client and see their profile in detail and you can also add a new
					client with their contact information.
				</p>

				{loading ? (
					<Spinner color="success" />
				) : (
					<>
						<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-between md:flex-row xl:mt-12">
							<Link to={`/dashboard/client-creation/${id}`}>
								<Button
									radius="sm"
									className="bg-[#3d1d93] font-[Satoshi-Medium] text-medium text-white w-34">
									New client
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
									value={searchData}
									endContent={
										<Button
											variant="bordered"
											className="bg-none border-none"
											isDisabled={searchData.length === 0 && true}
											onClick={() => getClientSearch(searchData)}>
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
									onKeyDown={enterSearch}
									name="search"
									onChange={handleSearchChange}
									variant="bordered"
									placeholder="Search Clients"
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
														setSelectedClientId(result._id);
														onOpenModal1();
													}}
													className="overflow-hidden mb-[-10px] h-11 w-full rounded-[10px] flex flex-row justify-star items-center gap-3 bg-[#1c1e21] inner-shadow-input">
													<img
														className="w-11 h-11 object-cover"
														src={result?.image}
														alt=""
													/>
													<span className="text-white font-[Satoshi-Medium] text-left text-sm">
														{searchData.includes("@")
															? result.igUsername
															: result.name + " " + result.lastName}
													</span>
												</div>
											);
										})}
										<Modal
											isOpen={isOpenModal1}
											onOpenChange={onOpenChangeModal1}
											scrollBehavior="outside"
											size="xl">
											<ModalContent>
												<ClientDetail clientId={selectedClientId} />
											</ModalContent>
										</Modal>
									</Badge>
								)}
								{searchError && (
									<div className="overflow-hidden mb-[-10px] mt-4 px-3 h-11 w-full rounded-[10px] flex flex-row justify-star items-center gap-3 bg-[#1c1e21] inner-shadow-input">
										<span className="text-white font-[Satoshi-Medium] text-left text-sm">
											No results
										</span>
									</div>
								)}
							</div>
						</div>
						<div className="w-[250px] h-auto md:w-[680px] lg:w-[1000px] flex flex-col justify-center items-center md:flex-row gap-8 mt-20 md:mt-0 lg:mt-8 ">
							<div className="w-full md:w-[450px] h-[350px] md:h-[350px] xl:h-[370px] lg:w-[500px] flex flex-col justify-center items-center bg-[#3d1d93] rounded-[20px] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] py-2 overflow-hidden ">
								<p className="font-[Poppins] text-white text-xl text-center mb-2 xl:text-2xl">
									Last 5 sales
								</p>
								<div className="min-h-[180px] w-full flex flex-col justify-center items-center gap-2 xl:gap-3">
									{last5Sales?.length > 0 && !last5SalesError ? (
										last5Sales?.map((sale) => {
											return (
												<div
													key={sale._id}
													className="bg-gradient-to-r from-[#C8D9FF] to-[rgba(217,217,217,0)] w-full h-12 xl:h-14 flex justify-between items-center px-2 xl:px-3">
													<div className="flex justify-center items-center w-auto gap-3">
														<img
															src={sale.client.image}
															alt=""
															className="w-10 h-10 rounded-md object-cover"
														/>
														<p className="font-[Poppins] text-[#3d1d93] text-sm font-medium">
															{sale.client.igUsername
																? sale.client.igUsername
																: `${sale.client.name} ${sale.client.lastName}`}
														</p>
													</div>
													<p className="font-[Poppins] text-[#C8D9FF] text-sm">
														${sale.value}
													</p>
												</div>
											);
										})
									) : (
										<span className="h-full font-[Satoshi-Medium] text-white text-lg text-center flex items-center">
											No orders
										</span>
									)}
								</div>
							</div>
							<div className="w-full h-full md:w-[400px] lg:w-[500px] flex flex-col justify-center items-center gap-8">
								<div className="w-full  h-[120px] flex flex-col justify-between items-center  md:h-[150px] bg-[#3d1d93] rounded-[30px] py-2 shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)]">
									<p className="font-[Poppins] font-medium text-lg text-white text-center lg:text-2xl">
										Clients by channel
									</p>
									<div className="flex justify-center items-center gap-8 lg:gap-20">
										<div className="w-12 h-full flex flex-col justify-center items-center gap-1">
											<svg
												className="fill-[#C8D9FF] w-6 lg:w-9"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>WhatsApp</title>
												<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
											</svg>
											<p className="text-white font-[Poppins] text-sm lg:text-medium">
												{clientsByChannel?.Whatsapp || 0}
											</p>
										</div>
										<div className="w-12 h-full flex flex-col justify-center items-center gap-1">
											<svg
												className="fill-[#C8D9FF] w-6 lg:w-9"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>Facebook</title>
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
											</svg>
											<p className="text-white font-[Poppins] text-sm lg:text-medium">
												{clientsByChannel?.Facebook || 0}
											</p>
										</div>
										<div className="w-12 h-full flex flex-col justify-center items-center gap-1">
											<svg
												className="fill-[#C8D9FF] w-6 lg:w-9"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>Instagram</title>
												<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
											</svg>
											<p className="text-white font-[Poppins] text-sm lg:text-medium">
												{clientsByChannel?.Instagram || 0}
											</p>
										</div>
									</div>
								</div>
								<div className="w-full  flex flex-col justify-center items-center md:flex-row gap-6 md:gap-3">
									<div className="w-full md:w-1/2  h-[170px] xl:h-[190px] bg-gradient-to-br from-white to-[#C8D9FF] rounded-[18px] flex flex-col justify-center items-center shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)]">
										<p className="text-[#232529] font-[Poppins] font-medium text-[12px] text-center mb-2 xl:text-[14px]">
											Clients that bought twice or more
										</p>
										<p
											className={`text-[#3d1d93] ${
												twiceTotalError ? "text-2xl" : "text-8xl"
											} ${
												twiceTotalError &&
												"h-[60%] flex justify-center items-center"
											} md:text-6xl font-[Poppins] font-semibold text-center`}>
											{twiceTotalError
												? "No clients"
												: clientsBoughtTwiceTotal.length}
										</p>
										{!twiceTotalError &&
											clientsBoughtTwiceTotal?.length > 0 && (
												<Link to={`/dashboard/clients/bought-twice/${id}`}>
													<button className="w-auto flex justify-center items-center ">
														<p className="text-[#232529] font-[Poppins] font-medium text-[12px] text-center ">
															See more
														</p>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															height="24"
															viewBox="0 -960 960 960"
															width="24">
															<path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
														</svg>
													</button>
												</Link>
											)}
									</div>
									<div className="w-full md:w-1/2  h-[170px] xl:h-[190px] bg-gradient-to-br from-white to-[#C8D9FF] rounded-[18px] flex flex-col justify-center items-center gap-1 shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)]">
										<p className="text-[#232529] font-[Poppins] font-medium text-[10px] text-center xl:text-[12px]">
											Client with most purchases
										</p>
										{!mostPurchasesError && clientMostPurch !== null ? (
											<>
												<p className="text-[#3d1d93] text-[10px] font-[Poppins] xl:text-[12px] font-medium">
													{clientMostPurch?.igUsername ||
														`${clientMostPurch?.name} ${clientMostPurch?.lastName}`}
												</p>
												<img
													src={clientMostPurch?.image}
													alt=""
													className="rounded-[8px] w-20 h-[95px] object-cover xl:w-[98px] shadow-[2px_2px_8px_2px_rgba(0,0,0,0.3)]"
												/>
												<div className="w-auto flex justify-center items-center">
													<button
														className="bg-none flex justify-center items-center"
														onClick={onOpenModal2}>
														<p className="text-[#232529] font-[Poppins] font-medium text-[12px] text-center ">
															See more
														</p>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															height="24"
															viewBox="0 -960 960 960"
															width="24">
															<path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
														</svg>
													</button>
													<Modal
														isOpen={isOpenModal2}
														onOpenChange={onOpenChangeModal2}
														scrollBehavior="outside"
														size="xl">
														<ModalContent>
															<ClientDetail clientId={clientMostPurch?.id} />
														</ModalContent>
													</Modal>
												</div>
											</>
										) : (
											<span className="h-3/4 flex justify-center items-center text-[#3d1d93] text-2xl font-[Poppins] font-semibold text-center">
												No clients
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Clients;
