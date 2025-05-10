
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

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
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const ProgramEligibilitySection: React.FC<ProgramEligibilityProps> = ({ programEligibility, colorScheme }) => {
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
        <CardTitle className="text-lg font-semibold">Program Eligibility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {eligibilityItems.map((item) => (
            <div key={item.key} className="flex items-center">
              {programEligibility[item.key as keyof typeof programEligibility] ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-300 mr-2" />
              )}
              <span className={programEligibility[item.key as keyof typeof programEligibility] 
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
