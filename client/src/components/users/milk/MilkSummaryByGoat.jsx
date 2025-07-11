import YearDropdown from "../../YearDropdown";

const MilkSummaryByGoat = ({ data, selectedYear, onYearChange }) => {
	console.log('MilkSummaryByGoat data:', data); // ✅ Debug log

	if (!data?.length) {
		return <p className='italic text-gray-500'>No data available for goats.</p>;
	}

	// Safely extract unique years (with defensive check)
	const uniqueYears = [
		...new Set(
			data
				.map((item) => item._id?.year)
				.filter((year) => year !== undefined && year !== null)
		),
	].sort((a, b) => b - a);

	// Filter data based on selected year
	const filteredData =
		selectedYear === 'all'
			? data
			: data.filter((item) => item._id?.year === parseInt(selectedYear));

	return (
		<div className='bg-white rounded shadow p-4'>
			<h2 className='text-xl font-semibold mb-4'>
				Milk Production by Goat (Yearly)
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
							<th className='border p-2'>Goat</th>
							<th className='border p-2'>Total Milk (lbs)</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((item, idx) => (
							<tr key={idx}>
								<td className='border p-2'>{item._id?.year || 'N/A'}</td>
								<td className='border p-2'>{item.goatNickname}</td>
								<td className='border p-2'>
									{item.total?.toFixed(2) ?? '0.00'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MilkSummaryByGoat;
