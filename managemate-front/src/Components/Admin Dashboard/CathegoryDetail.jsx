import {useState} from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
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
import {Link} from "react-router-dom";
import NewProduct from "./NewProduct";
import ProductCard from "./ProductCard";

const CathegoryDetail = () => {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [remove, setRemove] = useState(false);

	const toggleRemove = () => setRemove(!remove);

	const products = [
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "LAS PAPAS",
			description:
				"Papas a la francesa con salsa de tomate, tambien con un acompañamiento de papas con mas PAPAAAAAAAAAAAAAS",
			quantity: 21,
		},
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "Papas",
			description: "Papas a la francesa",
			quantity: 21,
		},
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "Papas",
			description: "Papas a la francesa",
			quantity: 21,
		},
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "Papas",
			description: "Papas a la francesa",
			quantity: 21,
		},
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "Papas",
			description: "Papas a la francesa",
			quantity: 21,
		},
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "Papas",
			description: "Papas a la francesa",
			quantity: 21,
		},
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "Papas",
			description: "Papas a la francesa",
			quantity: 21,
		},
		{
			image:
				"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
			name: "Papas",
			description: "Papas a la francesa",
			quantity: 21,
		},
	];
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
					<NavbarMenuToggle className="text-[#EBD5C4]" />
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
			<div className="flex flex-col justify-center items-center gap-8">
			<div className="w-[250px] md:w-[680px] lg:w-[1000px] mt-10 flex justify-start items-center gap-2">
					<Link to="/dashboard/inventory">
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
						Back to inventory
					</p>
				</div>
				<h1 className="text-white text-4xl font-[Poppins] text-center font-semibold mt-10 xl:mt-4">
					Cathegory
				</h1>
				<p className="font-[Questrial] text-sm text-white w-[30ch] md:w-[90ch] lg:w-[120ch] xl:w-[130ch] text-center">
					Description of this cathegory
				</p>
				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col justify-between items-center md:flex-row mt-6 xl:mt-12 ">
					<div className="flex flex-col md:flex-row justify-center items-center gap-3">
						<Button
							onClick={onOpen}
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
							isOpen={isOpen}
							onOpenChange={onOpenChange}>
							<ModalContent>
								<ModalHeader>New Product</ModalHeader>
								<ModalBody>
									<NewProduct />
								</ModalBody>
							</ModalContent>
						</Modal>
						<Button
							onClick={toggleRemove}
							radius="sm"
							className={
								remove
									? `bg-red-500 font-[Satoshi] text-medium text-white w-auto`
									: `bg-[#3d1d93] font-[Satoshi] text-medium text-white w-auto`
							}>
							Remove products
						</Button>
					</div>
					<div className="w-full md:w-1/2 ">
						<Input
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
					</div>
				</div>
				<div className="w-[250px] md:w-[680px] lg:w-[1000px] gap-8 h-auto flex flex-col md:flex-row md:flex-wrap justify-between items-center mt-8 xl:mt-12">
					{remove
						? products.map((product) => {
								return (
									<Badge
										className="bg-[#3d1d93] backdrop-blur-[8px] bg-opacity-20 w-6 h-6"
										disableOutline
										content={
											<svg
												className="fill-white"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
											</svg>
										}>
										<ProductCard product={product} />
									</Badge>
								);
						  })
						: products.map((product) => {
								return <ProductCard product={product} />;
						  })}
				</div>
			</div>
		</div>
	);
};

export default CathegoryDetail;
