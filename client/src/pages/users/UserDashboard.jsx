// @ts-nocheck
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import TotalMilkCard from '../../components/users/milk/TotalMilkCard';
import YearlyMilkBarChart from '../../components/users/milk/YearlyMilkBarChart';
import MilkSummaryByGoat from '../../components/users/milk/MilkSummaryByGoat';
import MilkSummaryByYear from '../../components/users/milk/MilkSummaryByYear';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';

const UserDashboard = () => {
	const [loading, setLoading] = useState(true);
	const [yearlyData, setYearlyData] = useState([]);
	const [allTimeTotal, setAllTimeTotal] = useState(null);
	const [milkByGoatData, setMilkByGoatData] = useState([]);
	const [selectedYear, setSelectedYear] = useState('all'); // ✅ Shared state

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [yearRes, allTimeRes, goatRes] = await Promise.all([
					axiosInstance.get('/milk/summary/by-year'),
					axiosInstance.get('/milk/summary/all-time'),
					axiosInstance.get('/milk/summary'),
				]);

				setYearlyData(yearRes.data.summary);
				setAllTimeTotal(allTimeRes.data.totalMilk);
				setMilkByGoatData(goatRes.data);
			} catch (error) {
				console.error(error);
				toast.error('Failed to fetch dashboard data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='p-6 space-y-8'>
			<h1 className='text-3xl text-center font-bold py-2'>Farming Dashboard</h1>

			{loading && <Spinner />}

			{!loading && (
				<>
					<TotalMilkCard totalMilk={allTimeTotal} />
					<YearlyMilkBarChart
						data={yearlyData}
						selectedYear={selectedYear}
						onYearChange={setSelectedYear}
					/>

					<MilkSummaryByYear
						data={yearlyData}
						selectedYear={selectedYear}
						onYearChange={setSelectedYear}
					/>
					<MilkSummaryByGoat
						data={milkByGoatData}
						selectedYear={selectedYear}
						onYearChange={setSelectedYear}
					/>
				</>
			)}
		</div>
	);
};

export default UserDashboard;
