// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const EditMilkRecord = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [record, setRecord] = useState(null);
	const [formData, setFormData] = useState({
		recordedDate: '',
		recordedTime: '',
		amount: '',
		notes: '',
		testDay: false,
	});

	useEffect(() => {
		const fetchRecord = async () => {
			try {
				const { data } = await axiosInstance.get(`/milk/${id}`);
				setRecord(data);

				const dateObj = new Date(data.recordedAt);
				setFormData({
					recordedDate: format(dateObj, 'yyyy-MM-dd'),
					recordedTime: format(dateObj, 'HH:mm'),
					amount: data.amount,
					notes: data.notes || '',
					testDay: data.testDay,
				});
			} catch (err) {
				console.error(err);
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
			const isoDatetime = new Date(
				`${formData.recordedDate}T${formData.recordedTime}`
			).toISOString();

			await axiosInstance.put(`/milk/${id}`, {
				recordedAt: isoDatetime,
				amount: parseFloat(formData.amount),
				notes: formData.notes,
				testDay: formData.testDay,
			});
			toast.success('Record updated!');
			navigate('/milk-records');
		} catch (err) {
			console.error(err);
			toast.error('Update failed');
		}
	};

	const handleDeleteClick = async () => {
		const confirmDelete = window.confirm(
			'Are you sure you want to permanently delete this milk record?'
		);
		if (!confirmDelete) return;

		try {
			await axiosInstance.delete(`/milk/${id}`);
			toast.success('Record deleted');
			navigate('/milk-records');
		} catch (err) {
			console.error(err);
			toast.error('Failed to delete record');
		}
	};

	if (loading || !record) return <Spinner />;

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-3xl mx-auto px-4 py-8 bg-white rounded shadow'
		>
			<h1 className='text-2xl font-bold mb-6 text-blue-800'>
				Edit Milk Record
			</h1>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Goat Nickname
					</label>
					<input
						type='text'
						disabled
						readOnly
						value={record?.goat?.nickname || 'Unknown'}
						className='block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight cursor-not-allowed'
					/>
				</div>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Date
					</label>
					<input
						type='date'
						name='recordedDate'
						value={formData.recordedDate}
						onChange={handleChange}
						required
						className='block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
					/>
				</div>

				<div className='w-full md:w-1/2 px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Time
					</label>
					<input
						type='time'
						name='recordedTime'
						value={formData.recordedTime}
						onChange={handleChange}
						required
						className='block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
					/>
				</div>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Amount (lbs)
					</label>
					<input
						type='number'
						step='0.1'
						min='0'
						name='amount'
						value={formData.amount}
						onChange={handleChange}
						required
						className='block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
					/>
				</div>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Notes
					</label>
					<textarea
						name='notes'
						value={formData.notes}
						onChange={handleChange}
						className='block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
						rows={3}
					/>
				</div>
			</div>

			<div className='flex items-center px-3 mb-6'>
				<input
					type='checkbox'
					name='testDay'
					checked={formData.testDay}
					onChange={handleChange}
					className='form-checkbox text-blue-600 mr-2'
				/>
				<label className='uppercase tracking-wide text-gray-700 text-xs font-bold'>
					Test Day
				</label>
			</div>

			<div className='flex justify-between items-center mt-8 px-3'>
				<button
					type='button'
					onClick={() => navigate('/milk-records')}
					className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300'
				>
					Cancel
				</button>
				<div className='flex gap-3'>
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
			</div>
		</form>
	);
};

export default EditMilkRecord;
