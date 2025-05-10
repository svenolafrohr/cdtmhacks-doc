
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="w-10 h-2 bg-teal-600 mr-2"></div>
          <h1 className="text-lg font-medium text-gray-800">PatientOnboarding</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:inline-block">Dr. M. Weber</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
