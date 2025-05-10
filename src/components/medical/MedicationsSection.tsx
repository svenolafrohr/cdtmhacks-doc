
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
  if (!medications || medications.length === 0) return null;
  
  const getDosageSchedule = (med: { 
    amount_morning: number;
    amount_noon: number;
    amount_evening: number;
    amount_night: number;
  }) => {
    const schedule = [];
    
    if (med.amount_morning) schedule.push(`${med.amount_morning} morning`);
    if (med.amount_noon) schedule.push(`${med.amount_noon} noon`);
    if (med.amount_evening) schedule.push(`${med.amount_evening} evening`);
    if (med.amount_night) schedule.push(`${med.amount_night} night`);
    
    return schedule.join(', ');
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Medications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {medications.map((medication, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-gray-900">{medication.name}</span>
                <span className="text-sm text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                  {medication.dose}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {getDosageSchedule(medication)}
              </p>
              {medication.comment && (
                <p className="text-sm text-gray-500 mt-1">{medication.comment}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationsSection;
