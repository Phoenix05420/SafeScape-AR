import React from 'react';
import StatsCard from '../components/shared/StatsCard';
import { Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { DataTable } from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';

const trendData = [
  { name: 'Mon', passes: 40, fails: 24 },
  { name: 'Tue', passes: 30, fails: 13 },
  { name: 'Wed', passes: 20, fails: 38 },
  { name: 'Thu', passes: 27, fails: 19 },
  { name: 'Fri', passes: 18, fails: 18 },
  { name: 'Sat', passes: 23, fails: 18 },
  { name: 'Sun', passes: 34, fails: 23 },
];

const pieData = [
  { name: 'Fire Safety', value: 400 },
  { name: 'Gas Leak', value: 300 },
  { name: 'Confined Space', value: 300 },
  { name: 'Electrical', value: 200 },
];
const COLORS = ['#f97316', '#22c55e', '#ef4444', '#3b82f6'];

const recentActivity = [
  { id: '1', worker: 'John Doe', module: 'Fire Safety Extinguisher', date: '2023-10-15', score: 92, status: 'completed' },
  { id: '2', worker: 'Jane Smith', module: 'Gas Leak Protocol', date: '2023-10-15', score: 45, status: 'failed' },
  { id: '3', worker: 'Mike Johnson', module: 'Confined Space Entry', date: '2023-10-14', score: 0, status: 'in_progress' },
  { id: '4', worker: 'Sarah Williams', module: 'Fire Safety Extinguisher', date: '2023-10-14', score: 88, status: 'completed' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Workers" value={1248} change={12.5} icon={Users} type="info" />
        <StatsCard title="Completed Training" value={892} change={8.2} icon={CheckCircle} type="success" />
        <StatsCard title="Pending Review" value={45} change={-2.4} icon={AlertTriangle} type="warning" />
        <StatsCard title="Failed Assessments" value={21} change={-1.5} icon={XCircle} type="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Training Completion Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="passes" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="fails" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Module Breakdown</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white">
          <h2 className="text-lg font-semibold text-slate-800">Recent Training Sessions</h2>
          <button className="text-sm text-orange-600 font-medium hover:text-orange-700">View All</button>
        </div>
        <DataTable
          data={recentActivity}
          columns={[
            { header: 'Worker', accessor: 'worker', className: 'font-medium' },
            { header: 'Module', accessor: 'module' },
            { header: 'Date', accessor: 'date' },
            { header: 'Score', accessor: (row) => <span className="font-semibold">{row.score}%</span> },
            { header: 'Status', accessor: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
