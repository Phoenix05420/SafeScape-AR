import React from 'react';
import { Award, CheckCircle } from 'lucide-react';
import { DataTable } from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';

const mockCertificates = [
  { id: 'CERT-8472-A', workerName: 'John Doe', moduleTitle: 'Fire Extinguisher Basics', issueDate: '2023-10-15', expiryDate: '2024-10-15', score: 92, status: 'valid' },
  { id: 'CERT-9182-B', workerName: 'Jane Smith', moduleTitle: 'Confined Space Entry', issueDate: '2022-09-10', expiryDate: '2023-09-10', score: 88, status: 'expired' },
  { id: 'CERT-1029-C', workerName: 'Mike Johnson', moduleTitle: 'High Voltage Safety', issueDate: '2023-01-20', expiryDate: '2024-01-20', score: 100, status: 'valid' },
  { id: 'CERT-3342-D', workerName: 'Robert Brown', moduleTitle: 'Gas Leak Protocol', issueDate: '2023-05-11', expiryDate: '2024-05-11', score: 75, status: 'revoked' },
];

const Certificates = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
          <p className="text-sm text-slate-500 mt-1">Verify and manage worker compliance certifications</p>
        </div>
        
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <input 
            type="text" 
            placeholder="Verify ID (e.g. CERT-123)"
            className="px-3 py-1.5 text-sm border-none focus:outline-none focus:ring-0 w-48"
          />
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
            <CheckCircle size={16} /> Verify
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <DataTable
          data={mockCertificates}
          columns={[
            { header: 'Cert ID', accessor: (row) => <div className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">{row.id}</div> },
            { header: 'Worker', accessor: 'workerName', className: 'font-medium' },
            { header: 'Module', accessor: 'moduleTitle' },
            { header: 'Issued', accessor: 'issueDate', className: 'text-slate-500' },
            { header: 'Expires', accessor: 'expiryDate', className: 'text-slate-500' },
            { header: 'Score', accessor: (row) => <span className="font-semibold">{row.score}%</span> },
            { header: 'Status', accessor: (row) => <StatusBadge status={row.status} /> },
            { header: 'Actions', accessor: () => <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">Download</button> }
          ]}
        />
      </div>
    </div>
  );
};

export default Certificates;
