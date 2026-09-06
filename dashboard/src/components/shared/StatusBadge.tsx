import React from 'react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: string;
}

const statusMap: Record<string, { label: string; classes: string }> = {
  completed: { label: 'Completed', classes: 'bg-green-100 text-green-700 border-green-200' },
  in_progress: { label: 'In Progress', classes: 'bg-blue-100 text-blue-700 border-blue-200' },
  pending: { label: 'Pending', classes: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  failed: { label: 'Failed', classes: 'bg-red-100 text-red-700 border-red-200' },
  valid: { label: 'Valid', classes: 'bg-green-100 text-green-700 border-green-200' },
  revoked: { label: 'Revoked', classes: 'bg-red-100 text-red-700 border-red-200' },
  expired: { label: 'Expired', classes: 'bg-slate-100 text-slate-700 border-slate-200' },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const mapping = statusMap[status.toLowerCase()] || { label: status, classes: 'bg-slate-100 text-slate-700 border-slate-200' };

  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", mapping.classes)}>
      {mapping.label}
    </span>
  );
};

export default StatusBadge;
