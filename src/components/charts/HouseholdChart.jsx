import { useState, useEffect } from "react";import api from "../../assets/api";function HouseholdChart() {	const [data, setData] = useState([]);
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
						className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500">
							<caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
								{household.family_name} Family
								<p className="mt-1 text-sm font-normal text-gray-500">
									Below is the list of family members in the {household.family_name} household.
								</p>
							</caption>
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3">
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3">
										Age
									</th>
									<th
										scope="col"
										className="px-6 py-3">
										Role
									</th>
									<th
										scope="col"
										className="px-6 py-3">
										Purok
									</th>
									<th
										scope="col"
										className="px-6 py-3">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{household.members && household.members.length > 0 ? (
									household.members.map((member, i) => (
										<tr
											key={i}
											className="bg-white border-b  border-gray-200">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
												{member.name}
											</th>
											<td className="px-6 py-4">{member.age}</td>
											<td className="px-6 py-4">{member.role}</td>
											<td className="px-6 py-4">{member.purok}</td>
											<td className="px-6 py-4">{member.status}</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="4"
											className="px-6 py-4 text-center text-gray-500 italic">
											No family members found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				))}
			</div>
		</>
	);
}

export default HouseholdChart;
