import {useState, useMemo, useRef} from "react";
import {useEffect} from "react";
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
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {createClientValidations} from "./createClientValidations";

const ClientCreation = () => {
	const navigate = useNavigate();

	const {id} = useParams();

	const [form, setForm] = useState({
		storeId: id,
		name: "",
		lastName: "",
		idNumber: 0,
		phoneNumber: 0,
		socialMediaProfileLink: "",
		igUsername: "",
		city: "",
		neighborhood: "",
		adress: "",
		adressDetails: "",
		notes: "",
		orders: [],
	});

	const [errors, setErrors] = useState({});
	const [igError, setIgError] = useState("");
	const [creationSuccess, setCreationSuccess] = useState(false);
	const [creationError, setCreationError] = useState(false);

	// CLOUDINARY CONFIGURATION
	const cloudinaryRefImage = useRef();
	const widgetRefImage = useRef();
	const [selectedImage, setSelectedImage] = useState("");

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setForm({...form, [name]: value});

		setErrors({
			...errors,
			[name]: createClientValidations({...form, [name]: value})[name],
		});
	};

	// ORIGIN DROPDOWN
	const [selectedKeys, setSelectedKeys] = useState(new Set(["Origin"]));

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);

	let dropdownValue = Array.from(selectedKeys);
	// ------------------------------------------------

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const originValue = dropdownValue[0];
			const formDataCopy = {
				...form,
				origin: originValue,
				image: selectedImage,
			};
			await axios.post("https://managemate.onrender.com/client/", formDataCopy);

			setForm({
				storeId: id,
				name: "",
				lastName: "",
				idNumber: 0,
				phoneNumber: 0,
				socialMediaProfileLink: "",
				origin: "",
				igUsername: "",
				city: "",
				neighborhood: "",
				adress: "",
				adressdetails: "",
				notes: "",
				orders: [],
			});

			setCreationSuccess(true);
			setCreationError(false);
			setIgError(false);
			setSelectedImage("");
			setTimeout(() => {
				setCreationSuccess(false);
			}, 5000);
		} catch (error) {
			const message = error.response.data.error;
			console.log(error);
			setCreationError(true);
			setIgError(message);
		}
	};

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");

		if (!loggedUser) {
			navigate("/login");
		}

		cloudinaryRefImage.current = window.cloudinary;
		widgetRefImage.current = cloudinaryRefImage.current.createUploadWidget(
			{
				cloudName: "dxyosebut",
				uploadPreset: "client_images",
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

	return (
		<div>
			<Navbar maxWidth="xl" className=" justify-center flex ">
				<NavbarContent justify="start">
					<Link to={`/dashboard/clients/${id}`}>
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
								{!selectedImage ? (
									<Avatar className="w-28 h-28 font-[Satoshi-Medium] text-xl text-[#3d1d93] bg-white inner-shadow-2" />
								) : (
									<img
										src={selectedImage}
										className=" rounded-md object-cover w-32 h-32 shadow-[4px_4px_10px_3px_rgba(0,0,0,0.3)]"
									/>
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
								{selectedImage.length === 0 && (
									<span className="mt-[-6px] h-2 font-[Satoshi-bold] text-[12px] text-center text-red-500">
										Upload a client image
									</span>
								)}
							</div>
							<Input
								type="number"
								onChange={handleChange}
								name="phoneNumber"
								label="Phone Number"
								classNames={{
									label: "text-[#232529]",
									input: [
										"bg-white",
										"text-[#232529] dark:text-white/90",
										"font-[Satoshi-Medium]",
										"placeholder:text-[#232529] dark:placeholder:text-white/60",
									],
									inputWrapper: [
										"data-[hover=true]:border-[#EBD5C4]",
										"border-none",
										"font-[Satoshi-Medium]",
										"bg-white",
										"!cursor-text",
										"h-11",
										"w-full",
										"rounded-[10px]",
									],
								}}
							/>
							<Input
								onChange={handleChange}
								name="socialMediaProfileLink"
								label="Socialmedia Profile Link"
								classNames={{
									label: "text-[#232529]",
									input: [
										"bg-white",
										"text-[#232529] dark:text-white/90",
										"font-[Satoshi-Medium]",
										"placeholder:text-[#232529] dark:placeholder:text-white/60",
									],
									inputWrapper: [
										"data-[hover=true]:border-[#EBD5C4]",
										"border-none",
										"font-[Satoshi-Medium]",
										"bg-white",
										"!cursor-text",
										"h-11",
										"w-full",
										"rounded-[10px]",
									],
								}}
							/>
							<Dropdown 
							classNames={{
								base: "bg-[#3D1D93] text-white font-[Satoshi-Medium]",
							}}>
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
									<DropdownItem key="Origin">Origin</DropdownItem>
									<DropdownItem key="Whatsapp">Whatsapp</DropdownItem>
									<DropdownItem key="Instagram">Instagram</DropdownItem>
									<DropdownItem key="Facebook">Facebook</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							{dropdownValue[0]?.length === 0 ||
							dropdownValue[0] === "Origin" ||
							dropdownValue.length === 0 ? (
								<span className="h-2 mt-[-20px] font-[Satoshi-bold] text-[12px] text-center text-red-500">
									Select client origin
								</span>
							) : (
								<></>
							)}
						</div>
						<div className="w-full  bg-gradient-to-br from-white to-[#C8D9FF] flex flex-col justify-center items-center gap-5 rounded-[27px] px-4 py-8">
							<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
								<div className="w-full flex flex-col justify-center items-center gap-8">
									<Input
										isInvalid={errors.name ? true : false}
										errorMessage={errors.name}
										onChange={handleChange}
										name="name"
										placeholder="Name"
										classNames={{
											input: [
												"bg-white",
												errors.name
													? "text-white"
													: "text-[#232529] dark:text-white/90",
												"font-[Satoshi-Medium]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi-Medium]",
												errors.name ? "bg-none" : "bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										isInvalid={errors.lastName ? true : false}
										errorMessage={errors.lastName}
										onChange={handleChange}
										name="lastName"
										placeholder="Last Name"
										classNames={{
											input: [
												"bg-white",
												errors.lastName
													? "text-white"
													: "text-[#232529] dark:text-white/90",
												"font-[Satoshi-Medium]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi-Medium]",
												errors.lastName ? "bg-none" : "bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
								</div>
								<div className="w-full flex flex-col justify-center items-center gap-8">
									<Input
										isInvalid={igError || errors.igUsername ? true : false}
										errorMessage={igError || errors.igUsername}
										onChange={handleChange}
										name="igUsername"
										placeholder="Instagram Username"
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
												"inner-client-creation",
												"w-full",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										onChange={handleChange}
										type="number"
										name="idNumber"
										placeholder="Identification Number"
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
										isInvalid={errors.city ? true : false}
										errorMessage={errors.city}
										onChange={handleChange}
										name="city"
										placeholder="City"
										classNames={{
											input: [
												"bg-white",
												errors.city
													? "text-white"
													: "text-[#232529] dark:text-white/90",
												"font-[Satoshi-Medium]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi-Medium]",
												errors.city ? "bg-none" : "bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										isInvalid={errors.adress ? true : false}
										errorMessage={errors.adress}
										onChange={handleChange}
										name="adress"
										placeholder="Adress"
										classNames={{
											input: [
												"bg-white",
												errors.adress
													? "text-white"
													: "text-[#232529] dark:text-white/90",
												"font-[Satoshi-Medium]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi-Medium]",
												errors.adress ? "bg-none" : "bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
								</div>
								<div className="w-full flex flex-col justify-center items-center gap-8">
									<Input
										isInvalid={errors.neighborhood ? true : false}
										errorMessage={errors.neighborhood}
										onChange={handleChange}
										name="neighborhood"
										placeholder="Neighborhood"
										classNames={{
											input: [
												"bg-white",
												errors.neighborhood
													? "text-white"
													: "text-[#232529] dark:text-white/90",
												"font-[Satoshi-Medium]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi-Medium]",
												errors.neighborhood ? "bg-none" : "bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									<Input
										onChange={handleChange}
										name="adressDetails"
										placeholder="Apartment/ Tower"
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
						onClick={handleSubmit}
						isDisabled={
							errors.name ||
							form.name.length === 0 ||
							errors.lastName ||
							form.lastName.length === 0 ||
							errors.city ||
							form.city.length === 0 ||
							errors.adress ||
							form.adress.length === 0 ||
							errors.neighborhood ||
							form.neighborhood.length === 0 ||
							selectedImage.length === 0 ||
							dropdownValue[0]?.length === 0 ||
							dropdownValue[0] === "Origin" ||
							dropdownValue.length === 0
						}
						radius="sm"
						className="bg-[#c8d9ff] font-[Satoshi-Bold] text-lg text-[#3d1d93] w-40 h-12">
						Create
					</Button>
					{creationSuccess && (
						<span className="h-2 mt-[-20px] font-[Satoshi-bold] text-[12px] text-center text-green-500">
							Client created successfully
						</span>
					)}
					{creationError && (
						<span className="h-2 mt-[-20px] font-[Satoshi-bold] text-[12px] text-center text-red-500">
							An error occurred
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default ClientCreation;
