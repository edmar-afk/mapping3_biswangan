import { useState, useEffect } from "react";
import api from "../../assets/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

function FeedbackChart() {
	const [data, setData] = useState([]);

	const fetchFeedback = async () => {
		try {
			const response = await api.get(`/api/feedbacks/`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<>
			<div className="space-y-6">
				<div
					className="text-right flex justify-end items-center space-x-1 text-blue-600 hover:underline cursor-pointer"
					onClick={fetchFeedback}>
					<RefreshIcon fontSize="small" />
					<p>Refresh</p>
				</div>

				<div className="flex flex-row items-center flex-wrap justify-evenly">
					{data.length > 0 ? (
						data.map((item, index) => (
							<div
								key={index}
								className="flex sm:w-full md:w-[40%] mb-8 p-5 shadow-md rounded-xl mr-3 ml-3">
								<div className="w-full text-left">
									<p className="text-md text-gray-800 text-left leading-normal mb-5 font-lf-normal">{item.feedback}</p>
									<span className="flex item-center">
										<img
											src="https://www.svgrepo.com/show/497628/user-square.svg"
											className="rounded-md mr-3 h-14 w-14"
										/>
										<div>
											<p className="text-sm text-gray-600">{item.name}</p>
											<p className="text-sm text-gray-400">
												{new Date(item.created_at)
													.toLocaleString("en-US", {
														hour: "numeric",
														minute: "numeric",
														hour12: true,
														month: "long",
														day: "numeric",
														year: "numeric",
													})
													.replace("AM", "am")
													.replace("PM", "pm")}
											</p>
										</div>
									</span>
								</div>
							</div>
						))
					) : (
						<p className="text-center text-gray-500 italic">No feedbacks found.</p>
					)}
				</div>
			</div>
		</>
	);
}

export default FeedbackChart;
