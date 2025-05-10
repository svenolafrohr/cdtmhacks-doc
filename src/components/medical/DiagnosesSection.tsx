
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface DiagnosesProps {
  diagnoses: Array<{
    diagnosis_date: string;
    diagnosis_name: string;
    icd10_code: string;
    diagnosis_details: string;
  }>;
}

const DiagnosesSection: React.FC<DiagnosesProps> = ({ diagnoses }) => {
  if (!diagnoses || diagnoses.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Diagnoses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-medium text-gray-900">{diagnosis.diagnosis_name}</span>
                  <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                    {diagnosis.icd10_code}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {diagnosis.diagnosis_date ? formatDate(diagnosis.diagnosis_date) : 'Date not available'}
                </span>
              </div>
              {diagnosis.diagnosis_details && (
                <p className="text-gray-700">{diagnosis.diagnosis_details}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosesSection;
