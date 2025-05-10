
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ImmunizationsProps {
  immunizations: Array<{
    patient_id: string;
    date: string;
    disease: string;
    vaccine_name: string;
    batch_number: string;
    best_before: string;
    doctor_name: string;
    doctor_address: any;
    details: string;
  }>;
}

const ImmunizationsSection: React.FC<ImmunizationsProps> = ({ immunizations }) => {
  if (!immunizations || immunizations.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Immunizations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {immunizations.map((immunization, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-gray-900">{immunization.disease}</span>
                <span className="text-sm text-gray-500">{immunization.date}</span>
              </div>
              
              <div className="mt-1">
                <div className="text-sm text-gray-700">
                  Vaccine: {immunization.vaccine_name}
                </div>
                <div className="text-sm text-gray-500">
                  Batch: {immunization.batch_number} (Best before: {immunization.best_before})
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Doctor: {immunization.doctor_name}
                </div>
                {immunization.details && (
                  <div className="text-sm text-gray-700 mt-1">{immunization.details}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImmunizationsSection;
