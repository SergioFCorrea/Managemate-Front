import Logo from "../../Images/managemate-log-dark-mode.png";
import LogoLight from "../../Images/managemate-logo-light-mode.png";
import logoletter from "../../Images/managemate-txt-dark.png";
import axios from "axios";
import ig from "./instagram.svg";
import fb from "./facebook.svg";
import wpp from "./whatsapp.svg";
import {Link} from "react-router-dom";
import {
	Avatar,
	Modal,
	ModalContent,
	useDisclosure,
	Navbar,
	NavbarBrand,
	NavbarContent,
	DropdownItem,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	Button,
	Switch,
	Spinner,
} from "@nextui-org/react";
import StoreCreator from "../Admin Dashboard/StoreCreator";
import {useNavigate} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import {logOut} from "../Admin Dashboard/logOut";

const StoresManager = () => {
	const navigate = useNavigate();

	// ------------------
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [loading, setLoading] = useState(true);

	const [stores, setStores] = useState([]);
	const [storesCopy, setStoresCopy] = useState([]);
	const [filteredStores, setFilteredStores] = useState([]);
	const [noFilterResults, setNoFilterResults] = useState(false);
	const [checkedToggle, setCheckedToggle] = useState(false);
	const [errorGettingstores, setErrorGettingStores] = useState(false);

	// ACTIVE STORES TOGGLE

	const handleToggle = (event) => {
		const checked = event.target.checked;

		const copyFromStores =
			filteredStores.length === 0 ? [...storesCopy] : [...filteredStores];

		const toggleStores = copyFromStores.filter(
			(store) => store.state !== checked
		);
		if (toggleStores.length === 0) {
			setStores(copyFromStores);
		} else {
			setStores(toggleStores);
		}
	};

	// ---------------------

	// RESET FILTERS
	const resetFilter = () => {
		setStores(storesCopy);
		setCheckedToggle(false);
		setNoFilterResults(false);
		setChannelFilter(new Set(["Sales channel"]));
	};
	// --------------------

	// DROPDOWN FILTER
	const [channelFilter, setChannelFilter] = useState(
		new Set(["Sales Channel"])
	);

	const selectedFilterValue = useMemo(
		() => Array.from(channelFilter).join(", ").replaceAll("_", " "),
		[channelFilter]
	);

	const handleFilter = (parameter) => {
		const allStores = [...storesCopy];
		if (parameter === "all") {
			setStores(storesCopy);
			return;
		}

		const filteredStores = allStores.filter((store) =>
			store.salesChannels.includes(parameter)
		);

		if (filteredStores.length === 0) {
			setStores(storesCopy);
			setNoFilterResults(true);
			return;
		}
		setStores(filteredStores);
		setFilteredStores(filteredStores);
		setNoFilterResults(false);
	};
	// ----------------
	const userIat = localStorage.getItem("userIat");
	const userId = localStorage.getItem("userId");
	const userEmail = localStorage.getItem("userEmail");
	const userImage = localStorage.getItem("userImage");

	const getUserStores = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/user/stores/${userId}`
			);

			const result = response.data;

			setStores(result);
			setStoresCopy(result);
		} catch (error) {
			setErrorGettingStores(true);
		}
	};

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");

		if (!loggedUser) {
			navigate("/login");
		}

		const fetchData = async () => {
			try {
				await getUserStores();
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex justify-center flex-col items-center">
			<Navbar
				maxWidth="xl"
				className="md:bg-[#EBD5C4] justify-center flex overflow-hidden">
				<NavbarBrand className="md:hidden">
					<Link to="/">
						<img src={Logo} alt="" className="w-14 h-auto" />
					</Link>
				</NavbarBrand>
				<Link to="/">
					<NavbarBrand className="hidden md:flex">
						<img
							src={LogoLight}
							alt=""
							className="w-[90px] h-auto mr-[-40px]"
						/>
						<img
							src={logoletter}
							alt=""
							className="hidden md:flex w-[180px] h-auto "
						/>
					</NavbarBrand>
				</Link>
				<NavbarContent as="div" justify="end">
					<Dropdown
						placement="bottom-end"
						className="bg-[#3D1D93] text-white shadow-[4px_4px_12px_2px_rgba(0,0,0,0.8)] font-[Satoshi-Medium]">
						<DropdownTrigger>
							<Avatar
								as="button"
								className="transition-transform object-cover"
								color="primary"
								name={userEmail}
								size="md"
								src={userImage}
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="shadow">
							<DropdownItem key="settings">
								<Link to={`/manager/account/${userId}`}>Settings</Link>
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
			<div className="w-[85vw] h-40 flex justify-center items-center flex-col gap-y-6 ">
				<h1 className="text-white font-[Poppins] font-semibold text-center text-[25px] md:text-[45px]">
					Your Stores
				</h1>
				<p className="text-white font-[Questrial] text-center text-[12px] md:text-[15px]">
					Filter and manage your stores, edit their information and create new
					stores
				</p>
			</div>
			{stores.length > 0 && (
				<div className="w-[90vw] md:w-[600px] h-auto py-3 md:p-0 md:h-[75px] flex flex-col md:flex-row justify-center items-center bg-[#1C1E21] rounded-[60px] md:rounded-full shadow-[0_4px_5px_0_rgba(0,0,0,0.25)] gap-5 md:gap-8 md:mt-6">
					<Switch
						isSelected={checkedToggle}
						onValueChange={setCheckedToggle}
						onChange={handleToggle}
						aria-label="Active/Inactive"
						classNames={{
							label: ["text-[12px]", "font-[Satoshi-Medium]", "text-white"],
							wrapper: "bg-[#383C42]",
							startContent: "bg-green-500",
						}}>
						Active/Inactive
					</Switch>

					<div className="flex flex-col justify-center items-center md:flex md:flex-row md:justify-center gap-1 md:gap-5">
						<div className="flex flex-row justify-center items-center gap-5">
							<Button
								onClick={onOpen}
								className=" text-[12px] rounded-[5px] bg-[#3D1D93] text-white font-[Satoshi-Bold]">
								New Store
							</Button>
							<Modal
								onClose={getUserStores}
								className="bg-[#232529]"
								radius="lg"
								isOpen={isOpen}
								onOpenChange={onOpenChange}
								scrollBehavior="outside"
								size="4xl">
								<ModalContent>
									<StoreCreator />
								</ModalContent>
							</Modal>
							{/* </Link> */}
							<Dropdown className="bg-[#3d1d93] text-white font-[Satoshi-Medium]">
								<DropdownTrigger>
									<Button className=" text-[12px] rounded-[5px] bg-[#3D1D93] text-white font-[Satoshi-Bold]">
										{selectedFilterValue}
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									selectedKeys={channelFilter}
									onSelectionChange={setChannelFilter}
									selectionMode="single">
									<DropdownItem onClick={() => handleFilter("all")} key="All">
										All
									</DropdownItem>
									<DropdownItem
										onClick={() => handleFilter("wpp")}
										key="Whatsapp">
										Whatsapp
									</DropdownItem>
									<DropdownItem
										onClick={() => handleFilter("fb")}
										key="Facebook">
										Facebook
									</DropdownItem>
									<DropdownItem
										onClick={() => handleFilter("ig")}
										key="Instagram">
										Instagram
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<div className="flex flex-row justify-center items-center mt-2 md:mt-0 gap-2">
							<Button
								onClick={resetFilter}
								className=" text-[12px] rounded-[5px] bg-[#3D1D93] text-white font-[Satoshi-Bold]">
								Reset Filter
							</Button>
						</div>
					</div>
				</div>
			)}
			{loading ? (
				<Spinner color="success" />
			) : (
				<div
					className={`w-[85vw] md:w-[80vw] 2xl:w-[57vw] flex flex-col justify-center items-center gap-8 ${
						noFilterResults === true ? "mt-10" : "mt-20"
					} ${stores.length > 0}lg:grid lg:grid-cols-2`}>
					{noFilterResults === true && (
						<span className="text-white font-[Satoshi-bold] text-center text-medium mb-10">
							No results
						</span>
					)}
					{stores.length > 0 ? (
						stores?.map((store) => {
							return (
								<Link to={`/dashboard/home/${store._id}`}>
									<div
										className={`w-[270px] h-[500px] p-y-8 bg-gradient-to-bl ${
											store.state === true
												? "from-[#F5E9E1] to-[#EBD5C4]"
												: " from-[#353431] to-[#1a1918] "
										} rounded-[18px] flex flex-col justify-center items-center md:flex-row md:h-[270px] md:w-[530px] md:gap-4 hover:scale-[103%] transition-transform hover:shadow-[0_0_12px_0_rgba(224,190,164,0.6)]`}>
										<div className="relative w-60 h-auto flex flex-col justify-center items-center ">
											<img
												src={store.image}
												alt=""
												className="w-60 h-60 object-cover rounded-[8px] shadow-[0_4px_10px_0_rgba(0,0,0,0.3)]"
											/>
											<div className="absolute left-[5%] top-[5%] ">
												<Link to={`/manager/store-configurator/${store._id}`}>
													<svg
														className="hover:fill-white"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24">
														<path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm0-80q-25 0-42.5-17.5T422-480q0-25 17.5-42.5T482-540q25 0 42.5 17.5T542-480q0 25-17.5 42.5T482-420Zm-2-60Zm-40 320h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Z" />
													</svg>
												</Link>
											</div>
										</div>
										<div className="mt-6 flex flex-col justify-center items-center">
											<p
												className={`${
													store.state === true
														? "text-[#232529]"
														: "text-[#A7A5A0]"
												} font-[Poppins] font-medium text-xl`}>
												{store.name}
											</p>
											<p
												className={`${
													store.state === true
														? "text-[#232529]"
														: "text-[#A7A5A0]"
												} text-left text-[12px] font-[Questrial] min-h-[70px] md:min-h-[90px] w-[35ch]`}>
												{store.description}
											</p>
											<div className="flex justify-center gap-1 mt-2">
												<div className="bg-[#232529] w-[78px] h-[70px] rounded-[5px] flex flex-col justify-center items-center">
													<p className="font-[Poppins] font-medium text-[15px] text-[#C8D9FF]">
														{store.products}
													</p>
													<p className="font-[Poppins] text-[10px] font-light text-white">
														Products
													</p>
												</div>
												<div className="bg-[#232529] w-[78px] h-[70px] rounded-[5px] flex flex-col justify-center items-center">
													<p className="font-[Poppins] font-medium text-[15px] text-[#C8D9FF]">
														{store.clients.length === 0 ? 0 : store.clients}
													</p>
													<p className="font-[Poppins] text-[10px] font-light text-white">
														Clients
													</p>
												</div>
												<div className="bg-[#232529] w-[78px] h-[70px] rounded-[5px] flex flex-col justify-center items-center">
													<p className="font-[Poppins] font-medium text-[15px] text-[#C8D9FF]">
														{store.sales}{" "}
													</p>
													<p className="font-[Poppins] text-[10px] font-light text-white">
														Sales
													</p>
												</div>
											</div>
											<div className="flex justify-center gap-5 mt-3">
												{store.salesChannels.map((channel) => (
													<img
														src={
															channel === "ig"
																? ig
																: channel === "fb"
																? fb
																: wpp
														}
														alt={channel}
														className="w-6 h-6"
													/>
												))}
											</div>
										</div>
									</div>
								</Link>
							);
						})
					) : (
						<div className="text-center w-full py-8 flex flex-col justify-center items-center gap-4 lg:gap-12">
							<p className="text-white text-xl lg:text-2xl font-[Satoshi-bold] text-center">
								Seems empty, let's create your first store!
							</p>{" "}
							<Button
								onClick={onOpen}
								className="w-40 h-10 text-[12px] lg:text-medium rounded-[5px] bg-[#3D1D93] text-white font-[Satoshi-Bold]">
								Create Store
							</Button>
							<Modal
								onClose={getUserStores}
								className="bg-[#232529]"
								radius="lg"
								isOpen={isOpen}
								onOpenChange={onOpenChange}
								scrollBehavior="outside"
								size="4xl">
								<ModalContent>
									<StoreCreator />
								</ModalContent>
							</Modal>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default StoresManager;
