export default function OrderFilters({ productOptions, filters, setFilters }) {
	const handleChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className='grid md:grid-cols-4 gap-4 mb-6'>
			<div>
				<label className='block mb-1 font-medium'>Product</label>
				<select
					value={filters.product}
					onChange={(e) => handleChange('product', e.target.value)}
					className='w-full border p-2 rounded'
				>
					<option value=''>All</option>
					{productOptions.map((product) => (
						<option key={product} value={product}>
							{product}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className='block mb-1 font-medium'>Day</label>
				<input
					type='number'
					value={filters.day}
					onChange={(e) => handleChange('day', e.target.value)}
					className='w-full border p-2 rounded'
					placeholder='1-31'
					min='1'
					max='31'
				/>
			</div>

			<div>
				<label className='block mb-1 font-medium'>Month</label>
				<input
					type='number'
					value={filters.month}
					onChange={(e) => handleChange('month', e.target.value)}
					className='w-full border p-2 rounded'
					placeholder='1-12'
					min='1'
					max='12'
				/>
			</div>

			<div>
				<label className='block mb-1 font-medium'>Year</label>
				<input
					type='number'
					value={filters.year}
					onChange={(e) => handleChange('year', e.target.value)}
					className='w-full border p-2 rounded'
					placeholder='Year'
				/>
			</div>
		</div>
	);
}
