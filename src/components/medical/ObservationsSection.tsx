
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface ObservationsProps {
  observations: Array<{
    encounter_id: string;
    datetime: string;
    type: string;
    result: string;
  }>;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const ObservationsSection: React.FC<ObservationsProps> = ({ observations, colorScheme }) => {
  if (!observations || observations.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Observations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {observations.map((observation, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-gray-900">
                  {observation.type} <span className="text-gray-500">(e.g., ECG, X-Ray)</span>
                </div>
                <span className="text-sm text-gray-500">
                  {observation.datetime ? formatDate(observation.datetime) : 'Date not available'}
                </span>
              </div>
              <p className="text-gray-700">{observation.result}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ObservationsSection;
