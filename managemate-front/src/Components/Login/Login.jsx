import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../Images/managemate-log-dark-mode.png";
import axios from "axios";

const Login = () => {
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState(false);
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
			localStorage.setItem("userStores", userStores);
			localStorage.setItem("userId", userId);
			localStorage.setItem("userEmail", userEmail);
			localStorage.setItem("userImage", userImage);
			localStorage.setItem("loggedUser", true);

			navigate("/manager");
		} catch (error) {
			setLoginError(error.response.data.error);
			console.log(error);
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
				<form
					onSubmit={handleSubmit}
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
								"font-[Satoshi]",
								"placeholder:text-default-700/50 dark:placeholder:text-white/60",
							],
							innerWrapper: "bg-green-500",
							inputWrapper: [
								"font-[Satoshi]",
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
						type="password"
						label="Password:"
						classNames={{
							label: [
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi-Bold]",
							],
							input: [
								"bg-[#EBD5C4]",
								"text-[#232529] dark:text-white/90",
								"font-[Satoshi]",
								"placeholder:text-default-700/50 dark:placeholder:text-white/60",
							],
							innerWrapper: "bg-green-500",
							inputWrapper: [
								"font-[Satoshi]",
								"bg-[#EBD5C4]",
								"!cursor-text",
								"h-12",
								"rounded-[5px]",
							],
						}}
					/>
					<Button
						type="submit"
						className="font-[Satoshi-Bold] bg-[#9477E4] w-[40%] h-10 rounded-[5px]">
						Login
					</Button>
					{loginError && (
						<span className="text-red-500 font-[Satoshi] text-medium">
							{loginError}
						</span>
					)}
				</form>
			</div>
		</div>
	);
};

export default Login;
