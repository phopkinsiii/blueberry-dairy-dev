import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import OrderFilters from './OrderFilters';
import { FunnelIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function OrderFiltersModal({
	isOpen,
	onClose,
	productOptions,
	filters,
	setFilters,
}) {
	const handleApplyFilters = () => {
		onClose(); // Auto-close after apply
	};

	const handleClearFilters = () => {
		setFilters({ product: '', day: '', month: '', year: '' });
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-50' onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title className='text-lg font-medium leading-6 text-gray-900 mb-4'>
									Filter Orders
								</Dialog.Title>

								<OrderFilters
									productOptions={productOptions}
									filters={filters}
									setFilters={setFilters}
								/>

								<div className='mt-6 flex justify-between'>
									<button
										onClick={handleClearFilters}
										className='flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
									>
										<XCircleIcon className='w-5 h-5 mr-2' />
										Clear Filters
									</button>
									<button
										onClick={handleApplyFilters}
										className='flex items-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
									>
										<FunnelIcon className='w-5 h-5 mr-2' />
										Apply Filters
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
