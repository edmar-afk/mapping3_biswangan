

function TopBar({ onCategorySelect, activeCategory }) {
	const categories = [
		{
			label: "PWD",
			key: "pwds",
		},
		{
			label: "Infrastructure",
			key: "infras",
		},
		{
			label: "Senior Citizens",
			key: "seniors",
		},
		{
			label: "Households",
			key: "households",
		},
		{
			label: "Feedbacks",
			key: "feedbacks",
		},
	];

	return (
		<div className="flex flex-row items-center mx-auto pt-2 flex-wrap justify-center">
			{categories.map((cat) => (
				<button
					key={cat.key}
					onClick={() => onCategorySelect(cat.key)}
					className={`px-4 py-2 mx-2 rounded-lg flex items-center whitespace-nowrap mb-6 duration-300 ${
						activeCategory === cat.key ? "bg-green-700 text-white" : "bg-white hover:bg-green-700 hover:text-white"
					}`}>
					{cat.label}
				</button>
			))}
			
		</div>
	);
}

export default TopBar;
