// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { toInputDateFormat } from '../../../utils/dateHelpers';
import Spinner from '../../../components/Spinner';
// import ConfirmDeleteDialog from '../../../components/milk/ConfirmDeleteDialog';
import { toast } from 'react-toastify';

const EditMilkRecord = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [record, setRecord] = useState(null);
	const [formData, setFormData] = useState({
		recordedAt: '',
		amount: '',
		notes: '',
		testDay: false,
	});

	const handleDeleteClick = async () => {
		const confirmDelete = window.confirm(
			'Are you sure you want to permanently delete this milk record? This action cannot be undone.'
		);
		if (!confirmDelete) return;

		await handleDelete();
	};

	useEffect(() => {
		const fetchRecord = async () => {
			try {
				const { data } = await axiosInstance.get(`/milk/${id}`);
				setRecord(data);
				setFormData({
					recordedAt: toInputDateFormat(data.recordedAt),
					amount: data.amount,
					notes: data.notes || '',
					testDay: data.testDay,
				});
			} catch (err) {
                console.error(err)
				toast.error('Failed to load milk record');
			} finally {
				setLoading(false);
			}
		};
		fetchRecord();
	}, [id]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.put(`/milk/${id}`, formData);
			toast.success('Record updated!');
			navigate('/milk-records');
		} catch (err) {
            console.error(err)
			toast.error('Update failed');
		}
	};

	const handleDelete = async () => {
		try {
			await axiosInstance.delete(`/milk/${id}`);
			toast.success('Record deleted');
			navigate('/milk-records');
		} catch (err) {
            console.error(err)
			toast.error('Failed to delete record');
		}
	};

	if (loading) return <Spinner />;

	return (
		<div className='max-w-2xl mx-auto px-4 py-8'>
			<h1 className='text-2xl font-bold mb-4'>Edit Milk Record</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium'>Date</label>
					<input
						type='date'
						name='recordedAt'
						value={formData.recordedAt}
						onChange={handleChange}
						required
						className='form-input mt-1 w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>Amount (lbs)</label>
					<input
						type='number'
						step='0.1'
						min='0'
						name='amount'
						value={formData.amount}
						onChange={handleChange}
						required
						className='form-input mt-1 w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>Notes</label>
					<textarea
						name='notes'
						value={formData.notes}
						onChange={handleChange}
						className='form-textarea mt-1 w-full'
					/>
				</div>
				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='testDay'
						checked={formData.testDay}
						onChange={handleChange}
						className='form-checkbox'
					/>
					<label className='text-sm'>Test Day</label>
				</div>
				<div className='flex justify-between pt-6'>
					<button
						type='button'
						onClick={() => navigate('/milk-records')}
						className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
					>
						Update
					</button>
					<button
						type='button'
						onClick={handleDeleteClick}
						className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
					>
						Delete
					</button>
				</div>
			</form>

			{/* {showConfirmDelete && (
				<ConfirmDeleteDialog
					title='Delete Milk Record'
					message='Are you sure you want to permanently delete this milk record?'
					onConfirm={handleDelete}
					onCancel={() => setShowConfirmDelete(false)}
				/>
			)} */}
		</div>
	);
};

export default EditMilkRecord;
