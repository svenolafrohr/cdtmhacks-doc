
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface EncounterProps {
  encounter: {
    visit_date: string;
    chief_complaint: string;
    history_of_present_illness: string;
  };
  onChange?: (field: string, value: any) => void;
  editable?: boolean;
}

const EncounterSection: React.FC<EncounterProps> = ({ encounter, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!encounter) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Encounter Details</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {encounter.visit_date ? formatDate(encounter.visit_date) : 'Date not available'}
            </span>
            {onChange && (
              <div className="flex items-center gap-2">
                <Label htmlFor="edit-encounter" className="text-xs">Edit</Label>
                <Switch 
                  id="edit-encounter"
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
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Chief Complaint</h4>
            {isEditing && onChange ? (
              <Textarea
                value={encounter.chief_complaint || ''}
                onChange={(e) => onChange('chief_complaint', e.target.value)}
                className="w-full"
                placeholder="Chief complaint"
              />
            ) : (
              <p className="text-gray-900">{encounter.chief_complaint || 'Not specified'}</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">History of Present Illness</h4>
            {isEditing && onChange ? (
              <Textarea
                value={encounter.history_of_present_illness || ''}
                onChange={(e) => onChange('history_of_present_illness', e.target.value)}
                className="w-full"
                placeholder="History of present illness"
                rows={5}
              />
            ) : (
              <p className="text-gray-900 whitespace-pre-line">
                {encounter.history_of_present_illness || 'Not specified'}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EncounterSection;
