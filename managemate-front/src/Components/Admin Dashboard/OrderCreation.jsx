import {
	Button,
	Input,
	Checkbox,
	CheckboxGroup,
	Badge,
	Textarea,
	Navbar,
	NavbarContent,
	Spinner,
	Card,
	ScrollShadow,
	CardFooter,
} from "@nextui-org/react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";

const OrderCreation = () => {
	const navigate = useNavigate();
	// ---------------
	const {id} = useParams();
	const [loading, setLoading] = useState(false);
	const [loadingClient, setLoadingClient] = useState(false);

	// STATES
	const [searchResult, setSearchResult] = useState([]);
	const [searchData, setSearchData] = useState("");
	const [searchError, setSearchError] = useState(false);
	const [productsSearch, setProductsSearch] = useState("");
	const [productsResult, setProductsResult] = useState([]);
	const [productsSearchError, setProductsSearchError] = useState(false);
	const [createSuccess, setCreateSuccess] = useState(false);
	const [createError, setCreateError] = useState(false);
	// ---------------------------

	// CHECK BOX STATES
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [selectedClient, setSelectedClient] = useState([]);

	// PAYMENT STATUS

	const [paymentStatus, setPaymentStatus] = useState("");

	// ------------

	// ADD PRODUCT TO FORM

	const removeSelectedProduct = (id) => {
		const filteredProducts = selectedProducts.filter(
			(product) => product._id !== id
		);
		filteredProducts.length === 0
			? setSelectedProducts([])
			: setSelectedProducts(filteredProducts);
	};

	const totalOrderValue = selectedProducts?.reduce(
		(total, product) => total + product.salePrice,
		0
	);

	// PRODUCT QUANTITY

	const handleQuantityChange = (productId, quantityValue) => {
		const updatedSelectedProducts = [...selectedProducts];

		const productIndex = updatedSelectedProducts.findIndex(
			(product) => product._id === productId
		);

		if (productIndex !== -1) {
			updatedSelectedProducts[productIndex] = {
				...updatedSelectedProducts[productIndex],
				quantity: parseInt(quantityValue, 10) || 1,
			};
		} else {
			updatedSelectedProducts.push({
				...productsResult.find((product) => product._id === productId),
				quantity: parseInt(quantityValue, 10) || 1,
			});
		}

		setSelectedProducts(updatedSelectedProducts);
	};


	// ---------------------------

	// FORM

	const [formData, setFormData] = useState({
		storeId: id,
		shippingAdress: "",
		notes: "",
		shippingStatus: "Not shipped",
	});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setFormData({...formData, [name]: value});
	};

	// -------------------------------------

	// PRODUCT SEARCH

	const [maxProductQuantity, setMaxProductQuantity] = useState(false);
	const [noStock, setNoStock] = useState(false);
	const [negativeQuantity, setNegativeQuantity] = useState(false);

	const getProductsSearch = async () => {
		try {
			const modifiedData = productsSearch.includes(" ")
				? productsSearch.replace(/ /g, "%20")
				: productsSearch;

			const response = await axios.get(
				`https://managemate.onrender.com/product/search/${id}/${modifiedData}`
			);
			const result = response.data;

			setProductsResult(result);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setProductsSearchError(true);
			setLoading(false)
		}
	};

	const productSearchChange = (event) => {
		const value = event.target.value;
		setProductsSearch(value);
	};

	const enterProductSearch = (event) => {
		if (productsSearch.length === 0) return;
		if (event.key === "Enter") {
			getProductsSearch(productsSearch);
			setLoading(true);
		}
	};

	const repeatedProduct = (param) => {

		const findeProduct = selectedProducts.find(
			(product) => product._id === param
		);

		if (findeProduct) {
			const remove = selectedProducts.filter((p) => p._id !== param);
			setSelectedProducts(remove);
		}
	};

	// -----------------------------------

	// CLIENT SEARCH

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
			setLoadingClient(false);
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
		if (event.key === "Enter") {
			getClientSearch(searchData);
			setLoadingClient(true);
		}
	};

	// -----------------------------------

	// SUBMIT

	const [awaitCreate, setAwaitCreate] = useState(false);
	const handleSubmit = async () => {
		try {
			setAwaitCreate(true);
			const formCopy = {...formData};
			const value = selectedProducts.reduce(
				(total, product) => total + product.salePrice * product.quantity,
				0
			);
			const shippingadress =
				formCopy.shippingAdress === ""
					? selectedClient[0]?.adress
					: formCopy.shippingAdress;
			formCopy.shippingAdress = shippingadress;

			const finalForm = {
				...formCopy,
				client: selectedClient[0],
				products: selectedProducts,
				paymentStatus: paymentStatus,
				value: value,
			};
			await axios.post(`https://managemate.onrender.com/order/`, finalForm);
			setAwaitCreate(false);
			setCreateSuccess(true);
			setCreateError(false);

			setTimeout(() => {
				setCreateSuccess(false);
			}, 3000);
		} catch (error) {
			console.log(error.message);
			setCreateSuccess(false);
			setCreateError(true);
			setAwaitCreate(false);

			setTimeout(() => {
				setCreateError(false);
			}, 3000);
		}
	};

	// --------------------------------------

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");

		if (!loggedUser) {
			navigate("/login");
		}
	}, [id]);
	return (
		<div>
			<Navbar maxWidth="xl" className=" justify-center flex ">
				<NavbarContent justify="start">
					<Link to={`/dashboard/orders/${id}`}>
						<svg
							className="fill-[#ebd5c4] w-8 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
						</svg>
					</Link>
				</NavbarContent>
			</Navbar>
			<div className="flex flex-col justify-center items-center gap-8 mb-8 ">
				<div className="w-[85vw] md:w-[680px] lg:w-[1000px] gap-8 md:gap-16 h-auto flex flex-col justify-center items-center mt-6 xl:mt-12">
					<h1 className="fonts-[Poppins] font-semibold text-4xl text-left text-white mt-10 xl:mt-14 w-[10ch] md:w-full">
						Order Creation
					</h1>
					<div className="bg-[#3d1d93] rounded-[20px] w-full h-auto px-3 md:px-8 py-8 flex flex-col justify-center items-center gap-8 md:gap-8 overflow-hidden">
						<div className="w-full flex justify-center items-center flex-col gap-8 md:flex-row">
							<div className="w-full h-auto flex flex-col justify-center items-center">
								<p className="text-white font-[Poppins] font-medium text-xl mb-2">
									Clients
								</p>
								<div className="w-full bg-gradient-to-br from-white to-[#C8D9FF] h-[230px] md:h-[220px] flex flex-col justify-center items-center gap-2 px-2 rounded-t-[20px] px">
									<Input
										value={searchData}
										onChange={handleSearchChange}
										onKeyDown={enterSearch}
										endContent={
											loadingClient ? (
												<Spinner size="sm" />
											) : (
												<Button
													variant="bordered"
													className="bg-none border-none"
													isDisabled={searchData.length === 0 && true}
													onClick={() => {
														getClientSearch(searchData);
														setLoadingClient(true);
													}}>
													<svg
														className="fill-[#3d1d93]"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24">
														<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
													</svg>
												</Button>
											)
										}
										placeholder="Search clients"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi-Medium]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi-Medium]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"mt-2",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									{/* <div className="w-full h-full border-2 "> */}

									{searchResult.length > 0 && (
										<ScrollShadow
											size="20"
											orientation="horizontal"
											className="overflow-x-scroll overflow-y-hidden flex justify-center items-start  hide-scrollbar w-full h-3/4 ">
											<CheckboxGroup
												classNames={{
													base: "h-full flex flex-row justify-center items-center ",
													wrapper:
														"flex flex-row justify-center items-center  w-full gap-4 h-full",
												}}
												value={selectedClient}
												onValueChange={setSelectedClient}>
												{searchResult?.map((client) => {
													return (
														<div className="flex justify-center items-center w-full md:w-auto mt-1 ">
															<div className="w-[130px] h-[130px] rounded-[15px] bg-[#3D1D93] flex flex-col justify-center items-center shadow-[2px_0_5px_1px_rgba(0,0,0,0.6)] gap-2">
																<Checkbox
																	value={{
																		_id: client._id,
																		name: client.name,
																		lastName: client.lastName,
																		adress: client.adress,
																		image: client.image,
																		phoneNumber: client.phoneNumber,
																		igUsername: client.igUsername,
																		idNumber: client.idNumber,
																	}}
																	color="default"
																	classNames={{
																		base: "flex flex-col justify-start items-start gap",
																		wrapper: "data-selected:bg-[#9477E4]",
																		label: "w-[110px] ",
																	}}>
																	<div className="flex flex-col justify-center items-center gap-1">
																		<img
																			src={client.image}
																			alt=""
																			className="w-16 h-16 object-cover rounded-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
																		/>
																		<p className="font-[Poppins] text-white text-[12px]">
																			{client.igUsername ||
																				`${client.name} ${client.lastName}`}
																		</p>
																	</div>
																</Checkbox>
															</div>
														</div>
													);
												})}
											</CheckboxGroup>
										</ScrollShadow>
									)}
									{/* </div> */}
									{searchResult.length === 0 && (
										<span className="h-[80%] flex items-center justify-center font-[Satoshi-Medium] text-medium md:text-lg text-[#232529] text-center">
											Search for a client to assign this order to
										</span>
									)}
								</div>
								<div
									className={`bg-[#232529] rounded-b-[20px] w-full min-h-[48px] ${
										selectedClient.length > 0 && "h-[136px]"
									} p-2 flex flex-col justify-center items-center gap-2`}>
									{selectedClient.length > 0 && (
										<>
											<p className="font-[Poppins] text-white text-sm font-medium mb-8">
												Shipping Adress
											</p>
											<Input
												label="Client's current adress, type to change it"
												name="shipingAdress"
												defaultValue={selectedClient[0]?.adress || ""}
												onChange={handleChange}
												classNames={{
													input: [
														"bg-white",
														"text-[#232529] dark:text-white/90",
														"font-[Satoshi-Medium]",
														"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
													],
													inputWrapper: [
														"data-[hover=true]:border-[#EBD5C4]",
														"border-none",
														"font-[Satoshi-Medium]",
														"bg-white",
														"!cursor-text",
														"h-11",
														"w-full",
														"inner-client-creation",
														"rounded-[10px]",
													],
												}}
											/>
										</>
									)}
								</div>
							</div>
							<div className="w-full h-auto flex flex-col justify-center items-center">
								<p className="text-white font-[Poppins] font-medium text-xl mb-2">
									Products
								</p>
								<div className="w-full bg-gradient-to-br from-white to-[#C8D9FF] h-[220px] flex flex-col justify-center items-center gap-2 p-2 rounded-t-[20px]">
									<Input
										value={productsSearch}
										onChange={productSearchChange}
										onKeyDown={enterProductSearch}
										endContent={
											<Button
												variant="bordered"
												className="bg-none border-none"
												isDisabled={productsSearch.length === 0 && true}
												onClick={() => {
													getProductsSearch(productsSearch);
													setLoading(true);
												}}>
												<svg
													className="fill-[#3d1d93]"
													xmlns="http://www.w3.org/2000/svg"
													height="24"
													viewBox="0 -960 960 960"
													width="24">
													<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
												</svg>
											</Button>
										}
										placeholder="Search products"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi-Medium]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi-Medium]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									<CheckboxGroup
										classNames={{
											base: "h-[80%]",
											wrapper:
												"flex flex-row justify-center items-center w-auto gap-8 h-full",
										}}
										value={selectedProducts}
										onValueChange={setSelectedProducts}>
										{loading ? (
											<Spinner />
										) : (
											productsResult?.map((product) => {
												return (
													<Badge
														classNames={{badge: "w-6"}}
														content={
															selectedProducts.find(
																(p) => p._id === product._id
															) && (
																<input
																	onChange={(e) => {
																		setMaxProductQuantity(
																			e.target.value > product.quantity
																				? true
																				: false
																		);
																		setNegativeQuantity(
																			e.target.value <= 0 ? true : false
																		);
																		handleQuantityChange(
																			product._id,
																			e.target.value
																		);
																	}}
																	name="quantity"
																	className="font-[Satoshi-Medium] w-8 h-6 rounded-md text-center"
																	defaultValue={1}
																	radius="full"
																	type="number"
																/>
															)
														}
														disableOutline
														size="lg">
														<div className="flex flex-col justify-center items-center w-full h-[100%]">
															<div className="w-[130px] h-[130px] rounded-[15px] bg-[#3D1D93] flex flex-col justify-center items-center shadow-[2px_2px_5px_1px_rgba(0,0,0,0.6)] gap-2 ">
																<Checkbox
																	value={{
																		...product,
																		quantity:
																			selectedProducts.find(
																				(p) => p._id === product._id
																			)?.quantity || 1,
																		stock: product.quantity,
																	}}
																	color="default"
																	onClick={() => {
																		product.quantity === 0
																			? setNoStock(true)
																			: setNoStock(false);
																		repeatedProduct(product._id);
																	}}
																	classNames={{
																		base: "flex flex-col justify-start items-start gap",
																		wrapper: "data-selected:bg-[#9477E4]",
																		label: "w-[110px] ",
																	}}>
																	<div className="flex flex-col justify-center items-center gap-1">
																		<img
																			src={product.image}
																			alt=""
																			className="w-16 h-16 object-cover rounded-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
																		/>
																		<p className="font-[Poppins] text-white text-[12px]">
																			${product.salePrice}
																		</p>
																	</div>
																</Checkbox>
															</div>
														</div>
													</Badge>
												);
											})
										)}
										{!loading && productsResult.length === 0 && (
											<span className="h-[80%] flex items-center justify-center font-[Satoshi-Medium] text-medium md:text-lg text-[#232529] text-center">
												Search for a product
											</span>
										)}
									</CheckboxGroup>
								</div>
								<div className="bg-[#232529] rounded-b-[20px] w-full h-auto p-2 flex flex-col justify-center items-center gap-3">
									<p className="font-[Poppins] text-white text-sm font-medium flex flex-col justify-center items-center">
										Total: {`$${totalOrderValue.toFixed(2)}`}
										<div className="flex flex-col justify-center items-center gap-2">
											{maxProductQuantity && (
												<span className="font-[Satoshi-Medium] text-red-500 text-center text-sm">
													Product quantity exceeds available stock
												</span>
											)}
											{noStock && (
												<span className="font-[Satoshi-Medium] text-red-500 text-center text-sm">
													No stock for this product
												</span>
											)}
											{negativeQuantity && (
												<span className="font-[Satoshi-Medium] text-red-500 text-center text-sm">
													Product quantity can't be 0 or less than 0
												</span>
											)}
										</div>
									</p>
									<div className="flex flex-wrap justify-center items-center gap-3 px-2">
										{selectedProducts?.map((product) => {
											return (
												<Badge
													disableOutline
													classNames={{
														badge: "w-5 h-5",
													}}
													onClick={() => {
														removeSelectedProduct(product._id);
														setMaxProductQuantity(false);
														setNegativeQuantity(false);
														setNoStock(false);
													}}
													content={
														<svg
															className="w-5"
															xmlns="http://www.w3.org/2000/svg"
															height="24"
															viewBox="0 -960 960 960"
															width="24">
															<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
														</svg>
													}>
													<Card
														classNames={{
															footer:
																"text-[10px] h-2 text-center text-white bg-[#3d1d93]",
															base: "h-auto",
														}}>
														<img
															src={product.image}
															alt=""
															className="w-16 h-16 object-cover rounded-t-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
														/>
														<CardFooter>{product.quantity}</CardFooter>
													</Card>
												</Badge>
											);
										})}
									</div>
								</div>
							</div>
						</div>
						<div className="w-full  bg-none flex flex-col justify-center items-center gap-5 px-4 py-8">
							<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
								<div className="w-full flex flex-col justify-center items-center">
									<p className="font-[Poppins] font-mdium text-white text-xl">
										Notes
									</p>
									<Textarea
										variant="faded"
										name="notes"
										onChange={handleChange}
										classNames={{
											label: "text-white",
											base: "text-[#232529] font-[Satoshi-Medium] ",
											inputWrapper:
												"bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30",
										}}
										label="Write important things you want to remember about this order..."
									/>
								</div>
								<div className="w-full flex flex-col justify-center items-center gap-1">
									<p className="font-[Poppins] font-mdium text-white text-xl">
										Payment Status
									</p>
									<div className="w-full flex flex-row justify-center items-center gap-3">
										<div
											onClick={() => setPaymentStatus("Paid")}
											className={`flex flex-col justify-center items-center w-[80px] h-[80px] rounded-xl ${
												paymentStatus === "Paid" ? "bg-[#232529]" : "bg-white"
											}`}>
											<svg
												className={`w-[40px] h-auto ${
													paymentStatus === "Paid"
														? "fill-white"
														: "fill-[#3d1d93]"
												}`}
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
											</svg>
											<p
												className={`font-[Poppins]  ${
													paymentStatus === "Paid"
														? "text-white"
														: "text-[#3d1d93]"
												} text-[10px] md:text-sm font-medium`}>
												Paid
											</p>
										</div>
										<div
											onClick={() => setPaymentStatus("Pending")}
											className={`flex flex-col justify-center items-center w-[80px] h-[80px] rounded-xl ${
												paymentStatus === "Pending"
													? "bg-[#232529]"
													: "bg-white"
											}`}>
											<svg
												className={`w-[40px] h-auto ${
													paymentStatus === "Pending"
														? "fill-white"
														: "fill-[#3d1d93]"
												}`}
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M280-420q25 0 42.5-17.5T340-480q0-25-17.5-42.5T280-540q-25 0-42.5 17.5T220-480q0 25 17.5 42.5T280-420Zm200 0q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm200 0q25 0 42.5-17.5T740-480q0-25-17.5-42.5T680-540q-25 0-42.5 17.5T620-480q0 25 17.5 42.5T680-420ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
											</svg>
											<p
												className={`font-[Poppins]  ${
													paymentStatus === "Pending"
														? "text-white"
														: "text-[#3d1d93]"
												} text-[10px] md:text-sm font-medium`}>
												Pending
											</p>
										</div>
										<div
											onClick={() => setPaymentStatus("Pre-order")}
											className={`flex flex-col justify-center items-center w-[80px] h-[80px] rounded-xl ${
												paymentStatus === "Pre-order"
													? "bg-[#232529]"
													: "bg-white"
											}`}>
											<svg
												className={`w-[40px] h-auto ${
													paymentStatus === "Pre-order"
														? "fill-white"
														: "fill-[#3d1d93]"
												}`}
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
											</svg>
											<p
												className={`font-[Poppins]  ${
													paymentStatus === "Pre-order"
														? "text-white"
														: "text-[#3d1d93]"
												} text-[10px] md:text-sm font-medium`}>
												Pre-order
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{awaitCreate ? (
						<Spinner />
					) : (
						<Button
							isDisabled={
								noStock ||
								negativeQuantity ||
								maxProductQuantity ||
								selectedClient.length === 0 ||
								selectedProducts.length === 0 ||
								paymentStatus === ""
									? true
									: false
							}
							onClick={handleSubmit}
							radius="sm"
							className="bg-[#c8d9ff] font-[Satoshi-Bold] text-lg text-[#3d1d93] w-40 h-12">
							Create
						</Button>
					)}
				</div>
				{createSuccess && (
					<span className="mt-[-10px] font-[Satoshi-Medium] text-medium text-center text-green-500">
						Order created successfully!
					</span>
				)}
				{createError && (
					<span className="mt-[-10px] font-[Satoshi-Medium] text-medium text-center text-red-500">
						An error occurred when creating the order, please try again
					</span>
				)}
			</div>
		</div>
	);
};

export default OrderCreation;
