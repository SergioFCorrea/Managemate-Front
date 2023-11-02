import {
	Button,
	Input,
	Checkbox,
	ScrollShadow,
	Badge,
	Textarea,
	Navbar,
	NavbarContent,
} from "@nextui-org/react";
import {Link} from "react-router-dom";

const OrderCreation = () => {
	return (
		<div>
			<Navbar maxWidth="xl" className=" justify-center flex ">
				<NavbarContent justify="start">
					<Link to="/dashboard/orders">
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
						Order Creation
					</h1>
					<div className="bg-[#3d1d93] rounded-[20px] w-full h-auto px-3 md:px-8 py-8 flex flex-col justify-center items-center gap-8 md:gap-8 overflow-hidden">
						<div className="w-full flex justify-center items-center flex-col gap-8 md:flex-row">
							<div className="w-full h-auto flex flex-col justify-center items-center">
								<p className="text-white font-[Poppins] font-medium text-xl mb-2">
									Clients
								</p>
								<div className="w-full bg-gradient-to-br from-white to-[#C8D9FF] h-[200px] flex flex-col justify-center items-center gap-2 p-2 rounded-t-[20px]">
									<Input
										placeholder="Search clients"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									<div className="flex flex-col justify-center items-center w-full h-[80%]">
										<div className="w-[130px] h-[130px] rounded-[15px] bg-[#3D1D93] flex flex-col justify-center items-center shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] gap-2 ">
											<img
												src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
												alt=""
												className="w-20 h-auto rounded-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
											/>
											<p className="font-[Poppins] text-white text-[12px]">
												@makima
											</p>
										</div>
									</div>
								</div>
								<div className="bg-[#232529] rounded-b-[20px] w-full h-[95px] p-2 flex flex-col justify-center items-center gap-2">
									<p className="font-[Poppins] text-white text-sm font-medium">
										Shipping Adress
									</p>
									<Input
										value="Calle Patata Con Avenida Pou #23"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
								</div>
							</div>
							<div className="w-full h-auto flex flex-col justify-center items-center">
								<p className="text-white font-[Poppins] font-medium text-xl mb-2">
									Products
								</p>
								<div className="w-full bg-gradient-to-br from-white to-[#C8D9FF] h-[200px] flex flex-col justify-center items-center gap-2 p-2 rounded-t-[20px]">
									<Input
										placeholder="Search products"
										classNames={{
											input: [
												"bg-white",
												"text-[#232529] dark:text-white/90",
												"font-[Satoshi]",
												"placeholder:text-[#3d1d93] dark:placeholder:text-white/60",
											],
											inputWrapper: [
												"data-[hover=true]:border-[#EBD5C4]",
												"border-none",
												"font-[Satoshi]",
												"bg-white",
												"!cursor-text",
												"h-11",
												"w-full",
												"inner-client-creation",
												"rounded-[10px]",
											],
										}}
									/>
									<div className="flex flex-col justify-center items-center w-full h-[80%]">
										<div className="w-[130px] h-[130px] rounded-[15px] bg-[#3D1D93] flex flex-col justify-center items-center shadow-[4px_4px_18px_3px_rgba(0,0,0,0.6)] gap-2 ">
											<Checkbox
                                                color="default"
												classNames={{
													base: "flex flex-col justify-start items-start gap",
													wrapper: "data-selected:bg-[#9477E4]",
													label: "w-[110px] ",
												}}>
												<div className="flex flex-col justify-center items-center gap-1">
													<img
														src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
														alt=""
														className="w-16 h-auto rounded-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
													/>
													<p className="font-[Poppins] text-white text-[12px]">
														$307
													</p>
												</div>
											</Checkbox>
										</div>
									</div>
								</div>
								<div className="bg-[#232529] rounded-b-[20px] w-full h-auto p-2 flex flex-col justify-center items-center gap-3">
									<p className="font-[Poppins] text-white text-sm font-medium">
										Total: $1037
									</p>
									<div className="flex flex-wrap justify-center items-center gap-3 px-2">
										<Badge
											disableOutline
											classNames={{
												badge: "w-5 h-5",
											}}
											onClick={() => alert("deletes the product")}
											content={
												<svg
													className="w-5"
													xmlns="http://www.w3.org/2000/svg"
													height="24"
													viewBox="0 -960 960 960"
													width="24">
													<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
												</svg>
											}>
											<img
												src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
												alt=""
												className="w-12 h-auto rounded-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
											/>
										</Badge>
										<Badge
											disableOutline
											classNames={{
												badge: "w-5 h-5",
											}}
											onClick={() => alert("deletes the product")}
											content={
												<svg
													className="w-5"
													xmlns="http://www.w3.org/2000/svg"
													height="24"
													viewBox="0 -960 960 960"
													width="24">
													<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
												</svg>
											}>
											<img
												src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
												alt=""
												className="w-12 h-auto rounded-lg shadow-[0_0_18px_0_rgba(0,0,0,0.8)]"
											/>
										</Badge>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full  bg-none flex flex-col justify-center items-center gap-5 px-4 py-8">
							<div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
								<div className="w-full flex flex-col justify-center items-center">
									<p className="font-[Poppins] font-mdium text-white text-xl">
										Notes
									</p>
									<Textarea classNames={{
                                        base:"text-white font-[Satoshi] ",
                                        inputWrapper:"bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-30"
                                    }} placeholder="Write important things you want to remember about this order..." />
								</div>
								<div className="w-full flex flex-col justify-center items-center gap-1">
									<p className="font-[Poppins] font-mdium text-white text-xl">
										Payment Status
									</p>
									<div className="w-full flex flex-row justify-center items-center gap-2">
										<div className="flex flex-col justify-center items-center w-[80px] h-[80px] rounded-xl bg-white">
											<svg
												className="w-[40px] h-auto fill-[#3d1d93]"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
											</svg>
											<p className="font-[Poppins] text-[#3d1d93] text-[10px] md:text-sm font-medium">
												Paid
											</p>
										</div>
										<div className="flex flex-col justify-center items-center w-[80px] h-[80px] rounded-xl bg-white">
											<svg
												className="w-[40px] h-auto fill-[#3d1d93]"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M280-420q25 0 42.5-17.5T340-480q0-25-17.5-42.5T280-540q-25 0-42.5 17.5T220-480q0 25 17.5 42.5T280-420Zm200 0q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm200 0q25 0 42.5-17.5T740-480q0-25-17.5-42.5T680-540q-25 0-42.5 17.5T620-480q0 25 17.5 42.5T680-420ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
											</svg>
											<p className="font-[Poppins] text-[#3d1d93] text-[10px] md:text-sm font-medium">
												Pending
											</p>
										</div>
										<div className="flex flex-col justify-center items-center w-[80px] h-[80px] rounded-xl bg-white">
											<svg
												className="w-[40px] h-auto fill-[#3d1d93]"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24">
												<path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
											</svg>
											<p className="font-[Poppins] text-[#3d1d93] text-[10px] md:text-sm font-medium">
												Pre-order
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Button
						radius="sm"
						className="bg-[#c8d9ff] font-[Satoshi-Bold] text-lg text-[#3d1d93] w-40 h-12">
						Create
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OrderCreation;
