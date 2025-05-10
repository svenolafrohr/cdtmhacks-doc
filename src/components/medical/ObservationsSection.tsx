
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDate } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';
import { Pencil } from 'lucide-react';

interface ObservationsProps {
  observations: Array<{
    encounter_id: string;
    datetime: string;
    type: string;
    result: string;
  }>;
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const ObservationsSection: React.FC<ObservationsProps> = ({ observations, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!observations || observations.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Observations</CardTitle>
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
        <div className="space-y-4">
          {observations.map((observation, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                {isEditing && onChange ? (
                  <>
                    <Input
                      value={observation.type}
                      onChange={(e) => onChange(index, 'type', e.target.value)}
                      className="font-medium mr-2 w-1/2"
                      placeholder="Type"
                    />
                    <Input
                      type="datetime-local"
                      value={observation.datetime ? new Date(observation.datetime).toISOString().slice(0, 16) : ''}
                      onChange={(e) => onChange(index, 'datetime', new Date(e.target.value).toISOString())}
                      className="text-sm w-1/2"
                    />
                  </>
                ) : (
                  <>
                    <div className="font-medium text-gray-900">
                      {observation.type}
                    </div>
                    <span className="text-sm text-gray-500">
                      {observation.datetime ? formatDate(observation.datetime) : 'Date not available'}
                    </span>
                  </>
                )}
              </div>
              {isEditing && onChange ? (
                <Textarea
                  value={observation.result}
                  onChange={(e) => onChange(index, 'result', e.target.value)}
                  className="w-full"
                  placeholder="Result"
                />
              ) : (
                <p className="text-gray-700">{observation.result}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ObservationsSection;
