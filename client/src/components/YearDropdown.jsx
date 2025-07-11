const YearDropdown = ({ years, selectedYear, onChange }) => {
	return (
		<div className='mb-4'>
			<label htmlFor='yearFilter' className='mr-2 font-medium'>
				Select Year:
			</label>
			<select
				id='yearFilter'
				value={selectedYear}
				onChange={(e) => onChange(e.target.value)}
				className='border rounded px-2 py-1'
			>
				<option value='all'>All Years</option>
				{years.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</select>
		</div>
	);
};

export default YearDropdown;
