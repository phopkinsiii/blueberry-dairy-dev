// @ts-nocheck
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import TotalMilkCard from '../../components/users/milk/TotalMilkCard';
import YearlyMilkBarChart from '../../components/users/milk/YearlyMilkBarChart';
import MilkSummaryByGoat from '../../components/users/milk/MIlkSummaryByGoat';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';

const UserDashboard = () => {
	const [loading, setLoading] = useState(true);
	const [yearlyData, setYearlyData] = useState([]);
	const [allTimeTotal, setAllTimeTotal] = useState(null);
	const [milkByGoatData, setMilkByGoatData] = useState([]);

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
				setMilkByGoatData(goatRes.data); // ✅ Set goat summary data
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
			<h1 className='text-3xl font-bold'>Farm Dashboard</h1>

			{loading && <Spinner />}

			{!loading && (
				<>
					<TotalMilkCard totalMilk={allTimeTotal} />
					<YearlyMilkBarChart data={yearlyData} />
					<MilkSummaryByGoat data={milkByGoatData} />
				</>
			)}
		</div>
	);
};

export default UserDashboard;
