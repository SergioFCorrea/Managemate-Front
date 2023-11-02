import {useState} from "react";
import Logo from "../../Images/managemate-log-dark-mode.png";
import LogoLight from "../../Images/managemate-logo-light-mode.png";
import logoletter from "../../Images/managemate-txt-dark.png";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Avatar,
	Input,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	DropdownItem,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	Button,
	Badge,
} from "@nextui-org/react";
import {Link} from "react-router-dom";

const AccountSettings = () => {
	const [edit, setEdit] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
	const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
		useState(false);
	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const enableEdit = () => {
		setEdit(!edit);
	};

	const toggleVisible = () => setIsVisible(!isVisible);
	const toggleNewPasswordVisible = () =>
		setIsNewPasswordVisible(!isNewPasswordVisible);
	const toggleConfirmNewPasswordVisible = () =>
		setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible);

	return (
		<div className=" flex flex-col justify-center items-center">
			<Navbar maxWidth="xl" className="md:bg-[#EBD5C4] justify-center flex">
				{/* <NavbarContent className="w- border-2"></NavbarContent> */}
				<NavbarBrand className="md:hidden">
					{/* <Link to="/manager">
							<svg
								className="fill-[#ebd5c4] w-8 h-auto"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
							</svg>
						</Link> */}
					<Link to="/">
						<img src={Logo} alt="" className="w-14 h-auto" />
					</Link>
				</NavbarBrand>
				<Link to="/">
					<NavbarBrand className="hidden md:flex">
						{/* <Link to="/manager">
							<svg
								className="fill-[#232529] w-8 h-auto"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
							</svg>
						</Link> */}
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
							<DropdownItem key="settings">Go to store manager</DropdownItem>
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

			<div className="w-[85vw] md:h-[80vh] md:w-[680px] lg:w-[1000px] flex flex-col justify-center items-center gap-16">
				<h1 className="fonts-[Poppins] font-semibold text-4xl text-center text-white mt-10 xl:mt-14">
					Account Configuration
				</h1>
				<div className="w-full md:w-[350px] bg-gradient-to-br from-[#9477E4] to-[#3d1d93] h-auto rounded-[18px] flex flex-col justify-center items-center gap-8 px-3 py-7 ">
					<Badge
						disableOutline
						content={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
							</svg>
						}
						className="bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30 w-8 h-8">
						<img
							src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
							alt=""
							className="rounded-full w-44 h-auto object-cover shadow-[4px_4px_18px_0_rgba(0,0,0,0.6)]"
						/>
					</Badge>
					<div className="w-full justify-start flex flex-col gap-2">
						<Input
							readOnly={edit}
							type="email"
							defaultValue="papa@papas.com"
							variant="bordered"
							label="Current E-mail"
							radius="full"
							classNames={{
								input: [
									"bg-[#1C1E21]",
									"text-[#4B5058]",
									"font-[Satoshi]",
									"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
								],
								inputWrapper: [
									"data-[readonly=false]-bg-red-400",
									"inner-shadow-input",
									"font-[Satoshi]",
									"border-none",
									"bg-[#1C1E21]",
									"!cursor-text",
									"h-12",
									"w-auto",
									"rounded-[10px]",
								],
							}}
						/>
						{edit === false && (
							<Badge
								onClick={enableEdit}
								disableOutline
								content={
									<svg
										className="fill-black w-3 h-auto"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24">
										<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
									</svg>
								}
								className="bg-[#C8D9FF]  w-5 h-5">
								<div className="w-full flex flex-col justify-center items-center gap-2 rounded-lg bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30 p-3">
									<Input
										readOnly={edit}
										type="email"
										variant="bordered"
										label="New E-mail"
										radius="full"
										classNames={{
											input: [
												"bg-[#1C1E21]",
												"text-white",
												"font-[Satoshi]",
												"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[readonly=false]-bg-red-400",
												"inner-shadow-input",
												"font-[Satoshi]",
												"border-none",
												"bg-[#1C1E21]",
												"!cursor-text",
												"h-12",
												"w-auto",
												"rounded-[10px]",
											],
										}}
									/>
									<Button className="bg-[#c8d9ff] font-[Satoshi] text-[#232529]">
										Confirm
									</Button>
								</div>
							</Badge>
						)}
						<button onClick={enableEdit}>
							<p className="text-white text-left text-[10px] font-[Satoshi] ml-2">
								Change E-mail
							</p>
						</button>
					</div>
					<div className="w-full justify-start flex flex-col gap-2">
						<Input
							isReadOnly
							type={isVisible ? "text" : "password"}
							variant="bordered"
							defaultValue="opaaaaaaaaaaa"
							label="Current Password"
							radius="full"
							classNames={{
								input: [
									"bg-[#1C1E21]",
									"text-[#4B5058] dark:text-white/90",
									"font-[Satoshi]",
									"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
								],
								inputWrapper: [
									"group-data-[readonly===true]:bg-red-400",
									"data-[hover=true]:border-[#EBD5C4]",
									"border-none",
									"inner-shadow-input",
									"font-[Satoshi]",
									"bg-[#1C1E21]",
									"!cursor-text",
									"h-12",
									"w-auto",
									"rounded-[10px]",
								],
							}}
							endContent={
								<button onClick={toggleVisible}>
									{isVisible ? (
										<svg
											className="fill-white"
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											viewBox="0 -960 960 960"
											width="24">
											<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
										</svg>
									) : (
										<svg
											className="fill-white"
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											viewBox="0 -960 960 960"
											width="24">
											<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
										</svg>
									)}
								</button>
							}
						/>
						<button onClick={onOpen}>
							<p className="text-white text-left text-[10px] font-[Satoshi] ml-2">
								Change Password
							</p>
						</button>
						<Modal
							scrollBehavior="inside"
							size="lg"
							className="bg-[#232529]"
							isOpen={isOpen}
							onOpenChange={onOpenChange}>
							<ModalContent>
								<ModalHeader>New Password</ModalHeader>
								<ModalBody className="md:py-8">
									<Input
										type={isNewPasswordVisible ? "text" : "password"}
										variant="bordered"
										label="New Password"
										radius="full"
										classNames={{
											input: [
												"bg-[#1C1E21]",
												"text-white",
												"font-[Satoshi]",
												"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"group-data-[readonly===true]:bg-red-400",
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"inner-shadow-input",
												"font-[Satoshi]",
												"bg-[#1C1E21]",
												"!cursor-text",
												"h-12",
												"w-auto",
												"rounded-[10px]",
											],
										}}
										endContent={
											<button onClick={toggleNewPasswordVisible}>
												{isNewPasswordVisible ? (
													<svg
														className="fill-white"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24">
														<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
													</svg>
												) : (
													<svg
														className="fill-white"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24">
														<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
													</svg>
												)}
											</button>
										}
									/>
									<Input
										type={isConfirmNewPasswordVisible ? "text" : "password"}
										variant="bordered"
										label="Confirm Password"
										radius="full"
										classNames={{
											input: [
												"bg-[#1C1E21]",
												"text-white",
												"font-[Satoshi]",
												"placeholder:text-[#EBD5C4] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"group-data-[readonly===true]:bg-red-400",
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"inner-shadow-input",
												"font-[Satoshi]",
												"bg-[#1C1E21]",
												"!cursor-text",
												"h-12",
												"w-auto",
												"rounded-[10px]",
											],
										}}
										endContent={
											<button onClick={toggleConfirmNewPasswordVisible}>
												{isConfirmNewPasswordVisible ? (
													<svg
														className="fill-white"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24">
														<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
													</svg>
												) : (
													<svg
														className="fill-white"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24">
														<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
													</svg>
												)}
											</button>
										}
									/>
									<Button className="bg-[#3d1d93] text-white font-[Satoshi]">
										Confirm
									</Button>
								</ModalBody>
							</ModalContent>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
