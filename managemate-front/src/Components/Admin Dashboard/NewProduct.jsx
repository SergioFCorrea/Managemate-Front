import {useState, useMemo, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {
	Badge,
	Avatar,
	Accordion,
	AccordionItem,
	Button,
	DropdownItem,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	Input,
	Textarea,
	Spinner,
} from "@nextui-org/react";

const NewProduct = (show) => {
	const {id} = useParams();
	const [loading, setLoading] = useState(true);

	// CLOUDINARY CONFIGURATION
	const cloudinaryRefImage = useRef();
	const widgetRefImage = useRef();
	const [selectedImage, setSelectedImage] = useState("");

	// ----------------------------------

	// CREATE CATEGORY
	const [categorySuccess, setCategorySuccess] = useState(false);
	const [categoryError, setCategoryError] = useState(false);
	const [categoryForm, setCategoryForm] = useState({
		storeId: id,
		name: "",
		description: "",
	});

	const handleCategoryChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setCategoryForm({...categoryForm, [name]: value});
	};

	const createCategory = async () => {
		try {
			await axios.post(
				`https://managemate.onrender.com/cathegory`,
				categoryForm
			);
			setCategoryForm({
				name: "",
				description: "",
			});
			setCategorySuccess(true);
			setCategoryError(false);
			setTimeout(() => {
				setCategorySuccess(false);
			}, 3000);
		} catch (error) {
			setCategoryError(true);
			setCategorySuccess(false);
			setTimeout(() => {
				setCategoryError(false);
			}, 3000);
		}
	};

	// console.log(show);
	// ---------------------------------
	const [allCategories, setAllCategories] = useState([]);

	// GET CATEGORIES
	const getCategories = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/cathegory/all/${id}`
			);
			const result = response.data;

			setAllCategories(result);
		} catch (error) {}
	};
	// ------------------------------------------

	// DROPDOWN
	const [selectedCategory, setSelectedCategory] = useState(
		new Set(["Category"])
	);

	const selectedValue = useMemo(
		() => Array.from(selectedCategory).join(", ").replaceAll("_", " "),
		[selectedCategory]
	);
	// ----------------------------------

	// CREATE PRODUCT
	const [productForm, setProductForm] = useState({
		storeId: id,
		name: "",
		description: "",
		quantity: 0,
		purchasePrice: 0,
		salePrice: 0,
	});

	const [productSuccess, setProductSuccess] = useState(false);
	const [productError, setProductError] = useState(false);

	const handleProductChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setProductForm({...productForm, [name]: value});
	};

	let dropdownValue = Array.from(selectedCategory);
	const createProduct = async () => {
		try {
			const finalForm = {
				...productForm,
				cathegory: dropdownValue[0],
				image: selectedImage,
			};
			await axios.post(`https://managemate.onrender.com/product`, finalForm);

			setProductForm({
				storeId: id,
				name: "",
				description: "",
				quantity: 0,
				purchasePrice: 0,
				salePrice: 0,
			});
			setSelectedImage("");
			setSelectedCategory(new Set(["Category"]));
			setProductSuccess(true);
			setProductError(false);
			setTimeout(() => {
				setProductSuccess(false);
			}, 3000);
		} catch (error) {
			setProductError(true);
			setProductSuccess(false);
			setTimeout(() => {
				setProductError(false);
			}, 3000);
		}
	};
	// ---------------------------------------

	// CLOUDINARY USEEFFECT
	useEffect(() => {
		cloudinaryRefImage.current = window.cloudinary;
		widgetRefImage.current = cloudinaryRefImage.current.createUploadWidget(
			{
				cloudName: "dxyosebut",
				uploadPreset: "product_images",
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
	// -----------------------------------------

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (show) {
					await getCategories();
					setLoading(false);
				}
			} catch (error) {}
		};

		fetchData();
	}, [show]);

	return (
		<div className="flex flex-col justify-center items-center w-full h-full gap-12">
			<Accordion className="bg-[#3d1d93] rounded-lg w-full">
				<AccordionItem
					classNames={{
						title: "text-white text-medium",
					}}
					className="bg-[#3d1d93] font-[Satoshi] text-sm text-white w-full"
					aria-label="New category"
					title="New category">
					<Input
						isRequired
						name="name"
						onChange={handleCategoryChange}
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
						isRequired
						onChange={handleCategoryChange}
						name="description"
						variant="bordered"
						label="Description"
						classNames={{
							base: "font-[Satoshi] ",
							inputWrapper:
								"bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30 border-none",
							input: "text-white",
						}}
					/>
					<div className="w-full flex justify-center flex-col items-center">
						<Button
							isDisabled={
								categoryForm.name.length === 0 || categoryForm.description === 0
									? true
									: false
							}
							onClick={createCategory}
							radius="sm"
							className="bg-[#C8D9FF] font-[Satoshi-Medium] text-[#232529] w-20 mt-3">
							Create
						</Button>
						{categorySuccess && (
							<span className="font-[Satoshi] text-green-500 text-medium text-center">
								Category created!
							</span>
						)}
						{categoryError && (
							<span className="font-[Satoshi] text-red-500 text-medium text-center">
								Error creating category
							</span>
						)}
					</div>
				</AccordionItem>
			</Accordion>
			{show &&
				(loading ? (
					<Spinner color="success" />
				) : (
					<>
						<div className="w-full flex flex-col justify-center md:justify-between items-center md:flex-row gap-10 ">
							<div className=" flex flex-col justify-center items-center gap-5 ">
								{selectedImage.length === 0 ? (
									<Badge
										classNames={{
											base: "hover:scale-[101%] transition-transform ",
											badge:
												"text-center rounded-full w-10 h-10 bg-white backdrop-blur-[8px] bg-opacity-20 font-[Poppins] font-bold text-[#3d1d93] text-lg",
										}}
										disableOutline
										content={
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
										}>
										<Avatar className="w-36 h-36 font-[Satoshi] text-xl text-[#3d1d93] bg-white inner-shadow-2" />
									</Badge>
								) : (
									<Badge
										classNames={{
											base: "hover:scale-[101%] transition-transform ",
											badge:
												"text-center rounded-full w-10 h-10 bg-white backdrop-blur-[8px] bg-opacity-20 font-[Poppins] font-bold text-[#3d1d93] text-lg",
										}}
										disableOutline
										content={
											<button onClick={handleUploadImage}>
												<svg
													className="fill-[#ebd5c4]"
													xmlns="http://www.w3.org/2000/svg"
													height="24"
													viewBox="0 -960 960 960"
													width="24">
													<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
												</svg>
											</button>
										}>
										<img
											src={selectedImage}
											alt=""
											className="w-36 h-36 rounded-full object-cover"
										/>
									</Badge>
								)}
								<div className="w-full flex flex-col justify-center items-center gap-5">
									<Dropdown
										isRequired
										classNames={{
											base: "bg-[#3D1D93] text-white font-[Satoshi]",
										}}>
										<DropdownTrigger>
											<Button
												radius="sm"
												className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-auto">
												{selectedValue}
											</Button>
										</DropdownTrigger>
										<DropdownMenu
											aria-label="Button"
											selectedKeys={selectedCategory}
											onSelectionChange={setSelectedCategory}
											selectionMode="single">
											{allCategories.length > 0 &&
												allCategories.map((category) => {
													return (
														<DropdownItem key={category.name}>
															{category.name}
														</DropdownItem>
													);
												})}
										</DropdownMenu>
									</Dropdown>
									<Input
										isRequired
										onChange={handleProductChange}
										type="number"
										name="quantity"
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
									isRequired
									onChange={handleProductChange}
									name="name"
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
									isRequired
									onChange={handleProductChange}
									name="description"
									minRows={6}
									variant="bordered"
									label="Description"
									classNames={{
										base: "font-[Satoshi] ",
										inputWrapper:
											"bg-[#1C1E21] inner-shadow-input border-none ",
										input: "text-white",
									}}
								/>
								<div className="md:w-52 flex flex-col md:flex-row justify-center gap-2 ">
									<Input
										isRequired
										onChange={handleProductChange}
										name="purchasePrice"
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
										isRequired
										onChange={handleProductChange}
										name="salePrice"
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
							onClick={createProduct}
							isDisabled={
								productForm.name.length === 0 ||
								productForm.description.length === 0 ||
								productForm.quantity === 0 ||
								productForm.purchasePrice === 0 ||
								productForm.salePrice === 0 ||
								selectedImage.length === 0 ||
								dropdownValue[0].length === 0 ||
								dropdownValue[0] === "Category"
									? true
									: false
							}
							radius="sm"
							className="bg-[#3D1D93] font-[Satoshi-Medium] text-white w-20">
							Create
						</Button>
						{productSuccess && (
							<span className="text-green-500 text-medium text-center font-[Satoshi] mt-[-30px]">
								Product created successfully!
							</span>
						)}
						{productError && (
							<span className="text-red-500 text-medium text-center font-[Satoshi] mt-[-30px]">
								An error occurred
							</span>
						)}
					</>
				))}
		</div>
	);
};

export default NewProduct;
