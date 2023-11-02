import {
	Avatar,
	Tooltip,
	ScrollShadow,
	Progress,
	Badge,
} from "@nextui-org/react";

const OrderDetail = () => {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full  bg-none px-5 py-12 rounded-[12px] gap-8 overflow-hidden">
			<div className="flex flex-col justify-center items-center md:flex-row gap-8">
				<div className="flex flex-col justify-center items-center gap-5">
					<Avatar className="w-32 h-32 font-[Satoshi] text-xl text-[#3d1d93] bg-white inner-shadow-2" />
					<p className="font-[Satoshi] text-white text-[12px] bg-white backdrop-blur-[8px] bg-opacity-20  px-2 py-1 rounded-lg text-center">
						Customer Name
					</p>
					<p className="font-[Satoshi] text-white text-[12px] bg-white backdrop-blur-[8px] bg-opacity-20  px-2 py-1 rounded-lg">
						ID Number
					</p>
					<div className="flex justify-between- items-center gap-6">
						<svg
							className="h-6 w-6 fill-white"
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<title>Instagram</title>
							<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
						</svg>
						<Tooltip
							content="Phone number: 31291294"
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
					</div>
				</div>
				<div className="flex-col flex just items-center gap-4">
						<div className="w-full min-h-[160px] max-h-[880px] rounded-[16px] bg-[#232529] flex flex-col justify-between items-center pb-5 gap-5 overflow-y-scroll shadow-[4px_4px_12px_0px_rgba(0,0,0,0.2)]">
							<div className="w-full h-10 bg-[#1C1E21] rounded-t-[16px] flex justify-center items-center">
								<p className="font-[Satoshi] text-[#c8d9ff] text-sm">$30.000</p>
							</div>
							<div className=" md:pr-5 md:pl-5">
								<ScrollShadow
									size="20"
									orientation="vertical"
									className=" w-full h-28">
									<div className="flex flex-col justify-center items-center gap-4 w-full md:flex-wrap md:flex-row">
										<div className="w-28 h-28 flex flex-col justify-center items-center bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-30 rounded-md gap-2">
											<p className="font-[Poppins] text-white text-[12px]">
												Product Name
											</p>
											<img
												src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
												alt=""
												className="w-14 h-auto rounded-sm"
											/>
											<p className="font-[Poppins] text-white text-[9px]">
												$300
											</p>
										</div>
										<div className="w-28 h-28 flex flex-col justify-center items-center bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-30 rounded-md gap-2">
											<p className="font-[Poppins] text-white text-[12px]">
												Product Name
											</p>
											<img
												src="https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg"
												alt=""
												className="w-14 h-auto rounded-sm"
											/>
											<p className="font-[Poppins] text-white text-[9px]">
												$300
											</p>
										</div>
									</div>
								</ScrollShadow>
							</div>
						</div>
					<div className="flex justify-center rounded-[16px] h-[100px] w-full bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-30 p-3">
						<p className="font-[Questrial] text-sm text-white">
							Space to write notes or things to consider about the order (ch
							limit)
						</p>
					</div>
				</div>
			</div>
			<div className="w-full h-[180px] rounded-[10px] flex flex-col justify-center items-center md:flex-row gap-4 md:gap-8 bg-white backdrop-blur-[18px] bg-opacity-30">
				<Badge
					placement="top-right"
					disableOutline
					content={
						<svg
							className="w-4 bg-none fill-[#3d1d93]"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm0-80q-25 0-42.5-17.5T422-480q0-25 17.5-42.5T482-540q25 0 42.5 17.5T542-480q0 25-17.5 42.5T482-420Zm-2-60Zm-40 320h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Z" />
						</svg>
					}
					classNames={{
						bagde: " bg-red-500 backdrop-blur-[8px] bg-opacity-20",
					}}>
					<div className="w-full  h-[120px] bg-[#3d1d93] rounded-[16px] flex flex-col justify-center items-center p-2 gap-3 shadow-[4px_4px_12px_0px_rgba(0,0,0,0.4)]">
						<p className="font-[Satoshi] text-white text-medium md:text-lg">
							Shipment
						</p>
						<div className="flex flex-col justify-center items-center gap-1">
							<div className="w-full flex justify-start">
								<svg
									className="fill-white"
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24">
									<path d="M160-200h80v-320h480v320h80v-426L480-754 160-626v426Zm-80 80v-560l400-160 400 160v560H640v-320H320v320H80Zm280 0v-80h80v80h-80Zm80-120v-80h80v80h-80Zm80 120v-80h80v80h-80ZM240-520h480-480Z" />
								</svg>
							</div>
							<Progress
								orientation="horizontal"
								value={10}
								className="w-48 md:w-56"
								classNames={{indicator: "bg-white ", track: "h-5"}}
							/>
							<p className="font-[Questrial] text-white text-sm">Not shipped</p>
						</div>
					</div>
				</Badge>
				<Badge
					placement="top-right"
					disableOutline
					content={
						<svg
							className="w-4 bg-none fill-[#3d1d93]"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm0-80q-25 0-42.5-17.5T422-480q0-25 17.5-42.5T482-540q25 0 42.5 17.5T542-480q0 25-17.5 42.5T482-420Zm-2-60Zm-40 320h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Z" />
						</svg>
					}
					classNames={{
						bagde: " bg-red-500 backdrop-blur-[8px] bg-opacity-20",
					}}>
					<div className="w-full h-[120px] md:w-[180px] bg-[#3d1d93] rounded-[16px] flex flex-col justify-between items-center p-2 gap-2 shadow-[4px_4px_12px_0px_rgba(0,0,0,0.4)]">
						<svg
							className="fill-white w-20 h-auto"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24">
							<path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
						</svg>
						<p className="font-[Questrial] text-white text-lg">Payed</p>
					</div>
				</Badge>
			</div>
		</div>
	);
};

export default OrderDetail;
