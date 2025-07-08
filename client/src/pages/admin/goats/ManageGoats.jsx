// @ts-nocheck
// client/src/pages/admin/goats/ManageGoats.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoatContext } from '../../../contexts/GoatContext';

const ManageGoats = () => {
	const { state, fetchGoats, deleteGoat } = useGoatContext();
	const { goats, loading, error } = state;
	const navigate = useNavigate();

	useEffect(() => {
		fetchGoats();
	}, [fetchGoats]);

	const handleEdit = (goatId) => {
		navigate(`/admin/edit-goat/${goatId}`);
	};

	const handleDelete = async (goatId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this goat?'
		);
		if (confirmDelete) {
			try {
				const user = JSON.parse(localStorage.getItem('user'));
				const token = user?.token;
				await deleteGoat(goatId, token);
				await fetchGoats(); // 🔁 Refresh the goat list
			} catch (err) {
				console.error('Failed to delete goat:', err);
			}
		}
	};

	return (
		<div className='max-w-6xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Goats</h1>
			{loading && <p className='text-blue-500'>Loading goats...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{goats.map((goat) => (
					<div
						key={goat._id}
						className='bg-white shadow-md rounded-lg p-4 flex flex-col justify-between'
					>
						<img
							src={goat.images?.[0]}
							alt={goat.nickname}
							className='w-full object-cover aspect-[4/3]rounded shadow-lg'
						/>
						<h3 className='text-xl font-semibold text-gray-900'>
							{goat.nickname}
						</h3>
						<p className='text-gray-600 mb-1'>ADGA ID: {goat.adgaId}</p>
						<p className='text-gray-600 mb-2'>Gender: {goat.gender}</p>
						{goat.forSale && (
							<p className='text-green-700 font-semibold mb-2'>
								For Sale: ${goat.price}
							</p>
						)}
						<div className='flex justify-between mt-4'>
							<button
								onClick={() => handleEdit(goat._id)}
								className='bg-indigo-800 hover:bg-yellow-600 text-white px-4 py-1 rounded'
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(goat._id)}
								className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded'
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageGoats;
