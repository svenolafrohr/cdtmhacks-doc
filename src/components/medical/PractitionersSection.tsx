
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PractitionersProps {
  practitioners: Array<{
    last_name: string;
    first_name: string;
    function: string;
  }>;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const PractitionersSection: React.FC<PractitionersProps> = ({ practitioners, colorScheme }) => {
  if (!practitioners || practitioners.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Care Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {practitioners.map((practitioner, index) => (
            <div key={index} className="pb-2 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="font-medium text-gray-900">
                {practitioner.first_name} {practitioner.last_name}
              </div>
              <div className="text-sm text-gray-500">
                {practitioner.function}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PractitionersSection;
