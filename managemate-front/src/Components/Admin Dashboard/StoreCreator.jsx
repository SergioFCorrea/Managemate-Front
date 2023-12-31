import axios from "axios"
import {useState, useMemo, useEffect, useRef} from "react";
import {
	Input,
	Textarea,
	Dropdown,
	DropdownMenu,
	DropdownTrigger,
	DropdownItem,
	Checkbox,
	CheckboxGroup,
	Button,
	Avatar,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";

import {Link} from "react-router-dom";
import createStoreValidations from "./createStoreValidations";

const StoreCreator = () => {
	const [selectedKeys, setSelectedKeys] = useState(new Set(["Select size"]));

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);

	const userId = localStorage.getItem("userId");

	const [errors, setErrors] = useState({});
	const [selected, setSelected] = useState([]);
	const [createSuccess, setCreateSuccess] = useState(null);

	// CONFIG PARA SUBIR FOTOS A CLOUDINARY

	const cloudinaryRefImage = useRef();
	const widgetRefImage = useRef();
	const [selectedImage, setSelectedImage] = useState("");

	const [formData, setFormData] = useState({
		userId: userId,
		image: selectedImage,
		name: "",
		description: "",
		salesChannels: [],
		state: true,
		size: selectedKeys,
		clients: [],
		cathegories: [],
		orders: [],
	});

	let dropdownValue = Array.from(selectedKeys);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setFormData({...formData, [name]: value});

		setErrors({
			...errors,
			[name]: createStoreValidations({...formData, [name]: value})[name],
		});
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()
			const sizeString = dropdownValue[0];
			const formDataCopy = {
				...formData,
				image: selectedImage,
				salesChannels: selected,
				size: sizeString,
			};
			await axios.post("https://managemate.onrender.com/store", formDataCopy);
			

			setFormData({
				userId: userId,
				image: selectedImage,
				name: "",
				description: "",
				salesChannels: [],
				state: true,
				size: selectedKeys,
				clients: [],
				cathegories: [],
				orders: [],
			});

			setCreateSuccess(true);
			setSelectedImage("")
			setTimeout(() => {
				setCreateSuccess(null)
			}, 5000);
		} catch (error) {
			setCreateSuccess(false);
		}
	};

	// ---------------

	useEffect(() => {
		cloudinaryRefImage.current = window.cloudinary;
		widgetRefImage.current = cloudinaryRefImage.current.createUploadWidget(
			{
				cloudName: "dxyosebut",
				uploadPreset: "store_images",
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
	// ---------------------------------

	return (
		<div>
			<div className="flex flex-col justify-center items-center gap-8 mb-8">
				<div className="w-[85vw] md:w-[680px] lg:w-[1000px] gap-8 md:gap-16 h-auto flex flex-col justify-center items-center">
					<div className="w-full h-auto flex flex-col md:flex-row justify-center items-center">
						<h1 className="fonts-[Poppins] font-semibold text-4xl text-center text-white mt-10 xl:mt-14 w-[10ch] md:w-full">
							Store Creator
						</h1>
					</div>
					<div className="bg-none border-5 rounded-[20px] w-full h-auto md:w-[600px] md:h-auto border-[#ebd5c4] flex flex-col justify-center items-center px-5 py-10 md:p-9 gap-8">
						<div className="w-full flex flex-col justify-center items-center md:flex-row gap-12">
							<div className="h-auto w-auto flex flex-col justify-center items-center gap-5">
								{selectedImage && (
									<img
										src={selectedImage}
										alt=""
										className="w-[150px] h-[150px] rounded-[10px] object-cover"
									/>
								)}
								{!selectedImage && (
									<Avatar className="w-28 h-28 font-[Satoshi] text-xl text-[#ebd5c4] bg-gray-700" />
								)}

								<button onClick={handleUploadImage}>
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
							<div className="md:w-1/2 flex flex-col justify-center items-center gap-8 ">
								<Input
									isInvalid={errors.name ? true : false}
									errorMessage={errors.name}
									variant={errors.name ? "bordered" : ""}
									onChange={handleChange}
									name="name"
									labelPlacement="inside"
									label="Store Name"
									radius="lg"
									classNames={{
										label: [
											"text-[#232529] data-[focus=true]:text-[#EBD5C4] dark:text-white/90",
											"font-[Satoshi-Bold]",
										],
										input: [
											"bg-[#EBD5C4]",
											errors.name
												? "text-white"
												: "text-[#232529] dark:text-white/90",
											"text-[#232529] dark:text-white/90",
											"font-[Satoshi]",
											"placeholder:text-default-700/50 dark:placeholder:text-white/60",
										],
										innerWrapper: "bg-green-500",
										inputWrapper: [
											"font-[Satoshi]",
											errors.name ? "bg-none" : "bg-[#EBD5C4]",
											"!cursor-text",
											"h-12",
										],
									}}
								/>
								<Textarea
									isInvalid={errors.description ? true : false}
									errorMessage={errors.description}
									variant={errors.description ? "bordered" : ""}
									onChange={handleChange}
									name="description"
									maxRows="4"
									label="Description"
									classNames={{
										label: "font-[Satoshi-Bold] ",
										base: errors.description
											? "text-white"
											: "text-[#232529] font-[Poppins] ",
										inputWrapper: errors.description
											? "bg-none"
											: "bg-[#EBD5C4]",
									}}
								/>
							</div>
						</div>
						<div className="w-full flex flex-col justify-center md:justify-between items-center md:flex-row gap-0 ">
							<div className="w-auto flex flex-col justify-center items-center gap-3 ">
								<p className="font-[Poppins] text-white text-medium text-center">
									Sale channels
								</p>
								<div className="w-auto flex flex-col justify-center items-center gap-8">
									<CheckboxGroup
										isInvalid={selected.length === 0 ? true : false}
										classNames={{
											base: "",
											wrapper:
												"flex flex-row justify-center items-center w-auto gap-8",
										}}
										orientation="horizontal"
										value={selected}
										onValueChange={setSelected}>
										<Checkbox
											value="wpp"
											className="flex flex-col-reverse justify-center items-center"
											classNames={{
												base: "flex flex-col-reverse justify-center items-center gap-3 w-16",
												wrapper: "m-0",
											}}>
											<svg
												className="h-auto w-8 md:w-6 fill-white"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>WhatsApp</title>
												<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
											</svg>
										</Checkbox>
										<Checkbox
											value="fb"
											className="flex flex-col-reverse justify-center items-center"
											classNames={{
												base: "flex flex-col-reverse justify-center items-center gap-3 w-16",
												wrapper: "m-0",
											}}>
											<svg
												className="h-auto w-8 md:w-6 fill-white"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>Facebook</title>
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
											</svg>
										</Checkbox>
										<Checkbox
											value="ig"
											className="flex flex-col-reverse justify-center items-center"
											classNames={{
												base: "flex flex-col-reverse justify-center items-center gap-3 w-16",
												wrapper: "m-0",
											}}>
											<svg
												className="h-auto w-8 md:w-6 fill-white"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>Instagram</title>
												<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
											</svg>
										</Checkbox>
									</CheckboxGroup>
									{selected.length === 0 && (
										<span className="text-red-500 font-[Satoshi] text-sm text-center">
											Please select at least one
										</span>
									)}
								</div>
							</div>
							<div className="w-full md:w-[300px] flex flex-col justify-center items-center gap-8 mt-8 md:mt-0">
								<p className="font-[Poppins] text-white text-medium text-center">
									How big is your store
								</p>
								<Dropdown>
									<DropdownTrigger>
										<Button
											variant={
												selectedKeys.has("Select size") ||
												dropdownValue.length === 0
													? "bordered"
													: ""
											}
											radius="sm"
											className={`${
												dropdownValue.length === 0
													? "bg-none border-red-500"
													: "bg-[#EBD5C4] border-none"
											} font-[Satoshi-Bold] text-[#232529] w-[125px] text-sm justify-between`}>
											{selectedValue}
											<svg
												className={`${
													dropdownValue.length === 0
														? "fill-red-500"
														: "fill-[#232529]"
												} w-8 h-auto `}
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M480-360 280-560h400L480-360Z" />
											</svg>
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										variant={
											selectedKeys.has("Select size") ||
											dropdownValue.length === 0
												? "bordered"
												: ""
										}
										selectedKeys={selectedKeys}
										onSelectionChange={setSelectedKeys}
										selectionMode="single">
										<DropdownItem key="Small">Small</DropdownItem>
										<DropdownItem key="Medium">Medium</DropdownItem>
										<DropdownItem key="Big">Big</DropdownItem>
									</DropdownMenu>
								</Dropdown>
								{selectedKeys.has("Select size") ||
									(dropdownValue.length === 0 && (
										<span className="text-red-500 font-[Satoshi] text-sm text-center">
											Space can't be empty
										</span>
									))}
							</div>
						</div>
						<Button
							onClick={handleSubmit}
							isDisabled={
								errors.name ||
								errors.description ||
								formData.name === "" ||
								selectedImage === "" ||
								formData.description === "" ||
								selected.length === 0 ||
								selectedKeys.has("Select size") ||
								dropdownValue.length === 0
									? true
									: false
							}
							type="submit"
							radius="sm"
							className="bg-[#3d1d93] font-[Satoshi-Bold] text-lg text-white w-36 h-10 mt-4">
							Create
						</Button>
						{createSuccess === false && <span className="text-red-500 font-[Satoshi-bold] text-sm md:text-medium text-center">An error ocurred while creating the store, please try again</span>}
						{createSuccess === true && <span className="text-green-500 font-[Satoshi-bold] text-sm md:text-medium text-center">Store created successfully</span>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoreCreator;
