import YearDropdown from "../../YearDropdown";

const MilkSummaryByYear = ({ data, selectedYear, onYearChange }) => {
	const uniqueYears = [...new Set(data.map((item) => item.year))].sort(
		(a, b) => b - a
	);

	const filteredData =
		selectedYear === 'all'
			? data
			: data.filter((item) => item.year === parseInt(selectedYear));

	return (
		<div className='bg-white rounded shadow p-4'>
			<h2 className='text-xl font-semibold mb-4'>
				Total Milk Production (Yearly)
			</h2>

			<YearDropdown
				years={uniqueYears}
				selectedYear={selectedYear}
				onChange={onYearChange}
			/>

			<div className='overflow-x-auto'>
				<table className='w-full border'>
					<thead>
						<tr>
							<th className='border p-2'>Year</th>
							<th className='border p-2'>Total Milk (lbs)</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((item, idx) => (
							<tr key={idx}>
								<td className='border p-2'>{item.year}</td>
								<td className='border p-2'>{item.totalMilk.toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MilkSummaryByYear;
