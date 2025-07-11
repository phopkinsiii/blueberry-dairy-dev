import YearDropdown from '../../YearDropdown';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const YearlyMilkBarChart = ({ data, selectedYear, onYearChange }) => {
  if (!data?.length) {
    return <p className="italic text-gray-500">No chart data available.</p>;
  }

  const uniqueYears = [...new Set(data.map(item => item.year))].sort((a, b) => b - a);

  const filteredData =
    selectedYear === 'all' ? data : data.filter(item => item.year === parseInt(selectedYear));

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Yearly Milk Production</h2>

      <YearDropdown
        years={uniqueYears}
        selectedYear={selectedYear}
        onChange={onYearChange}
      />

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalMilk" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyMilkBarChart;
