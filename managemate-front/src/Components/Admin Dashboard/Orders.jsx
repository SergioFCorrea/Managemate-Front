import "./styles.css";
import {useState, useMemo} from "react";
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
	Divider,
	getKeyValue,
} from "@nextui-org/react";
import OrderDetail from "./OrderDetail";
import {Link} from "react-router-dom";

const Orders = () => {
	const orders = [
		{
			key: "1",
			number: "1234567",
			payment: "Tony Reichert",
			shipment: "CEO",
			value: "Active",
		},
		{
			key: "2",
			number: "1234567",
			payment: "Zoey Lang",
			shipment: "Technical Lead",
			value: "Paused",
		},
		{
			key: "3",
			number: "1234567",
			payment: "Jane Fisher",
			shipment: "Senior Developer",
			value: "Active",
		},
		{
			key: "4",
			number: "1234567",
			payment: "William Howard",
			shipment: "Community Manager",
			value: "Vacation",
		},
		{
			key: "5",
			number: "1234567",
			payment: "Emily Collins",
			shipment: "Marketing Manager",
			value: "Active",
		},
		{
			key: "6",
			number: "1234567",
			payment: "Brian Kim",
			shipment: "Product Manager",
			value: "Active",
		},
		{
			key: "7",
			number: "1234567",
			payment: "Laura Thompson",
			shipment: "UX Designer",
			value: "Active",
		},
		{
			key: "8",
			number: "1234567",
			payment: "Michael Stevens",
			shipment: "Data Analyst",
			value: "Paused",
		},
		{
			key: "9",
			number: "1234567",
			payment: "Sophia Nguyen",
			shipment: "Quality Assurance",
			value: "Active",
		},
		{
			key: "10",
			number: "1234567",
			payment: "James Wilson",
			shipment: "Front-end Developer",
			value: "Vacation",
		},
		{
			key: "11",
			number: "1234567",
			payment: "Ava Johnson",
			shipment: "Back-end Developer",
			value: "Active",
		},
		{
			key: "12",
			number: "1234567",
			payment: "Isabella Smith",
			shipment: "Graphic Designer",
			value: "Active",
		},
		{
			key: "13",
			number: "1234567",
			payment: "Oliver Brown",
			shipment: "Content Writer",
			value: "Paused",
		},
		{
			key: "14",
			number: "1234567",
			payment: "Lucas Jones",
			shipment: "Project Manager",
			value: "Active",
		},
		{
			key: "15",
			number: "1234567",
			payment: "Grace Davis",
			shipment: "HR Manager",
			value: "Active",
		},
		{
			key: "16",
			number: "1234567",
			payment: "Elijah Garcia",
			shipment: "Network Administrator",
			value: "Active",
		},
		{
			key: "17",
			number: "1234567",
			payment: "Emma Martinez",
			shipment: "Accountant",
			value: "Vacation",
		},
		{
			key: "18",
			number: "1234567",
			payment: "Benjamin Lee",
			shipment: "Operations Manager",
			value: "Active",
		},
		{
			key: "19",
			number: "1234567",
			payment: "Mia Hernandez",
			shipment: "Sales Manager",
			value: "Paused",
		},
		{
			key: "20",
			number: "1234567",
			payment: "Daniel Lewis",
			shipment: "DevOps Engineer",
			value: "Active",
		},
		{
			key: "21",
			number: "1234567",
			payment: "Amelia Clark",
			shipment: "Social Media Specialist",
			value: "Active",
		},
		{
			key: "22",
			number: "1234567",
			payment: "Jackson Walker",
			shipment: "Customer Support",
			value: "Active",
		},
		{
			key: "23",
			number: "1234567",
			payment: "Henry Hall",
			shipment: "Security Analyst",
			value: "Active",
		},
		{
			key: "24",
			number: "1234567",
			payment: "Charlotte Young",
			shipment: "PR Specialist",
			value: "Paused",
		},
		{
			key: "25",
			number: "1234567",
			payment: "Liam King",
			shipment: "Mobile App Developer",
			value: "Active",
		},
	];

	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const pages = Math.ceil(orders.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return orders.slice(start, end);
	}, [page, orders]);

	const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
						<Link to="/dashboard/orders" className="text-sm">
							Orders
						</Link>
					</NavbarItem>
					<NavbarItem className="hidden h-full w-16 sm:flex sm:flex-col justify-center items-center font-[Satoshi-Bold] text-[#232529]">
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
					Orders
				</h1>
				<p className="font-[Questrial] text-sm text-white w-[30ch] md:w-[90ch] lg:w-[120ch] xl:w-[130ch] text-center">
					Manage and create new orders to track, get detailed information about
					orders and find specific orders in the order finder.
				</p>

				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center md:flex-row mt-8 xl:mt-12">
					<Link to="/dashboard/order-creation">
						<Button
							radius="sm"
							className="bg-[#3d1d93] font-[Satoshi] text-medium text-white w-34">
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
							variant="bordered"
							placeholder="Search Orders"
							radius="full"
							classNames={{
								input: [
									"data-hover:bg-red-500",
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
				<div className="w-[250px] h-auto md:w-[680px] lg:w-[1000px] flex flex-col justify-center items-center  gap-8 mt-20 md:mt-0 lg:mt-8 ">
					<div className=" w-[280px] md:w-full flex flex-col justify-center items-center gap-6 ">
						<p className="font-[Poppins] font-medium text-xl text-white">
							Active Orders
						</p>
						<Table
							onRowAction={onOpen}
							aria-label="Active orders"
							bottomContent={
								<div className="flex w-full justify-center">
									{orders.length > 0 && (
										<Pagination
											classNames={{
												cursor:
													"bg-[#3d1d93] text-white rounded-full w-6 h-6 md:w-10 md:h-10",
												base: "w-full m-0 md:mb-12 md:mt-0 md:w-auto",
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
								th: "bg-[#232529] text-[#ebd5c4] text-[8.3px] md:text-[12px] xl:text-[15px]",
								tr: " hover:text-[#3d1d93] ",
								wrapper:
									"inner-shadow-active-orders min-h-[222px] w-[280px] md:h-[305px] md:w-full  bg-[#EBD5C4] text-[#232529] font-[Poppins] p-2 md:p-3 flex flex-col justify-between items-center overflow-hidden",
								td: "text-[8.7px] md:text-[12px] xl:text-[13px] font-medium",
							}}>
							<TableHeader>
								<TableColumn key="number">Number</TableColumn>
								<TableColumn key="payment">Payment</TableColumn>
								<TableColumn key="shipment">Shipment</TableColumn>
								<TableColumn key="value">Value</TableColumn>
							</TableHeader>
							<TableBody items={items}>
								{(item) => (
									<TableRow key={item.name}>
										{(columnKey) => (
											<TableCell>{getKeyValue(item, columnKey)}</TableCell>
										)}
									</TableRow>
								)}
							</TableBody>
						</Table>
						<Modal
							radius="lg"
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							scrollBehavior="outside"
							size="xl">
							<ModalContent>
								<ModalHeader className="bg-[#3d1d93] rounded-t-xl text-center flex justify-center items-center text-white">
									Nº 1231232
								</ModalHeader>
								<ModalBody className="rounded-b-xl bg-gradient-to-br from-[#9477E4] to-[#3d1d93]">
									<OrderDetail />
								</ModalBody>
							</ModalContent>
						</Modal>
					</div>
					<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-14">
						<div className="bg-gradient-to-br flex flex-col justify-center items-center from-[#383C42] to-[#232529] rounded-[20px] w-full h-[180px] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] gap-5 ">
							<p className="font-[Poppins] text-white text-sm text-center">
								Average order value
							</p>
							<p className="font-[Poppins] font-semibold text-[#ebd5c4] text-7xl">
								$117
							</p>
						</div>
						<div className="bg-gradient-to-br flex flex-col justify-center items-center from-[#383C42] to-[#232529] rounded-[20px] w-full h-[180px] shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] gap-5">
							<p className="font-[Poppins] text-white text-sm text-center w-[25ch]">
								Average number of products per order
							</p>
							<p className="font-[Poppins] font-semibold text-[#ebd5c4] text-7xl">
								2
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orders;
