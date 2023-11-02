import {useState, useMemo} from "react";
import {
	Accordion,
	AccordionItem,
	Button,
	DropdownItem,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	Input,
	Textarea,
} from "@nextui-org/react";

const NewProduct = () => {
	const [selectedKeys, setSelectedKeys] = useState(new Set(["Cathegory"]));

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);

	return (
		<div className="flex flex-col justify-center items-center w-full h-full gap-12">
			<Accordion className="bg-[#3d1d93] rounded-lg w-full">
				<AccordionItem
					classNames={{
						title: "text-white text-medium",
					}}
					className="bg-[#3d1d93] font-[Satoshi] text-sm text-white w-full"
					aria-label="New cathegory"
					title="New cathegory">
					<Input
						variant="bordered"
						label="Name"
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
								"font-[Satoshi]",
								"bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30",
								"!cursor-text",
								"h-11",
								"mb-3",
								"w-auto",
								"rounded-[10px]",
							],
						}}
					/>
					<Textarea
						variant="bordered"
						label="Description"
						classNames={{
							base: "font-[Satoshi] ",
							inputWrapper:
								"bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30 border-none",
							input: "text-white",
						}}
					/>
					<div className="w-full flex justify-center">
						<Button
							radius="sm"
							className="bg-[#1c1e21] font-[Satoshi-Medium] text-white w-20 mt-3">
							Create
						</Button>
					</div>
				</AccordionItem>
			</Accordion>
			<div className="w-full flex flex-col justify-center md:justify-between items-center md:flex-row gap-10 ">
				<div className=" flex flex-col justify-center items-center gap-5 ">
					<img
						src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697063348/my%20images/IMG_4182_d4wb8n.jpg"
						alt=""
						className="w-36 h-auto rounded-full object-cover"
					/>
					<div className="w-full flex flex-col justify-center items-center gap-5">
						<Dropdown>
							<DropdownTrigger>
								<Button
									radius="sm"
									className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-auto">
									{selectedValue}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								selectedKeys={selectedKeys}
								onSelectionChange={setSelectedKeys}
								selectionMode="single">
								<DropdownItem key="Cathegory">Cathegory</DropdownItem>
								<DropdownItem key="Monas chinas">Monas chinas</DropdownItem>
								<DropdownItem key="Dakimakuras">Dakimakuras</DropdownItem>
								<DropdownItem key="Manga">Manga</DropdownItem>
								<DropdownItem key="Bombas nucleares">
									Bombas nucleares
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						<Input
							variant="bordered"
							label="Quantity"
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
				<div className="md:w-52 flex flex-col justify-center items-center gap-8">
					<Input
						variant="bordered"
						label="Name"
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
					<Textarea
						minRows={6}
						variant="bordered"
						label="Description"
						classNames={{
							base: "font-[Satoshi] ",
							inputWrapper: "bg-[#1C1E21] inner-shadow-input border-none ",
							input: "text-white",
						}}
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
			<Button
				radius="sm"
				className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-20">
				Create
			</Button>
		</div>
	);
};

export default NewProduct;
