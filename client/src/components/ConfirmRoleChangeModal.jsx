// src/components/ConfirmRoleChangeModal.jsx
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';

const ConfirmRoleChangeModal = ({
	isOpen,
	onClose,
	onConfirm,
	user,
}) => {
	if (!user) return null;

	const isPromoting = user.role !== 'admin';

	return (
		<Dialog open={isOpen} onClose={onClose} as={Fragment}>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
				<Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center space-y-4">
					<Dialog.Title className="text-xl font-semibold">
						Confirm Role Change
					</Dialog.Title>
					<Dialog.Description className="text-gray-600">
						Are you sure you want to{' '}
						{isPromoting ? 'promote' : 'demote'}{' '}
						<strong>{user.name}</strong>?
					</Dialog.Description>
					<div className="flex justify-center gap-4 pt-4">
						<button
							onClick={onClose}
							className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
						>
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className={`px-4 py-2 text-white rounded ${
								isPromoting
									? 'bg-blue-600 hover:bg-blue-700'
									: 'bg-red-600 hover:bg-red-700'
							}`}
						>
							Yes, {isPromoting ? 'Promote' : 'Demote'}
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default ConfirmRoleChangeModal;
