// @ts-nocheck
// src/pages/ManageUsers.jsx
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axios';
import { useUserContext } from '../../contexts/UserContext';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import ConfirmRoleChangeModal from '../../components/ConfirmRoleChangeModal';

const ManageUsers = () => {
	const { state } = useUserContext();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	const fetchUsers = useCallback(async () => {
		try {
			const res = await axiosInstance.get('/users', {
				headers: { Authorization: `Bearer ${state.user?.token}` },
			});
			setUsers(res.data);
		} catch (err) {
			toast.error(err.response?.data?.message || 'Failed to load users');
		}
	}, [state.user?.token]);

	useEffect(() => {
		setLoading(true);
		fetchUsers().finally(() => setLoading(false));
	}, [fetchUsers]);
	//PUT /api/users/toggle-role/:userId

	const handleRoleChange = async () => {
		if (!selectedUser) return;
		try {
			await axiosInstance.put(
				`/users/toggle-role/${selectedUser._id}`,
				{},
				{
					headers: { Authorization: `Bearer ${state.user?.token}` },
				}
			);
			toast.success('User role updated successfully.');
			setConfirmOpen(false);
			setSelectedUser(null);
			await fetchUsers();
		} catch (err) {
			toast.error(err.response?.data?.message || 'Failed to update role');
		}
	};

	if (loading) return <Spinner />;

	return (
		<div className='max-w-6xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6'>All Users</h1>
			<div className='overflow-x-auto rounded shadow'>
				<div className='mb-4'>
					<input
						type='text'
						placeholder='Search by first or last name...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<table className='min-w-full bg-white border border-gray-200'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='px-4 py-2 text-left'>First</th>
							<th className='px-4 py-2 text-left'>Last</th>
							<th className='px-4 py-2 text-left'>Email</th>
							<th className='px-4 py-2 text-left'>Role</th>
							<th className='px-4 py-2 text-left'>Created</th>
							<th className='px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users
							.filter((user) => {
								const first = user.firstName?.toLowerCase() || '';
								const last = user.lastName?.toLowerCase() || '';
								const term = searchTerm.toLowerCase();
								return first.includes(term) || last.includes(term);
							})
							.map((user) => (
								<tr key={user._id} className='border-t'>
									<td className='px-4 py-2'>
										{user.firstName} {user.lastName}
									</td>
									<td className='px-4 py-2'>{user.lastName}</td>
									<td className='px-4 py-2'>{user.email}</td>
									<td className='px-4 py-2 capitalize'>{user.role}</td>
									<td className='px-4 py-2'>
										{new Date(user.createdAt).toLocaleDateString()}
									</td>
									<td className='px-4 py-2'>
										<button
											onClick={() => {
												setSelectedUser(user);
												setConfirmOpen(true);
											}}
											className={`px-3 py-1 rounded text-white ${
												user.role === 'admin'
													? 'bg-red-600 hover:bg-red-700'
													: 'bg-blue-600 hover:bg-blue-700'
											}`}
										>
											{user.role === 'admin'
												? 'Demote to User'
												: 'Promote to Admin'}
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			{/* Role Change Modal */}
			<ConfirmRoleChangeModal
				isOpen={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={handleRoleChange}
				user={selectedUser}
			/>
		</div>
	);
};

export default ManageUsers;
