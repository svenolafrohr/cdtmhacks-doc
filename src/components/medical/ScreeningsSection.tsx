
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface ScreeningsProps {
  procedures: Array<{
    patient_id: string;
    type: string;
    date: string;
    details: string;
  }>;
}

const ScreeningsSection: React.FC<ScreeningsProps> = ({ procedures }) => {
  // Always display the section, even if empty
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-amber-50 text-amber-800 font-bold text-2xl rounded-md mr-3">
            S
          </div>
          <CardTitle className="text-lg font-semibold">Screenings</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {procedures && procedures.length > 0 ? (
          <div className="space-y-4">
            {procedures.map((procedure, index) => (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-gray-900">{procedure.type}</span>
                  <span className="text-sm text-gray-500">
                    {procedure.date ? formatDate(procedure.date).split(',')[0] : 'Date not available'}
                  </span>
                </div>
                <p className="text-gray-700">{procedure.details || 'No details provided'}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 text-center text-gray-500">No screenings recorded</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScreeningsSection;
