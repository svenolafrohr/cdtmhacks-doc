
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  BarChart, 
  Settings,
  FileText,
  FilePlus,
  Clock
} from 'lucide-react';

const DashboardSidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isPathActive = (pathPattern: string | string[]) => {
    if (Array.isArray(pathPattern)) {
      return pathPattern.some(p => path.startsWith(p));
    }
    return path.startsWith(pathPattern);
  };

  // Simplified sidebar that's less prominent to match the reference design
  return (
    <aside className="w-16 bg-gray-50 border-r border-gray-200 hidden md:flex flex-col items-center py-4">
      <div className="flex flex-col items-center gap-6 mt-4">
        <NavLink to="/">
          <SidebarIcon 
            icon={Users} 
            label="Patienten" 
            active={isPathActive(['/', '/patients', '/patient/'])} 
          />
        </NavLink>
        <SidebarIcon icon={FileText} label="Records" />
        <SidebarIcon icon={FilePlus} label="New Record" />
        <SidebarIcon icon={Clock} label="History" />
        <SidebarIcon icon={Calendar} label="Calendar" />
      </div>
      
      <div className="mt-auto">
        <SidebarIcon icon={Settings} label="Settings" />
      </div>
    </aside>
  );
};

const SidebarIcon = ({ icon: Icon, label, active = false }) => {
  return (
    <div className="relative group">
      <div 
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg 
          ${active ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}
          transition-colors
        `}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};

export default DashboardSidebar;
