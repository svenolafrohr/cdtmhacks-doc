
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface VitalSignsProps {
  vitalSigns: {
    datetime: string;
    weight: number;
    height: number;
    bmi: number;
  };
}

const VitalSignsSection: React.FC<VitalSignsProps> = ({ vitalSigns }) => {
  if (!vitalSigns) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Vital Signs</CardTitle>
          <span className="text-sm text-gray-500">
            {vitalSigns.datetime ? formatDate(vitalSigns.datetime) : 'Date not available'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Height</h4>
            <p className="text-gray-900">{vitalSigns.height} cm</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Weight</h4>
            <p className="text-gray-900">{vitalSigns.weight} kg</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">BMI</h4>
            <p className="text-gray-900">{vitalSigns.bmi}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalSignsSection;
