import {Button, Input, Spinner} from "@nextui-org/react";
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

	// PASSWORD TOGGLE
	const [passwordVisible, setPasswordVisible] = useState(false)
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

	const togglePasswordVisible = () =>
		setPasswordVisible(!passwordVisible);
	const toggleConfirmNewPasswordVisible = () =>
		setConfirmPasswordVisible(!confirmPasswordVisible);
	// ----------------

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

	const [loadingRegister, setLoadingRegister] = useState(false);

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

			setLoadingRegister(true);

			const registerResponse = await axios.post(
				"https://managemate.onrender.com/user",
				originalFormData
			);

			if (registerResponse.status === 200) setLoadingRegister(false);

			const login = {
				email: form.email,
				password: form.password,
			};

			const res = await axios.post(
				"https://managemate.onrender.com/login",
				login
			);

			const userIat = res.data.iat;
			const userPassword = res.data.password;
			const userId = res.data.id;
			const userEmail = res.data.email;
			const userImage = res.data.image;

			localStorage.setItem("userIat", userIat);
			localStorage.setItem("userPassword", userPassword);
			localStorage.setItem("userId", userId);
			localStorage.setItem("userEmail", userEmail);
			localStorage.setItem("userImage", userImage);
			localStorage.setItem("loggedUser", true);

			setForm({
				email: "",
				password: "",
				confirmPassword: "",
			});
			navigate("/manager");
		} catch (error) {
			setUsedEmail(error.response.data.error);
			setLoadingRegister(false)
		}
	};

	return (
		<div className="h-[100vh] w-[100vw] bg-gradient-to-br from-[#383C42] to-[#232529] flex justify-center items-center">
			<div className="border-4 border-[#EBD5C4] rounded-[20px] h-auto w-[85%] md:w-[450px] flex flex-col justify-center items-center px-8 py-6">
				<Link to="/">
					<img src={Logo} alt="" className="w-28 h-auto" />
				</Link>
				<div
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
						type={passwordVisible ? "text" : "password"}
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
							
							inputWrapper: [
								"font-[Satoshi-Medium]",
								errors.confirmPassword ? "bg-none" : "bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
						endContent={
							<button onClick={togglePasswordVisible}>
								{passwordVisible ? (
									<svg
										className="fill-[#232529]"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24">
										<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
									</svg>
								) : (
									<svg
										className="fill-[#232529]"
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
						isInvalid={errors.confirmPassword ? true : false}
						errorMessage={errors.confirmPassword ? errors.confirmPassword : ""}
						variant={errors.confirmPassword ? "bordered" : ""}
						onChange={handleChange}
						name="confirmPassword"
						type={confirmPasswordVisible ? "text" : "password"}
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
							inputWrapper: [
								"font-[Satoshi-Medium]",
								errors.confirmPassword ? "bg-none" : "bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
						endContent={
							<button onClick={toggleConfirmNewPasswordVisible}>
								{confirmPasswordVisible ? (
									<svg
										className="fill-[#232529]"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24">
										<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
									</svg>
								) : (
									<svg
										className="fill-[#232529]"
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
					{loadingRegister ? (
						<Spinner />
					) : (
						<Button
							onClick={handleSubmit}
							isDisabled={
								selectedImage.length === 0 ||
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
					)}
				</div>
			</div>
		</div>
	);
};

export default Register;
