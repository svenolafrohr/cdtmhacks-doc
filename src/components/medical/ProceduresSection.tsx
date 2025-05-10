
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ProceduresProps {
  procedures: Array<{
    patient_id: string;
    type: string;
    date: string;
    details: string;
  }>;
}

const ProceduresSection: React.FC<ProceduresProps> = ({ procedures }) => {
  if (!procedures || procedures.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Procedures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {procedures.map((procedure, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-gray-900">{procedure.type}</span>
                <span className="text-sm text-gray-500">{procedure.date}</span>
              </div>
              <p className="text-gray-700">{procedure.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProceduresSection;
