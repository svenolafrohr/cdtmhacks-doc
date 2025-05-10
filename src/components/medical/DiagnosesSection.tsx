
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DiagnosesProps {
  diagnoses: Array<{
    diagnosis_date: string;
    diagnosis_name: string;
    icd10_code: string;
    diagnosis_details: string;
  }>;
}

const DiagnosesSection: React.FC<DiagnosesProps> = ({ diagnoses }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-amber-50 text-amber-800 font-bold text-2xl rounded-md mr-3">
            D
          </div>
          <CardTitle className="text-lg font-semibold">Diagnosen</CardTitle>
        </div>
        <div className="ml-auto">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transform rotate-180"
            >
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            className="pl-10 pr-4 py-2 w-full border rounded-md" 
            placeholder="Diagnose suchen"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {diagnoses && diagnoses.length > 0 ? (
            diagnoses.map((diagnosis, index) => (
              <div 
                key={index} 
                className="py-3 pl-2 border-l-4 border-amber-400 flex justify-between items-start"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">{diagnosis.icd10_code || "NULL"}</span>
                    <span className="text-gray-900">{diagnosis.diagnosis_name || "NULL"}</span>
                  </div>
                  {diagnosis.diagnosis_details && (
                    <p className="text-sm text-gray-700 mt-1">{diagnosis.diagnosis_details}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-medium">
                    {diagnosis.icd10_code?.startsWith('J') ? 'DD' : ''} Gesichert
                  </span>
                  <button className="p-1">
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Keine Diagnosen vorhanden
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosesSection;
