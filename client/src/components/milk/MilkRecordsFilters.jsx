// @ts-nocheck
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';

const MilkRecordsFilters = ({ onResults }) => {
	const [goats, setGoats] = useState([]);
	const [filters, setFilters] = useState({
		goat: '',
		startDate: '',
		endDate: '',
		testDayOnly: false,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchGoats = async () => {
			try {
				const { data } = await axiosInstance.get('/goats');
				setGoats(data);
			} catch (err) {
				console.error('Failed to load goats:', err);
			}
		};
		fetchGoats();
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const applyFilters = async () => {
		try {
			setLoading(true);
			const params = {};
			if (filters.goat) params.goatId = filters.goat;
			if (filters.startDate) params.startDate = filters.startDate;
			if (filters.endDate) params.endDate = filters.endDate;
			if (filters.testDayOnly) params.testDay = true;

			const { data } = await axiosInstance.get('/milk', { params });
			onResults(data);
		} catch (err) {
			console.error('Failed to fetch filtered records:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-gray-50 p-4 rounded-md shadow mb-6 space-y-4'>
			<h2 className='text-lg font-semibold'>Filter Milk Records</h2>

			<div>
				<label className='block font-medium'>Goat</label>
				<select
					name='goat'
					value={filters.goat}
					onChange={handleChange}
					className='w-full border border-gray-300 rounded px-3 py-2'
				>
					<option value=''>All Goats</option>
					{goats.map((g) => (
						<option key={g._id} value={g._id}>
							{g.nickname || g.registeredName}
						</option>
					))}
				</select>
			</div>

			<div className='flex gap-4'>
				<div className='flex-1'>
					<label className='block font-medium'>Start Date</label>
					<input
						type='date'
						name='startDate'
						value={filters.startDate}
						onChange={handleChange}
						className='w-full border border-gray-300 rounded px-3 py-2'
					/>
				</div>
				<div className='flex-1'>
					<label className='block font-medium'>End Date</label>
					<input
						type='date'
						name='endDate'
						value={filters.endDate}
						onChange={handleChange}
						className='w-full border border-gray-300 rounded px-3 py-2'
					/>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					name='testDayOnly'
					checked={filters.testDayOnly}
					onChange={handleChange}
				/>
				<label className='font-medium'>Test Day Only</label>
			</div>

			<button
				onClick={applyFilters}
				disabled={loading}
				className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
			>
				{loading ? 'Loading...' : 'Apply Filters'}
			</button>
		</div>
	);
};

export default MilkRecordsFilters;
