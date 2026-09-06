import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  type: 'success' | 'warning' | 'danger' | 'info';
}

const colors = {
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
};

const StatsCard = ({ title, value, change, icon: Icon, type }: StatsCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={clsx("p-2 rounded-lg", colors[type])}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className={clsx(
          "flex items-center text-sm font-medium",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
