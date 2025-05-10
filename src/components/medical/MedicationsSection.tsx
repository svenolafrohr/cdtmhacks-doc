
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pill } from 'lucide-react';

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
}

const MedicationsSection: React.FC<MedicationsProps> = ({ medications }) => {
  // Always show the section, even when empty
  const getMedicationSchedule = (med: { 
    amount_morning: number;
    amount_noon: number;
    amount_evening: number;
    amount_night: number;
  }) => {
    return `${med.amount_morning || 0}-${med.amount_noon || 0}-${med.amount_evening || 0}-${med.amount_night || 0}`;
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Pill className="h-5 w-5 mr-2 text-teal-600" />
          <CardTitle className="text-lg font-semibold">Medications</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {medications && medications.length > 0 ? (
          <div className="space-y-2">
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{medication.name}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-sm text-gray-600">{medication.dose}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded mr-2">
                    {getMedicationSchedule(medication)}
                  </span>
                  {medication.comment && (
                    <span className="text-xs text-gray-500">{medication.comment}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 text-center text-gray-500">No medications recorded</div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicationsSection;
