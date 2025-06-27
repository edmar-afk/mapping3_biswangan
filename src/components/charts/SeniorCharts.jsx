import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import api from "../../assets/api";

function SeniorCharts() {
	const [, setData] = useState([]);
	const [ageCounts, setAgeCounts] = useState([0, 0, 0, 0]);
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });

	useEffect(() => {
		const fetchSeniors = async () => {
			try {
				const response = await api.get(`/api/seniors/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageGroupCounts = [0, 0, 0, 0];
				const genderGroupCounts = { Male: 0, Female: 0 };

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (age >= 50 && age <= 70) ageGroupCounts[0]++;
						else if (age >= 71 && age <= 90) ageGroupCounts[1]++;
						else if (age >= 91 && age <= 99) ageGroupCounts[2]++;
						else if (age >= 100) ageGroupCounts[3]++;
					}

					if (gender === "Male" || gender === "Female") {
						genderGroupCounts[gender]++;
					}
				});

				setAgeCounts(ageGroupCounts);
				setGenderCounts(genderGroupCounts);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
				setAgeCounts([0, 0, 0, 0]);
				setGenderCounts({ Male: 0, Female: 0 });
			}
		};

		fetchSeniors();
	}, []);

	const baseDonutOptions = {
		chart: {
			type: "donut",
			toolbar: {
				show: true,
				tools: {
					download: true,
				},
			},
		},
		theme: {
			monochrome: {
				enabled: true,
			},
		},
		plotOptions: {
			pie: {
				donut: {
					size: "60%",
				},
			},
		},
		dataLabels: {
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex];
				return [name, val.toFixed(1) + "%"];
			},
		},
		legend: {
			show: true,
			position: "bottom",
		},
	};

	const ageLabels = ["50–70", "71–90", "91–99", "100+"];
	const genderLabels = ["Male", "Female"];

	const ageOptions = {
		...baseDonutOptions,
		labels: ageLabels,
	};

	const genderOptions = {
		...baseDonutOptions,
		labels: genderLabels,
	};

	return (
		<div className="space-y-16 pt-12">
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row justify-center items-center gap-8">
					<div className="w-72 h-[200px]">
						<Chart
							options={ageOptions}
							series={ageCounts}
							type="donut"
							height={300}
						/>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center gap-4">
					<div className="w-72 h-[200px]">
						<Chart
							options={genderOptions}
							series={[genderCounts.Male, genderCounts.Female]}
							type="donut"
							height={300}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SeniorCharts;
