const TotalMilkCard = ({ totalMilk }) => {
	return (
		<div className='bg-white rounded shadow p-4'>
			<h2 className='text-xl font-semibold mb-2'>All-Time Total Milk</h2>
			<p className='text-4xl font-bold'>
				{typeof totalMilk === 'number' ? `${totalMilk.toFixed(2)} lbs` : 'N/A'}
			</p>
		</div>
	);
};

export default TotalMilkCard;
