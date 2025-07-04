import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import Spinner from '../../components/Spinner';
import SeoHead from '../../components/SeoHead';
import JsonLd from '../../components/JsonLd';
import { extractKeywords, getSeoTimestamps } from '../../utils/seoUtils';
import MilkRecordsTable from '../../components/milk/MilkRecordsTable';
import { getMilkRecordsSchema } from '../../utils/schemaGenerators';
import MilkRecordsFilterModal from '../../components/milk/MilkRecordsFilterModal';

const MilkRecordsPage = () => {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [sortOrder, setSortOrder] = useState('desc');
	const [use24Hour, setUse24Hour] = useState(true);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
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

	const toggleSortOrder = () => {
		setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
	};

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

				<div className='flex justify-end mb-4'>
					<button
						onClick={() => setIsFilterOpen(true)}
						className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
					>
						Filter Records
					</button>
				</div>

				<MilkRecordsFilterModal
					isOpen={isFilterOpen}
					onClose={() => setIsFilterOpen(false)}
					onResults={(filtered) => {
						setRecords(filtered);
						setCurrentPage(1);
					}}
				/>

				<MilkRecordsTable
					records={records}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					recordsPerPage={recordsPerPage}
					sortOrder={sortOrder}
					toggleSortOrder={toggleSortOrder}
					use24Hour={use24Hour}
					setUse24Hour={setUse24Hour}
				/>
			</div>
		</>
	);
};

export default MilkRecordsPage;
