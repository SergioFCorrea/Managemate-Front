import {useState} from "react";

function ProductCard({product}) {
	const [showDescription, setShowDescription] = useState(false);

	const toggleShowDescription = () => setShowDescription(!showDescription);

	return (
		<div className="w-[180px] h-auto flex flex-col justify-center md:justify-between items-center bg-[#3d1d93] rounded-t-lg rounded-br-lg overflow-hidden">
			<div className="relative w-full h-auto flex flex-col justify-start items-center">
				<img
					src={product.image}
					alt=""
					className="object-cover w-full md:w-[180px] h-[180px] shadow-[0_4px_10px_0_rgba(0,0,0,0.3)]"
				/>
				<div className="absolute rounded-full w-auto h-auto px-2 backdrop-blur-[8px] mt-2 bg-white/10 border-white/20 border-2 shadow-medium">
					<p className="font-[Poppins] font-semibold text-[#3d1d93] text-sm">
						{product.name}
					</p>
				</div>
				<button onClick={toggleShowDescription}>
					<p className="text-[10px] text-white font-[Poppins] mt-2">
						{showDescription ? "Hide description" : "Show description"}
					</p>
				</button>
			</div>
			<div className="w-full min-h-[30px] md:h-full flex flex-col justify-center md:justify-between items-center p-2">
				{showDescription && (
					<p className="font-[Questrial] text-white text-sm ">
						{product.description}
					</p>
				)}
				<div className="w-full h-auto py-2 bg-[#1C1E21] flex justify-center rounded-full mt-3">
					<p className="font-[Poppins] font-semibold text-sm text-white">
						<span className="font-[Questrial] font-normal">
							Stock quantity:{" "}
						</span>{" "}
						{product.quantity}
					</p>
				</div>
			</div>
		</div>
	);
}
 export default ProductCard