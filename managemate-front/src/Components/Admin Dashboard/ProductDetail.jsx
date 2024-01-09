import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Spinner, Accordion, AccordionItem, Button} from "@nextui-org/react";

function ProductDetail({productId}) {
	const {id} = useParams();

	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deleteSuccess, setDeleteSuccess] = useState(false);
	const [deleteError, setDeleteError] = useState(false);

	// DELETE PRODUCT
	const deleteProduct = async () => {
		try {
			const productId = product[0]._id;
			const storeId = id;
			const category = product[0].cathegory;

			await axios.delete(
				`https://managemate.onrender.com/product/delete/${productId}/${storeId}/${category}`
			);
			setDeleteSuccess(true);
			setDeleteError(false);
		} catch (error) {
			setDeleteError(true);
			setDeleteSuccess(false);
			setTimeout(() => {
				setDeleteError(false);
			}, 3000);
		}
	};
	// ------------------------


	const getProductDetail = async () => {
		try {
			const response = await axios.get(
				`https://managemate.onrender.com/product/detail/${id}/${productId}`
			);
			const result = response.data;

			setProduct(result);
		} catch (error) {}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				await getProductDetail();

				setLoading(false);
			} catch (error) {}
		};

		fetchData();
	}, [id]);

	const profit = product[0]?.salePrice - product[0]?.purchasePrice;

	return (
		<div className="w-[230px] md:w-auto h-auto flex flex-col justify-center md:justify-between items-center bg-[#3d1d93] rounded-lg overflow-hidden py-8 px-3 gap-7">
			{!loading ? (
				<div className="flex flex-col w-full justify-center items-center h-auto gap-3">
					<Accordion isCompact className="bg-[#3d1d93] rounded-lg w-full">
						<AccordionItem
							classNames={{
								title: "text-white text-medium",
								content: "h-26 w-42",
							}}
							className="bg-[#3d1d93] font-[Satoshi-Medium] text-sm text-white w-full"
							aria-label="New cathegory"
							indicator={
								<svg
									className="fill-red-500 mr-5"
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24">
									<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
								</svg>
							}>
							<div className="flex flex-col justify-center items-center gap-2">
								<span className="text-red-500 font-[Satoshi-bold] text-sm text-center">
									Permanently delete this product?
								</span>
								<div className="flex flex-col justify-center items-center gap-2 mt-5">
									<Button
										onClick={deleteProduct}
										className="bg-green-500 font-[Satoshi-Medium] text-sm text-white w-7 h-6">
										Yes
									</Button>
									{deleteError && (
										<span className="font-[Satoshi-Medium] text-red-500 text-sm text-center">
											An error occurred
										</span>
									)}
								</div>
							</div>
						</AccordionItem>
					</Accordion>
					<div className="w-full md:w-[40%] h-auto py-2 bg-[#1C1E21] flex justify-center rounded-full mt-3">
						<p className="font-[Poppins] font-semibold text-sm text-white">
							<span className="font-[Questrial] font-normal">
								Stock quantity:{" "}
							</span>{" "}
							{product[0]?.quantity}
						</p>
					</div>
				</div>
			) : (
				<></>
			)}
			{loading ? (
				<Spinner color="success" />
			) : (
				<div className="flex flex-col w-full h-full md:flex-row justify-center items-center">
					<div className="relative md:w-full h-auto flex flex-col justify-start items-center">
						<img
							src={product[0]?.image}
							alt=""
							className="object-cover w-[140px] h-[140px] rounded-full md:w-[180px] md:h-[180px] shadow-[0_4px_10px_0_rgba(0,0,0,0.3)]"
						/>
						<div className="absolute rounded-full w-auto h-auto px-2 backdrop-blur-[8px] mt-2 bg-white/10 border-white/20 border-2 shadow-medium">
							<p className="font-[Poppins] font-semibold text-[#232529] text-sm">
								{product[0]?.name}
							</p>
						</div>
					</div>
					<div className="w-full  md:h-full flex flex-col justify-start md:justify-between items-center p-2 gap-3">
						<p className="font-[Poppins] font-semibold text-white text-xl text-center">
							Description
						</p>
						<p className="font-[Questrial] text-white text-sm ">
							{product[0]?.description}
						</p>
					</div>
				</div>
			)}
			{!deleteSuccess ? (
				<div className="bg-[#9477E4] backdrop-blur-[8px] bg-opacity-50 w-full flex flex-col justify-center items-center md:flex-row gap-4 p-6 rounded-[30px]">
					<div className="w-[150px] h-[150px] md:h-[110px] rounded-[18px] flex flex-col justify-center md:justify-between items-center bg-gradient-to-br from-[#383C42] to-[#232529] px-2 md:py-3 gap-2 md:gap-0 shadow-[4px_4px_10px_2px_rgba(0,0,0,0.4)] ">
						<p className="font-[Poppins] text-white text-medium md:text-sm text-center">
							Purchase Price
						</p>
						<p className={`font-[Satoshi-Bold] text-[#ebd5c4] ${product[0]?.purchasePrice.toString().length >= 4 ? "text-[28px] md:text-[21px]" : "text-5xl"} text-center`}>
							${product[0]?.purchasePrice}
						</p>
					</div>
					<div className="w-[150px] h-[150px] md:h-[110px] rounded-[18px] flex flex-col justify-center md:justify-between items-center bg-gradient-to-br from-[#383C42] to-[#232529] px-2 md:py-3 gap-2 md:gap-0 shadow-[4px_4px_10px_2px_rgba(0,0,0,0.4)] ">
						<p className="font-[Poppins] text-white text-medium md:text-sm text-center">
							Sale Price
						</p>
						<p className={`font-[Satoshi-Bold] text-[#ebd5c4] ${product[0]?.salePrice.toString().length >= 4 ? "text-[28px] md:text-[21px]" : "text-5xl"}  text-center`}>
							${product[0]?.salePrice}
						</p>
					</div>
					<div
						className={`w-[150px] h-[150px] md:h-[110px] rounded-[18px] flex flex-col justify-center md:justify-between items-center bg-gradient-to-br ${
							profit > 0
								? "from-[#1FEB37] to-[#15B828]"
								: "from-[#EB1E1E] to-[#B81414]"
						} px-2 md:py-3 gap-2 md:gap-0 ${
							profit > 0
								? "shadow-[4px_4px_10px_0_rgba(255,255,255,0.2)]"
								: "shadow-[4px_4px_10px_0_rgba(235,30,30,0.5)]"
						} `}>
						<p className="font-[Poppins] text-black text-medium md:text-sm text-center">
							Profit per product
						</p>
						<p className={`font-[Satoshi-Bold] text-[#232529] ${profit.toString().length >= 4 ? "text-[28px] md:text-[21px]" :"text-5xl"} text-center`}>
							${profit}
						</p>
					</div>
				</div>
			) : (
				<span className="font-[Satoshi-Medium] text-center text-green-500 text-lg w-[200px] h-[100px] flex justify-center items-center">
					Product deleted
				</span>
			)}
		</div>
	);
}
export default ProductDetail;
