
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Pencil } from 'lucide-react';

interface ProgramEligibilityProps {
  programEligibility: {
    patient_id: string;
    elig_hzv: boolean;
    elig_dmp_diabetes: boolean;
    elig_dmp_asthma: boolean;
    elig_dmp_copd: boolean;
    elig_dmp_khk: boolean;
    elig_dmp_obesity: boolean;
  };
  onChange?: (field: string, value: any) => void;
  editable?: boolean;
}

const ProgramEligibilitySection: React.FC<ProgramEligibilityProps> = ({ programEligibility, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!programEligibility) return null;

  const eligibilityItems = [
    { key: 'elig_hzv', label: 'HZV Program' },
    { key: 'elig_dmp_diabetes', label: 'DMP Diabetes' },
    { key: 'elig_dmp_asthma', label: 'DMP Asthma' },
    { key: 'elig_dmp_copd', label: 'DMP COPD' },
    { key: 'elig_dmp_khk', label: 'DMP KHK' },
    { key: 'elig_dmp_obesity', label: 'DMP Obesity' },
  ];

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Program Eligibility</CardTitle>
          <Toggle 
            className="h-8 w-8 p-0 rounded-full" 
            pressed={isEditing} 
            onPressedChange={setIsEditing}
            aria-label="Toggle edit mode"
          >
            <Pencil className="h-4 w-4" />
          </Toggle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {eligibilityItems.map((item) => (
            <div key={item.key} className="flex items-center">
              {isEditing && onChange ? (
                <input 
                  type="checkbox"
                  id={item.key}
                  checked={Boolean(programEligibility[item.key as keyof typeof programEligibility])}
                  onChange={(e) => onChange(item.key, e.target.checked)}
                  className="mr-2"
                />
              ) : (
                Boolean(programEligibility[item.key as keyof typeof programEligibility]) ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-300 mr-2" />
                )
              )}
              <span className={Boolean(programEligibility[item.key as keyof typeof programEligibility]) 
                ? 'font-medium' 
                : 'text-gray-500'
              }>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramEligibilitySection;
