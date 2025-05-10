
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="text-xl font-semibold text-medical-dark flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-medical-primary flex items-center justify-center text-white">MD</div>
          MediDash
        </div>
        
        <div className="ml-8 max-w-md w-full hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text"
            placeholder="Search patients, records, or doctors..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Bell className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center ml-4">
          <div className="h-8 w-8 rounded-full bg-medical-secondary text-white flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div className="ml-2 hidden md:block">
            <div className="text-sm font-medium text-gray-800">Dr. Sarah Chen</div>
            <div className="text-xs text-gray-500">Physician</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
