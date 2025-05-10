
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface MedicalHistoryProps {
  medicalHistory: Array<{
    event_datetime: string;
    event_type: string;
    event_details: string;
  }>;
}

const MedicalHistorySection: React.FC<MedicalHistoryProps> = ({ medicalHistory }) => {
  if (!medicalHistory || medicalHistory.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medicalHistory.map((item, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-900">{item.event_type}</span>
                <span className="text-sm text-gray-500">
                  {item.event_datetime ? formatDate(item.event_datetime) : 'Date not available'}
                </span>
              </div>
              <p className="text-gray-700">{item.event_details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalHistorySection;
