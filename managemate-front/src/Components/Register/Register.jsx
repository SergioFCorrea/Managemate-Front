import {Button, Input} from "@nextui-org/react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../Images/managemate-log-dark-mode.png";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import validations from "./validations";

const Register = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [userImage, setUserImage] = useState(null);
	const [usedEmail, setUsedEmail] = useState("");

	const [form, setForm] = useState({
		image: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setForm({...form, [name]: value});
		setErrors({
			...errors,
			[name]: validations({...form, [name]: value})[name],
		});
		validations(form);
	};

	// CONFIG PARA SUBIR FOTOS A CLOUDINARY

	const cloudinaryRefImage = useRef();
	const widgetRefImage = useRef();
	const [selectedImage, setSelectedImage] = useState("");

	// ---------------

	useEffect(() => {
		cloudinaryRefImage.current = window.cloudinary;
		widgetRefImage.current = cloudinaryRefImage.current.createUploadWidget(
			{
				cloudName: "dxyosebut",
				uploadPreset: "user_image",
			},
			function (error, result) {
				if (result && result.event === "success") {
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

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const formErrors = validations(form);
			if (Object.keys(formErrors).length > 0) {
				setErrors(formErrors);
				return;
			}
			const originalFormData = {
				...form,
				image: selectedImage,
			};

			await axios.post("https://managemate.onrender.com/user", originalFormData);

			setForm({
				email: "",
				password: "",
				confirmPassword: "",
			});

			navigate("/login");
		} catch (error) {
			setUsedEmail(error.response.data.error);
		}
	};

	return (
		<div className="h-[100vh] w-[100vw] bg-gradient-to-br from-[#383C42] to-[#232529] flex justify-center items-center">
			<div className="border-4 border-[#EBD5C4] rounded-[20px] h-auto w-[85%] md:w-[450px] flex flex-col justify-center items-center px-8 py-6">
				<Link to="/">
					<img src={Logo} alt="" className="w-28 h-auto" />
				</Link>
				<form
					onSubmit={handleSubmit}
					className="w-full h-[65%] flex justify-center items-center flex-col gap-8 ">
					<Input
						isInvalid={errors.email ? true : false}
						errorMessage={
							errors.email
								? "Please enter a valid email"
								: usedEmail
								? usedEmail
								: ""
						}
						variant={errors.email ? "bordered" : ""}
						onChange={handleChange}
						name="email"
						type="email"
						label="Email:"
						radius="sm"
						classNames={{
							label: [
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi-Bold]",
							],
							input: [
								"bg-[#EBD5C4]",
								errors.email
									? "text-white"
									: "text-[#232529] dark:text-white/90",
								"font-[Satoshi-Medium]",
								"placeholder:text-default-700/50 dark:placeholder:text-white/60",
							],
							innerWrapper: "bg-green-500",
							inputWrapper: [
								"font-[Satoshi-Medium]",
								errors.email ? "bg-none" : "bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
					/>
					<Input
						isInvalid={errors.password ? true : false}
						errorMessage={errors.password ? errors.password : ""}
						variant={errors.password ? "bordered" : ""}
						onChange={handleChange}
						name="password"
						type="password"
						label="Password:"
						classNames={{
							label: [
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi-Bold]",
							],
							input: [
								"bg-[#EBD5C4]",
								errors.confirmPassword
									? "text-white"
									: "text-[#232529] dark:text-white/90",
								"font-[Satoshi-Medium]",
								"placeholder:text-default-700/50 dark:placeholder:text-white/60",
							],
							innerWrapper: "bg-green-500",
							inputWrapper: [
								"font-[Satoshi-Medium]",
								errors.confirmPassword ? "bg-none" : "bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
					/>
					<Input
						isInvalid={errors.confirmPassword ? true : false}
						errorMessage={errors.confirmPassword ? errors.confirmPassword : ""}
						variant={errors.confirmPassword ? "bordered" : ""}
						onChange={handleChange}
						name="confirmPassword"
						type="password"
						label="Confirm password:"
						classNames={{
							label: [
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi-Bold]",
							],
							input: [
								"bg-[#EBD5C4]",
								errors.confirmPassword
									? "text-white"
									: "text-[#232529] dark:text-white/90",
								"font-[Satoshi-Medium]",
								"placeholder:text-default-700/50 dark:placeholder:text-white/60",
							],
							innerWrapper: "bg-green-500",
							inputWrapper: [
								"font-[Satoshi-Medium]",
								errors.confirmPassword ? "bg-none" : "bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
					/>
					<div className="h-auto w-full flex flex-col justify-center items-center bg-[#232529] rounded-md py-4 gap-4">
						<Button
							onClick={handleUploadImage}
							className="font-[Satoshi-Bold] bg-[#9477E4] w-auto px-1 h-10 rounded-[5px] text-sm">
							{!selectedImage ? "Select an image" : "Change your image"}
						</Button>
						{selectedImage && (
							<img
								src={selectedImage}
								alt=""
								className="h-32 w-32 rounded-medium object-cover"
							/>
						)}
					</div>
					<label
						className="text-sm text-[#EBD5C4] font-[Satoshi-Medium] text-left"
						htmlFor="image">
						{!selectedImage ? "Upload your user image" : "The image you chose"}
					</label>
					<Button
						isDisabled={
							errors.email ||
							errors.password ||
							errors.confirmPassword ||
							form.email === "" ||
							form.password === "" ||
							form.confirmPassword === ""
								? true
								: false
						}
						type="submit"
						className="font-[Satoshi-Bold] bg-[#9477E4] w-[40%] h-10 rounded-[5px]">
						Sign Up
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Register;
