
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AllergiesProps {
  allergies: Array<{
    patient_id: string;
    icd10_code: string;
  }>;
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const AllergiesSection: React.FC<AllergiesProps> = ({ allergies, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!allergies || allergies.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Allergies</CardTitle>
          {onChange && (
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-allergies" className="text-xs">Edit</Label>
              <Switch 
                id="edit-allergies"
                checked={isEditing} 
                onCheckedChange={setIsEditing}
                aria-label="Toggle edit mode"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy, index) => (
            <span 
              key={index} 
              className="bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {isEditing && onChange ? (
                <Input
                  value={allergy.icd10_code}
                  onChange={(e) => onChange(index, 'icd10_code', e.target.value)}
                  className="bg-transparent border-none p-0 w-auto focus-visible:ring-0"
                />
              ) : (
                allergy.icd10_code
              )}
              {isEditing && onChange && (
                <button className="ml-1 text-red-500 hover:text-red-700">
                  <X size={14} />
                </button>
              )}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllergiesSection;
