import {useState, useMemo, useEffect, useRef} from "react";
import {
	Textarea,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Badge,
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
} from "@nextui-org/react";
import axios from "axios";
import NewProduct from "./NewProduct";
import ProductDetail from "./ProductDetail";
import {Link, useNavigate, useParams} from "react-router-dom";
import {logOut} from "./logOut";

const Inventory = () => {
	const navigate = useNavigate();

	// -----------------
	const userImage = localStorage.getItem("userImage");
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem("userId");

	// STORE INFO STATES
	const [storeInfo, setStoreInfo] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoriesOriginal, setCategoriesOriginal] = useState([]);
	const [productsNumber, setProductsNumber] = useState(null);
	const [bestSeller, setBestSeller] = useState([]);
	const [bestSellerError, setBestSellerError] = useState(false);
	// -----------------------------

	// CLOUDINARY CONFIGURATION
	const cloudinaryRefImage = useRef();
	const widgetRefImage = useRef();
	const [selectedImage, setSelectedImage] = useState("");

	// ----------------------------------

	// DROPDOWN

	const [selectedCategories, setSelectedCategories] = useState(
		new Set(["Filter by category"])
	);

	const selectedValue = useMemo(
		() => Array.from(selectedCategories).join(", ").replaceAll("_", " "),
		[selectedCategories]
	);
	// -------------------------------------

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

	// ----------------------------------

	// FILTER BY CATEGORY
	const handleFilter = (param) => {
		if (param !== "All") {
			const categoriesCopy = [...categoriesOriginal];
			const filteredCategories = categoriesCopy.filter(
				(category) => category.name === param
			);
			setCategories(filteredCategories);
		} else {
			setCategories(categoriesOriginal);
		}
	};
	// ---------------------------------

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

	// CATEGORIES NUMBER

	const getTotalCategories = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/cathegory/all/${id}`
			);
			const result = response.data;

			setCategories(result);
			setCategoriesOriginal(result);
		} catch (error) {
			console.log(error.message);
		}
	};
	// ----------------------------

	// PRODUCTS NUMBER
	const getProductsNumber = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/product/number/${id}`
			);
			const result = response.data;

			setProductsNumber(result);
		} catch (error) {
			console.log(error.message);
		}
	};
	// -------------------------------

	// BEST SELLER
	const getBestSeller = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/product/best-seller/${id}`
			);
			const result = response.data;

			setBestSeller(result);
		} catch (error) {
			setBestSellerError(true);
		}
	};
	// -------------------

	// PRODUCT SEARCH
	const [selectedProductId, setSelectedProductId] = useState("");
	const [searchData, setSearchData] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [searchResultError, setSearchResultError] = useState(false);

	const handleChange = (event) => {
		const value = event.target.value;
		setSearchData(value);
	};

	const handleSearch = async (searchData) => {
		try {
			const modifiedData = searchData.includes(" ")
				? searchData.replace(/ /g, "%20")
				: searchData;

			const response = await axios.get(
				`https://managemate.onrender.com/product/search/${id}/${modifiedData}`
			);
			const result = response.data;

			setSearchResult(result);
		} catch (error) {
			setSearchResultError(true);
			setTimeout(() => {
				setSearchResultError(false);
			}, 3000);
		}
	};

	const enterSearch = (event) => {
		if (searchData.length === 0) return;
		if (event.key === "Enter") handleSearch(searchData);
	};

	const resetSearch = () => {
		setSearchResult([]);
		setSearchData("");
	};

	// ----------------------------------------------

	// EDIT PRODUCT
	const [editSuccess, setEditSuccess] = useState(false);
	const [editError, setEditError] = useState(false);
	const [edit, setEdit] = useState(false);
	const editProduct = () => setEdit(!edit);
	const [compareEdit, setCompareEdit] = useState({});
	const [editCategory, setEditCategory] = useState(new Set([""]));

	const newCategory = useMemo(
		() => Array.from(editCategory).join(", ").replaceAll("_", " "),
		[editCategory]
	);

	const [editForm, setEditForm] = useState({
		storeId: id,
		productId: "",
		name: "",
		description: "",
		purchasePrice: "",
		salePrice: "",
		quantity: 0,
	});

	const editChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setEditForm({...editForm, [name]: value});
	};

	const submitEdit = async () => {
		try {
			const submitEditForm = {
				...editForm,
				image: selectedImage,
				cathegory: newCategory,
			};

			await axios.put(
				`https://managemate.onrender.com/product/edit`,
				submitEditForm
			);
			setEditSuccess(true);
			setEditError(false);
			setTimeout(() => {
				setEditSuccess(false);
			}, 3000);
		} catch (error) {
			console.log(error.message);
			setEditError(true);
			setEditSuccess(false);
			setTimeout(() => {
				setEditError(false);
			}, 3000);
		}
	};

	// -------------------------------------

	// CLOUDINARY USEEFFECT
	useEffect(() => {
		cloudinaryRefImage.current = window.cloudinary;
		widgetRefImage.current = cloudinaryRefImage.current.createUploadWidget(
			{
				cloudName: "dxyosebut",
				uploadPreset: "product_images",
			},
			function (error, result) {
				if (!error && result && result.event === "success") {
					const imageUrl = result.info.secure_url;
					setSelectedImage(imageUrl);
				}
			}
		);
	}, []);

	const handleUploadImage = () => {
		widgetRefImage.current.open();
	};
	// -----------------------------------------

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");

		if (!loggedUser) {
			navigate("/login");
		}

		const fetchData = async () => {
			try {
				await getStoreInfo();
				await getTotalCategories();
				await getProductsNumber();
				await getBestSeller();

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
						<NavbarItem
							className="hidden h-full w-20 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]"
							isActive="true">
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
					Inventory
				</h1>
				<p className="font-[Questrial] text-sm text-white w-[30ch] md:w-[90ch] lg:w-[120ch] xl:w-[130ch] text-left">
					In this section you can manage your inventory of products, manage
					stock, create new products and organize them by category.
				</p>

				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col items-center justify-between md:items-start md:flex-row mt-6 xl:mt-12 ">
					<div className="flex flex-col md:flex-row justify-center items-center gap-3 h-full ">
						<Button
							onClick={onOpenModal1}
							radius="sm"
							className="bg-[#3d1d93] font-[Satoshi-Medium] text-medium text-white w-auto">
							New product
							<svg
								className="fill-white"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
							</svg>
						</Button>
						<Modal
							scrollBehavior="inside"
							size="lg"
							className="bg-[#232529]"
							onClose={() => getTotalCategories()}
							isOpen={isOpenModal1}
							onOpenChange={onOpenChangeModal1}>
							<ModalContent>
								<ModalHeader>New Product</ModalHeader>
								<ModalBody>
									<NewProduct show={categories.length > 0 ? true : false} />
								</ModalBody>
							</ModalContent>
						</Modal>
						<Dropdown
							classNames={{
								base: "bg-[#3D1D93] text-white font-[Satoshi-Medium]",
							}}>
							<DropdownTrigger>
								<Button
									radius="sm"
									className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-[158px]">
									{selectedValue}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="Button"
								selectedKeys={selectedCategories}
								onSelectionChange={setSelectedCategories}
								selectionMode="single">
								<DropdownItem onClick={() => handleFilter("All")} key="All">
									All
								</DropdownItem>
								{categoriesOriginal?.map((category) => {
									return (
										<DropdownItem
											onClick={() => handleFilter(category.name)}
											key={category.name}>
											{category.name}
										</DropdownItem>
									);
								})}
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className="w-full md:w-1/2 ">
						<Input
							isDisabled={categories.length === 0 ? true : false}
							value={searchData}
							endContent={
								<Button
									variant="bordered"
									className="bg-none border-none"
									isDisabled={searchData.length === 0 && true}
									onClick={() => handleSearch(searchData)}>
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
							placeholder="Search Products"
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
												setCompareEdit({
													...editForm,
													productId: result._id,
													image: result.image,
													name: result.name,
													category: result.cathegory,
													description: result.description,
													purchasePrice: result.purchasePrice,
													salePrice: result.salePrice,
													quantity: result.quantity,
												});
												setEditForm({
													...editForm,
													productId: result._id,
													image: result.image,
													name: result.name,
													description: result.description,
													purchasePrice: result.purchasePrice,
													salePrice: result.salePrice,
													quantity: result.quantity,
												});
												setSelectedImage(result.image);
												setEditCategory(new Set([result.cathegory]));
												setSelectedProductId(result._id);
												onOpenModal2();
											}}
											className="overflow-hidden mb-[-10px] h-11 w-full rounded-[10px] flex flex-row justify-star items-center gap-3 bg-[#1c1e21] inner-shadow-input">
											<img
												className="w-11 h-11 object-cover"
												src={result?.image}
												alt=""
											/>
											<span className="text-white font-[Satoshi-Medium] text-left text-sm">
												{result.name}
											</span>
										</div>
									);
								})}
								<Modal
									scrollBehavior="outside"
									backdrop="blur"
									className="bg-[#232529] flex justify-center w-auto"
									placement="center"
									isOpen={isOpenModal2}
									onOpenChange={onOpenChangeModal2}
									onClose={() => {
										setEdit(false);
										getTotalCategories();
										getProductsNumber();
									}}>
									<ModalContent>
										<ModalHeader className="flex justify-between items-center">
											<svg
												onClick={editProduct}
												className="fill-[#ebd5c4] md:mr-5"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
											</svg>
										</ModalHeader>
										<ProductDetail productId={selectedProductId} />
										{edit && (
											<ModalFooter className=" flex flex-col items-center justify-between">
												<div className="w-full flex justify-end">
													<button onClick={editProduct}>
														<svg
															className="fill-white"
															xmlns="http://www.w3.org/2000/svg"
															height="24"
															viewBox="0 -960 960 960"
															width="24">
															<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
														</svg>
													</button>
												</div>
												<div className="flex flex-col md:flex-row justify-between gap-12">
													<div className="flex flex-col justify-center items-center gap-6">
														<Badge
															onClick={handleUploadImage}
															disableOutline
															className="bg-white backdrop-blur-[8px] bg-opacity-20 w-7 h-7"
															content={
																<svg
																	className="fill-white"
																	xmlns="http://www.w3.org/2000/svg"
																	height="24"
																	viewBox="0 -960 960 960"
																	width="24">
																	<path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
																</svg>
															}>
															{selectedImage.length > 0 ? (
																<img
																	src={selectedImage}
																	className="w-28 h-28 object-cover rounded-full"
																/>
															) : (
																<Avatar className="w-28 h-28" />
															)}
														</Badge>
														<Dropdown
															classNames={{
																base: "bg-[#3D1D93] text-white font-[Satoshi-Medium]",
															}}>
															<DropdownTrigger>
																<Button
																	radius="sm"
																	className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-auto">
																	{newCategory}
																</Button>
															</DropdownTrigger>
															<DropdownMenu
																aria-label="Button"
																selectedKeys={editCategory}
																onSelectionChange={setEditCategory}
																selectionMode="single">
																{categories.length > 0 &&
																	categories.map((category) => {
																		return (
																			<DropdownItem key={category.name}>
																				{category.name}
																			</DropdownItem>
																		);
																	})}
															</DropdownMenu>
														</Dropdown>
														<Input
															onChange={editChange}
															type="number"
															name="quantity"
															variant="bordered"
															label="Quantity"
															classNames={{
																input: [
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
														<Button
															onClick={submitEdit}
															isDisabled={
																compareEdit.name === editForm.name &&
																compareEdit.description ===
																	editForm.description &&
																compareEdit.quantity === editForm.quantity &&
																selectedImage === editForm.image &&
																compareEdit.salePrice === editForm.salePrice &&
																compareEdit.purchasePrice ===
																	editForm.purchasePrice &&
																compareEdit.category === newCategory
																	? true
																	: false
															}
															className="bg-[#3d1d93] font-[Satoshi-Medium] text-sm text-white w-auto">
															Update
														</Button>
													</div>
													<div className="flex flex-col justify-center items-center gap-3">
														<Input
															name="name"
															onChange={editChange}
															variant="bordered"
															classNames={{
																input: [
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
															label="New name"
														/>
														<Textarea
															name="description"
															onChange={editChange}
															variant="bordered"
															classNames={{
																input: [
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
															label="New description"
														/>
														<div className="flex flex-col justify-center items-center gap-3">
															<div className="md:w-52 flex flex-col md:flex-row justify-center gap-2 ">
																<Input
																	name="purchasePrice"
																	onChange={editChange}
																	type="number"
																	variant="bordered"
																	label="Purchase price"
																	classNames={{
																		input: [
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
																<Input
																	name="salePrice"
																	onChange={editChange}
																	type="number"
																	variant="bordered"
																	label="Sale price"
																	classNames={{
																		input: [
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
															</div>
															{editSuccess && (
																<span className="font-[Satoshi-Medium] text-green-500 text-medium text-center">
																	Updated!
																</span>
															)}
															{editError && (
																<span className="font-[Satoshi-Medium] text-red-500 text-medium text-center">
																	Error, try again
																</span>
															)}
														</div>
													</div>
												</div>
											</ModalFooter>
										)}
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
					<>
						<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center mt-8 xl:mt-12">
							<div className="w-full flex flex-col justify-center items-center md:flex-row gap-4 lg:gap-8">
								<div className="flex justify-center items-center gap-2 md:gap-5 lg:gap-8">
									<div className="w-[121px] h-[121px] md:w-[150px] lg:w-[180px] md:h-[150px] lg:h-[180px] rounded-[25px] bg-gradient-to-br from-[#383C42] to-[#232529] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center gap-4">
										<p className="font-[Poppins] text-white text-center text-[10px] md:text-[13px]">
											Total categories
										</p>
										<p className="font-[Poppins] font-semibold text-4xl text-center text-[#ebd5c4] md:text-5xl">
											{categories.length}
										</p>
									</div>
									<div className="w-[121px] h-[121px] md:w-[150px] lg:w-[180px] md:h-[150px] lg:h-[180px] rounded-[25px] bg-gradient-to-br from-[#383C42] to-[#232529] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center gap-4">
										<p className="font-[Poppins] text-white text-center text-[10px] md:text-[13px]">
											Products
										</p>
										<p className="font-[Poppins] font-semibold text-4xl text-center text-[#ebd5c4] md:text-5xl">
											{productsNumber}
										</p>
									</div>
								</div>
								{!bestSellerError ? (
									<div className=" w-full h-[130px] md:h-[150px] lg:h-[180px] rounded-[20px] bg-gradient-to-br from-white to-[#C8D9FF] flex justify-center items-center shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] px-4 lg:gap-10">
										<p className="font-[Poppins] font-bold text-[#3d1d93] text-4xl md:text-5xl lg:text-6xl w-[6ch] lg:w-auto">
											Best Seller
										</p>
										<div className="flex flex-col justify-center items-center gap-1">
											<img
												src={bestSeller.image}
												alt=""
												className="object-cover rounded-md w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 shadow-[4px_4px_10px_rgba(0,0,0,0.2)]"
											/>
											<p className="font-[Poppins] font-bold text-[#3d1d93] text-sm md:text-sm lg:text-lg w-[6ch] lg:w-auto text-center leading-[15px] md:leading-[15px]">
												{bestSeller.name}
											</p>
										</div>
									</div>
								) : (
									<div className="w-full"></div>
								)}
							</div>
							<div className="w-full flex flex-col justify-center items-center mt-10 ">
								{categories.length === 0 ? (
									<span className="font-[Satoshi-Medium] text-white text-2xl text-left">
										Go to New product to create a new category!
									</span>
								) : (
									<p className="text-[#ebd5c4] font-[Satoshi-Medium] text-2xl text-left w-full">
										Categories
									</p>
								)}
								<div className="w-full flex flex-col justify-start items-center md:flex-wrap md:flex-row gap-6 md:justify-center lg:justify-start lg:gap-6 mt-16">
									{categories?.slice(0, 6).map((category) => {
										return (
											<Badge
												disableOutline
												content={`${category.products.length}`}
												placement="bottom-right"
												classNames={{
													base: "hover:scale-[101%] transition-transform ",
													badge:
														"text-center rounded-full w-10 h-10 bg-white backdrop-blur-[8px] bg-opacity-20 font-[Poppins] font-bold text-[#3d1d93] text-lg",
												}}>
												<Link
													to={`/dashboard/inventory/cathegory/${category._id}/${id}`}>
													<div className="w-[230px] h-[180px] rounded-[18px] flex flex-col justify-center items-center p-2 bg-gradient-to-br from-white to-[#C8D9FF] ">
														<p className="text-[#3d1d93] font-[Poppins] text-lg font-bold text-center">
															{category.name}
														</p>
														<div className="w-full h-[130px] bg-[#232529] rounded-[8px] justify-between items-start grid grid-cols-3 place-items-center py-3">
															{category.products.map((product) => {
																return (
																	<img
																		key={product._id}
																		src={product.image}
																		className="object-cover w-12 h-12 rounded-[5px]"
																	/>
																);
															})}
														</div>
													</div>
												</Link>
											</Badge>
										);
									})}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Inventory;
