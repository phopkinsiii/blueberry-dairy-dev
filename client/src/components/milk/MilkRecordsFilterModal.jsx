// @ts-nocheck
// client/src/components/milk/MilkRecordsFilterModal.jsx
import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';

const MilkRecordsFilterModal = ({ isOpen, onClose, onResults }) => {
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
		if (isOpen) fetchGoats();
	}, [isOpen]);

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
			onClose();
		} catch (err) {
			console.error('Failed to fetch filtered records:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className='relative z-50'>
			<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
			<div className='fixed inset-0 flex items-center justify-center p-4'>
				<Dialog.Panel className='bg-white p-6 rounded shadow-md w-full max-w-md'>
					<Dialog.Title className='text-lg font-semibold mb-4'>
						Filter Milk Records
					</Dialog.Title>

					<div className='space-y-4'>
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
					</div>

					<div className='mt-6 flex justify-between items-center gap-3 flex-wrap'>
						<button
							onClick={async () => {
								setFilters({
									goat: '',
									startDate: '',
									endDate: '',
									testDayOnly: false,
								});
								try {
									setLoading(true);
									const { data } = await axiosInstance.get('/milk');
									onResults(data);
									onClose();
								} catch (err) {
									console.error('Failed to reset records:', err);
								} finally {
									setLoading(false);
								}
							}}
							className='px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 text-gray-800'
						>
							Clear Filters
						</button>

						<div className='flex gap-2'>
							<button
								onClick={onClose}
								className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
							>
								Cancel
							</button>
							<button
								onClick={applyFilters}
								disabled={loading}
								className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
							>
								{loading ? 'Loading...' : 'Apply Filters'}
							</button>
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default MilkRecordsFilterModal;
