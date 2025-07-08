//client/src/components/users/milk/YearlyMilkBarChart.jsx
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';

const YearlyMilkBarChart = ({ data }) => {
	if (!data?.length) {
		return <p className='italic text-gray-500'>No chart data available.</p>;
	}

	return (
		<div className='bg-white rounded shadow p-4'>
			<h2 className='text-xl font-semibold mb-4'>Yearly Milk Production</h2>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart data={data}>
					<XAxis dataKey='year' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='totalMilk' fill='#82ca9d' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default YearlyMilkBarChart;
