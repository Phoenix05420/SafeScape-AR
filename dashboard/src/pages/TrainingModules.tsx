import React from 'react';
import { Flame, Wind, Zap, Box } from 'lucide-react';
import { TrainingModule } from '../types';
import { clsx } from 'clsx';

const mockModules: TrainingModule[] = [
  { id: '1', title: 'Fire Extinguisher Basics', description: 'Learn how to properly operate a fire extinguisher in emergency situations.', type: 'fire', difficulty: 'beginner', completionRate: 85, totalSessions: 450 },
  { id: '2', title: 'Gas Leak Protocol', description: 'Standard operating procedures for detecting and responding to toxic gas leaks.', type: 'gas', difficulty: 'intermediate', completionRate: 62, totalSessions: 230 },
  { id: '3', title: 'High Voltage Safety', description: 'Electrical safety procedures for working near high voltage equipment.', type: 'electric', difficulty: 'advanced', completionRate: 45, totalSessions: 120 },
  { id: '4', title: 'Confined Space Entry', description: 'Safety protocols for entering and working in confined spaces.', type: 'confined_space', difficulty: 'advanced', completionRate: 78, totalSessions: 310 },
];

const getIcon = (type: string) => {
  switch(type) {
    case 'fire': return <Flame className="text-red-500" />;
    case 'gas': return <Wind className="text-green-500" />;
    case 'electric': return <Zap className="text-yellow-500" />;
    case 'confined_space': return <Box className="text-blue-500" />;
    default: return <Box className="text-slate-500" />;
  }
};

const getBgColor = (type: string) => {
  switch(type) {
    case 'fire': return 'bg-red-100';
    case 'gas': return 'bg-green-100';
    case 'electric': return 'bg-yellow-100';
    case 'confined_space': return 'bg-blue-100';
    default: return 'bg-slate-100';
  }
};

const diffColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700'
};

const TrainingModules = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Training Modules</h1>
          <p className="text-sm text-slate-500 mt-1">Manage VR training scenarios and track performance</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          Create Module
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockModules.map(mod => (
          <div key={mod.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className={clsx("p-3 rounded-xl", getBgColor(mod.type))}>
                  {getIcon(mod.type)}
                </div>
                <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", diffColors[mod.difficulty])}>
                  {mod.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{mod.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-6">{mod.description}</p>
              
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Completion Rate</span>
                  <span className="font-semibold text-slate-700">{mod.completionRate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${mod.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
              <span>{mod.totalSessions} Sessions</span>
              <span className="text-orange-600 font-medium hover:text-orange-700">Manage Module →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingModules;
