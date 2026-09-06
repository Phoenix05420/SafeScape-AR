import React from 'react';
import { User, Bell, Shield, Database } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 bg-slate-50 p-4 md:border-r border-slate-200 flex md:flex-col gap-2 overflow-x-auto">
            <button className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 font-medium rounded-lg whitespace-nowrap">
              <User size={18} /> Profile
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 font-medium rounded-lg whitespace-nowrap">
              <Bell size={18} /> Notifications
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 font-medium rounded-lg whitespace-nowrap">
              <Shield size={18} /> Security
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 font-medium rounded-lg whitespace-nowrap">
              <Database size={18} /> System
            </button>
          </div>
          
          <div className="flex-1 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Profile Settings</h2>
            
            <form className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-2xl font-bold">
                  A
                </div>
                <div>
                  <button type="button" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input type="text" defaultValue="Admin User" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" defaultValue="admin@safescape.ar" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                  <input type="text" defaultValue="System Administrator" disabled className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-md" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                  Cancel
                </button>
                <button type="button" className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-400 mt-8">
        SafeScape AR Admin Dashboard v1.0.0 (SIH26041)
      </div>
    </div>
  );
};

export default Settings;
