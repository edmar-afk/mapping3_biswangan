import { useState, useEffect } from "react";import api from "../../assets/api";function HouseholdChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchHousehold = async () => {
			try {
				const response = await api.get(`/api/households/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching Households:", error);
				setData([]);
			}
		};

		fetchHousehold();
	}, []);

	return (
		<>
			<p className="text-gray-800 text-center pt-12 text-4xl font-extrabold">HOUSEHOLD</p>
			<div className="space-y-10">
				{data.map((household, index) => (
					<div
						key={index}
						className="border p-4 rounded-lg shadow">
						<h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{household.family_name} Family</h2>

						{household.members && household.members.length > 0 ? (
							<table className="w-full table-auto border border-gray-300">
								<thead className="bg-gray-100">
									<tr>
										<th className="border px-4 py-2 text-left">Name</th>
										<th className="border px-4 py-2 text-left">Age</th>
										<th className="border px-4 py-2 text-left">Role</th>
									</tr>
								</thead>
								<tbody>
									{household.members.map((member, i) => (
										<tr key={i}>
											<td className="border px-4 py-2">{member.name}</td>
											<td className="border px-4 py-2">{member.age}</td>
											<td className="border px-4 py-2">{member.role}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p className="text-gray-500 italic text-center">No family members found.</p>
						)}
					</div>
				))}
			</div>
		</>
	);
	
}

export default HouseholdChart;
