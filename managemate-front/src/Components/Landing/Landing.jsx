import {Button} from "@nextui-org/react";
import {useState} from "react";
import "./Landing.css";
import logo from "./managemate-log-dark-mode.png";
import logolight from "./managemate-logo-light-mode.png";
import backgroundImg from "./behance-63adee33ddf03.jpg";
import secondbg from "./behance-63adeeaeaafb1.jpg";
import iMac from "./Black iMac Sales.png";
import iPhoneX from "./iphone x mockup.png";
import macbook from "./Macbook Sales Mockup.png";
import logoletter from "./managemate-txt-dark.png";
import graph from "./managemate-graph-test-3@1-1390x1080.png";

import {
	Divider,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
} from "@nextui-org/react";

const Landing = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuItems = ["Contact", "Login", "Sign Up"];

	const manageMenu = () => {
		setIsMenuOpen(true);
	};
	return (
		<div>
			<Navbar
				onMenuOpenChange={() => manageMenu}
				position="static"
				className="sm:bg-[#EBD5C4]"
				maxWidth="2xl">
				<NavbarBrand className="hidden sm:flex ">
					<img src={logolight} alt="" className="w-[90px] h-auto mr-[-40px]" />
					<img src={logoletter} alt="" className="w-[180px] h-auto " />
				</NavbarBrand>
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="sm:hidden text-[#EBD5C4]"
					/>
				</NavbarContent>

				<NavbarContent justify="end" color="foreground">
					<NavbarItem className="hidden sm:flex font-[Satoshi-Bold] text-[#232529]">
						Contact
					</NavbarItem>
					<NavbarItem className="hidden sm:flex font-[Satoshi-Bold] text-[#232529] ">
						Login
					</NavbarItem>
					<NavbarItem className="hidden sm:flex font-[Satoshi-Bold] text-[#232529]">
						Sign Up
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color="foreground"
								className="w-full font-[Satoshi-Bold]"
								href="#"
								size="lg">
								{item}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
				<NavbarBrand className="sm:hidden">
					<img src={logo} alt="" />
				</NavbarBrand>
			</Navbar>
			<div className="relative w-full h-[100vh] flex justify-center md:flex md:justify-center md:items-center">
				<img
					src={backgroundImg}
					alt=""
					className="bg-cover bg-center opacity-80 absolute transform w-full h-full mix-blend-multiply"
				/>
				<div className="w-[85vw] flex justify-center items-center flex-col relative gap-y-12 md:w-[46%] 2xl:w-[40%]  2xl:mb-16 2xl:gap-y-36">
					<h1 className="text-5xl font-[Poppins] font-bold text-[#E0BEA4] leading-[60px] md:text-left 2xl:text-7xl 2xl:w-[12ch]">
						Manage your{" "}
						<span className="text-[#9477E4] bg-none">Instagram</span> sales and
						customers
					</h1>
					<div className="w-auto flex justify-center ">
						<Button
							className="bg-[#9477E4] w-22 font-[Satoshi-Bold] 2xl:w-36 2xl:h-12"
							radius="sm">
							START NOW
						</Button>
					</div>
				</div>
				<div className="hidden md:flex md:h-auto md:w-[46%] 2xl:w-[40%]  relative">
					<img src={graph} alt="" className="w-full h-auto" />
				</div>
			</div>
			<div className="h-auto w-full flex justify-center bg-gradient-to-br from-[#F5E9E1] to-[#EBD5C4]">
				<div className="w-[85vw]  flex flex-col justify-center items-center gap-y-12 py-8">
					<h2 className="text-5xl text-center font-[Poppins] font-bold leading-[60px] text-[#232529]">
						Keep track of all your Instagram sales.
					</h2>
					<div className="flex justify-center flex-col items-center w-[85vw] h-auto md:flex md:justify-center md:flex-row gap-12 md:gap-24">
						<div className="bg-[#232529] rounded-xl p-4 shadow-[4px_4px_18px_0_rgba(0,0,0,0.4)] flex justify-center items-center flex-col gap-y-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-[#EBD5C4]">
								<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
							</svg>
							<p className="text-lg md:text-xl w-[22ch] font-[Questrial] text-[#EBD5C4] md:w-[12ch] text-center ">
								Save orders with their details and customer info.
							</p>
						</div>
						<div className="bg-[#232529] rounded-xl p-4 shadow-[4px_4px_18px_0_rgba(0,0,0,0.4)] flex justify-center items-center flex-col gap-y-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-[#EBD5C4]">
								<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
							</svg>
							<p className="text-lg md:text-xl w-[22ch] font-[Questrial] text-[#EBD5C4] md:w-[12ch] text-center ">
								Manage your active orders and see their info.
							</p>
						</div>
						<div className="bg-[#232529] rounded-xl p-4 shadow-[4px_4px_18px_0_rgba(0,0,0,0.4)] flex justify-center items-center flex-col gap-y-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-[#EBD5C4]">
								<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
							</svg>
							<p className="text-lg md:text-xl w-[22ch] font-[Questrial] text-[#EBD5C4] md:w-[12ch] text-center ">
								Search past orders and checkout their details.
							</p>
						</div>
					</div>
					<div className="circular-gradient rounded-full h-64 w-64 md:w-[450px] md:h-[450px] flex justify-center items-center">
						<img
							src={iMac}
							alt=""
							className="w-[100vw] sm:w-[60vw] md:w-[50%] 2xl:w-[35%] h-auto absolute"
						/>
					</div>
				</div>
			</div>
			<div className="h-[300vh] w-full flex justify-center flex-col items-center relative ">
				<img
					src={secondbg}
					alt=""
					className="bg-cover bg-center opacity-50 absolute  w-[150vw] h-full mix-blend-multiply"
				/>
				<div className="w-[85vw] h-[80vh] flex flex-col justify-center items-center gap-y-12 relative sm:h-[50vh]">
					<h2 className="text-[35px] text-center md:text-5xl lg:w-[25ch] font-[Poppins] font-bold leading-[58px] text-[#EBD5C4] lg:leading-[60px]">
						Create customers, <span className="text-[#C8D9FF]">save</span> their
						contact <span className="text-[#C8D9FF]">information</span> and
						sales history.
					</h2>
				</div>
				<div className="h-[80vh] md:h-[100vh] w-[85vw] justify-center flex flex-col md:flex-row items-center md:mt-[-90px]">
					<div className="flex justify-center items-center md:flex-col md:justify-start md:items-center gap-2 md:gap-8">
						<div className="bg-none md:bg-[#1C1E21] rounded-xl p-3 flex items-center md:gap-6 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="hidden md:flex fill-[#EBD5C4]">
								<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
							</svg>
							<p className="text-[Questrial] text-[12px] text-white w-[10ch] md:w-[20ch] md:text-lg lg:text-xl 2xl:text-2xl text-center md:text-left">
								See how many times a customer bought
							</p>
						</div>
						<Divider
							orientation="vertical"
							className="bg-[#EBD5C4] md:hidden"
						/>
						<div className="bg-none md:bg-[#1C1E21] rounded-xl p-3 flex items-center md:gap-6 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="hidden md:flex fill-[#EBD5C4]">
								<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
							</svg>
							<p
								className="text-[Questrial] text-[12px] text-white w-[10ch] md:w-[20ch] md:text-lg
							lg:text-xl  2xl:text-2xl text-center md:text-left">
								Search customers and see their profile
							</p>
						</div>
						<Divider
							orientation="vertical"
							className="bg-[#EBD5C4] md:hidden"
						/>
						<div className="bg-none md:bg-[#1C1E21] rounded-xl p-3 flex items-center md:gap-6 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="hidden md:flex fill-[#EBD5C4]">
								<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
							</svg>
							<p
								className="text-[Questrial] text-[12px] text-white w-[10ch] md:w-[20ch] md:text-lg
							lg:text-xl  2xl:text-2xl text-center md:text-left">
								Get statistics about your customers
							</p>
						</div>
					</div>
					<img
						src={iPhoneX}
						alt=""
						className="h-auto w-full sm:w-[50%] md:w-[40%] lg:w-[30%] bg-cover bg-center relative  "
					/>
				</div>
				<div className="mt-20 sm:mt-0 h-[100vh] w-[85vw] flex flex-col justify-center items-center gap-y-12 relative ">
					<h2 className="text-[35px] text-center md:text-5xl font-[Poppins] font-bold leading-[58px] lg:w-[25ch]">
						Get sales <span className="text-[#C8D9FF]">statistics</span> and
						insights from your <span className="text-[#C8D9FF]">stores</span>{" "}
					</h2>

					<div className="h-full flex flex-col justify-center items-center md:flex-row gap-8 ">
						<img
							src={macbook}
							alt=""
							className="h-auto w-full sm:w-[50%] md:w-[45%] bg-cover bg-center "
						/>
						<div className="flex md:flex-col justify-center items-center gap-2 md:gap-y-8 h-auto ">
							<div className="bg-none md:bg-[#1C1E21] rounded-xl p-3 flex  items-center md:gap-6 ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24"
									className="hidden md:flex fill-[#C8D9FF]">
									<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
								</svg>
								<p className="text-[Questrial] text-[12px] text-white w-[10ch] md:w-[20ch] md:text-lg lg:text-xl 2xl:text-2xl text-center md:text-left">
									See your total profit and sales number.
								</p>
							</div>
							<Divider
								orientation="vertical"
								className="bg-[#EBD5C4] md:hidden"
							/>
							<div className="bg-none md:bg-[#1C1E21] rounded-xl p-3 flex items-center md:gap-6 ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24"
									className="hidden md:flex fill-[#C8D9FF]">
									<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
								</svg>
								<p
									className="text-[Questrial] text-[12px] text-white w-[10ch] md:w-[20ch] md:text-lg
							lg:text-xl  2xl:text-2xl text-center md:text-left">
									Get insights from your sales channels.
								</p>
							</div>
							<Divider
								orientation="vertical"
								className="bg-[#EBD5C4] md:hidden"
							/>
							<div className="bg-none md:bg-[#1C1E21] rounded-xl p-3 flex items-center md:gap-6 ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24"
									className="hidden md:flex fill-[#C8D9FF]">
									<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
								</svg>
								<p
									className="text-[Questrial] text-[12px] text-white w-[10ch] md:w-[20ch] md:text-lg lg:text-xl  2xl:text-2xl text-center md:text-left">
									Manage your statistics by month.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="h-[100vh] w-full flex justify-center bg-gradient-to-br from-[#9477E4] to-[#3D1D93] ">
				<div className="w-[85vw]  flex flex-col justify-center items-center gap-8">
					<h2 className="text-[32px] text-center md:text-5xl font-[Poppins] font-bold  text-[#232529] lg:w-[30ch]">
						Create a free account and start managing your business
						<span className="text-[#C8D9FF]">NOW</span>
					</h2>
					<Button className="w-36 md:w-44 md:h-12 md:text-lg bg-[#C8D9FF] text-[#3D1D93] font-[Satoshi]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="46"
							viewBox="0 -960 960 960"
							width="24"
							className="fill-[#3D1D93] w-[46px] h-auto">
							<path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z" />
						</svg>
						Level Up
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Landing;
