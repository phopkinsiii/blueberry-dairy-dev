// @ts-nocheck
import { Link } from 'react-router-dom';
import { parseISO, compareAsc, compareDesc } from 'date-fns';
import { formatDate, formatTime } from '../../utils/dateHelpers';

const MilkRecordsTable = ({
	records,
	currentPage,
	setCurrentPage,
	recordsPerPage,
	sortOrder,
	toggleSortOrder,
	use24Hour,
	setUse24Hour,
}) => {
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const sortedRecords = [...records].sort((a, b) =>
		sortOrder === 'asc'
			? compareAsc(parseISO(a.recordedAt), parseISO(b.recordedAt))
			: compareDesc(parseISO(a.recordedAt), parseISO(b.recordedAt))
	);
	const currentRecords = sortedRecords.slice(
		indexOfFirstRecord,
		indexOfLastRecord
	);
	const totalPages = Math.ceil(records.length / recordsPerPage);

	return (
		<>
			<div className='flex justify-end mb-2 text-sm text-gray-700'>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={use24Hour}
						onChange={() => setUse24Hour((prev) => !prev)}
						className='form-checkbox text-blue-600'
					/>
					Use 24-hour time
				</label>
			</div>

			<div className='overflow-x-auto shadow rounded-lg border border-gray-300'>
				<table className='min-w-full divide-y divide-gray-200 text-sm'>
					<thead className='bg-blue-50 text-left'>
						<tr>
							<th
								onClick={toggleSortOrder}
								className={`px-4 py-3 font-semibold ${
									sortOrder === 'asc' || sortOrder === 'desc'
										? 'text-blue-800 underline'
										: 'text-gray-700'
								} cursor-pointer select-none hover:underline`}
							>
								Date {sortOrder === 'asc' ? '▲' : '▼'}
							</th>
							<th className='px-4 py-3 font-semibold text-gray-700'>Time</th>
							<th className='px-4 py-3 font-semibold text-gray-700'>Goat</th>
							<th className='px-4 py-3 font-semibold text-gray-700 text-center'>
								Amount (lbs)
							</th>
							<th className='px-4 py-3 font-semibold text-gray-700'>Notes</th>
							<th className='px-4 py-3 font-semibold text-gray-700 text-center'>
								Test Day
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100 bg-white'>
						{currentRecords.map((record) => (
							<tr key={record._id} className='even:bg-gray-50'>
								<td className='px-4 py-2 text-gray-800'>
									{formatDate(record.recordedAt)}
								</td>
								<td className='px-4 py-2 text-blue-600 underline hover:text-blue-800'>
									<Link to={`/milk-records/${record._id}/edit`}>
										{formatTime(record.recordedAt, { use24Hour })}
									</Link>
								</td>
								<td className='px-4 py-2 text-gray-800 font-medium'>
									{record.goat?.nickname || 'Unknown'}
								</td>
								<td className='px-4 py-2 text-gray-800 text-center'>
									{record.amount?.toFixed(2)}
								</td>
								<td className='px-4 py-2 text-gray-600 max-w-xs'>
									{record.notes || (
										<span className='italic text-gray-400'>—</span>
									)}
								</td>
								<td className='px-4 py-2 text-gray-800 text-center'>
									{record.testDay ? '✔️' : ''}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{totalPages > 1 && (
				<div className='flex justify-center items-center gap-2 mt-6 flex-wrap'>
					<button
						onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
						disabled={currentPage === 1}
						className='px-3 py-1 text-sm rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50'
					>
						Previous
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`px-3 py-1 text-sm rounded border ${
								page === currentPage
									? 'bg-blue-600 text-white'
									: 'bg-white text-gray-700 hover:bg-gray-100'
							}`}
						>
							{page}
						</button>
					))}

					<button
						onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
						disabled={currentPage === totalPages}
						className='px-3 py-1 text-sm rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50'
					>
						Next
					</button>
				</div>
			)}
		</>
	);
};

export default MilkRecordsTable;
