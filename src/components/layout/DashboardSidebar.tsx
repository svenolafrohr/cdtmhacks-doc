
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  BarChart, 
  Settings
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink = ({ to, icon: Icon, label }: SidebarLinkProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          isActive 
            ? 'bg-medical-accent text-medical-primary' 
            : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

const DashboardSidebar = () => {
  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <nav className="space-y-1">
          <SidebarLink to="/patients" icon={Users} label="Patients" />
          <SidebarLink to="/appointments" icon={Calendar} label="Appointments" />
          <SidebarLink to="/visits" icon={ClipboardCheck} label="Visits" />
          <SidebarLink to="/analytics" icon={BarChart} label="Analytics" />
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
