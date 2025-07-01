// @ts-nocheck
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import Spinner from '../../components/Spinner';
import { formatDate, formatTime } from '../../utils/dateHelpers';
import SeoHead from '../../components/SeoHead';
import JsonLd from '../../components/JsonLd';
import { extractKeywords, getSeoTimestamps } from '../../utils/seoUtils';
import { getMilkRecordsSchema } from '../../utils/schemaGenerators';

const MilkRecordsPage = () => {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [use24Hour, setUse24Hour] = useState(true);

	const recordsPerPage = 60;

	useEffect(() => {
		const fetchRecords = async () => {
			try {
				const { data } = await axiosInstance.get('/milk');
				setRecords(data);
			} catch (err) {
				console.error(err);
				setError('Failed to fetch milk records');
			} finally {
				setLoading(false);
			}
		};

		fetchRecords();
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
	const totalPages = Math.ceil(records.length / recordsPerPage);

	if (loading) return <Spinner />;
	if (error)
		return (
			<div className='text-center mt-10 text-red-600 font-semibold'>
				{error}
			</div>
		);

	return (
		<>
			{records.length > 0 && (
				<SeoHead
					title='Milk Production Records | Blueberry Dairy'
					description='Track milk production from our Nigerian Dwarf dairy goats. View all-time records and seasonal trends from our regenerative farm in East Tennessee.'
					keywords={extractKeywords(
						'milk production nigerian dwarf goats raw milk regenerative agriculture'
					)}
					url='https://www.blueberrydairy.com/milk-records'
					image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
					{...getSeoTimestamps(records)}
				/>
			)}

			{records?.length > 0 && <JsonLd data={getMilkRecordsSchema(records)} />}

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-6 text-center text-blue-800'>
					All-Time Milk Records
				</h1>
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
								<th className='px-4 py-3 font-semibold text-gray-700'>Date</th>
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
									<td className='px-4 py-2 text-gray-800'>
										{formatTime(record.recordedAt, { use24Hour })}
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
			</div>
		</>
	);
};

export default MilkRecordsPage;
