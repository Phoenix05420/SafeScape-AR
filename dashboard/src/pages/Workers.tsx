import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { DataTable } from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';
import { Worker } from '../types';

const mockWorkers: Worker[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', organization: 'Engineering', trainingStatus: 'completed', lastActivity: '2023-10-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', organization: 'Maintenance', trainingStatus: 'in_progress', lastActivity: '2023-10-14' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', organization: 'Operations', trainingStatus: 'failed', lastActivity: '2023-10-12' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', organization: 'Engineering', trainingStatus: 'pending', lastActivity: '2023-10-10' },
  { id: '5', name: 'Robert Brown', email: 'robert@example.com', organization: 'Maintenance', trainingStatus: 'completed', lastActivity: '2023-10-09' },
];

const Workers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Workers Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage personnel and view their training progress</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} /> Add Worker
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search workers by name or email..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <DataTable
        data={mockWorkers}
        columns={[
          { header: 'Name', accessor: (row) => <div className="font-medium text-slate-900">{row.name}</div> },
          { header: 'Email', accessor: 'email', className: 'text-slate-500' },
          { header: 'Department', accessor: 'organization' },
          { header: 'Status', accessor: (row) => <StatusBadge status={row.trainingStatus} /> },
          { header: 'Last Active', accessor: 'lastActivity', className: 'text-slate-500' },
          { header: 'Actions', accessor: () => <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">View Profile</button> }
        ]}
        onRowClick={(row) => console.log('Clicked', row.id)}
      />
    </div>
  );
};

export default Workers;
