
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FamilyHistoryProps {
  familyHistory: Array<{
    relative_name: string;
    history: string;
  }>;
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const FamilyHistorySection: React.FC<FamilyHistoryProps> = ({ familyHistory, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!familyHistory || familyHistory.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Family History</CardTitle>
          {onChange && (
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-family" className="text-xs">Edit</Label>
              <Switch 
                id="edit-family"
                checked={isEditing} 
                onCheckedChange={setIsEditing}
                aria-label="Toggle edit mode"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {familyHistory.map((item, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              {isEditing && onChange ? (
                <>
                  <Input
                    value={item.relative_name}
                    onChange={(e) => onChange(index, 'relative_name', e.target.value)}
                    className="font-medium mb-2"
                    placeholder="Relative"
                  />
                  <Textarea
                    value={item.history}
                    onChange={(e) => onChange(index, 'history', e.target.value)}
                    className="w-full"
                    placeholder="History"
                  />
                </>
              ) : (
                <>
                  <h4 className="font-medium text-gray-900">{item.relative_name}</h4>
                  <p className="text-gray-700">{item.history}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyHistorySection;
