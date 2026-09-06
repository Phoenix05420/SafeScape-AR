import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, ShieldCheck, FileBarChart, Settings, X, HardHat } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Workers', path: '/workers', icon: Users },
  { name: 'Training Modules', path: '/modules', icon: BookOpen },
  { name: 'Certificates', path: '/certificates', icon: ShieldCheck },
  { name: 'Reports', path: '/reports', icon: FileBarChart },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={clsx("fixed inset-0 bg-slate-900/50 z-20 lg:hidden transition-opacity", isOpen ? "opacity-100" : "opacity-0 pointer-events-none")} 
        onClick={() => setIsOpen(false)}
      />

      <aside className={clsx(
        "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-4 lg:px-6 bg-slate-950">
          <div className="flex items-center gap-2 text-orange-500">
            <HardHat size={28} />
            <span className="text-xl font-bold text-white tracking-tight">SafeScape AR</span>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-orange-500 text-white" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                end={item.path === '/'}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-slate-500 font-medium">SafeScape AR v1.0.0</div>
          <div className="text-xs text-slate-600 mt-1">SIH26041 Edition</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
