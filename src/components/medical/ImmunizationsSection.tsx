
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Pencil } from 'lucide-react';

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
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const ImmunizationsSection: React.FC<ImmunizationsProps> = ({ immunizations, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!immunizations || immunizations.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Immunizations</CardTitle>
          {onChange && (
            <Toggle 
              className="h-8 w-8 p-0 rounded-full" 
              pressed={isEditing} 
              onPressedChange={setIsEditing}
              aria-label="Toggle edit mode"
            >
              <Pencil className="h-4 w-4" />
            </Toggle>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {immunizations.map((immunization, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                {isEditing && onChange ? (
                  <>
                    <Input
                      value={immunization.disease}
                      onChange={(e) => onChange(index, 'disease', e.target.value)}
                      className="font-medium mr-2 w-1/2"
                      placeholder="Disease"
                    />
                    <Input
                      type="date"
                      value={immunization.date}
                      onChange={(e) => onChange(index, 'date', e.target.value)}
                      className="text-sm w-1/2"
                    />
                  </>
                ) : (
                  <>
                    <span className="font-medium text-gray-900">{immunization.disease}</span>
                    <span className="text-sm text-gray-500">{immunization.date}</span>
                  </>
                )}
              </div>
              
              {isEditing && onChange ? (
                <div className="mt-1 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={immunization.vaccine_name}
                      onChange={(e) => onChange(index, 'vaccine_name', e.target.value)}
                      placeholder="Vaccine name"
                    />
                    <Input
                      value={immunization.batch_number}
                      onChange={(e) => onChange(index, 'batch_number', e.target.value)}
                      placeholder="Batch number"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={immunization.best_before}
                      onChange={(e) => onChange(index, 'best_before', e.target.value)}
                      placeholder="Best before"
                    />
                    <Input
                      value={immunization.doctor_name}
                      onChange={(e) => onChange(index, 'doctor_name', e.target.value)}
                      placeholder="Doctor"
                    />
                  </div>
                  
                  <Textarea
                    value={immunization.details}
                    onChange={(e) => onChange(index, 'details', e.target.value)}
                    placeholder="Details"
                  />
                </div>
              ) : (
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
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImmunizationsSection;
