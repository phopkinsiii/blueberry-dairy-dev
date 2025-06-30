// @ts-nocheck
import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios';
import { toast } from 'react-toastify';

const MilkEntryForm = () => {
	const [goats, setGoats] = useState([]);
	const [formData, setFormData] = useState({
		goat: '',
		recordedAt: '',
		amount: '',
		notes: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchGoats = async () => {
			try {
				const { data } = await axiosInstance.get('/goats');
				const today = new Date();
				const oneYearAgo = new Date(today);
				oneYearAgo.setFullYear(today.getFullYear() - 1);

				const doesOverOneYearOld = data.filter((goat) => {
					const isDoe = goat.gender?.toLowerCase() === 'doe';
					const dob = new Date(goat.dob);
					const isOverOneYear = dob <= oneYearAgo;
					return isDoe && isOverOneYear;
				});

				setGoats(doesOverOneYearOld);
			} catch (err) {
				console.error('Error fetching goats:', err);
				toast.error('Failed to load goats');
			}
		};
		fetchGoats();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.goat || !formData.recordedAt || !formData.amount) {
			return toast.error('Please fill in all required fields');
		}

		try {
			setLoading(true);
			await axiosInstance.post('/milk', {
				goatId: formData.goat, // ✅ renamed
				recordedAt: formData.recordedAt,
				amount: parseFloat(formData.amount),
				notes: formData.notes,
			});

			toast.success('Milk record saved');
			setFormData({
				goat: '',
				recordedAt: '',
				amount: '',
				notes: '',
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
			className='max-w-xl mx-auto p-4 bg-white shadow-md rounded space-y-4'
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
