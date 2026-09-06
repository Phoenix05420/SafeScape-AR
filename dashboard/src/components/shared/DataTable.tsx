import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({ data, columns, onRowClick }: DataTableProps<T>) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.length > 0 ? data.map((row) => (
              <tr 
                key={row.id} 
                className={`bg-white ${onRowClick ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col, i) => (
                  <td key={i} className={`px-6 py-4 whitespace-nowrap text-sm text-slate-700 ${col.className || ''}`}>
                    {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Showing <span className="font-medium">{data.length}</span> results
        </div>
        <div className="flex gap-2">
          <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 disabled:opacity-50">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
