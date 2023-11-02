import {useState, useMemo} from "react";
import {
	Tooltip,
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Pagination,
	Button,
	Avatar,
	getKeyValue,
} from "@nextui-org/react";
import {Link} from "react-router-dom";

const ClientDetail = () => {
	const orders = [
		{
			key: "1",
			number: "1234567",
			payment: "Tony Reichert",
			shipment: "CEO",
			value: "Active",
		},
		{
			key: "2",
			number: "1234567",
			payment: "Zoey Lang",
			shipment: "Technical Lead",
			value: "Paused",
		},
		{
			key: "3",
			number: "1234567",
			payment: "Jane Fisher",
			shipment: "Senior Developer",
			value: "Active",
		},
		{
			key: "4",
			number: "1234567",
			payment: "William Howard",
			shipment: "Community Manager",
			value: "Vacation",
		},
		{
			key: "5",
			number: "1234567",
			payment: "Emily Collins",
			shipment: "Marketing Manager",
			value: "Active",
		},
		{
			key: "6",
			number: "1234567",
			payment: "Brian Kim",
			shipment: "Product Manager",
			value: "Active",
		},
		{
			key: "7",
			number: "1234567",
			payment: "Laura Thompson",
			shipment: "UX Designer",
			value: "Active",
		},
		{
			key: "8",
			number: "1234567",
			payment: "Michael Stevens",
			shipment: "Data Analyst",
			value: "Paused",
		},
		{
			key: "9",
			number: "1234567",
			payment: "Sophia Nguyen",
			shipment: "Quality Assurance",
			value: "Active",
		},
		{
			key: "10",
			number: "1234567",
			payment: "James Wilson",
			shipment: "Front-end Developer",
			value: "Vacation",
		},
		{
			key: "11",
			number: "1234567",
			payment: "Ava Johnson",
			shipment: "Back-end Developer",
			value: "Active",
		},
		{
			key: "12",
			number: "1234567",
			payment: "Isabella Smith",
			shipment: "Graphic Designer",
			value: "Active",
		},
		{
			key: "13",
			number: "1234567",
			payment: "Oliver Brown",
			shipment: "Content Writer",
			value: "Paused",
		},
		{
			key: "14",
			number: "1234567",
			payment: "Lucas Jones",
			shipment: "Project Manager",
			value: "Active",
		},
		{
			key: "15",
			number: "1234567",
			payment: "Grace Davis",
			shipment: "HR Manager",
			value: "Active",
		},
		{
			key: "16",
			number: "1234567",
			payment: "Elijah Garcia",
			shipment: "Network Administrator",
			value: "Active",
		},
		{
			key: "17",
			number: "1234567",
			payment: "Emma Martinez",
			shipment: "Accountant",
			value: "Vacation",
		},
		{
			key: "18",
			number: "1234567",
			payment: "Benjamin Lee",
			shipment: "Operations Manager",
			value: "Active",
		},
		{
			key: "19",
			number: "1234567",
			payment: "Mia Hernandez",
			shipment: "Sales Manager",
			value: "Paused",
		},
		{
			key: "20",
			number: "1234567",
			payment: "Daniel Lewis",
			shipment: "DevOps Engineer",
			value: "Active",
		},
		{
			key: "21",
			number: "1234567",
			payment: "Amelia Clark",
			shipment: "Social Media Specialist",
			value: "Active",
		},
		{
			key: "22",
			number: "1234567",
			payment: "Jackson Walker",
			shipment: "Customer Support",
			value: "Active",
		},
		{
			key: "23",
			number: "1234567",
			payment: "Henry Hall",
			shipment: "Security Analyst",
			value: "Active",
		},
		{
			key: "24",
			number: "1234567",
			payment: "Charlotte Young",
			shipment: "PR Specialist",
			value: "Paused",
		},
		{
			key: "25",
			number: "1234567",
			payment: "Liam King",
			shipment: "Mobile App Developer",
			value: "Active",
		},
	];

	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const pages = Math.ceil(orders.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return orders.slice(start, end);
	}, [page, orders]);
	return (
		<div className="flex flex-col justify-center items-center h-full w-full md:w-[580px] bg-gradient-to-br from-[#9477E4] to-[#3d1d93] border-none px-5 py-12 rounded-[12px] gap-5">
			<div className="flex flex-col justify-center items-center md:flex-row gap-8">
				<div className="flex flex-col justify-center items-center gap-5">
					<p className="font-[Poppins] flex justify-center items-center text-white font-medium text-sm gap-2">
						Origin: <svg
							className="h-6 w-6 fill-white"
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<title>Instagram</title>
							<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
						</svg>
					</p>
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
					<Button
						radius="sm"
						className=" h-8 w-16 font-[Satoshi-Bold] text-sm bg-white text-[#232529]">
						Edit client
					</Button>
				</div>
				<div className="flex-col flex just items-center gap-4">
					<div className="w-full min-h-[160px] max-h-[880px] rounded-[16px] bg-[#232529] flex flex-col justify-center items-center p-2 gap-5 hide-scrollbar overflow-y-scroll shadow-[4px_4px_12px_0px_rgba(0,0,0,0.4)]">
						<div className="grid grid-cols-2 gap-3">
							<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 ">
								<span className="text-[#9477E4] ">City: </span>Barrancabermeja
							</p>
							<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 ">
								<span className="text-[#9477E4] ">Adress: </span> La calle 30
								con avenida 70 diagonal 2 sur
							</p>
							<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 ">
								<span className="text-[#9477E4] ">Neighborhood: </span> El bronx
								(es un barrio peligroso)
							</p>
							<p className="font-[Questrial] text-white text-sm  px-2 py-1 rounded-[10px] bg-[#C8D9FF] backdrop-blur-[8px] bg-opacity-10 ">
								<span className="text-[#9477E4] ">Apartment/ Tower: </span> La
								torre 3456 apartamento 3429382958La torre 3456 apartamento
								3429382958
							</p>
						</div>
					</div>
					<div className="flex justify-center rounded-[16px] h-[100px] w-full bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-30 p-3">
						<p className="font-[Questrial] text-sm text-white">
							Space to write notes or things to consider about the client (ch
							limit)
						</p>
					</div>
				</div>
			</div>
			<p className="text-white font-[Satoshi] text-xl  mt-8">Orders</p>
			<Table
				onRowAction={() => alert("Here will be placed the order detail")}
				aria-label="Active orders"
				bottomContent={
					<div className="flex w-full justify-center">
						{orders.length > 0 && (
							<Pagination
								classNames={{
									cursor:
										"bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-20 text-[#3d1d93] rounded-full w-6 h-6 md:w-10 md:h-10",
									base: "w-full m-0 md:mb-12 md:mt-0 md:w-auto",
								}}
								isCompact
								showControls
								color="secondary"
								page={page}
								total={pages}
								onChange={(page) => setPage(page)}
							/>
						)}
					</div>
				}
				classNames={{
					th: "bg-[#C8D9FF] backdrop-blur-[18px] bg-opacity-30 text-white text-[8.3px] md:text-[12px] xl:text-[15px]",
					tr: " hover:text-[#ebd9c4] ",
					wrapper:
						"shadow-[2px_2px_8px_3px_rgba(0,0,0,0.4)] min-h-[222px] w-[280px] md:h-[305px] md:w-full  bg-[#3d1d93] text-[#EBF1FF] font-[Poppins] p-2 md:p-3 flex flex-col justify-between items-center overflow-hidden",
					td: "text-[8.7px] md:text-[12px] xl:text-[13px] font-medium",
				}}>
				<TableHeader>
					<TableColumn key="number">Number</TableColumn>
					<TableColumn key="payment">Payment</TableColumn>
					<TableColumn key="shipment">Shipment</TableColumn>
					<TableColumn key="value">Value</TableColumn>
				</TableHeader>
				<TableBody items={items}>
					{(item) => (
						<TableRow key={item.name}>
							{(columnKey) => (
								<TableCell>{getKeyValue(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default ClientDetail;
