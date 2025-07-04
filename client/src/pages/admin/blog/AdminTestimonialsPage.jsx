// @ts-nocheck
import { useState, useEffect } from 'react';
import {
	fetchTestimonials,
	updateTestimonial,
	deleteTestimonial,
} from '../../../api/testimonialApi';

import { useUserContext } from '../../../contexts/UserContext';

export default function AdminTestimonialsPage() {
	const [testimonials, setTestimonials] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		message: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const { state } = useUserContext();
	const token = state.user?.token;

	useEffect(() => {
		const loadTestimonials = async () => {
			try {
				const data = await fetchTestimonials();
				setTestimonials(data);
			} catch (err) {
				setError('Failed to fetch testimonials.');
			} finally {
				setLoading(false);
			}
		};
		loadTestimonials();
	}, []);

	const startEditing = (testimonial) => {
		setEditingId(testimonial._id);
		setFormData({
			name: testimonial.name,
			location: testimonial.location || '',
			message: testimonial.message,
		});
	};

	const handleUpdate = async (id) => {
		console.log('Starting testimonial update...');
		console.log('Testimonial ID:', id);
		console.log('Form Data:', formData);
		console.log('User Token:', token);
		try {
			const updated = await updateTestimonial(id, formData, token);
			console.log('Update success:', updated);
			setTestimonials((prev) => prev.map((t) => (t._id === id ? updated : t)));
			setEditingId(null);
		} catch (err) {
			console.error('Update API failed:', err.response?.data || err.message);
			setError('Failed to update testimonial.');
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this testimonial?'))
			return;
		try {
			await deleteTestimonial(id, token);

			setTestimonials((prev) => prev.filter((t) => t._id !== id));
		} catch (err) {
			setError('Failed to delete testimonial.');
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>Manage Testimonials</h1>

			{error && <p className='text-red-600 mb-4'>{error}</p>}
			{loading ? (
				<p>Loading testimonials...</p>
			) : (
				<div className='space-y-6'>
					{testimonials.length === 0 ? (
						<p>No testimonials available.</p>
					) : (
						testimonials.map((t) => (
							<div
								key={t._id}
								className='border rounded-lg p-4 shadow-md bg-white'
							>
								{editingId === t._id ? (
									<>
										<div className='mb-2'>
											<label className='block text-sm font-semibold'>
												Name
											</label>
											<input
												type='text'
												value={formData.name}
												onChange={(e) =>
													setFormData({ ...formData, name: e.target.value })
												}
												className='w-full border p-2 rounded'
											/>
										</div>
										<div className='mb-2'>
											<label className='block text-sm font-semibold'>
												Location
											</label>
											<input
												type='text'
												value={formData.location}
												onChange={(e) =>
													setFormData({ ...formData, location: e.target.value })
												}
												className='w-full border p-2 rounded'
											/>
										</div>
										<div className='mb-2'>
											<label className='block text-sm font-semibold'>
												Message
											</label>
											<textarea
												value={formData.message}
												onChange={(e) =>
													setFormData({ ...formData, message: e.target.value })
												}
												className='w-full border p-2 rounded'
												rows='3'
											></textarea>
										</div>
										<div className='flex gap-2'>
											<button
												onClick={() => handleUpdate(t._id)}
												className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500'
											>
												Save
											</button>
											<button
												onClick={() => setEditingId(null)}
												className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400'
											>
												Cancel
											</button>
										</div>
									</>
								) : (
									<>
										<p className='italic mb-2'>"{t.message}"</p>
										<p className='font-semibold'>
											– {t.name}
											{t.location && `, ${t.location}`}
										</p>
										<div className='flex gap-3 mt-3'>
											<button
												onClick={() => startEditing(t)}
												className='bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500'
											>
												Edit
											</button>
											<button
												onClick={() => handleDelete(t._id)}
												className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500'
											>
												Delete
											</button>
										</div>
									</>
								)}
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}
