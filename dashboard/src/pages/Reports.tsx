import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { DataTable } from '../components/shared/DataTable';

const complianceData = [
  { name: 'Engineering', compliant: 120, nonCompliant: 15 },
  { name: 'Maintenance', compliant: 98, nonCompliant: 32 },
  { name: 'Operations', compliant: 210, nonCompliant: 10 },
  { name: 'Safety', compliant: 45, nonCompliant: 0 },
];

const overdueWorkers = [
  { id: '1', name: 'Jane Smith', department: 'Maintenance', missingModule: 'Gas Leak Protocol', daysOverdue: 14 },
  { id: '2', name: 'Tom Wilson', department: 'Engineering', missingModule: 'High Voltage Safety', daysOverdue: 5 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Analytics and organizational compliance tracking</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Department Compliance Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={complianceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Legend />
              <Bar dataKey="compliant" stackId="a" fill="#22c55e" name="Compliant" radius={[0, 0, 4, 4]} />
              <Bar dataKey="nonCompliant" stackId="a" fill="#ef4444" name="Non-Compliant" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white">
          <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
            Action Required: Overdue Training
          </h2>
        </div>
        <DataTable
          data={overdueWorkers}
          columns={[
            { header: 'Worker', accessor: 'name', className: 'font-medium' },
            { header: 'Department', accessor: 'department' },
            { header: 'Required Module', accessor: 'missingModule' },
            { header: 'Days Overdue', accessor: (row) => <span className="text-red-600 font-bold">{row.daysOverdue} days</span> },
            { header: 'Action', accessor: () => <button className="text-orange-600 hover:text-orange-700 font-medium text-sm border border-orange-200 px-3 py-1 rounded bg-orange-50">Send Reminder</button> }
          ]}
        />
      </div>
    </div>
  );
};

export default Reports;
