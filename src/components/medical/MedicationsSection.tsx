
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import EditableSection from './EditableSection';

interface MedicationsProps {
  medications: Array<{
    name: string;
    dose: string;
    amount_morning: number;
    amount_noon: number;
    amount_evening: number;
    amount_night: number;
    comment: string;
  }>;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const MedicationsSection: React.FC<MedicationsProps> = ({ medications, colorScheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMedications = medications?.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  const getMedicationSchedule = (med: { 
    amount_morning: number;
    amount_noon: number;
    amount_evening: number;
    amount_night: number;
  }) => {
    return `${med.amount_morning || 0}-${med.amount_noon || 0}-${med.amount_evening || 0}-${med.amount_night || 0}`;
  };
  
  return (
    <EditableSection title="Medications">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          className="pl-10 pr-4 py-2 w-full border rounded-md" 
          placeholder="Medikation suchen"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredMedications.length > 0 ? (
        <div className="space-y-2">
          {filteredMedications.map((medication, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0`}
            >
              <div className="flex-1">
                <span className="font-medium text-gray-900">{medication.name}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-sm text-gray-600">{medication.dose}</span>
                {medication.comment && (
                  <span className="ml-2 text-xs text-gray-500">{medication.comment}</span>
                )}
              </div>
              <div>
                <span className={`text-sm font-mono ${colorScheme ? `${colorScheme.highlight} ${colorScheme.highlightText}` : 'bg-purple-50 text-purple-700'} px-2 py-0.5 rounded`}>
                  {getMedicationSchedule(medication)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-3 text-center text-gray-500">
          {searchQuery ? "No medications found matching your search" : "No medications recorded"}
        </div>
      )}
    </EditableSection>
  );
};

export default MedicationsSection;
