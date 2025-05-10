
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DiagnosesProps {
  diagnoses: Array<{
    diagnosis_date: string;
    diagnosis_name: string;
    icd10_code: string;
    diagnosis_details: string;
  }>;
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const DiagnosesSection: React.FC<DiagnosesProps> = ({ diagnoses, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!diagnoses || diagnoses.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Diagnoses</CardTitle>
          {onChange && (
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-diagnoses" className="text-xs">Edit</Label>
              <Switch 
                id="edit-diagnoses"
                checked={isEditing} 
                onCheckedChange={setIsEditing}
                aria-label="Toggle edit mode"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                {isEditing && onChange ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <Input
                      value={diagnosis.diagnosis_name}
                      onChange={(e) => onChange(index, 'diagnosis_name', e.target.value)}
                      className="font-medium"
                      placeholder="Diagnosis"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={diagnosis.icd10_code}
                        onChange={(e) => onChange(index, 'icd10_code', e.target.value)}
                        className="w-1/3"
                        placeholder="ICD-10"
                      />
                      <Input
                        type="date"
                        value={diagnosis.diagnosis_date}
                        onChange={(e) => onChange(index, 'diagnosis_date', e.target.value)}
                        className="w-2/3"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="font-medium text-gray-900">{diagnosis.diagnosis_name}</span>
                      <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                        {diagnosis.icd10_code}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {diagnosis.diagnosis_date ? formatDate(diagnosis.diagnosis_date) : 'Date not available'}
                    </span>
                  </>
                )}
              </div>
              {isEditing && onChange ? (
                <Textarea
                  value={diagnosis.diagnosis_details || ''}
                  onChange={(e) => onChange(index, 'diagnosis_details', e.target.value)}
                  className="w-full"
                  placeholder="Details"
                />
              ) : (
                diagnosis.diagnosis_details && (
                  <p className="text-gray-700">{diagnosis.diagnosis_details}</p>
                )
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosesSection;
