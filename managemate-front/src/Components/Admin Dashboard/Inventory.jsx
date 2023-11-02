import {useState, useMemo} from "react";
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
} from "@nextui-org/react";
import NewProduct from "./NewProduct";
import ProductDetail from "./ProductDetail";
import {Link} from "react-router-dom";

const Inventory = () => {
	const [selectedKeys, setSelectedKeys] = useState(
		new Set(["Filter by cathegory"])
	);

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);

	const cathegoriesArray = [
		{
			name: "Monas chinas",
			products: [
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},

				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
			],
			productsQuantity: "5",
		},
		{
			name: "Dakimakuras",
			products: [
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},

				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
			],
			productsQuantity: "13",
		},
		{
			name: "Manga",
			products: [
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},

				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
			],
			productsQuantity: "2",
		},
		{
			name: "Bombas nucleares",
			products: [
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},

				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
			],
			productsQuantity: "50",
		},
		{
			name: "Bombas nucleares",
			products: [
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},

				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
			],
			productsQuantity: "50",
		},
		{
			name: "Bombas nucleares",
			products: [
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},

				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
			],
			productsQuantity: "50",
		},
		{
			name: "Bombas nucleares",
			products: [
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},

				{
					img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
				},
			],
			productsQuantity: "50",
		},
	];

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

	const [edit, setEdit] = useState(false);

	const editProduct = () => setEdit(!edit);

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
					<p className="font-[Satoshi-Bold] text-[#232529] w-full text-sm lg:text-medium">Store: Las papas</p>
				</NavbarContent>
				<NavbarContent className="md:hidden" justify="start">
					<NavbarMenuToggle className=" text-[#EBD5C4]" />
				</NavbarContent>
				<NavbarContent
					justify="center"
					color="foreground"
					className="flex gap-12">
					<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]">
						<svg
							className="hidden sm:flex w-8 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
						</svg>
						<Link to="/dashboard/home" className="text-sm">
							Home
						</Link>
					</NavbarItem>
					<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529] ">
						<svg
							className="hidden sm:flex w-8 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="M280-280h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
						</svg>
						<Link to="/dashboard/statistics" className="text-sm">
							Statistics
						</Link>
					</NavbarItem>
					<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529] ">
						<svg
							className="hidden sm:flex w-8 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
						</svg>
						<Link to="/dashboard/clients" className="text-sm">
							Clients
						</Link>
					</NavbarItem>
					<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]">
						<svg
							className="hidden sm:flex w-8 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
						</svg>
						<Link to="/dashboard/orders" className="text-sm">
							Orders
						</Link>
					</NavbarItem>
					<NavbarItem
						className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529] "
						isActive="true">
						<svg
							className="hidden sm:flex w-8 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z" />
						</svg>
						<Link to="/dashboard/inventory" className="text-sm">
							Inventory
						</Link>
					</NavbarItem>
				</NavbarContent>

				<NavbarMenu>
					<Link to="/dashboard/home" className="w-full font-[Satoshi-Bold]">
						Home
					</Link>
					<Link
						to="/dashboard/statistics"
						className="w-full font-[Satoshi-Bold]">
						Statistics
					</Link>
					<Link to="/dashboard/clients" className="w-full font-[Satoshi-Bold]">
						Clients
					</Link>
					<Link to="/dashboard/orders" className="w-full font-[Satoshi-Bold]">
						Orders
					</Link>
					<Link
						to="/dashboard/inventory"
						className="w-full font-[Satoshi-Bold]">
						Inventory
					</Link>
				</NavbarMenu>
				<NavbarContent as="div" justify="end">
					<Dropdown
						placement="bottom-end"
						className="bg-[#3D1D93] text-white shadow-[4px_4px_12px_2px_rgba(0,0,0,0.8)] font-[Satoshi]">
						<DropdownTrigger>
							<Avatar
								as="button"
								className="transition-transform object-cover"
								color="primary"
								name="Jason Hughes"
								size="md"
								src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="shadow">
							<DropdownItem key="settings">
								<Link to="/manager/account">Settings</Link>
							</DropdownItem>
							<DropdownItem key="system">
								<Link to="/manager">Go to store manager</Link>
							</DropdownItem>
							<DropdownItem key="help_and_feedback">
								Help & Feedback
							</DropdownItem>
							<DropdownItem key="logout" color="danger">
								Log Out
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
					stock, create new products and organize them by cathegory.
				</p>
				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center md:flex-row mt-6 xl:mt-12">
					<div className="flex flex-col md:flex-row justify-center items-center gap-3">
						<Button
							onClick={onOpenModal1}
							radius="sm"
							className="bg-[#3d1d93] font-[Satoshi] text-medium text-white w-auto">
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
							// placement="center"
							isOpen={isOpenModal1}
							onOpenChange={onOpenChangeModal1}>
							<ModalContent>
								<ModalHeader>New Product</ModalHeader>
								<ModalBody>
									<NewProduct />
								</ModalBody>
							</ModalContent>
						</Modal>
						<Dropdown>
							<DropdownTrigger>
								<Button
									radius="sm"
									className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-[158px]">
									{selectedValue}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								selectedKeys={selectedKeys}
								onSelectionChange={setSelectedKeys}
								selectionMode="single">
								<DropdownItem key="Filter by cathegory">
									Filter by cathegory
								</DropdownItem>
								<DropdownItem key="Monas chinas">Monas chinas</DropdownItem>
								<DropdownItem key="Dakimakuras">Dakimakuras</DropdownItem>
								<DropdownItem key="Manga">Manga</DropdownItem>
								<DropdownItem key="Bombas nucleares">
									Bombas nucleares
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className="w-full md:w-1/2 ">
						<Input
							endContent={
								<svg
									onClick={onOpenModal2}
									className="fill-[#ebd5c4]"
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24">
									<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
								</svg>
							}
							variant="bordered"
							placeholder="Search Products"
							radius="full"
							classNames={{
								input: [
									"bg-[#1C1E21]",
									"text-white dark:text-white/90",
									"font-[Satoshi]",
									"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
								],
								inputWrapper: [
									"data-[hover=true]:border-[#EBD5C4]",
									"border-none",
									"inner-shadow-input",
									"font-[Satoshi]",
									"bg-[#1C1E21]",
									"!cursor-text",
									"h-11",
									"w-auto",
									"rounded-[10px]",
								],
							}}
						/>
						<Modal
							scrollBehavior="outside"
							backdrop="blur"
							className="bg-[#232529] flex justify-center w-auto"
							placement="center"
							isOpen={isOpenModal2}
							onOpenChange={onOpenChangeModal2}>
							<ModalContent>
								<ModalHeader className="flex justify-start">
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
								<ProductDetail />
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
													<Avatar className="w-28 h-28" />
												</Badge>
												<Button className="bg-[#3d1d93] font-[Satoshi] text-medium text-white w-auto">
													Update
												</Button>
											</div>
											<div className="flex flex-col justify-center items-center gap-3">
												<Input
													variant="bordered"
													classNames={{
														input: [
															"bg-[#1C1E21]",
															"text-white dark:text-white/90",
															"font-[Satoshi]",
															"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
														],
														inputWrapper: [
															"data-[hover=true]:border-[#EBD5C4]",
															"border-none",
															"inner-shadow-input",
															"font-[Satoshi]",
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
													variant="bordered"
													classNames={{
														input: [
															"bg-[#1C1E21]",
															"text-white dark:text-white/90",
															"font-[Satoshi]",
															"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
														],
														inputWrapper: [
															"data-[hover=true]:border-[#EBD5C4]",
															"border-none",
															"inner-shadow-input",
															"font-[Satoshi]",
															"bg-[#1C1E21]",
															"!cursor-text",
															"h-11",
															"w-auto",
															"rounded-[10px]",
														],
													}}
													label="New dexcription"
												/>
												<div className="md:w-52 flex flex-col md:flex-row justify-center gap-2 ">
													<Input
														type="number"
														variant="bordered"
														label="Purchase price"
														classNames={{
															input: [
																"bg-[#1C1E21]",
																"text-white dark:text-white/90",
																"font-[Satoshi]",
																"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
															],
															inputWrapper: [
																"data-[hover=true]:border-[#EBD5C4]",
																"border-none",
																"inner-shadow-input",
																"font-[Satoshi]",
																"bg-[#1C1E21]",
																"!cursor-text",
																"h-11",
																"w-auto",
																"rounded-[10px]",
															],
														}}
													/>
													<Input
														type="number"
														variant="bordered"
														label="Sale price"
														classNames={{
															input: [
																"bg-[#1C1E21]",
																"text-white dark:text-white/90",
																"font-[Satoshi]",
																"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
															],
															inputWrapper: [
																"data-[hover=true]:border-[#EBD5C4]",
																"border-none",
																"inner-shadow-input",
																"font-[Satoshi]",
																"bg-[#1C1E21]",
																"!cursor-text",
																"h-11",
																"w-auto",
																"rounded-[10px]",
															],
														}}
													/>
												</div>
											</div>
										</div>
									</ModalFooter>
								)}
							</ModalContent>
						</Modal>
					</div>
				</div>
				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center mt-8 xl:mt-12">
					<div className="w-full flex flex-col justify-center items-center md:flex-row gap-4 lg:gap-8">
						<div className="flex justify-center items-center gap-2 md:gap-5 lg:gap-8">
							<div className="w-[121px] h-[121px] md:w-[150px] lg:w-[180px] md:h-[150px] lg:h-[180px] rounded-[25px] bg-gradient-to-br from-[#383C42] to-[#232529] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center gap-4">
								<p className="font-[Poppins] text-white text-center text-[10px] md:text-[13px]">
									Total cathegories
								</p>
								<p className="font-[Poppins] font-semibold text-4xl text-center text-[#ebd5c4] md:text-5xl">
									20
								</p>
							</div>
							<div className="w-[121px] h-[121px] md:w-[150px] lg:w-[180px] md:h-[150px] lg:h-[180px] rounded-[25px] bg-gradient-to-br from-[#383C42] to-[#232529] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center gap-4">
								<p className="font-[Poppins] text-white text-center text-[10px] md:text-[13px]">
									Products
								</p>
								<p className="font-[Poppins] font-semibold text-4xl text-center text-[#ebd5c4] md:text-5xl">
									243
								</p>
							</div>
						</div>
						<div className=" w-full h-[130px] md:h-[150px] lg:h-[180px] rounded-[20px] bg-gradient-to-br from-white to-[#C8D9FF] flex justify-center items-center shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] px-4 lg:gap-10">
							<p className="font-[Poppins] font-bold text-[#3d1d93] text-4xl md:text-5xl lg:text-6xl w-[6ch] lg:w-auto">
								Best Seller
							</p>
							<img
								src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg"
								alt=""
								className="object-cover rounded-md w-24 md:w-32 lg:w-40 h-auto shadow-[4px_4px_10px_rgba(0,0,0,0.2)]"
							/>
						</div>
					</div>
					<div className="w-full flex flex-col justify-center items-center mt-10 ">
						<p className="text-[#ebd5c4] font-[Satoshi-Medium] text-2xl text-left w-full">
							Cathegories
						</p>
						<div className="w-full flex flex-col justify-start items-center md:flex-wrap md:flex-row gap-6 md:justify-center lg:justify-start lg:gap-6 mt-16">
							{cathegoriesArray.map((cathegory) => {
								return (
									<Badge
										disableOutline
										content={`${cathegory.productsQuantity}`}
										placement="bottom-right"
										classNames={{
											base: "hover:scale-[101%] transition-transform ",
											badge:
												"text-center rounded-full w-10 h-10 bg-white backdrop-blur-[8px] bg-opacity-20 font-[Poppins] font-bold text-[#3d1d93] text-lg",
										}}>
										<Link to="/dashboard/inventory/cathegory">
											<div className="w-[230px] h-[180px] rounded-[18px] flex flex-col justify-center items-center p-2 bg-gradient-to-br from-white to-[#C8D9FF] ">
												<p className="text-[#3d1d93] font-[Poppins] text-lg font-bold text-center">
													{cathegory.name}
												</p>
												<div className="w-full h-[130px] bg-[#232529] rounded-[8px] justify-between items-start grid grid-cols-3 place-items-center py-3">
													{cathegory.products.map((product) => {
														return (
															<img
																src={product.img}
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
			</div>
		</div>
	);
};

export default Inventory;
