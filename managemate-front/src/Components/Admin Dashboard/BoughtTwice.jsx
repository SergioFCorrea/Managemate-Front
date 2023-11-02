import {useState, useMemo} from "react";
import {
	Card,
	CardFooter,
	CardHeader,
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
import ClientDetail from "./ClientDetail";
import {Link} from "react-router-dom";

const BoughtTwice = () => {
	const [selectedKeys, setSelectedKeys] = useState(
		new Set(["Filter by origin"])
	);

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);

	const customers = [
		{
			img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg",
			name: "El nombre",
			origin: "wpp",
			purchases: 6,
		},
        {
			img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg",
			name: "El nombre",
			origin: "wpp",
			purchases: 6,
		},
        {
			img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg",
			name: "El nombre",
			origin: "wpp",
			purchases: 6,
		},
        {
			img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg",
			name: "El nombre",
			origin: "wpp",
			purchases: 6,
		},
        {
			img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg",
			name: "El nombre",
			origin: "wpp",
			purchases: 6,
		},
        {
			img: "https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg",
			name: "El nombre",
			origin: "wpp",
			purchases: 6,
		},
	];

	const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
				<NavbarContent justify="start">
					<NavbarMenuToggle className="md:hidden text-[#EBD5C4]" />
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
					<NavbarItem
						className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529] "
						isActive="true">
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
					<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529] ">
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
							<DropdownItem key="settings">Settings</DropdownItem>
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
				<div className="w-[250px] md:w-[680px] lg:w-[1000px] mt-10 flex justify-start items-center gap-2">
					<Link to="/dashboard/clients">
						<svg
							className="fill-[#ebd5c4] w-8 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
						</svg>
					</Link>
					<p className="font-[Poppins] font-semibold text-medium md:text-lg">
						Back to clients
					</p>
				</div>
				<h1 className="fonts-[Poppins] font-semibold text-4xl text-center text-white mt-10 xl:mt-4">
					Recurring customers
				</h1>
				<p className="font-[Questrial] text-sm text-white w-[30ch] md:w-[90ch] lg:w-[120ch] xl:w-[130ch] text-left">
					See the detail of the customers that bought twice or more from you,
					search specific customers and filter by customer origin
				</p>
				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center md:flex-row mt-6 xl:mt-12">
					<div className="flex flex-col md:flex-row justify-center items-center gap-3">
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
								<DropdownItem key="Filter by origin">
									Filter by origin
								</DropdownItem>
								<DropdownItem key="Whatsapp">Whatsapp</DropdownItem>
								<DropdownItem key="Instagram">Instagram</DropdownItem>
								<DropdownItem key="Facebook">Facebook</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className="w-full md:w-1/2 ">
						<Input
							endContent={
								<svg
									onClick={onOpen}
									className="fill-[#ebd5c4]"
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24">
									<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
								</svg>
							}
							variant="bordered"
							placeholder="Search Customers"
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
					</div>
				</div>
				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center mt-8 xl:mt-12">
					<div className="w-full flex flex-col justify-center md:justify-start items-center md:flex-row gap-4 lg:gap-8 ">
						<div className=" w-full md:w-[70%] h-[130px] md:h-[150px] lg:h-[180px] rounded-[20px] bg-gradient-to-br from-white to-[#C8D9FF] flex justify-between items-center shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] px-4 lg:gap-10">
							<p className="font-[Poppins] font-bold text-[#3d1d93] text-xl md:text-5xl lg:text-[52px] w-auto">
								Client with most purchases
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
							Customers
						</p>
						<div className="w-full flex flex-col justify-start items-center md:flex-wrap md:flex-row gap-6 md:justify-center lg:justify-start lg:gap-12 mt-16">
							{customers.map((customer) => {
								return (
									<Badge
										disableOutline
										content={
											<svg
												className="h-6 w-6 fill-white"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>Instagram</title>
												<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
											</svg>
										}
										placement="top-right"
										classNames={{
											base: "hover:scale-[101%] transition-transform ",
											badge:
												"text-center rounded-full w-10 h-10 bg-white backdrop-blur-[8px] bg-opacity-20 font-[Poppins] font-bold text-[#3d1d93] text-lg",
										}}>
										<Card
											isPressable
											onPress={onOpenChange}
											isFooterBlurred
											radius="lg"
											className="border-none shadow-[4px_4px_18px_0_rgba(0,0,0,0.6)] flex justify-center items-center">
											<CardHeader className="bg-[#3d1d93] text-white font-[Satoshi]">{customer.name}</CardHeader>
											<img
												src={customer.img}
												alt=""
												className="w-[200px] h-[200px]"
											/>
											<CardFooter className="justify-center before:bg-white/10 border-gray-400 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-28 shadow-small ml-1 z-10">
												<p className="text-tiny text-black font-[Poppins] font-semibold">
													Purchases: {customer.purchases}
												</p>
											</CardFooter>
										</Card>
									</Badge>
								);
							})}
							<Modal
								isOpen={isOpen}
								onOpenChange={onOpenChange}
								scrollBehavior="outside"
								size="xl">
								<ModalContent>
									<ClientDetail />
								</ModalContent>
							</Modal>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoughtTwice;
