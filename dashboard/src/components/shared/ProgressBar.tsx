import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  progress: number;
  label?: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
}

export const ProgressBar = ({ progress, label, variant = 'primary' }: ProgressBarProps) => {
  const colors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    primary: 'bg-orange-500',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-600 font-medium">{label}</span>
          <span className="text-slate-700 font-bold">{progress}%</span>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={clsx("h-2.5 rounded-full transition-all duration-500 ease-out", colors[variant])} 
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
