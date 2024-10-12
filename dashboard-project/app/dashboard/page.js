"use client";
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from 'recharts';
import { supabase } from '../../lib/supabaseClient';
import DataInputForm from './DataInputForm';
import './DashboardPage.css'; // Import the CSS file for styling

const colorPalette = [
  "#8884d8", "#82ca9d", "#ff7300", "#ffbb28", "#0088FE", 
  "#00C49F", "#FF8042", "#FFBB28", "#FF8042", "#D0ED57"
];

const DashboardPage = () => {
  const [data, setData] = useState([]);

  // Fetch data from the metrics table
  const fetchData = async () => {
    const { data: metricsData, error } = await supabase
      .from('metrics')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setData(metricsData);
    }
  };

  // Fetch the data on component mount
  useEffect(() => {
    fetchData();
  }, []);


   // Convert data to CSV format
   const convertToCSV = (data) => {
    const headers = ['Name', 'Page Views'];
    const rows = data.map(item => `${item.name},${item.pv}`);
    return [headers.join(','), ...rows].join('\n');
  };

  // Function to download the CSV file
  const downloadCSV = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'chart_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare the data for the Pie chart
  const pieChartData = data.map((item, index) => ({
    name: item.name,
    value: item.pv, // You can also use item.uv for unique visitors
    color: colorPalette[index % colorPalette.length] // Assign color based on index
  }));

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <button onClick={downloadCSV} className="btn btn-primary">
        Download CSV
      </button>
      <div className="widget-container">
        <div className="widget">
          <h2 className="widget-title">Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name">
                <Label value="Metrics" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Page Views" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="widget">
          <h2 className="widget-title">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name">
                <Label value="Metrics" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Page Views" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="widget">
          <h2 className="widget-title">Horizontal Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis dataKey="name" type="category" />
              <XAxis label={<Label value="Page Views" position="bottom" />} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="widget">
          <h2 className="widget-title">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                //label={({ name, value }) => `${name}: ${value}`} // Label showing name and value
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="form-container">
        <DataInputForm />
      </div>
    </div>
  );
};

export default DashboardPage;
