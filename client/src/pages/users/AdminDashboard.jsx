// @ts-nocheck
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [allTime, setAllTime] = useState(null);
  const [yearly, setYearly] = useState([]);
  const [milkByGoat, setMilkByGoat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allTimeRes, yearlyRes, goatRes] = await Promise.all([
          axiosInstance.get('/milk/summary/all-time'),
          axiosInstance.get('/milk/summary/by-year'),
          axiosInstance.get('/milk/summary'),
        ]);
        setAllTime(allTimeRes.data);
        setYearly(yearlyRes.data.summary);
        setMilkByGoat(goatRes.data);
      } catch (err) {
        toast.error('Error loading dashboard data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Farm Milk Production Dashboard</h1>

      {/* All Time Summary */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">All-Time Total Milk</h2>
        <p className="text-4xl font-bold">{allTime?.totalMilk.toFixed(2)} lbs</p>
      </div>

      {/* Yearly Bar Chart */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Milk Production by Year</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearly}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalMilk" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Milk by Goat Summary (Table) */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Milk Production by Goat (Yearly)</h2>
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Year</th>
                <th className="border p-2">Goat</th>
                <th className="border p-2">Total Milk</th>
              </tr>
            </thead>
            <tbody>
              {milkByGoat.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item._id.year}</td>
                  <td className="border p-2">{item.goatNickname}</td>
                  <td className="border p-2">{item.total.toFixed(2)} lbs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
