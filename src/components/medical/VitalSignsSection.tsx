
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface VitalSignsProps {
  vitalSigns: {
    datetime: string;
    weight: number;
    height: number;
    bmi: number;
  };
  onChange?: (field: string, value: any) => void;
  editable?: boolean;
}

const VitalSignsSection: React.FC<VitalSignsProps> = ({ vitalSigns, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!vitalSigns) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Vital Signs</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {vitalSigns.datetime ? formatDate(vitalSigns.datetime) : 'Date not available'}
            </span>
            {onChange && (
              <div className="flex items-center gap-2">
                <Label htmlFor="edit-vitals" className="text-xs">Edit</Label>
                <Switch 
                  id="edit-vitals"
                  checked={isEditing} 
                  onCheckedChange={setIsEditing}
                  aria-label="Toggle edit mode"
                />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Height</h4>
            {isEditing && onChange ? (
              <Input
                type="number"
                value={vitalSigns.height}
                onChange={(e) => onChange('height', parseFloat(e.target.value) || 0)}
                className="mt-1"
                min={0}
                step={0.1}
              />
            ) : (
              <p className="text-gray-900">{vitalSigns.height} cm</p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Weight</h4>
            {isEditing && onChange ? (
              <Input
                type="number"
                value={vitalSigns.weight}
                onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
                className="mt-1"
                min={0}
                step={0.1}
              />
            ) : (
              <p className="text-gray-900">{vitalSigns.weight} kg</p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">BMI</h4>
            {isEditing && onChange ? (
              <Input
                type="number"
                value={vitalSigns.bmi}
                onChange={(e) => onChange('bmi', parseFloat(e.target.value) || 0)}
                className="mt-1"
                min={0}
                step={0.1}
              />
            ) : (
              <p className="text-gray-900">{vitalSigns.bmi}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalSignsSection;
