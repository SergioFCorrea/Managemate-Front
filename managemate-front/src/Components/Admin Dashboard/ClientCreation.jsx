import {useState, useMemo} from "react";
import {
	Dropdown,
	DropdownItem,
	DropdownTrigger,
	DropdownMenu,
	Button,
	Input,
	Avatar,
	Divider,
	Navbar,
	NavbarContent,
} from "@nextui-org/react";
import {Link} from "react-router-dom";
const ClientCreation = () => {
	const [selectedKeys, setSelectedKeys] = useState(
		new Set(["Origin"])
	);

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);
	return (
		<div>
			<Navbar maxWidth="xl" className=" justify-center flex ">
				<NavbarContent justify="start">
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
				</NavbarContent>
			</Navbar>
			<div className="flex flex-col justify-center items-center gap-8 mb-8 ">
				<div className="w-[85vw] md:w-[680px] lg:w-[1000px] gap-8 md:gap-16 h-auto flex flex-col justify-center items-center mt-6 xl:mt-12">
					<h1 className="fonts-[Poppins] font-semibold text-4xl text-left text-white mt-10 xl:mt-14 w-[10ch] md:w-full">
						Client Creation
					</h1>
					<div className="bg-[#3d1d93] rounded-[20px] w-full h-auto px-3 md:px-8 py-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-8 overflow-hidden">
						<div className="w-full md:w-[250px] flex justify-center items-center flex-col gap-6 ">
							<div className="flex flex-col justify-center items-center gap-2">
								<Avatar className="w-28 h-28 font-[Satoshi] text-xl text-[#3d1d93] bg-white inner-shadow-2" />
								<button>
									<svg
										className="fill-[#c8d9ff]"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24">
										<path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
									</svg>
								</button>
							</div>
							<Input
								label="Phone Number"
								classNames={{
									label:"text-[#232529]",
									input: [
										"bg-white",
										"text-[#232529] dark:text-white/90",
										"font-[Satoshi]",
										"placeholder:text-[#232529] dark:placeholder:text-white/60",
									],
									inputWrapper: [
										"data-[hover=true]:border-[#EBD5C4]",
										"border-none",
										"font-[Satoshi]",
										"bg-white",
										"!cursor-text",
										"h-11",
										"w-full",
										"rounded-[10px]",
									],
								}}
							/>
							<Input
								label="Socialmedia Profile Link"
								classNames={{
									label:"text-[#232529]",
									input: [
										"bg-white",
										"text-[#232529] dark:text-white/90",
										"font-[Satoshi]",
										"placeholder:text-[#232529] dark:placeholder:text-white/60",
									],
									inputWrapper: [
										"data-[hover=true]:border-[#EBD5C4]",
										"border-none",
										"font-[Satoshi]",
										"bg-white",
										"!cursor-text",
										"h-11",
										"w-full",
										"rounded-[10px]",
									],
								}}
							/>
							<Dropdown>
								<DropdownTrigger>
									<Button
										radius="sm"
										className="bg-white font-[Satoshi-Medium] text-[#232529] w-full">
										{selectedValue}
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									selectedKeys={selectedKeys}
									onSelectionChange={setSelectedKeys}
									selectionMode="single">
									<DropdownItem key="Origin">
										Origin
									</DropdownItem>
									<DropdownItem key="Whatsapp">Whatsapp</DropdownItem>
									<DropdownItem key="Instagram">Instagram</DropdownItem>
									<DropdownItem key="Facebook">Facebook</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<div className="w-full  bg-gradient-to-br from-white to-[#C8D9FF] flex flex-col justify-center items-center gap-5 rounded-[27px] px-4 py-8">
							<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
								<div className="w-full flex flex-col justify-center items-center gap-8">
									<Input
										placeholder="Name"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										placeholder="Last Name"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
								</div>
								<div className="w-full flex flex-col justify-center items-center gap-8">
									<Input
										placeholder="Instagram Username"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										placeholder="Identification Number"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
								</div>
							</div>
							<Divider className="h-1 w-[118%] md:w-[120%] bg-[#3d1d93] rounded-full" />
							<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
								<div className="w-full flex flex-col justify-center items-center gap-8">
									<Input
										placeholder="City"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										placeholder="Adress"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
								</div>
								<div className="w-full flex flex-col justify-center items-center gap-8">
									<Input
										placeholder="Neiborghood"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										placeholder="Apartment/ Tower"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<Button
						radius="sm"
						className="bg-[#c8d9ff] font-[Satoshi-Bold] text-lg text-[#3d1d93] w-40 h-12">
						Create
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ClientCreation;
