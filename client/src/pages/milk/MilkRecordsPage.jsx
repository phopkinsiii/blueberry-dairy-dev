// @ts-nocheck
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import Spinner from '../../components/Spinner';

const MilkRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [goatOptions, setGoatOptions] = useState([]);
  const [selectedGoat, setSelectedGoat] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axiosInstance.get('/milk');
        setRecords(res.data);

        const uniqueGoats = Array.from(
          new Set(res.data.map((r) => r.goat?.nickname).filter(Boolean))
        );
        setGoatOptions(uniqueGoats.sort());
        setFilteredRecords(res.data);
      } catch (err) {
        console.error('Error fetching milk records:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedGoat(value);

    if (!value) {
      setFilteredRecords(records);
    } else {
      const filtered = records.filter((r) => r.goat?.nickname === value);
      setFilteredRecords(filtered);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">All Milk Records</h1>

      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="goatFilter" className="font-medium">
          Filter by Goat:
        </label>
        <select
          id="goatFilter"
          value={selectedGoat}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="">All Goats</option>
          {goatOptions.map((nickname) => (
            <option key={nickname} value={nickname}>
              {nickname}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Goat</th>
              <th className="px-4 py-2 border">Weight (lbs)</th>
              <th className="px-4 py-2 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => {
              const dateObj = new Date(record.recordedAt);
              const dateStr = dateObj.toLocaleDateString();
              const timeStr = dateObj.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
              });

              return (
                <tr key={record._id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{dateStr}</td>
                  <td className="px-4 py-2 border">{timeStr}</td>
                  <td className="px-4 py-2 border">
                    {record.goat?.nickname || 'Unknown'}
                  </td>
                  <td className="px-4 py-2 border">
                    {record.amount?.toFixed(1)}
                  </td>
                  <td className="px-4 py-2 border">{record.notes || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MilkRecordsPage;
