// @ts-nocheck
import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios.js';
import { toast } from 'react-toastify';
import { filterDoesOverOneYear } from '../../../utils/goatUtils.js';

const MilkEntryForm = () => {
	const [goats, setGoats] = useState([]);
	const [formData, setFormData] = useState({
		goat: '',
		recordedAt: '',
		amount: '',
		notes: '',
		testDay: false,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchGoats = async () => {
			try {
				const { data } = await axiosInstance.get('/goats');
				const doesOverOneYear = filterDoesOverOneYear(data);

				setGoats(doesOverOneYearOld);
			} catch (err) {
				console.error('Error fetching goats:', err);
				toast.error('Failed to load goats');
			}
		};
		fetchGoats();
	}, []);

	const handleChange = (e) => {
		const { name, type, value, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.goat || !formData.recordedAt || !formData.amount) {
			return toast.error('Please fill in all required fields');
		}

		try {
			setLoading(true);

			// ✅ Correct conversion from local to UTC before sending to backend:
			const utcRecordedAt = new Date(formData.recordedAt).toISOString();
			console.log('Time sent to Mongo:', utcRecordedAt);
			await axiosInstance.post('/milk', {
				goatId: formData.goat,
				recordedAt: utcRecordedAt, // Send UTC
				amount: parseFloat(formData.amount),
				notes: formData.notes,
				testDay: formData.testDay,
			});

			toast.success('Milk record saved');
			setFormData({
				goat: '',
				recordedAt: '',
				amount: '',
				notes: '',
				testDay: false,
			});
		} catch (err) {
			console.error(err);
			toast.error('Failed to save milk record');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-xl mx-auto my-8 p-4 bg-white shadow-md rounded space-y-4'
		>
			<h2 className='text-xl font-semibold'>Enter Milk Record</h2>

			<div>
				<label className='block font-medium'>Goat *</label>
				<select
					name='goat'
					value={formData.goat}
					onChange={handleChange}
					required
					className='w-full border border-gray-300 rounded px-3 py-2'
				>
					<option value=''>Select Goat</option>
					{goats.map((g) => (
						<option key={g._id} value={g._id}>
							{g.nickname || g.registeredName}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className='block font-medium'>Date & Time *</label>
				<input
					type='datetime-local'
					name='recordedAt'
					value={formData.recordedAt}
					onChange={handleChange}
					required
					className='w-full border border-gray-300 rounded px-3 py-2'
				/>
			</div>

			<div>
				<label className='block font-medium'>Milk Amount (lbs) *</label>
				<input
					type='number'
					step='0.1'
					min='0'
					name='amount'
					value={formData.amount}
					onChange={handleChange}
					required
					className='w-full border border-gray-300 rounded px-3 py-2'
				/>
			</div>
			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					name='testDay'
					checked={formData.testDay}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, testDay: e.target.checked }))
					}
					className='form-checkbox text-blue-600'
				/>
				<label className='font-medium'>Mark as Test Day</label>
			</div>

			<div>
				<label className='block font-medium'>Notes (optional)</label>
				<textarea
					name='notes'
					value={formData.notes}
					onChange={handleChange}
					className='w-full border border-gray-300 rounded px-3 py-2'
					rows={3}
				/>
			</div>

			<button
				type='submit'
				disabled={loading}
				className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50'
			>
				{loading ? 'Saving...' : 'Submit Record'}
			</button>
		</form>
	);
};

export default MilkEntryForm;
