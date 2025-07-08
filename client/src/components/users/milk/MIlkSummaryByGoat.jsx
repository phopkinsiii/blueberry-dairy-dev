//client/src/components/users/milk/MilkSummaryByGoat.jsx

const MilkSummaryByGoat = ({ data }) => {
	if (!data?.length) {
		return <p className='italic text-gray-500'>No data available for goats.</p>;
	}

	return (
		<div className='bg-white rounded shadow p-4'>
			<h2 className='text-xl font-semibold mb-4'>
				Milk Production by Goat (Yearly)
			</h2>
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
						{data.map((item, idx) => (
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
