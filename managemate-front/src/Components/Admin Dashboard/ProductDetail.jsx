import {useState} from "react";

function ProductDetail() {
	const product = {
		image:
			"https://res.cloudinary.com/dlmqrbnli/image/upload/v1697155921/my%20images/IMG_4238_vbiv48.jpg",
		name: "LAS PAPAS",
		description:
			"Papas a la francesa con salsa de tomate, tambien con un acompañamiento de papas con mas PAPAAAAAAAAAAAAAS",
		quantity: 21,
		purchasePrice: 70,
		salePrice: 20,
	};

    const profit = product.salePrice - product.purchasePrice

	return (
		<div className="w-[230px] md:w-auto h-auto flex flex-col justify-center md:justify-between items-center bg-[#3d1d93] rounded-lg overflow-hidden py-8 px-3 gap-7">
			<div className="w-full md:w-[40%] h-auto py-2 bg-[#1C1E21] flex justify-center rounded-full mt-3">
				<p className="font-[Poppins] font-semibold text-sm text-white">
					<span className="font-[Questrial] font-normal">Stock quantity: </span>{" "}
					{product.quantity}
				</p>
			</div>
			<div className="flex flex-col md:flex-row justify-center items-center">
				<div className="relative w-full h-auto flex flex-col justify-start items-center">
					<img
						src={product.image}
						alt=""
						className="object-cover w-[140px] rounded-full md:w-[180px] h-auto shadow-[0_4px_10px_0_rgba(0,0,0,0.3)]"
					/>
					<div className="absolute rounded-full w-auto h-auto px-2 backdrop-blur-[8px] mt-2 bg-white/10 border-white/20 border-2 shadow-medium">
						<p className="font-[Poppins] font-semibold text-[#232529] text-sm">
							{product.name}
						</p>
					</div>
				</div>
				<div className="w-full min-h-[30px] md:h-full flex flex-col justify-center md:justify-between items-center p-2 gap-3">
					<p className="font-[Poppins] font-semibold text-white text-xl text-center">
						Description
					</p>
					<p className="font-[Questrial] text-white text-sm ">
						{product.description}
					</p>
				</div>
			</div>
			<div className="bg-[#9477E4] backdrop-blur-[8px] bg-opacity-50 w-full flex flex-col justify-center items-center md:flex-row gap-4 p-6 rounded-[30px]">
				<div className="w-[150px] h-[150px] md:h-[110px] rounded-[18px] flex flex-col justify-center md:justify-between items-center bg-gradient-to-br from-[#383C42] to-[#232529] px-2 md:py-3 gap-2 md:gap-0 shadow-[4px_4px_10px_2px_rgba(0,0,0,0.4)] ">
					<p className="font-[Poppins] text-white text-medium md:text-sm text-center">
						Purchase Price
					</p>
					<p className="font-[Satoshi-Bold] text-[#ebd5c4] text-5xl md:text-4xl text-center">
						${product.purchasePrice}
					</p>
				</div>
				<div className="w-[150px] h-[150px] md:h-[110px] rounded-[18px] flex flex-col justify-center md:justify-between items-center bg-gradient-to-br from-[#383C42] to-[#232529] px-2 md:py-3 gap-2 md:gap-0 shadow-[4px_4px_10px_2px_rgba(0,0,0,0.4)] ">
					<p className="font-[Poppins] text-white text-medium md:text-sm text-center">
						Sale Price
					</p>
					<p className="font-[Satoshi-Bold] text-[#ebd5c4] text-5xl md:text-4xl text-center">
						${product.salePrice}
					</p>
				</div>
				<div className={`w-[150px] h-[150px] md:h-[110px] rounded-[18px] flex flex-col justify-center md:justify-between items-center bg-gradient-to-br ${profit > 0 ? "from-[#1FEB37] to-[#15B828]" : "from-[#EB1E1E] to-[#B81414]"} px-2 md:py-3 gap-2 md:gap-0 ${profit > 0 ?"shadow-[4px_4px_10px_0_rgba(255,255,255,0.2)]" : "shadow-[4px_4px_10px_0_rgba(235,30,30,0.5)]"} `}>
					<p className="font-[Poppins] text-black text-medium md:text-sm text-center">
						Profit per product
					</p>
					<p className="font-[Satoshi-Bold] text-[#232529] text-5xl md:text-4xl text-center">
						${profit}
					</p>
				</div>
			</div>
		</div>
	);
}
export default ProductDetail;
