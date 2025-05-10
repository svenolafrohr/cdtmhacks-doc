
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Pencil } from 'lucide-react';

interface ReviewOfSystemsProps {
  reviewOfSystems: Array<{
    encounter_id: string;
    system_name: string;
    details: string;
  }>;
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const ReviewOfSystemsSection: React.FC<ReviewOfSystemsProps> = ({ reviewOfSystems, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!reviewOfSystems || reviewOfSystems.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Review of Systems</CardTitle>
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
        <div className="space-y-3">
          {reviewOfSystems.map((item, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              {isEditing && onChange ? (
                <>
                  <Input
                    value={item.system_name}
                    onChange={(e) => onChange(index, 'system_name', e.target.value)}
                    className="font-medium mb-2"
                    placeholder="System name"
                  />
                  <Textarea
                    value={item.details}
                    onChange={(e) => onChange(index, 'details', e.target.value)}
                    className="w-full"
                    placeholder="Details"
                  />
                </>
              ) : (
                <>
                  <h4 className="font-medium text-gray-900">{item.system_name}</h4>
                  <p className="text-gray-700">{item.details}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewOfSystemsSection;
