import {useState, useMemo, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {
	Tooltip,
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Dropdown,
	DropdownItem,
	DropdownTrigger,
	DropdownMenu,
	Pagination,
	Accordion,
	AccordionItem,
	Button,
	Badge,
	Avatar,
	Input,
	getKeyValue,
	Spinner,
	Textarea,
} from "@nextui-org/react";
import {Link} from "react-router-dom";
import axios from "axios";

const ClientDetail = ({clientId}) => {
	const {id} = useParams();

	// CLOUDINARY CONFIGURATION
	const cloudinaryRefImage = useRef();
	const widgetRefImage = useRef();
	const [selectedImage, setSelectedImage] = useState("");

	// --------------------------

	// CLIENT INFO
	const [clientInfo, setClientInfo] = useState([]);
	const [errorClientInfo, setErrorClientInfo] = useState(false);
	const [loading, setLoading] = useState(true);

	const getClientInfo = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/client/detail/${clientId}`
			);
			const result = response.data;
			setClientInfo(result);
			setEditForm({
				...editForm,
				clientId: result._id,
				name: result.name,
				lastName: result.lastName,
				idNumber: result.idNumber,
				city: result.city,
				neighborhood: result.neighborhood,
				adress: result.adress,
				adressDetails: result.adressDetails,
				notes: result.notes,
			});
			setSelectedOrigin(new Set([result.origin]));
			setSelectedImage(result.image);
		} catch (error) {
			setErrorClientInfo(true);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				await getClientInfo();
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [clientId]);

	const urlIgUsername = clientInfo?.igUsername?.substring(1);

	// -----------------------------------

	// ORIGIN DROPDOWN
	const [selectedOrigin, setSelectedOrigin] = useState(new Set([]));

	const selectedValue = useMemo(
		() => Array.from(selectedOrigin).join(", ").replaceAll("_", " "),
		[selectedOrigin]
	);

	let dropdownValue = Array.from(selectedOrigin);
	// ------------------------------------------------

	// EDIT CLIENT
	const [editSuccess, setEditSuccess] = useState(false);
	const [editError, setEditError] = useState(false);

	const [editForm, setEditForm] = useState({
		storeId: id,
		clientId: "",
		name: "",
		lastName: "",
		idNumber: "",
		city: "",
		neighborhood: "",
		adress: "",
		adressDetails: "",
		notes: "",
	});

	const handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		setEditForm({...editForm, [name]: value});
	};

	const submitEdit = async () => {
		try {
			const finalForm = {
				...editForm,
				image: selectedImage.length === 0 ? clientInfo.image : selectedImage,
				origin:
					dropdownValue[0] === "Origin" ? clientInfo.origin : dropdownValue[0],
			};

			await axios.put(`https://managemate.onrender.com/client/edit`, finalForm);

			getClientInfo();

			setEditSuccess(true);
			setEditError(false);

			setTimeout(() => {
				setEditSuccess(false);
			}, 3000);
		} catch (error) {
			setEditError(true);
			setEditSuccess(false);
			setTimeout(() => {
				setEditError(false);
			}, 3000);
		}
	};
	// -----------------------------------------------

	// ORDERS TABLE

	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const pages = Math.ceil(clientInfo?.orders?.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return clientInfo?.orders?.slice(start, end);
	}, [page, clientInfo?.orders]);

	// ----------------------------------

	// CLOUDINARY USEEFFECT
	useEffect(() => {
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

	// -------------------------------------

	return (
		<div className="flex flex-col justify-center items-center h-full w-full md:w-[580px] bg-gradient-to-br from-[#9477E4] to-[#3d1d93] border-none  py-12 rounded-[12px] gap-5">
			{loading ? (
				<Spinner color="success" />
			) : (
				<div className="flex flex-col justify-center items-center gap-3 px-5">
					<div className="flex flex-col md:flex-row justify-center items-center w-full gap-8">
						<div className="min-w-[130px] flex flex-col justify-center items-center gap-5 ">
							<p className="font-[Poppins] flex justify-center items-center text-white font-medium text-sm gap-2">
								Origin:
								{clientInfo.origin === "Instagram" ? (
									<svg
										className="h-6 w-6 fill-white"
										role="img"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<title>Instagram</title>
										<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
									</svg>
								) : clientInfo.origin === "Whatsapp" ? (
									<svg
										className="h-6 w-6 fill-white"
										role="img"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<title>WhatsApp</title>
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
									</svg>
								) : (
									<svg
										className="h-6 w-6 fill-white"
										role="img"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<title>Facebook</title>
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									</svg>
								)}
							</p>
							{clientInfo?.image?.length === 0 ? (
								<Avatar className="w-32 h-32 font-[Satoshi] text-xl text-[#3d1d93] bg-white inner-shadow-2" />
							) : (
								<img
									src={clientInfo.image}
									className="w-32 h-32 object-cover rounded-full"
								/>
							)}
							<p className="font-[Satoshi] text-white text-[12px] bg-white backdrop-blur-[8px] bg-opacity-20  px-2 py-1 rounded-lg text-center">
								{`${clientInfo?.name} ${clientInfo?.lastName}`}
							</p>
							{clientInfo.idNumber !== 0 && (
								<p className="font-[Satoshi] text-white text-[12px] bg-white backdrop-blur-[8px] bg-opacity-20  px-2 py-1 rounded-lg">
									{clientInfo?.idNumber}
								</p>
							)}
							<div className="flex justify-between- items-center gap-6">
								{clientInfo.igUsername && (
									<Tooltip
										content={clientInfo?.igUsername}
										className="font-[Satoshi] bg-[#232529] text-white">
										<Link
											target="blank"
											to={`https://www.instagram.com/${urlIgUsername}/`}>
											<svg
												className="h-6 w-6 fill-white"
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<title>Instagram</title>
												<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
											</svg>
										</Link>
									</Tooltip>
								)}
								{clientInfo.phoneNumber !== 0 && (
									<Tooltip
										content={`Phone number: ${clientInfo.phoneNumber}`}
										className="font-[Satoshi] bg-[#232529] text-white">
										<svg
											className="h-6 w-6 fill-white"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<title>WhatsApp</title>
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
										</svg>
									</Tooltip>
								)}
							</div>
						</div>
						<div className="flex-col flex just items-center gap-4">
							<div className="w-full min-h-[160px] max-h-[880px] rounded-[16px] bg-[#232529] flex flex-col justify-center items-center p-2 gap-5 hide-scrollbar overflow-y-scroll shadow-[4px_4px_12px_0px_rgba(0,0,0,0.4)]">
								<div className="grid grid-cols-2 gap-3">
									<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 min-h-[60px]">
										<span className="text-[#9477E4] ">City: </span>
										{clientInfo.city}
									</p>
									<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 min-h-[60px]">
										<span className="text-[#9477E4] ">Adress: </span>{" "}
										{clientInfo.adress}
									</p>
									<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 min-h-[60px]">
										<span className="text-[#9477E4] ">Neighborhood: </span>{" "}
										{clientInfo.neighborhood}
									</p>
									<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 min-h-[60px]">
										<span className="text-[#9477E4] ">Apartment/ Tower: </span>
										{clientInfo.adressDetails}
									</p>
								</div>
							</div>
							<div className="flex justify-center rounded-[16px] h-[100px] w-full bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-30 p-3">
								<p className="text-left font-[Questrial] text-sm text-white">
									{clientInfo?.notes?.length === 0
										? "No notes"
										: clientInfo.notes}
								</p>
							</div>
						</div>
					</div>
					<Accordion className="bg-[#3d1d93] rounded-lg w-full">
						<AccordionItem
							classNames={{
								title: "text-white text-medium",
							}}
							className="bg-[#3d1d93] font-[Satoshi] text-sm text-white w-full"
							title="Edit client">
							<div className="flex flex-col justify-center items-center">
								<div className="flex flex-col  justify-center items-center gap-3 w-full">
									<div className="flex flex-col md:flex-row justify-center items-center gap-3 w-full ">
										<div className="flex flex-col justify-center items-center gap-4 w-1/2">
											<Badge
												onClick={handleUploadImage}
												classNames={{
													base: "hover:scale-[101%] transition-transform ",
													badge:
														"text-center rounded-full w-7 h-7 bg-white backdrop-blur-[8px] bg-opacity-20 font-[Poppins] font-bold text-[#3d1d93] text-lg",
												}}
												disableOutline
												content={
													<button>
														<svg
															className="fill-[#c8d9ff] w-5 h-5"
															xmlns="http://www.w3.org/2000/svg"
															height="24"
															viewBox="0 -960 960 960"
															width="24">
															<path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
														</svg>
													</button>
												}>
												<img
													src={selectedImage}
													alt="client image"
													className="w-28 h-28 object-cover rounded-full shadow-[2px_2px_8px_2px_rgba(0,0,0,0.3)]"
												/>
											</Badge>
											<div className="flex flex-col md:flex-row gap-3 md:gap-2">
												<Dropdown>
													<DropdownTrigger>
														<Button
															radius="sm"
															className="bg-white font-[Satoshi-Medium] text-[#232529] w-full">
															{selectedValue}
														</Button>
													</DropdownTrigger>
													<DropdownMenu
														selectedKeys={selectedOrigin}
														onSelectionChange={setSelectedOrigin}
														selectionMode="single">
														<DropdownItem key="Origin">Origin</DropdownItem>
														<DropdownItem key="Whatsapp">Whatsapp</DropdownItem>
														<DropdownItem key="Instagram">
															Instagram
														</DropdownItem>
														<DropdownItem key="Facebook">Facebook</DropdownItem>
													</DropdownMenu>
												</Dropdown>
												<Input
													type="number"
													name="idNumber"
													onChange={handleChange}
													variant="bordered"
													label="ID Number"
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
											</div>
											<div className="flex flex-col md:flex-row gap-3 md:gap-2">
												<Input
													name="name"
													onChange={handleChange}
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
												<Input
													name="lastName"
													onChange={handleChange}
													variant="bordered"
													label="Last name"
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
											</div>

											<div className="flex flex-col md:flex-row gap-3 md:gap-2">
												<Input
													type="number"
													name="phoneNumber"
													onChange={handleChange}
													variant="bordered"
													label="Phone number"
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
												<Input
													name="igUsername"
													onChange={handleChange}
													variant="bordered"
													label="IG Username"
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
											</div>
											<Input
												name="socialMediaProfileLink"
												onChange={handleChange}
												variant="bordered"
												label="Profile link"
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
										</div>
										<div className=" flex flex-col justify-center items-center gap-4 w-1/2">
											<div className="flex flex-col md:flex-row gap-3 md:gap-2">
												<Input
													name="city"
													onChange={handleChange}
													variant="bordered"
													label="City"
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
												<Input
													name="neighborhood"
													onChange={handleChange}
													variant="bordered"
													label="Neighborhood"
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
											</div>
											<Input
												name="adress"
												onChange={handleChange}
												variant="bordered"
												label="Adress"
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
												onChange={handleChange}
												name="adressDetails"
												variant="bordered"
												label="Adress details"
												classNames={{
													base: "font-[Satoshi] ",
													inputWrapper:
														"bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30 border-none",
													input: "text-white",
												}}
											/>

											<Textarea
												onChange={handleChange}
												name="notes"
												variant="bordered"
												label="Notes"
												classNames={{
													base: "font-[Satoshi] ",
													inputWrapper:
														"bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30 border-none",
													input: "text-white",
												}}
											/>
										</div>
									</div>
									<Button
										onClick={submitEdit}
										isDisabled={
											editForm.name === clientInfo.name &&
											editForm.lastName === clientInfo.lastName &&
											selectedImage === clientInfo.image &&
											dropdownValue[0] === clientInfo.origin &&
											editForm.idNumber === clientInfo.idNumber &&
											editForm.city === clientInfo.city &&
											editForm.neighborhood === clientInfo.neighborhood &&
											editForm.adress === clientInfo.adress &&
											editForm.adressDetails === clientInfo.adressDetails &&
											editForm.notes === clientInfo.notes
												? true
												: false
										}
										className="bg-[#c8d9ff] font-[Satoshi] text-sm text-[#3d1d93] w-auto">
										Update
									</Button>

									{editSuccess && (
										<span className="font-[Satoshi] text-green-500 text-medium text-center">
											Updated!
										</span>
									)}
									{editError && (
										<span className="font-[Satoshi] text-red-500 text-medium text-center">
											Error, try again
										</span>
									)}
								</div>
							</div>
						</AccordionItem>
					</Accordion>
				</div>
			)}
			{!loading && (
				<div className="flex-col flex gap-5 md:px-5 justify-center items-center w-full">
					<p className="text-white font-[Satoshi] text-xl  mt-8">Orders</p>
					{clientInfo?.orders?.length > 0 ? (
						<Table
							aria-label="Active orders"
							bottomContent={
								<div className="flex w-full justify-center">
									{clientInfo?.orders.length > 0 && (
										<Pagination
											classNames={{
												cursor:
													"bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-20 text-[#3d1d93] rounded-full w-6 h-6 md:w-10 md:h-10",
												base: "w-50 h-15 m-0 md:mt-0 md:w-auto flex justify-center",
											}}
											isCompact
											showControls
											color="secondary"
											page={page}
											total={pages}
											onChange={(page) => setPage(page)}
										/>
									)}
								</div>
							}
							classNames={{
								th: "bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-30 text-white text-[8.3px] md:text-[12px] xl:text-[15px]",
								tr: " hover:text-[#ebd9c4] ",
								wrapper:
									"shadow-[2px_2px_8px_3px_rgba(0,0,0,0.4)] min-h-[222px] w-[300px] ml-1  md:ml-0 md:h-[305px] md:w-full  bg-[#3d1d93] text-[#EBF1FF] font-[Poppins] p-2 md:p-3 flex flex-col justify-between items-center overflow-hidden",
								td: "text-[8px] md:text-[12px] xl:text-[13px] font-medium",
							}}>
							<TableHeader>
								<TableColumn key="_id">Number</TableColumn>
								<TableColumn key="paymentStatus">Payment</TableColumn>
								<TableColumn key="shippingStatus">Shipment</TableColumn>
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
					) : (
						<span className="text-white font-[Satoshi] text-medium text-center w-full bg-[#232529] h-8 rounded-md flex justify-center items-center">
							No orders yet
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default ClientDetail;
