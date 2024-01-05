import {Button, Input, Spinner} from "@nextui-org/react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../Images/managemate-log-dark-mode.png";
import axios from "axios";

const Login = () => {



	// PASSWORD TOGGLE
	const [seePassword, setSeePassword] = useState(false)

	const toggleSee = () => setSeePassword(!seePassword)
	// ----------------

	const navigate = useNavigate();
	const [loginError, setLoginError] = useState("");
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setLogin({...login, [name]: value});
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();

			setLoading(true);

			const res = await axios.post(
				"https://managemate.onrender.com/login",
				login
			);

			setLoginError(false);

			setLogin({
				email: "",
				password: "",
			});

			const userIat = res.data.iat;
			const userStores = res.data.stores;
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

			navigate("/manager");
		} catch (error) {
			setLoading(false);
			setLoginError(error.response.data.error);
			
		}
	};

	return (
		<div className="h-[100vh] w-[100vw] bg-gradient-to-br from-[#383C42] to-[#232529] flex justify-center items-center">
			<div className="border-4 border-[#EBD5C4] rounded-[20px] h-[60%] w-[85%] md:w-[450px] flex flex-col justify-center items-center px-8">
				<Link to="/">
					<img src={Logo} alt="" className="w-28 h-auto" />
				</Link>
				<h1 className="font-[Satoshi-Medium] text-white text-lg mt-8 ">
					Login
				</h1>
				<div
					className="w-full h-[65%] flex justify-center items-center flex-col gap-8 ">
					<Input
						name="email"
						onChange={handleChange}
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
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi-Medium]",
								"placeholder:text-default-700/50 dark:placeholder:text-white/60",
							],
							innerWrapper: "bg-green-500",
							inputWrapper: [
								"font-[Satoshi-Medium]",
								"bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
					/>
					<Input
						name="password"
						onChange={handleChange}
						type={seePassword ? "text" : "password"}
						label="Password:"
						classNames={{
							label: [
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi-Bold]",
							],
							input: [
								"bg-[#EBD5C4]",
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi-Medium]",
								"placeholder:text-default-700/50 dark:placeholder:text-white/60",
							],
							inputWrapper: [
								"font-[Satoshi-Medium]",
								"bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
						endContent={
							<button onClick={toggleSee}>
								{seePassword ? (
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
					{loading ? (
						<Spinner />
					) : (
						<Button
							onClick={handleSubmit}
							isDisabled={
								login.email.length === 0 || login.password.length === 0
									? true
									: false
							}
							type="submit"
							className="font-[Satoshi-Bold] bg-[#9477E4] w-[40%] h-10 rounded-[5px]">
							Login
						</Button>
					)}
					{loginError.length > 0 && (
						<span className="text-red-500 font-[Satoshi-Medium] text-medium">
							{loginError}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
