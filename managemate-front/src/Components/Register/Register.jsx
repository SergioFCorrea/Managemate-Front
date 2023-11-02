import {Button, Input} from "@nextui-org/react";
import {Link} from "react-router-dom";
import Logo from "../../Images/managemate-log-dark-mode.png";

const Register = () => {
	return (
		<div className="h-[100vh] w-[100vw] bg-gradient-to-br from-[#383C42] to-[#232529] flex justify-center items-center">
			<div className="border-4 border-[#EBD5C4] rounded-[20px] h-[60%] w-[85%] md:w-[450px] flex flex-col justify-center items-center px-8">
				<Link to="/">
					<img src={Logo} alt="" className="w-28 h-auto" />
				</Link>
				<div className="w-full h-[65%] flex justify-center items-center flex-col gap-8 ">
					<Input
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
                    <Input
						type="password"
						label="Confirm password:"
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
					<Button className="font-[Satoshi-Bold] bg-[#9477E4] w-[40%] h-10 rounded-[5px]">
						Sign Up
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Register;
