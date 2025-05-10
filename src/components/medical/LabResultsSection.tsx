
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface LabResultsProps {
  labResults: Array<{
    datetime: string;
    analyte: string;
    level: number;
    unit: string;
    method: string;
    ref_range_lower: number;
    ref_range_upper: number;
    is_abnormal: boolean;
    lab_provider: {
      name: string;
      address: string;
    };
  }>;
}

const LabResultsSection: React.FC<LabResultsProps> = ({ labResults }) => {
  if (!labResults || labResults.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Lab Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {labResults.map((result, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-medium text-gray-900">{result.analyte}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                    result.is_abnormal 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {result.is_abnormal ? 'Abnormal' : 'Normal'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {result.datetime ? formatDate(result.datetime) : 'Date not available'}
                </span>
              </div>
              
              <div className="mt-2 text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{result.level}</span> {result.unit}
                    <span className="text-gray-500 ml-2">
                      (Reference: {result.ref_range_lower}-{result.ref_range_upper} {result.unit})
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Method: {result.method}</div>
                </div>
                
                <div className="mt-1 text-gray-500">
                  Provider: {result.lab_provider.name}, {result.lab_provider.address}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LabResultsSection;
