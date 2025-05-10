
import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
