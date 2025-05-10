
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PractitionersProps {
  practitioners: Array<{
    last_name: string;
    first_name: string;
    function: string;
  }>;
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const PractitionersSection: React.FC<PractitionersProps> = ({ practitioners, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!practitioners || practitioners.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Care Team</CardTitle>
          {onChange && (
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-practitioners" className="text-xs">Edit</Label>
              <Switch 
                id="edit-practitioners"
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
          {practitioners.map((practitioner, index) => (
            <div key={index} className="pb-2 border-b border-gray-100 last:border-b-0 last:pb-0">
              {isEditing && onChange ? (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input
                    value={practitioner.first_name}
                    onChange={(e) => onChange(index, 'first_name', e.target.value)}
                    placeholder="First name"
                    className="mb-2"
                  />
                  <Input
                    value={practitioner.last_name}
                    onChange={(e) => onChange(index, 'last_name', e.target.value)}
                    placeholder="Last name"
                    className="mb-2"
                  />
                  <Input
                    value={practitioner.function}
                    onChange={(e) => onChange(index, 'function', e.target.value)}
                    placeholder="Function"
                    className="col-span-2"
                  />
                </div>
              ) : (
                <>
                  <div className="font-medium text-gray-900">
                    {practitioner.first_name} {practitioner.last_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {practitioner.function}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PractitionersSection;
