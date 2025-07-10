import { useState } from 'react';

const MilkSummaryByGoat = ({ data }) => {
	const [selectedYear, setSelectedYear] = useState('all');

	if (!data?.length) {
		return <p className='italic text-gray-500'>No data available for goats.</p>;
	}

	// Get unique years from data
	const uniqueYears = [...new Set(data.map((item) => item._id.year))].sort(
		(a, b) => b - a
	);

	// Filtered data based on selected year
	const filteredData =
		selectedYear === 'all'
			? data
			: data.filter((item) => item._id.year === parseInt(selectedYear));

	return (
		<div className='bg-white rounded shadow p-4'>
			<h2 className='text-xl font-semibold mb-4'>
				Milk Production by Goat (Yearly)
			</h2>

			<div className='mb-4'>
				<label htmlFor='yearFilter' className='mr-2 font-medium'>
					Select Year:
				</label>
				<select
					id='yearFilter'
					value={selectedYear}
					onChange={(e) => setSelectedYear(e.target.value)}
					className='border rounded px-2 py-1'
				>
					<option value='all'>All Years</option>
					{uniqueYears.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>

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
								<td className='border p-2'>{item._id.year}</td>
								<td className='border p-2'>{item.goatNickname}</td>
								<td className='border p-2'>{item.total.toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MilkSummaryByGoat;
